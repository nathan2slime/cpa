import { Prisma } from '@cpa/database'
import { Injectable } from '@nestjs/common'

import { UpdateUserProfileDto } from '~/app/user/user.dto'
import { PrismaService } from '~/database/prisma.service'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getByLogin(login: string) {
    return this.prisma.user.findUnique({
      where: {
        login
      }
    })
  }

  async getPassword(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where,
      select: {
        id: true,
        password: true
      }
    })
  }

  async getByIdUpdate(id: string, data: UpdateUserProfileDto) {
    return this.prisma.user.update({ data, where: { id } })
  }
}
