import { api } from "@/api/index"

export const createOptionMutation = async (questionId: string) => {
  try {
    const res = await api.post("/api/question/option/create", {
      question: questionId,
      title: "Opção",
    })
    return res.data
  } catch (err) {
    console.error("Failed to create option:", err)
    return null
  }
}
