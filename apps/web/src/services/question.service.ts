import { api } from '@/api';
import { QuestionType } from '@/types/question';

export const getQuestionByFormService = async (form: string) => {
  const res = await api.get<QuestionType[]>('/api/question/show', {
    params: {
      form,
    },
  });

  if (res) return res.data;
};
