"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  useDashboardTeste,
  useOpenEvents,
  useEventStats,
} from "@/hooks/api-hooks/dashboard-teste-api-hooks";
import { Calendar, Clock, TrendingUp } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const chartConfig = {
  total: {
    label: "Total de alunos",
    color: "#3b82f6",
  },
};

export default function DashboardTeste() {
  const { data: summaryData } = useDashboardTeste();
  const { data: openEvents } = useOpenEvents();
  const [selectedEventId, setSelectedEventId] = useState<string | undefined>();
  const { data: eventStats } = useEventStats(selectedEventId);

  // Auto-select first event when list loads
  const effectiveEventId =
    selectedEventId ?? (openEvents && openEvents.length > 0 ? openEvents[0].id : undefined);

  // If auto-selected, also fetch stats for it
  const { data: autoEventStats } = useEventStats(
    !selectedEventId && effectiveEventId ? effectiveEventId : undefined,
  );

  const stats = selectedEventId ? eventStats : autoEventStats ?? eventStats;

  const formatEventLabel = (event: { title: string; startDate: string | null; endDate: string | null }) => {
    const start = event.startDate
      ? format(new Date(event.startDate), "dd/MM/yyyy", { locale: ptBR })
      : "";
    const end = event.endDate
      ? format(new Date(event.endDate), "dd/MM/yyyy", { locale: ptBR })
      : "";
    return `${event.title}  ${start} - ${end}`;
  };

  if (!summaryData) {
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

  return (
    <div className="space-y-6">
      {/* ── TOPO: Eventos do Mês + Eventos Abertos ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Eventos do Mês */}
        <Card className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Eventos do Mês
                </CardTitle>
                <div className="text-4xl font-bold">
                  {summaryData.actualMonthEvents}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-green-50">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100"
              >
                <TrendingUp className="h-3 w-3 mr-1" />
                Mensal
              </Badge>
              <span className="text-xs text-muted-foreground">
                Criados este mês
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Eventos Abertos */}
        <Card className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Eventos Abertos
                </CardTitle>
                <div className="text-4xl font-bold">
                  {summaryData.openEvents}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-blue-50">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="text-xs bg-green-50 text-green-700 hover:bg-green-100"
              >
                <TrendingUp className="h-3 w-3 mr-1" />
                Ativo
              </Badge>
              <span className="text-xs text-muted-foreground">
                Em andamento
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── SEÇÃO: Eventos em aberto ── */}
      <Card className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <CardHeader>
          <CardTitle className="text-base font-medium text-gray-700">
            Eventos em aberto
          </CardTitle>
          <div className="pt-2">
            <Select
              value={effectiveEventId}
              onValueChange={setSelectedEventId}
            >
              <SelectTrigger className="w-full md:w-[420px] bg-white">
                <SelectValue placeholder="Selecione um evento" />
              </SelectTrigger>
              <SelectContent>
                {openEvents?.map((evento) => (
                  <SelectItem key={evento.id} value={evento.id}>
                    {formatEventLabel(evento)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {/* Stats row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">
                Total de alunos
              </p>
              <p className="text-4xl font-bold text-blue-600">
                {stats?.totalAlunos ?? "—"}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">
                Respostas concluídas
              </p>
              <p className="text-4xl font-bold text-green-600">
                {stats?.respostasConcluidas ?? "—"}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Faltantes</p>
              <p className="text-4xl font-bold text-red-500">
                {stats?.faltantes ?? "—"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── GRÁFICO: Evolução de respostas no período ── */}
      <Card className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <CardHeader>
          <CardTitle className="text-base font-medium text-gray-700">
            Evolução de respostas no período
          </CardTitle>
        </CardHeader>
        <CardContent>
          {stats?.chartData && stats.chartData.length > 0 ? (
            <ChartContainer config={chartConfig} className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={stats.chartData}
                  margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    fontSize={12}
                    tick={{ fill: "#9ca3af" }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    fontSize={12}
                    allowDecimals={false}
                    tick={{ fill: "#9ca3af" }}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        className="w-[180px]"
                        nameKey="total"
                      />
                    }
                  />
                  <Legend
                    verticalAlign="top"
                    align="center"
                    iconType="plainline"
                    wrapperStyle={{ paddingBottom: 16 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="total"
                    name="Total de alunos"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#3b82f6", strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <div className="h-[350px] flex items-center justify-center text-muted-foreground">
              {effectiveEventId
                ? "Carregando dados do gráfico..."
                : "Selecione um evento para ver o gráfico"}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
