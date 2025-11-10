import { Injectable } from '@nestjs/common'
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
  destinatario?: string
}

@Injectable()
export class UserImportService {
  constructor(private readonly prisma: PrismaService) {}

  async importUsers(fileBuffer: Buffer): Promise<void> {
    const users = await this.parseCsv(fileBuffer)

    await this.prisma.$transaction(async (tx) => {
      await tx.user.deleteMany({
        where: {
          roles: { has: Role.USER },
        },
      })

      for (const user of users) {
        const hashedPassword = await hash(user.password || '', 10)

        let courseId: string | undefined = undefined
        if (user.destinatario) {
          let course = await tx.course.findFirst({
            where: { name: user.destinatario },
          })

          if (!course) {
            course = await tx.course.create({
              data: {
                name: user.destinatario,
                type: CourseType.TECH,
              },
            })
          }
          courseId = course.id
        }

        await tx.user.create({
          data: {
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
