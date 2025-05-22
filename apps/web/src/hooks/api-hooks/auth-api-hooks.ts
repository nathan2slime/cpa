import { api } from "@/api";
import { useMutation } from "@tanstack/react-query";

export const useSignOut = () => {
  return useMutation({
    mutationFn: async () => {
      return await api.patch("/api/auth/signout");
    },
    onSuccess: () => {
      window.location.reload();
    },
  });
};
