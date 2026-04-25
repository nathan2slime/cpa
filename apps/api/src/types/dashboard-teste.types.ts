export interface OpenEventItem {
  id: string;
  title: string;
  startDate: Date | null;
  endDate: Date | null;
}

export interface EventStatsChartPoint {
  date: string;
  total: number;
}

export interface EventStats {
  totalAlunos: number;
  respostasConcluidas: number;
  faltantes: number;
  chartData: EventStatsChartPoint[];
}

export interface DashboardTesteData {
  openEvents: number;
  actualMonthEvents: number;
}
