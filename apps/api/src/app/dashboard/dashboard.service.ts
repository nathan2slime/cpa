import { Injectable } from "@nestjs/common";
import { PrismaService } from "~/database/prisma.service";
import { startOfMonth, endOfMonth, format } from "date-fns";
import { eachDayOfInterval } from "date-fns";
import { ptBR } from "date-fns/locale";

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getData() {
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(now);

    const [openEvents, actualMonthEvents, actualMonthAnswers] =
      await Promise.all([
        this.prisma.event.count({
          where: {
            createdAt: { gte: start, lte: end },
            endDate: { gt: now },
            deletedAt: null,
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
      ]);

    const answers = await this.prisma.answer.findMany({
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
        deletedAt: null,
      },
      select: {
        createdAt: true,
      },
    });

    const grouped: Record<string, number> = {};
    answers.forEach((answer) => {
      const date = format(answer.createdAt, "yyyy-MM-dd");
      grouped[date] = (grouped[date] || 0) + 1;
    });

    const allDays = eachDayOfInterval({
      start: start,
      end: end,
    });

    const result = allDays.map((day, i) => {
      const dateStr = format(day, "yyyy-MM-dd");
      return {
        date: format(new Date(dateStr), "dd 'de' MMMM", { locale: ptBR }),
        indexDay: i,
        total: grouped[dateStr] ?? 0,
      };
    });

    return {
      openEvents,
      actualMonthEvents,
      actualMonthAnswers,
      answersLastMonthAgrouped: result,
    };
  }
}
