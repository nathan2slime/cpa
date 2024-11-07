import { api } from '@/api/server';

export const getEventByIdService = async (id: string) => {
  const { data} = await api.get("api/event/show/" + id)
  return data
}