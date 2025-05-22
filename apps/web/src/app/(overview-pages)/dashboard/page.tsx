"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDashboard } from "@/hooks/api-hooks/dashboard-api-hooks";
import { Activity, Calendar, Clock } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type DashboardData = {
  openEvents: number;
  actualMonthEvents: number;
  actualMonthAnswers: number;
  answersLastMonthAgrouped: AnswersAgrouped[];
};

export type AnswersAgrouped = {
  date: string;
  indexDay: number;
  total: number;
};

export default function Dashboard() {
  const { data: dashboardData } = useDashboard();

  if (!dashboardData) {
    return (
      <div className="w-full h-full flex justify-center items-center p-8">
        <p className="text-muted-foreground">
          Carregando dados do dashboard...
        </p>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    return `${parts[0]}/${parts[1]}`;
  };

  const chartData = dashboardData.answersLastMonthAgrouped.map((item) => ({
    ...item,
    formattedDate: formatDate(item.day),
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const dataItem = payload[0].payload;
      return (
        <div className="bg-background border border-border rounded-md shadow-md p-2 sm:p-3 text-sm">
          <p className="font-medium">{dataItem.date}</p>
          <p className="text-primary font-semibold">{`${payload[0].value} respostas`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <main className="w-full px-3 sm:px-4 md:px-5 py-4 md:py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        <Card className="overflow-hidden border-l-4 border-l-primary">
          <CardHeader className="pb-1 sm:pb-2 pt-3 sm:pt-4">
            <CardTitle className="flex items-center text-lg">
              <Clock className="mr-2 h-5 w-5 text-primary" />
              Eventos Abertos
            </CardTitle>
            <CardDescription>Total de eventos em andamento</CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="flex flex-col">
              <span className="text-3xl sm:text-4xl font-bold text-primary">
                {dashboardData.openEvents}
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground mt-1">
                Eventos aguardando conclusão
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-primary">
          <CardHeader className="pb-1 sm:pb-2 pt-3 sm:pt-4">
            <CardTitle className="flex items-center text-lg">
              <Calendar className="mr-2 h-5 w-5 text-primary" />
              Eventos do Mês
            </CardTitle>
            <CardDescription>Eventos criados no mês atual</CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="flex flex-col">
              <span className="text-3xl sm:text-4xl font-bold text-primary">
                {dashboardData.actualMonthEvents}
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground mt-1">
                Eventos registrados este mês
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-primary">
          <CardHeader className="pb-1 sm:pb-2 pt-3 sm:pt-4">
            <CardTitle className="flex items-center text-lg">
              <Activity className="mr-2 h-5 w-5 text-primary" />
              Respostas do Mês
            </CardTitle>
            <CardDescription>Respostas registradas no mês</CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="flex flex-col">
              <span className="text-3xl sm:text-4xl font-bold text-primary">
                {dashboardData.actualMonthAnswers}
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground mt-1">
                Interações realizadas este mês
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-4 sm:mt-5 md:mt-6">
        <h2 className="text-base sm:text-lg font-semibold mb-2">
          Respostas do Último Mês
        </h2>
        <div className="h-[250px] sm:h-[280px] md:h-[300px] max-w-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis
                dataKey="formattedDate"
                tick={{ fontSize: 10, fontWeight: "normal" }}
                tickMargin={8}
                interval="preserveStartEnd"
                minTickGap={10}
              />
              <YAxis
                tick={{ fontSize: 10 }}
                tickMargin={8}
                allowDecimals={false}
                domain={[0, "dataMax + 1"]}
                minTickGap={1}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="total"
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
                animationDuration={1500}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.total > 0
                        ? "hsl(var(--primary))"
                        : "hsl(var(--muted-foreground)/0.3)"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}
