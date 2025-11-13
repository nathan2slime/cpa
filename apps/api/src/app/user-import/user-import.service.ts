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
      if (deleteExistingUsers) {
        await tx.user.deleteMany({
          where: {
            roles: { has: Role.USER },
          },
        })
      }

      for (const user of users) {
        if (!user.targetAudience) {
          throw new BadRequestException(
            `User with login "${user.login}" does not have a target audience.`,
          )
        }

        const hashedPassword = await hash(user.password || '', 10)

        let course = await tx.course.findFirst({
          where: { name: user.targetAudience },
        })

        if (!course) {
          course = await tx.course.create({
            data: {
              name: user.targetAudience,
              type: CourseType.TECH,
            },
          })
        }
        const courseId = course.id

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
