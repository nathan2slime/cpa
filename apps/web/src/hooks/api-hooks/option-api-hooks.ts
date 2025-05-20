"use client";

import { api } from "@/api";
import { QuestionOption } from "@/types/report.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useOptions = (questionId?: string) => {
  return useQuery({
    queryKey: ["options", questionId],
    queryFn: async () => {
      if (!questionId) return [];
      const { data } = await api.get<QuestionOption[]>(
        `/api/question/option/show?question=${questionId}`
      );
      return data;
    },
    enabled: !!questionId,
    refetchOnWindowFocus: false,
  });
};

export const useCreateOptions = (questionId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await api.post("/api/question/option/create", {
        question: questionId,
        title: "Opção",
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Opção criada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["options", questionId] });
    },
    onError: () => {
      toast.error("Erro ao criar opção.");
    },
  });
};

export const useUpdateOptions = (questionId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      optionId,
      title,
    }: {
      optionId: string;
      title: string;
    }) => {
      const finalTitle = title.trim() === "" ? "Opção" : title;
      const res = await api.patch(`/api/question/option/update/${optionId}`, {
        title: finalTitle,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Opção atualizada!");
      queryClient.invalidateQueries({ queryKey: ["options", questionId] });
    },
    onError: () => {
      toast.error("Erro ao atualizar opção.");
    },
  });
};

export const useDeleteOptions = (questionId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (optionId: string) => {
      const res = await api.delete(`/api/question/option/remove/${optionId}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Opção removida!");
      queryClient.invalidateQueries({ queryKey: ["options", questionId] });
    },
    onError: () => {
      toast.error("Erro ao remover opção.");
    },
  });
};
