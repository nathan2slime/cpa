"use client";

import { api } from "@/api";
import type { TagType } from "@/types/tag.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFormTags = (id: string) => {
  return useQuery({
    queryKey: ["tags", id],
    queryFn: async () => {
      const { data } = await api.get<TagType[]>(`/api/tags/show/form/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useEventTags = (id: string) => {
  return useQuery({
    queryKey: ["tags", id],
    queryFn: async () => {
      const { data } = await api.get<TagType[]>(`/api/tags/show/event/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export function useAllTagsForm() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const { data } = await api.get<TagType[]>("api/tags/show/form");
      return data;
    },
  });
}

export function useAllTagsEvent() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const { data } = await api.get<TagType[]>("api/tags/show/event");
      return data;
    },
  });
}

export const useCreateTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-tag"],
    mutationFn: async (data: TagType) => {
      const response = await api.post("/api/tags/create", data);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tags"] }),
  });
};

export const useDeleteTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-tag"],
    mutationFn: async (id: string) => {
      await api.delete(`/api/tags/remove/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tags"] }),
  });
};
