"use client";

import { api } from "@/api";
import type { FormReq, FormResponse } from "@/types/form";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export function useForms(page: number) {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");
  const name = searchParams.get("name");

  return useQuery({
    queryKey: ["forms", page, name, tag],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("perPage", "5");
      if (tag) params.set("tag", tag);
      if (name) params.set("query", name);

      const { data } = await api.get<FormResponse>(
        `/api/form/show?${params.toString()}`
      );
      return data;
    },
    behavior: keepPreviousData(undefined),
  });
}

export function useForm(id: string) {
  return useQuery({
    queryKey: ["form", id],
    queryFn: async () => {
      const { data } = await api.get<FormReq>(`api/form/show/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

export function useSearchForms(query: string) {
  return useQuery({
    queryKey: ["forms", "search", query],
    queryFn: async () => {
      const { data } = await api.get(
        `/api/form/show?perPage=5&sortOrder=desc${query ? `&query=${query}` : ""}`
      );
      return data.data as FormReq[];
    },
    refetchOnWindowFocus: false,
  });
}

export function useCreateForm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await api.post("/api/form/create", { title: "Rascunho" });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forms"] });
    },
  });
}

export function useUpdateForm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormReq) => {
      const { id, title } = data;
      const response = await api.patch(`api/form/update/${id}`, { title });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["form", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["forms"] });
    },
  });
}

export function useDeleteForm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/api/form/remove/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forms"] });
    },
  });
}

export function useDuplicateForm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.post(`/api/form/duplicate/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forms"] });
    },
  });
}
