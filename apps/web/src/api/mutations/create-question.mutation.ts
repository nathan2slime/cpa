import { api } from "@/api/index"
import { QuestionTypeEnum } from "@/types/question"

export const createQuestionMutation = async (type: QuestionTypeEnum, formId: string) => {
  try {
    const res = await api.post("/api/question/create", {
      title: "Questão",
      type,
      form: formId,
    })
    return res.data
  } catch (err) {
    console.error("Failed to create question:", err)
    return null
  }
}
