import { api } from '@/api/server';
import { AnswerType } from '@/types/answer.type';

export const submitForm = async (answer: AnswerType) => {
  const {data, status} = await api.post("/api/answer/create", answer);
  
  if (status == 201) return data
};
