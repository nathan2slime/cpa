import { Injectable } from "@nestjs/common";
import { startOfMonth, endOfMonth, format, eachDayOfInterval } from "date-fns";
import { ptBR } from "date-fns/locale";
import { PrismaService } from "~/database/prisma.service";
import { AnswersAgrouped, DashboardData } from "~/types/dashboard.types";

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getData(): Promise<DashboardData> {
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(now);

    const [openEvents, actualMonthEvents, actualMonthAnswers, answers] =
      await Promise.all([
        this.prisma.event.count({
          where: {
            createdAt: { gte: start, lte: end },
            endDate: { gt: now },
            deletedAt: null,
            active: true,
          },
        }),

        this.prisma.event.count({
          where: {
            createdAt: { gte: start, lte: end },
            deletedAt: null,
          },
        }),

        this.prisma.answer.count({
          where: {
            createdAt: { gte: start, lte: end },
            deletedAt: null,
          },
        }),

        this.prisma.answer.findMany({
          where: {
            createdAt: { gte: start, lte: end },
            deletedAt: null,
          },
          select: {
            createdAt: true,
          },
        }),
      ]);

    const grouped: Record<string, number> = {};
    answers.forEach((answer) => {
      const date = format(answer.createdAt, "yyyy-MM-dd");
      grouped[date] = (grouped[date] || 0) + 1;
    });

    const allDays = eachDayOfInterval({ start, end });
    const answersLastMonthAgrouped: AnswersAgrouped[] = allDays.map((day) => {
      const dateStr = format(day, "yyyy-MM-dd");
      return {
        date: format(new Date(dateStr), "dd 'de' MMMM", { locale: ptBR }),
        indexDay: day.getDate(),
        total: grouped[dateStr] ?? 0,
      };
    });

    return {
      openEvents,
      actualMonthEvents,
      actualMonthAnswers,
      answersLastMonthAgrouped,
    };
  }
}
