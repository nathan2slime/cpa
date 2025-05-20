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

export function useUpdateQuestionTitle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      questionId,
      title,
    }: {
      questionId: string;
      title: string;
    }) => {
      const finalTitle = title.trim() === "" ? "Questão" : title;
      const { data } = await api.patch(`/api/question/update/${questionId}`, {
        title: finalTitle,
      });
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
      const { data } = await api.patch("/api/question/reorder/", questions);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
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
