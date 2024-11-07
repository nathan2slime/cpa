import { api } from '@/api/server';
import { AnswerType } from '@/types/answer.type';

export const submitForm = async (answer: AnswerType) => {
  const {data} = api.post("/api/answer/create", answer);
  return data
};
