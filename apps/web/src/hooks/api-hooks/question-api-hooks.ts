"use client";

import { api } from "@/api/index";
import { QuestionTypeEnum } from "@/types/question";
import type { QuestionData } from "@/hooks/use-question-manager";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Question } from "@/types/report.type";

export function useQuestions(formId: string) {
  return useQuery({
    queryKey: ["questions", formId],
    queryFn: async () => {
      const { data } = await api.get<Question[]>(
        `/api/question/show?form=${formId}`
      );
      return data;
    },
    enabled: !!formId,
  });
}

export function useCreateQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      type,
      formId,
    }: {
      type: QuestionTypeEnum;
      formId: string;
    }) => {
      const { data } = await api.post("/api/question/create", {
        title: "Questão",
        type,
        form: formId,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
}

export function useUpdateQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      questionId,
      data: updateData,
    }: {
      questionId: string;
      data: Partial<Question>;
    }) => {
      const { data } = await api.patch(
        `/api/question/update/${questionId}`,
        updateData
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
}

export function useDeleteQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (questionId: string) => {
      const { data } = await api.delete(`/api/question/remove/${questionId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
}

export function useReorderQuestions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["reorder-questions"],
    mutationFn: async (questions: Question[]) => {
      const payload = questions.map((q, index) => ({
        id: q.id,
        order: index,
      }));
      const { data } = await api.patch("/api/question/reorder", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
    onError: (error) => {
      console.error("Failed to reorder questions:", error);
    },
  });
}

export function useDuplicateQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (questionId: string) => {
      const { data } = await api.post<QuestionData>(
        `/api/question/duplicate/${questionId}`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
}
