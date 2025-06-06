export type DashboardData = {
  openEvents: number;
  actualMonthEvents: number;
  actualMonthAnswers: number;
  answersLastMonthAgrouped: AnswersAgrouped[];
};

export type AnswersAgrouped = {
  indexDay: number;
  date: string;
  total: number;
};
