import { Prisma, QuestionType } from "@cpa/database";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import {
  CreateQuestionOptionDto,
  QueryQuestionOptionDto,
  UpdateQuestionOptionDto,
} from "~/app/question_option/question_option.dto";
import { PrismaService } from "~/database/prisma.service";
import { INVALID_QUESTION } from "~/errors";

@Injectable()
export class QuestionOptionService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ question, ...data }: CreateQuestionOptionDto) {
    const { type } = await this.prisma.question.findUnique({
      where: { id: question },
    });

    if (type === QuestionType.TEXT)
      throw new HttpException(INVALID_QUESTION, HttpStatus.BAD_REQUEST);

    // const weight = await this.prisma.questionOption.findFirst({
    //   where: { question: { id: question }, weight: data.weight },
    // });

    // if (!!weight) throw new HttpException(UNIQUE_WEIGHT, HttpStatus.CONFLICT);

    const questionOrder = await this.prisma.questionOption.count({
      where: { question: { id: question } },
    });

    return this.prisma.questionOption.create({
      data: {
        ...data,
        order: questionOrder,
        question: { connect: { id: question } },
      },
    });
  }

  async remove(where: Prisma.QuestionOptionWhereUniqueInput) {
    return this.prisma.questionOption.update({
      where,
      data: { deletedAt: new Date() },
    });
  }

  async update(
    where: Prisma.QuestionOptionWhereUniqueInput,
    data: UpdateQuestionOptionDto
  ) {
    return this.prisma.questionOption.update({
      where,
      data,
    });
  }

  async show({ question }: QueryQuestionOptionDto) {
    return this.prisma.questionOption.findMany({
      where: { question: { id: question }, deletedAt: null },
      orderBy: {
        order: "asc",
      },
    });
  }
}
