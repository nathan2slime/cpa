import { api } from "@/api/index"

export const deleteOptionMutation = async (optionId: string) => {
  try {
    const res = await api.delete(`api/question/option/remove/${optionId}`)
    return res.data
  } catch (err) {
    console.error("Failed to delete option:", err)
    return null
  }
}
