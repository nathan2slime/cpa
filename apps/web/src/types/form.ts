import { QuestionType } from '@/types/question';

export type FormType = {
  id?: string;
  title: string;
  createdAt?: string;
  deletedAt?: string | null;
  updatedAt?: string;
  questions?: QuestionType[];
};

export type FormResponse = {
  total: number;
  data: FormReq[];
  pages: number;
  perPage: number;
  page: number;
}

export type FormReq = {
  id: string;
  title: string;
  createdAt?: string;
  deletedAt?: string | null;
  updatedAt?: string;
};
