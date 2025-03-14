import { api } from '@/api';
import { FullFormType } from '@/app/answer/[id]/page';

export const getFullFormByIdService = async (
  id: string,
) => {
  return await api.get<FullFormType>('/api/form/full/event/' + id);
};
