import { api } from "@/api/index"

export const updateOptionMutation = async (optionId: string, title: string) => {
  try {
    const finalTitle = title.trim() === "" ? "Opção" : title
    const res = await api.patch(`api/question/option/update/${optionId}`, {
      title: finalTitle,
    })
    return res.data
  } catch (err) {
    console.error("Failed to update option:", err)
    return null
  }
}
