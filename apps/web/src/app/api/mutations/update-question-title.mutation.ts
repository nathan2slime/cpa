import { api } from "@/api/index"

export const updateQuestionTitleMutation = async (questionId: string, title: string) => {
  try {
    const finalTitle = title.trim() === "" ? "Questão" : title
    const res = await api.patch(`api/question/update/${questionId}`, {
      title: finalTitle,
    })
    return res.data
  } catch (err) {
    console.error("Failed to update question title:", err)
    return null
  }
}
