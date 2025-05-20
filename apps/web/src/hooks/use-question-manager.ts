"use client";

import { useCallback, useState, useEffect } from "react";
import { QuestionTypeEnum } from "@/types/question";
import { FormType } from "@/types/form";
import {
  useCreateQuestion,
  useUpdateQuestionTitle,
  useDeleteQuestion,
  useDuplicateQuestion,
  useForm,
  useQuestions,
  useOptions,
} from "@/hooks/api-hooks";

type Props = { formId: string };

export type QuestionData = {
  id: string;
  title: string;
  type: QuestionTypeEnum;
};

export function useQuestionManager({ formId }: Props) {
  const { data: form, error: formError } = useForm(formId);

  const {
    data: questions = [],
    isLoading: loadingQuestions,
    refetch: refetchQuestions,
    error: questionsError,
  } = useQuestions(formId);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (formError) setError("Failed to fetch form");
    else if (questionsError) setError("Failed to fetch questions");
    else setError(null);
  }, [formError, questionsError]);

  const createQuestionMutation = useCreateQuestion();
  const updateQuestionTitleMutation = useUpdateQuestionTitle();
  const deleteQuestionMutation = useDeleteQuestion();
  const duplicateQuestionMutation = useDuplicateQuestion();

  const getOptions = useCallback(async (questionId: string) => {
    if (!questionId) return [];
    return await useOptions(questionId);
  }, []);

  const createQuestion = useCallback(
    async (type: QuestionTypeEnum): Promise<string | null> => {
      try {
        const result = await createQuestionMutation.mutateAsync({
          type,
          formId,
        });
        return result?.id ?? null;
      } catch {
        return null;
      }
    },
    [createQuestionMutation, formId]
  );

  const updateQuestionTitle = useCallback(
    async (questionId: string, title: string): Promise<boolean> => {
      try {
        const result = await updateQuestionTitleMutation.mutateAsync({
          questionId,
          title,
        });
        return !!result;
      } catch {
        return false;
      }
    },
    [updateQuestionTitleMutation]
  );

  const deleteQuestion = useCallback(
    async (questionId: string): Promise<boolean> => {
      try {
        const result = await deleteQuestionMutation.mutateAsync(questionId);
        if (result) {
          await refetchQuestions();
          return true;
        }
        return false;
      } catch {
        return false;
      }
    },
    [deleteQuestionMutation, refetchQuestions]
  );

  const duplicateQuestion = useCallback(
    async (questionId: string): Promise<string | null> => {
      try {
        const result = await duplicateQuestionMutation.mutateAsync(questionId);
        if (result) {
          await refetchQuestions();
          return result.id;
        }
        return null;
      } catch {
        return null;
      }
    },
    [duplicateQuestionMutation, refetchQuestions]
  );

  return {
    form: form as FormType | null,
    questions,
    loading: loadingQuestions,
    error,
    refetchQuestions,
    getOptions,
    createQuestion,
    updateQuestionTitle,
    deleteQuestion,
    duplicateQuestion,
  };
}
