import { api } from "@/api/index"

export const deleteQuestionMutation = async (questionId: string) => {
  try {
    const res = await api.delete(`/api/question/remove/${questionId}`)
    return res.data
  } catch (err) {
    console.error("Failed to delete question:", err)
    return null
  }
}
