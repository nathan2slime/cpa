import { api } from "@/api/index";
import { QuestionData } from "@/hooks/use-question-manager";

export const getQuestionsQuery = async (formId: string) => {
  try {
    const res = await api.get<QuestionData[]>("/api/question/show?form=" + formId);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch questions:", err);
    return [];
  }
};
