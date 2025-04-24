import { api } from "@/api/server";
import { Report } from "@/types/report.type";
export const getAnswersQuery = async (eventId: string) => {
  const res = await api.get<Report>("answer/event/show/" + eventId);
  return res.data;
};
