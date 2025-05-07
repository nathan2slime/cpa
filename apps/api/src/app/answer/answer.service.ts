import { Session } from "@cpa/database";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "~/database/prisma.service";
import { CreateAnswerDto } from "~/app/answer/answer.dto";

@Injectable()
export class AnswerService {
  constructor(private readonly prisma: PrismaService) {}

  async getByEvent(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id, deletedAt: null },
      include: {
        form: true,
      },
    });

    if (!event || !event.form) {
      throw new HttpException("Evento ou formulário não encontrado", HttpStatus.NOT_FOUND);
    }

    const questions = await this.prisma.question.findMany({
      where: {
        formId: event.form.id,
        deletedAt: null,
      },
      include: {
        options: { where: { deletedAt: null } },
        questionAnswer: { where: { deletedAt: null } },
      },
    });

    return {
      form: event.form,
      question: questions,
    };
  }

  async create({ data, eventId }: CreateAnswerDto, session: Session) {
    const isAnswered = await this.prisma.answer.findFirst({
      where: {
        eventId,
        userId: session.userId,
      },
    });

    if (isAnswered) {
      throw new HttpException("Evento já respondido", HttpStatus.CONFLICT);
    }

    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      select: {
        form: { select: { id: true } },
      },
    });

    if (!event) {
      throw new HttpException("Evento não encontrado", HttpStatus.NOT_FOUND);
    }

    const answer = await this.prisma.answer.create({
      data: {
        event: { connect: { id: eventId } },
        form: { connect: { id: event.form.id } },
        user: { connect: { id: session.userId } },
      },
    });

    await Promise.all(
      data.map(async (qa) => {
        const question = await this.prisma.question.findUnique({
          where: { id: qa.questionId },
          include: { options: true },
        });

        if (!question) {
          throw new HttpException("Questão não encontrada", HttpStatus.NOT_FOUND);
        }

        const hasOption = qa.optionId && question.options.some(opt => opt.id === qa.optionId);
        const hasText = qa.value && qa.value.trim().length > 0;

        if (question.type === "CHOOSE_AND_TEXT") {
          if (!hasOption && !hasText) {
            throw new HttpException(
              "É necessário escolher uma opção e/ou justificar",
              HttpStatus.BAD_REQUEST
            );
          }

          return this.prisma.questionAnswer.create({
            data: {
              value: hasText ? qa.value : null,
              option: hasOption ? { connect: { id: qa.optionId } } : undefined,
              question: { connect: { id: qa.questionId } },
              answer: { connect: { id: answer.id } },
            },
          });
        }

        if (question.type === "CHOOSE") {
          if (!hasOption) {
            throw new HttpException("Opção inválida", HttpStatus.BAD_REQUEST);
          }

          return this.prisma.questionAnswer.create({
            data: {
              option: { connect: { id: qa.optionId } },
              question: { connect: { id: qa.questionId } },
              answer: { connect: { id: answer.id } },
            },
          });
        }

        if (!hasText) {
          throw new HttpException("Texto da resposta é obrigatório", HttpStatus.BAD_REQUEST);
        }

        return this.prisma.questionAnswer.create({
          data: {
            value: qa.value,
            question: { connect: { id: qa.questionId } },
            answer: { connect: { id: answer.id } },
          },
        });
      })
    );

    return { success: true };
  }
}
