import { api } from "@/api/server";
import { ReportResponse } from "@/types/report.type";
export const getAnswersQuery = async (eventId: string) => {
  const res = await api.get<ReportResponse>("answer/event/show/" + eventId);
  return res.data;
};
