export type DashboardData = {
  openEvents: number;
  actualMonthEvents: number;
  actualMonthAnswers: number;
  answersLastMonthAgrouped: AnswersAgrouped[];
};

export type AnswersAgrouped = {
  indexDay: number;
  day: string;
  total: number;
};
