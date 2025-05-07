import { api } from "@/api";
import { OptionsTypes } from "@/types/options.types";

export const getOptionsQuery = async (questionId: string) => {
  try {
    const { data } = await api.get(
      `/api/question/option/show?question=${questionId}`
    );
    return data as OptionsTypes[];
  } catch (err) {
    console.error("Failed to fetch options:", err);
    return [];
  }
};
