export type OpenEventItem = {
  id: string;
  title: string;
  startDate: string | null;
  endDate: string | null;
};

export type EventStatsChartPoint = {
  date: string;
  total: number;
};

export type EventStats = {
  totalAlunos: number;
  respostasConcluidas: number;
  faltantes: number;
  chartData: EventStatsChartPoint[];
};

export type DashboardTesteData = {
  openEvents: number;
  actualMonthEvents: number;
};
