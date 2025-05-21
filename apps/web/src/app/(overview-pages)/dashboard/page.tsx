"use client";

import { Activity, Calendar, Clock, Info } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDashboard } from "@/hooks/api-hooks/dashboard-api-hooks";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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

  const allZeroValues = dashboardData.answersLastMonthAgrouped.every(
    (item) => item.total === 0
  );

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
        <div className="bg-background border border-border rounded-md shadow-md p-3">
          <p className="font-medium">{dataItem.date}</p>
          <p className="text-primary font-semibold">{`${payload[0].value} respostas`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <main className="w-full px-5">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="overflow-hidden border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Clock className="mr-2 h-5 w-5 text-blue-500" />
              Eventos Abertos
            </CardTitle>
            <CardDescription>Total de eventos em andamento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-blue-500">
                {dashboardData.openEvents}
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                Eventos aguardando conclusão
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Calendar className="mr-2 h-5 w-5 text-green-500" />
              Eventos do Mês
            </CardTitle>
            <CardDescription>Eventos criados no mês atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-green-500">
                {dashboardData.actualMonthEvents}
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                Eventos registrados este mês
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Activity className="mr-2 h-5 w-5 text-purple-500" />
              Respostas do Mês
            </CardTitle>
            <CardDescription>Respostas registradas no mês</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-purple-500">
                {dashboardData.actualMonthAnswers}
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                Interações realizadas este mês
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-5">
        <h2 className="text-lg font-semibold mb-2">Respostas do Último Mês</h2>
        <Card>
          <CardContent className="pt-6">
            {allZeroValues ? (
              <Alert className="mb-4">
                <Info className="h-4 w-4" />
                <AlertTitle>Sem dados</AlertTitle>
                <AlertDescription>
                  Não há respostas registradas para o último mês.
                </AlertDescription>
              </Alert>
            ) : null}
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis
                    dataKey="formattedDate"
                    tick={{ fontSize: 12 }}
                    tickMargin={10}
                    interval="preserveStartEnd"
                    minTickGap={15}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickMargin={10}
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
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
