import { api } from '@/api';
import { AnswerType } from '@/types/answer.types';

export const createAnswer = async (answer: AnswerType) => {
  return await api.post('api/answer/create', answer);
};
