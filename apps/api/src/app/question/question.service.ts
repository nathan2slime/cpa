import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { CreateQuestionDto, QueryQuestionDto, UpdateQuestionDto } from '~/app/question/question.dto'
import { PrismaService } from '~/database/prisma.service'

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ form, ...data }: CreateQuestionDto) {
    return this.prisma.question.create({
      data: { ...data, form: { connect: { id: form } } }
    })
  }

  async remove(where: Prisma.QuestionWhereUniqueInput) {
    return this.prisma.question.update({
      where,
      data: { deletedAt: new Date() }
    })
  }

  async update(where: Prisma.QuestionWhereUniqueInput, data: UpdateQuestionDto) {
    return this.prisma.question.update({
      where,
      data
    })
  }

  async show({ form }: QueryQuestionDto) {
    return this.prisma.question.findMany({
      where: { deletedAt: null, form: { id: form } }
    })
  }
}
