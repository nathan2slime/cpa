import { api } from "@/api";
import { EventFormPaginationResponse } from "@/types/event.types";

export const getEventsQuery = async () => {
  const page = 1;
  const perPage = 10;

  const { data } = await api.get<EventFormPaginationResponse>(
    `api/event/show?page=${page}&perPage=${perPage}&sortField=updatedAt&sortOrder=desc`
  );

  return data;
};
