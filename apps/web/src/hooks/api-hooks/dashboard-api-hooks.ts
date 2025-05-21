import { api } from "@/api";
import { DashboardData } from "@/types/dashboard-data.type";
import { useQuery } from "@tanstack/react-query";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => (await api.get<DashboardData>("api/dashboard")).data,
  });
};
