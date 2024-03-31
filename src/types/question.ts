export type QuestionType = {
  type: 'choose' | 'text';
  question: string;
  options: string[];
};
