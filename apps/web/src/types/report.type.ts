import { CoursesReq } from "@/types/courseType";

export type Form = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type QuestionOption = {
  id: string;
  title: string;
  questionId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type QuestionAnswer = {
  id: string;
  value: string;
  questionOptionId: string | null;
  questionId: string;
  answerId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type QuestionType = "TEXT" | "CHOOSE" | "CHOOSE_AND_TEXT";

export type Question = {
  id: string;
  title: string;
  type: QuestionType;
  mandatory: boolean;
  formId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  options: QuestionOption[];
  questionAnswer: QuestionAnswer[];
  order: number;
};

export type ReportResponse = {
  form: Form;
  question: Question[];
  courses: CoursesReq[];
  responders: {
    name: string | null;
    surname: string | null;
    login: string;
  }[];
};
