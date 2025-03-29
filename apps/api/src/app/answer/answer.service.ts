import { Session } from "@cpa/database";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { z } from "zod";

import { CreateAnswerDto } from "~/app/answer/answer.dto";
import { PrismaService } from "~/database/prisma.service";

@Injectable()
export class AnswerService {
  constructor(private readonly prisma: PrismaService) {}

  async getByEvent(id: string) {
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
        question: true,
      },
    });

    const options = await this.prisma.questionOption.findMany({
      where: {
        id: { in: questionAnswers.map((qa) => qa.value).filter(Boolean) },
      },
    });

    return questionAnswers.map((qa) => ({
      ...qa,
      option: options.find((opt) => opt.id === qa.value) || null,
    }));
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
