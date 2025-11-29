"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useDashboard } from "@/hooks/api-hooks/dashboard-api-hooks";
import { Activity, Calendar, Clock, TrendingUp } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

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

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function Dashboard() {
  const { data: dashboardData, refetch } = useDashboard();

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-muted border-t-primary rounded-full animate-spin mx-auto" />
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium">Carregando Dashboard</p>
            <p className="text-sm text-muted-foreground">
              Preparando seus dados...
            </p>
          </div>
        </div>
      </div>
    );
  }

  const chartData = dashboardData.answersLastMonthAgrouped;

  const chartConfig = {
    total: {
      label: "Respostas",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-4">
              <Card className="relative overflow-hidden border-l-4 border-l-blue-500 hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-full -translate-y-10 translate-x-10" />
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Eventos Abertos
                      </CardTitle>
                      <div className="text-3xl font-bold">
                        {dashboardData.openEvents}
                      </div>
                    </div>
                    <div className="p-3 rounded-full bg-blue-500/10">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Ativo
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Em andamento
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-l-4 border-l-green-500 hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/5 rounded-full -translate-y-10 translate-x-10" />
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Eventos do Mês
                      </CardTitle>
                      <div className="text-3xl font-bold">
                        {dashboardData.actualMonthEvents}
                      </div>
                    </div>
                    <div className="p-3 rounded-full bg-green-500/10">
                      <Calendar className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Mensal
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Criados este mês
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-l-4 border-l-purple-500 hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/5 rounded-full -translate-y-10 translate-x-10" />
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Respostas do Mês
                      </CardTitle>
                      <div className="text-3xl font-bold">
                        {dashboardData.actualMonthAnswers}
                      </div>
                    </div>
                    <div className="p-3 rounded-full bg-purple-500/10">
                      <Activity className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Ativo
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Registradas
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-8">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">
                      Evolução das Respostas
                    </CardTitle>
                    <CardDescription>
                      Acompanhe o desempenho diário do último mês
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-xs capitalize">
                    {format(new Date(), "MMMM", { locale: ptBR })}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <ChartContainer
                  config={chartConfig}
                  className="h-[400px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 20,
                      }}
                    >
                      <XAxis
                        dataKey="indexDay"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        fontSize={12}
                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        fontSize={12}
                        allowDecimals={false}
                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            className="w-[200px]"
                            nameKey="total"
                            labelFormatter={(value) => {
                              const item = chartData.find(
                                (d) => d.indexDay === Number(value)
                              );
                              return item ? item.date : `Dia ${value}`;
                            }}
                          />
                        }
                      />
                      <Bar
                        dataKey="total"
                        fill="var(--color-total)"
                        radius={[4, 4, 0, 0]}
                        className="hover:opacity-80 transition-opacity duration-200"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
