import { Prisma } from "@cpa/database";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import {
  CreateQuestionDto,
  QueryQuestionDto,
  UpdateQuestionDto,
} from "~/app/question/question.dto";
import { PrismaService } from "~/database/prisma.service";

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ form, ...data }: CreateQuestionDto) {
    const ordemQuestion = await this.prisma.question.count({
      where: { deletedAt: null, form: { id: form } },
    });

    return this.prisma.question.create({
      data: {
        ...data,
        order: ordemQuestion,
        form: { connect: { id: form } },
      },
    });
  }

  async duplicate(questionId: string) {
    const question = await this.prisma.question.findUnique({
      where: { id: questionId },
    });

    const questionOrder = await this.prisma.question.count({
      where: { deletedAt: null, form: { id: question.formId } },
    });

    if (!question)
      return new HttpException("Qestão não encontrada", HttpStatus.NOT_FOUND);
    7;

    const newQuestion = await this.prisma.question.create({
      data: {
        title: question.title,
        type: question.type,
        order: questionOrder,
        form: { connect: { id: question.formId } },
      },
    });

    if (question.type === "TEXT") return newQuestion;

    const options = await this.prisma.questionOption.findMany({
      where: { question: { id: questionId } },
    });

    await Promise.all(
      options.map((option) =>
        this.prisma.questionOption.create({
          data: {
            title: option.title,
            question: { connect: { id: newQuestion.id } },
          },
        })
      )
    );

    return newQuestion;
  }

  async remove(where: Prisma.QuestionWhereUniqueInput) {
    return this.prisma.question.update({
      where,
      data: { deletedAt: new Date() },
    });
  }

  async update(
    where: Prisma.QuestionWhereUniqueInput,
    data: UpdateQuestionDto
  ) {
    return this.prisma.question.update({
      where,
      data,
    });
  }

  async show({ form }: QueryQuestionDto) {
    return this.prisma.question.findMany({
      where: { deletedAt: null, form: { id: form } },
      orderBy: {
        order: "asc",
      },
    });
  }
}
