import { api } from "@/api";
import { EventFormPaginationResponse } from "@/types/event.types";

type Props = {
  page: number;
  perPage: number;
};

export const getEventsQuery = async ({ page, perPage }: Props) => {
  const { data } = await api.get<EventFormPaginationResponse>(
    `api/event/show?page=${page}&perPage=${perPage}&sortField=updatedAt&sortOrder=desc`
  );

  if (data) return data;
};
