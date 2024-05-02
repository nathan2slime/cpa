import { QuestionType } from '@/types/question';

export type FormType<T> = {
  title: string;
  data: QuestionType[];
  schema: T;
};
