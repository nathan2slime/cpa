export interface Report {
  form: Form;
  answers: Answers[];
}

export interface Form {
  id: string;
  title: string;
  createdAt: string;
  deletedAt: any;
  updatedAt: string;
  questions: Question[];
}

export interface Question {
  id: string;
  title: string;
  type: string;
  formId: string;
  createdAt: string;
  deletedAt: any;
  updatedAt: string;
  options: Option[];
}

export interface Answers {
  id: string;
  value: string;
  questionOptionId: any;
  questionId: string;
  answerId: string;
  createdAt: string;
  deletedAt: any;
  updatedAt: string;
  answer: Answer;
  question: Question;
  option: Option;
}

export interface Answer {
  id: string;
  createdAt: string;
  deletedAt: any;
  updatedAt: string;
  formId: string;
  eventId: string;
}

export interface Question {
  id: string;
  title: string;
  type: string;
  formId: string;
  createdAt: string;
  deletedAt: any;
  updatedAt: string;
}

export interface Option {
  id: string;
  title: string;
  questionId: string;
  createdAt: string;
  deletedAt: any;
  updatedAt: string;
}
