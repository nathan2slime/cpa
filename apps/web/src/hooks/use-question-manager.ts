"use client";

import { useState, useCallback, useEffect } from "react";
import { getOptionsQuery } from "../api/queries/get-options.query";
import { updateQuestionTitleMutation } from "../api/mutations/update-question-title.mutation";
import { deleteQuestionMutation } from "../api/mutations/delete-question.mutation";
import { createOptionMutation } from "../api/mutations/create-option.mutation";
import { updateOptionMutation } from "../api/mutations/update-option.mutation";
import { deleteOptionMutation } from "../api/mutations/delete-option.mutation";
import { createQuestionMutation } from "../api/mutations/create-question.mutation";
import { duplicateQuestionMutation } from "../api/mutations/duplicate-question.mutation";
import { getQuestionsQuery } from "../api/queries/get-questions.query";
import { getFormQuery } from "../api/queries/get-form.query";
import { FormType } from "@/types/form";

export type QuestionData = {
  id: string;
  title: string;
  type: "TEXT" | "CHOOSE";
};

type Props = {
  formId: string;
};

export function useQuestionManager({ formId }: Props) {
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormType | null>(null);

  useEffect(() => {
    if (formId) {
      fetchForm()
    }
  }, [formId]);

  const fetchForm = async () => {
    setLoading(true)
    const data = await getFormQuery(formId);
    if (data) {
      setForm(data)
      setError(null)
    }
  }

  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getQuestionsQuery(formId);
      if (data) {
        setQuestions(data);
        setError(null);
      }
    } catch (err) {
      setError("Failed to fetch questions");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [formId]);

  const getOptions = useCallback(async (questionId: string) => {
    return await getOptionsQuery(questionId);
  }, []);

  const updateQuestionTitle = useCallback(
    async (questionId: string, title: string) => {
      const result = await updateQuestionTitleMutation(questionId, title);
      return !!result;
    },
    []
  );

  const deleteQuestion = useCallback(
    async (questionId: string) => {
      const result = await deleteQuestionMutation(questionId);
      if (result) {
        await fetchQuestions();
        return true;
      }
      return false;
    },
    [fetchQuestions]
  );

  const createOption = useCallback(async (questionId: string) => {
    const result = await createOptionMutation(questionId);
    return !!result;
  }, []);

  const updateOption = useCallback(async (optionId: string, title: string) => {
    const result = await updateOptionMutation(optionId, title);
    return !!result;
  }, []);

  const deleteOption = useCallback(async (optionId: string) => {
    const result = await deleteOptionMutation(optionId);
    return !!result;
  }, []);

  const createQuestion = useCallback(
    async (type: "TEXT" | "CHOOSE") => {
      const data = await createQuestionMutation(type, formId);
      if (data) {
        await fetchQuestions();
        return data.id;
      }
      return null;
    },
    [fetchQuestions, formId]
  );

  const duplicateQuestion = useCallback(
    async (questionId: string, type: "TEXT" | "CHOOSE") => {
      const data = await duplicateQuestionMutation(questionId);
      if (data) {
        await fetchQuestions();
        return data.id;
      }
      return null;
    },
    [questions, fetchQuestions, formId]
  );

  return {
    form,
    questions,
    loading,
    error,
    fetchQuestions,
    getOptions,
    updateQuestionTitle,
    deleteQuestion,
    createOption,
    updateOption,
    deleteOption,
    createQuestion,
    duplicateQuestion,
  };
}
