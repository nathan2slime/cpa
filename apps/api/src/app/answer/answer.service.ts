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

    if (
      !(await event.courses.some(async (e) => e.courseId === user.courseId))
    ) {
      throw new HttpException(
        "Você não tem permissão para responder a este formulário",
        HttpStatus.FORBIDDEN
      );
    }

    return true;
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

    const responders = await this.prisma.answer.findMany({
      where: {
        eventId: id,
        deletedAt: null,
        ...(filter.course && {
          user: {
            courseId: filter.course,
          },
        }),
      },
      select: {
        user: {
          select: {
            name: true,
            login: true,
          },
        },
      },
      distinct: ["userId"],
    });

    return {
      form: event.form,
      question: questions,
      courses: courses.map((e) => e.course),
      responders: responders.map((r) => r.user),
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

    // Fetch all questions for the form
    const questions = await this.prisma.question.findMany({
      where: { formId: event.form.id, deletedAt: null },
      include: { options: true },
    });

    await Promise.all(
      questions.map(async (question) => {
        const submittedAnswer = data.find((a) => a.questionId === question.id);

        if (question.mandatory && !submittedAnswer) {
          throw new HttpException(
            `A questão "${question.title}" é obrigatória.`,
            HttpStatus.BAD_REQUEST
          );
        }

        if (!submittedAnswer) return; // Skip non-mandatory unanswered questions

        const qa = submittedAnswer;
        const hasOption =
          qa.optionId && question.options.some((opt) => opt.id === qa.optionId);
        const hasText = qa.value && qa.value.trim().length > 0;

        if (question.mandatory) {
          if (question.type === "CHOOSE_AND_TEXT" && !hasOption && !hasText) {
            throw new HttpException(
              `A questão "${question.title}" é obrigatória.`,
              HttpStatus.BAD_REQUEST
            );
          }
          if (question.type === "CHOOSE" && !hasOption) {
            throw new HttpException(
              `A questão "${question.title}" é obrigatória.`,
              HttpStatus.BAD_REQUEST
            );
          }
          if (question.type === "TEXT" && !hasText) {
            throw new HttpException(
              `A questão "${question.title}" é obrigatória.`,
              HttpStatus.BAD_REQUEST
            );
          }
        }

        // Existing validation logic (adapted)
        if (question.type === "CHOOSE_AND_TEXT") {
          if (!hasOption && !hasText && !question.mandatory) return; // Allow empty if not mandatory?
          // Actually, if it's in 'data', it implies the user tried to answer.
          // But if they sent empty data for a non-mandatory question, maybe we should just ignore or save nulls?
          // Let's stick to the original logic but wrapped in the loop.

          if (!hasOption && !hasText) {
            // If it was mandatory, we already threw. If not mandatory, and empty, maybe just skip creating?
            return;
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
            if (question.mandatory)
              throw new HttpException("Opção inválida", HttpStatus.BAD_REQUEST);
            return;
          }

          return this.prisma.questionAnswer.create({
            data: {
              option: { connect: { id: qa.optionId } },
              question: { connect: { id: qa.questionId } },
              answer: { connect: { id: answer.id } },
            },
          });
        }

        if (question.type === "TEXT") {
          if (!hasText) {
            if (question.mandatory)
              throw new HttpException(
                "Texto obrigatório",
                HttpStatus.BAD_REQUEST
              );
            return;
          }

          return this.prisma.questionAnswer.create({
            data: {
              value: qa.value,
              question: { connect: { id: qa.questionId } },
              answer: { connect: { id: answer.id } },
            },
          });
        }
      })
    );

    return { success: true };
  }
}
