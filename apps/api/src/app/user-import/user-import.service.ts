import { Injectable, BadRequestException } from '@nestjs/common'
import { PrismaService } from '~/database/prisma.service'
import { hash } from 'bcryptjs'
import * as csv from 'csv-parser'
import { Readable } from 'stream'
import { CourseType, Role } from '@cpa/database'

interface CsvUser {
  login: string
  password?: string
  name: string
  surname: string
  targetAudience: string
}

@Injectable()
export class UserImportService {
  constructor(private readonly prisma: PrismaService) {}

  async importUsers(
    fileBuffer: Buffer,
    deleteExistingUsers: boolean,
  ): Promise<void> {
    const users = await this.parseCsv(fileBuffer)

    await this.prisma.$transaction(async (tx) => {
      // 1. Validar e coletar nomes de cursos únicos
      const courseNames = [
        ...new Set(users.map((u) => u.targetAudience)),
      ].filter(Boolean)

      const usersWithoutAudience = users.filter((user) => !user.targetAudience)
      if (usersWithoutAudience.length > 0) {
        throw new BadRequestException(
          `User with login "${usersWithoutAudience[0].login}" does not have a target audience.`,
        )
      }

      // 2. Encontrar ou criar todos os cursos e mapear seus IDs
      const courseMap = new Map<string, string>()
      const courseIdsToDelete: string[] = []

      for (const name of courseNames) {
        let course = await tx.course.findFirst({
          where: { name: name },
        })

        if (!course) {
          course = await tx.course.create({
            data: {
              name: name,
              type: CourseType.TECH,
            },
          })
        }
        courseMap.set(name, course.id)
        courseIdsToDelete.push(course.id)
      }

      // 3. Excluir usuários existentes que pertencem aos cursos importados
      if (deleteExistingUsers && courseIdsToDelete.length > 0) {
        await tx.user.deleteMany({
          where: {
            roles: { has: Role.USER },
            courseId: { in: courseIdsToDelete },
          },
        })
      }

      // 4. Upsert dos usuários
      for (const user of users) {
        const courseId = courseMap.get(user.targetAudience)
        // A validação no passo 1 garante que courseId existe, mas para segurança:
        if (!courseId) {
          throw new Error('Course ID not found after processing')
        }

        const hashedPassword = await hash(user.password || '', 10)

        await tx.user.upsert({
          where: { login: user.login },
          update: {
            courseId: courseId,
            name: user.name,
            surname: user.surname,
            ...(user.password && { password: hashedPassword }),
          },
          create: {
            login: user.login,
            password: hashedPassword,
            name: user.name,
            surname: user.surname,
            roles: [Role.USER],
            courseId: courseId,
          },
        })
      }
    })
  }

  private parseCsv(buffer: Buffer): Promise<CsvUser[]> {
    return new Promise((resolve, reject) => {
      const results: CsvUser[] = []
      const stream = Readable.from(buffer)

      stream
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error))
    })
  }
}
