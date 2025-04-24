import { api } from "@/api/index"
import type { QuestionData } from "@/hooks/use-question-manager"

export const duplicateQuestionMutation = async (questionId: string) => {
  try {
    const { data } = await api.post<QuestionData>("/api/question/duplicate/" + questionId)
    return data
  } catch (err) {
    console.log(err)
    return null
  }
}
