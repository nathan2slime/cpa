import { api } from "@/api/index"

export const createQuestionMutation = async (type: "TEXT" | "CHOOSE", formId: string) => {
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
