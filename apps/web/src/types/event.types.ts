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
  formId: string;
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
