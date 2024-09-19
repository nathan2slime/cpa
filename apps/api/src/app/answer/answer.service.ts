import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { z } from 'zod';

import { CreateAnswerDto } from '~/app/answer/answer.dto';
import { PrismaService } from '~/database/prisma.service';

@Injectable()
export class AnswerService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ data, eventId }: CreateAnswerDto, user: User) {
    const isAnswered = await this.prisma.answer.findFirst({
      where: {
        eventId,
        userId: user.id,
      },
    });

    if (!!isAnswered)
      throw new HttpException('Resposta recebida', HttpStatus.CONFLICT);

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
            id: user.id,
          },
        },
      },
    });

    await Promise.all(
      data.map(async (qa) => {
        const schema = z.string().cuid();

        const isQuestionOption = schema.safeParse(qa.value).success;

        isQuestionOption
          ? await this.prisma.questionAnswer.create({
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
            })
          : await this.prisma.questionAnswer.create({
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
      }),
    );

    return { success: true };
  }
}
