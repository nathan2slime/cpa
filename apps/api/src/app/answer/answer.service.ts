import { Session } from "@cpa/database";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { z } from "zod";

import { CreateAnswerDto } from "~/app/answer/answer.dto";
import { PrismaService } from "~/database/prisma.service";

@Injectable()
export class AnswerService {
  constructor(private readonly prisma: PrismaService) {}

  async getByEvent(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      select: {
        form: {
          include: {
            questions: {
              where: {
                deletedAt: null,
              },
              include: {
                options: {
                  where: {
                    deletedAt: null,
                  },
                },
              },
            },
          },
        },
      },
    });

    const answers = await this.prisma.answer.findMany({
      where: { eventId: id, deletedAt: null },
      omit: {
        userId: true,
      },
    });

    const questionAnswers = await this.prisma.questionAnswer.findMany({
      where: { answerId: { in: answers.map((a) => a.id) } },
      include: {
        answer: {
          omit: {
            userId: true,
          },
        },
      },
    });

    const questions = await this.prisma.question.findMany({
      where: { id: { in: questionAnswers.map((qa) => qa.questionId) } },
    });

    const questionOptions = await this.prisma.questionOption.findMany({
      where: { id: { in: questionAnswers.map((qa) => qa.value) } },
    });

    return {
      form: event.form,
      answers: questionAnswers.map((qa) => ({
        ...qa,
        question: questions.find((q) => q.id === qa.questionId),
        option: questionOptions.find((opt) => opt.id === qa.value),
      })),
    };
  }

  async create({ data, eventId }: CreateAnswerDto, session: Session) {
    const isAnswered = await this.prisma.answer.findFirst({
      where: {
        eventId,
        userId: session.userId,
      },
    });

    if (isAnswered)
      throw new HttpException("Evento já repondido", HttpStatus.CONFLICT);

    const event = await this.prisma.event.findUnique({
      where: {
        id: eventId,
      },
      select: {
        form: {
          select: {
            id: true,
          },
        },
      },
    });

    const answer = await this.prisma.answer.create({
      data: {
        event: {
          connect: {
            id: eventId,
          },
        },
        form: {
          connect: {
            id: event.form.id,
          },
        },
        user: {
          connect: {
            id: session.userId,
          },
        },
      },
    });

    await Promise.all(
      data.map(async (qa) => {
        const schema = z.string().cuid();
        const isQuestionOption = schema.safeParse(qa.value).success;

        // Primeiro verificar se a questão existe
        const question = await this.prisma.question.findUnique({
          where: { id: qa.questionId },
          include: { options: true },
        });

        if (!question) {
          throw new HttpException(
            "Questão não encontrada",
            HttpStatus.NOT_FOUND
          );
        }

        if (isQuestionOption) {
          const validOption = question.options.some(
            (opt) => opt.id === qa.value
          );
          if (!validOption) {
            throw new HttpException(
              "Opção inválida para esta questão",
              HttpStatus.BAD_REQUEST
            );
          }

          return this.prisma.questionAnswer.create({
            data: {
              option: {
                connect: {
                  id: qa.value,
                },
              },
              answer: {
                connect: {
                  id: answer.id,
                },
              },
              question: {
                connect: {
                  id: qa.questionId,
                },
              },
            },
          });
        } else {
          return this.prisma.questionAnswer.create({
            data: {
              value: qa.value,
              answer: {
                connect: {
                  id: answer.id,
                },
              },
              question: {
                connect: {
                  id: qa.questionId,
                },
              },
            },
          });
        }
      })
    );

    return { success: true };
  }
}
