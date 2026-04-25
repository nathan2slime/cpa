import { api } from "@/api";
import type {
  DashboardTesteData,
  EventStats,
  OpenEventItem,
} from "@/types/dashboard-teste.type";
import { useQuery } from "@tanstack/react-query";

export const useDashboardTeste = () => {
  return useQuery({
    queryKey: ["dashboard-teste"],
    queryFn: async () =>
      (await api.get<DashboardTesteData>("api/dashboard-teste")).data,
  });
};

export const useOpenEvents = () => {
  return useQuery({
    queryKey: ["dashboard-teste", "open-events"],
    queryFn: async () =>
      (await api.get<OpenEventItem[]>("api/dashboard-teste/open-events")).data,
  });
};

export const useEventStats = (eventId?: string) => {
  return useQuery({
    queryKey: ["dashboard-teste", "event-stats", eventId],
    queryFn: async () =>
      (
        await api.get<EventStats>(
          `api/dashboard-teste/event-stats/${eventId}`,
        )
      ).data,
    enabled: !!eventId,
  });
};
