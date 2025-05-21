import { FormType } from "@/types/form";

export type EventForm = {
  id?: string;
  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
  title: string;
  description: string;
  courses: string[];
  responsible: string;
  startDate: Date;
  endDate: Date;
  form: string;
};

export type EventFormResponse = {
  id?: string;
  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
  title: string;
  description: string;
  courses?: string[];
  responsible: string;
  startDate: Date;
  endDate: Date;
  active: boolean;
  formId: string;
  status: "em andamento" | "encerrado" | "agendado";
};

export type EventFormPaginationResponse = {
  total: number;
  data: EventFormResponse[];
  pages: number;
  perPage: number;
  page: number;
};

export type EventReq = {
  id?: string;
  form: FormType;
  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
  title: string;
  description: string;
  courses: string[];
  responsible: string;
  startDate: Date;
  endDate: Date;
  formId: string;
};
