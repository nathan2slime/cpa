import { OptionType } from "./options.types";

export enum QuestionTypeEnum {
  CHOOSE = "CHOOSE",
  TEXT = "TEXT",
  CHOOSE_AND_TEXT = "CHOOSE_AND_TEXT",
}

export type QuestionType = {
  id: string;
  title: string;
  type: QuestionTypeEnum;
  formId: string;
  createdAt: string;
  deletedAt: string | null;
  updatedAt: string;
  options?: OptionType[];
};
