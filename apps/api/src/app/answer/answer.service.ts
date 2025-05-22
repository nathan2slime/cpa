import { Session } from "@cpa/database";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "~/database/prisma.service";
import { CreateAnswerDto, FilterByCourseDto } from "~/app/answer/answer.dto";

@Injectable()
export class AnswerService {
  constructor(private readonly prisma: PrismaService) {}

  async getCanAnswer(eventId: string, userId: string) {
    const answered = await this.prisma.answer.findFirst({
      where: {
        eventId: eventId,
        userId: userId,
      },
    });

    const event = await this.prisma.event.findUnique({
      where: {
        id: eventId,
      },
      include: {
        form: true,
        courses: true,
      },
    });

    if (!event)
      throw new HttpException("Evento não encontrado", HttpStatus.NOT_FOUND);


    if (!event.active)
      throw new HttpException("Evento não está ativo", HttpStatus.FORBIDDEN);

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        course: true,
      },
    });

    const now = new Date();
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);

    if (now < start) {
      throw new HttpException(
        "Este formulário não está disponível no momento",
        423
      );
    }

    if (now > end) {
      throw new HttpException("Este formulário não aceita mais respostas", 423);
    }

    if (answered) {
      throw new HttpException(
        "Você já respondeu a este formulário",
        HttpStatus.CONFLICT
      );
    }

    if (!event.courses.some((e) => e.courseId === user.courseId)) {
      throw new HttpException(
        "Você não tem permissão para responder a este formulário",
        HttpStatus.FORBIDDEN
      );
    }
  }

  async getByEvent(id: string, filter: FilterByCourseDto) {
    const event = await this.prisma.event.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        form: true,
      },
    });

    const courses = await this.prisma.courseEvent.findMany({
      where: {
        eventId: id,
        deletedAt: null,
      },
      include: {
        course: true,
      },
    });

    const questions = await this.prisma.question.findMany({
      where: {
        formId: event.form.id,
        deletedAt: null,
      },
      include: {
        options: { where: { deletedAt: null } },
        questionAnswer: {
          where: {
            deletedAt: null,
            ...(filter.course && {
              answer: {
                user: {
                  courseId: filter.course,
                },
              },
            }),
          },
        },
      },
    });

    return {
      form: event.form,
      question: questions,
      courses: courses.map((e) => e.course),
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
          throw new HttpException(
            "Questão não encontrada",
            HttpStatus.NOT_FOUND
          );
        }

        const hasOption =
          qa.optionId && question.options.some((opt) => opt.id === qa.optionId);
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
          throw new HttpException(
            "Texto da resposta é obrigatório",
            HttpStatus.BAD_REQUEST
          );
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
