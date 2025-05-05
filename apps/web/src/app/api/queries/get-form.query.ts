import { api } from "@/api";
import { FormType } from "@/types/form";

export const getFormQuery = async (formId: string) => {
  try {
    const { data } = await api.get<FormType>(`/api/form/show/${formId}`);
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
