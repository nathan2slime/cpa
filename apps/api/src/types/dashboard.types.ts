export interface DashboardData {
  openEvents: number;
  actualMonthEvents: number;
  actualMonthAnswers: number;
  answersLastMonthAgrouped: AnswersAgrouped[];
}

export interface AnswersAgrouped {
  date: string;
  indexDay: number;
  total: number;
}