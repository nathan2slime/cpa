import { api } from "@/api/server";

export const getAnswerQuery = async (eventId: string) => {
  const { data } = await api.get("/api/answer/event/show/" + eventId);
  if (data) return data;
};
