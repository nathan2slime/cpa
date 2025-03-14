import { OptionsTypes } from "./options.types";

export type QuestionType = {
  id: string;
  title: string;
  type: 'CHOOSE' | 'TEXT';
  formId: string;
  createdAt: string;
  deletedAt: string | null;
  updatedAt: string;
  options?: OptionsTypes[]
};
