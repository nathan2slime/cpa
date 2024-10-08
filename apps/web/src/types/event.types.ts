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
  total: number;
  data: EventForm[];
  pages: number;
  perPage: number;
  page: number;
};

export type EventReq = {
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
  formId: string;
};
