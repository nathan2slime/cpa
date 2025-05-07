import { api } from "@/api/server";
import { EventFormResponse } from "@/types/event.types";

type Props = {
  id: string;
};
export const getEventQuery = async ({ id }: Props) => {
  const { data } = await api.get<EventFormResponse>("api/event/show/" + id);

  if (data) return data;
};
