import { api } from '@/api'
/* import { FullFormType } from '@/app/(management-pages)/answer/[id]/page' */

export const getFullFormByIdService = async (id: string) => {
  return await api.get(`/api/form/full/event/${id}`)
}
