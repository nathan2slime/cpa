import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, QuestionType } from '@prisma/client';

import { PrismaService } from '~/database/prisma.service';
import {
  CreateQuestionOptionDto,
  QueryQuestionOptionDto,
  UpdateQuestionOptionDto,
} from '~/app/question_option/question_option.dto';
import { INVALID_QUESTION } from '~/errors';

@Injectable()
export class QuestionOptionService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ question, ...data }: CreateQuestionOptionDto) {
    const { type } = await this.prisma.question.findUnique({
      where: { id: question },
    });

    if(type == QuestionType.TEXT) throw new HttpException(INVALID_QUESTION, HttpStatus.BAD_REQUEST);

    // const weight = await this.prisma.questionOption.findFirst({
    //   where: { question: { id: question }, weight: data.weight },
    // });

    // if (!!weight) throw new HttpException(UNIQUE_WEIGHT, HttpStatus.CONFLICT);

    return this.prisma.questionOption.create({
      data: { ...data, question: { connect: { id: question } } },
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
    data: UpdateQuestionOptionDto,
  ) {
    return this.prisma.questionOption.update({
      where,
      data,
    });
  }

  async show({ question }: QueryQuestionOptionDto) {
    return this.prisma.questionOption.findMany({
      where: { question: { id: question }, deletedAt: null },
    });
  }
}
