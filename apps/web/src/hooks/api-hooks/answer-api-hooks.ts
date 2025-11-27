"use client";

import { api } from "@/api";
import type { AnswerType } from "@/types/answer.types";
import type { ReportResponse } from "@/types/report.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export function useCreateAnswer() {
  return useMutation({
    mutationFn: async (data: AnswerType) => {
      const response = await api.post("/api/answer/create", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Suas respostas foram enviadas com sucesso!");
      window.location.reload();
    },
  });
}

export const useCanAnswer = (eventId?: string) => {
  return useQuery({
    queryKey: ["canAnswer", eventId],
    queryFn: async () => {
      try {
        if (!eventId) return null;
        const res = await api.get(`/api/answer/canAnswer/${eventId}`);
        return res.status;
      } catch (error: any) {
        return error.response?.status || 500;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useAnswers = (eventId: string) => {
  const searchParams = useSearchParams();
  const course = searchParams.get("c");

  return useQuery({
    queryKey: ["answers", eventId, course],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (course) params.set("course", course);

      const { data } = await api.get<ReportResponse>(
        `/api/answer/event/show/${eventId}?${params.toString()}`
      );
      return data;
    },
  });
};
