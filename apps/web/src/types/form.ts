import { QuestionType } from '@/types/question';

export type FormType<T> = {
  title: string;
  data: QuestionType[];
  schema: T;
};

export type FormReq = {
  id: string;
  title: string;
  createdAt: string;
  deletedAt: string | null;
  updatedAt: string
}


