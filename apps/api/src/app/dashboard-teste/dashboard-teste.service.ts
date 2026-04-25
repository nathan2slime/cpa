import { Injectable } from "@nestjs/common";
import { startOfMonth, endOfMonth, format, eachDayOfInterval } from "date-fns";
import { PrismaService } from "~/database/prisma.service";
import {
  DashboardTesteData,
  OpenEventItem,
  EventStats,
  EventStatsChartPoint,
} from "~/types/dashboard-teste.types";

@Injectable()
export class DashboardTesteService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary(): Promise<DashboardTesteData> {
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(now);

    const [openEvents, actualMonthEvents] = await Promise.all([
      this.prisma.event.count({
        where: {
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
    ]);

    return { openEvents, actualMonthEvents };
  }

  async getOpenEvents(): Promise<OpenEventItem[]> {
    const now = new Date();

    return this.prisma.event.findMany({
      where: {
        deletedAt: null,
        active: true,
        endDate: { gt: now },
      },
      select: {
        id: true,
        title: true,
        startDate: true,
        endDate: true,
      },
      orderBy: { startDate: "desc" },
    });
  }

  async getEventStats(eventId: string): Promise<EventStats> {
    // Total de alunos = users in courses linked to this event
    const totalAlunos = await this.prisma.user.count({
      where: {
        deletedAt: null,
        course: {
          courseEvent: {
            some: { eventId },
          },
        },
      },
    });

    // Respostas concluídas = answers for this event
    const respostasConcluidas = await this.prisma.answer.count({
      where: {
        eventId,
        deletedAt: null,
      },
    });

    const faltantes = Math.max(totalAlunos - respostasConcluidas, 0);

    // Get event date range for the chart
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      select: { startDate: true, endDate: true },
    });

    // Answers grouped by day
    const answers = await this.prisma.answer.findMany({
      where: { eventId, deletedAt: null },
      select: { createdAt: true },
    });

    const grouped: Record<string, number> = {};
    answers.forEach((a) => {
      const dateStr = format(a.createdAt, "dd/MM");
      grouped[dateStr] = (grouped[dateStr] || 0) + 1;
    });

    let chartData: EventStatsChartPoint[];

    if (event?.startDate && event?.endDate) {
      const endDate = event.endDate > new Date() ? new Date() : event.endDate;
      const allDays = eachDayOfInterval({
        start: event.startDate,
        end: endDate,
      });
      let cumulative = 0;
      chartData = allDays.map((day) => {
        const dateStr = format(day, "dd/MM");
        cumulative += grouped[dateStr] ?? 0;
        return { date: dateStr, total: cumulative };
      });
    } else {
      chartData = Object.entries(grouped).map(([date, total]) => ({
        date,
        total,
      }));
    }

    return { totalAlunos, respostasConcluidas, faltantes, chartData };
  }
}
