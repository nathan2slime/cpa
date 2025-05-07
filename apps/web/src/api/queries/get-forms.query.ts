import { api } from "@/api/server";
import { FormResponse } from "@/types/form";

export const getFormsQuery = async () => {
  try {
    const { data } = await api.get<FormResponse>("/form/search");
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
