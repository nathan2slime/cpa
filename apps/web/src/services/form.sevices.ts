import { api } from '@/api';
import { FullFormType } from '@/app/answer/[id]/page';

export const getFullFormByIdService = async (
  id: string,
) => {
  const res = await api.get<FullFormType>('/api/form/full/' + id);
  if (res) return res.data;
};
