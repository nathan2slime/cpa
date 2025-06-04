"use client";

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
import { Badge } from "@/components/ui/badge";
import { useDashboard } from "@/hooks/api-hooks/dashboard-api-hooks";
import {
  Activity,
  Calendar,
  Clock,
  TrendingUp,
  BarChart3,
  Users,
  RefreshCw,
} from "lucide-react";
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";

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

  const totalResponses = chartData.reduce((sum, item) => sum + item.total, 0);
  const avgDaily =
    chartData.length > 0 ? Math.round(totalResponses / chartData.length) : 0;
  const maxDay =
    chartData.length > 0 ? Math.max(...chartData.map((item) => item.total)) : 0;

  const responsesPerEvent =
    dashboardData.actualMonthEvents > 0
      ? Math.round(
          (dashboardData.actualMonthAnswers / dashboardData.actualMonthEvents) *
            100
        ) / 100
      : 0;

  const openEventsRate =
    dashboardData.actualMonthEvents > 0
      ? Math.round(
          (dashboardData.openEvents / dashboardData.actualMonthEvents) * 100
        )
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto p-6 space-y-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
          <div className="relative p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold tracking-tight">
                      Dashboard Analytics
                    </h1>
                    <p className="text-muted-foreground">
                      Acompanhe o desempenho em tempo real
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {totalResponses}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Total Respostas
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {avgDaily}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Média Diária
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {maxDay}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Pico Diário
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <Button
                    onClick={() => refetch()}
                    variant="outline"
                    className="p-4 w-full"
                  >
                    <RefreshCw size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

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

            <Card className="bg-gradient-to-br from-muted/50 to-muted/20 border-dashed">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Resumo Rápido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-background/50">
                    <div className="text-lg font-semibold">
                      {responsesPerEvent}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Respostas/Evento
                    </div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background/50">
                    <div className="text-lg font-semibold">
                      {openEventsRate}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Taxa Abertura
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                  <Badge variant="outline" className="text-xs">
                    Últimos 30 dias
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
