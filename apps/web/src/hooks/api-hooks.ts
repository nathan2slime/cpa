"use client";

import { api } from "@/api";
import type { CoursesReq } from "@/types/courseType";
import type {
  EventForm,
  EventFormPaginationResponse,
  EventReq
} from "@/types/event.types";
import type { FormReq, FormResponse } from "@/types/form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useEvent(id: string) {
  return useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const { data } = await api.get<EventReq>(`/api/event/show/${id}`);
      return data;
    },
  });
}

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data } =
        await api.get<EventFormPaginationResponse>("/api/event/show");
      return data;
    },
  });
}

export function useForms() {
  return useQuery({
    queryKey: ["forms"],
    queryFn: async () => {
      const { data } = await api.get<FormResponse>("/api/form/search");
      return data;
    },
  });
}

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await api.get<CoursesReq[]>("api/course/show");
      return data;
    },
  });
}

export function useForm(id: string | undefined) {
  return useQuery({
    queryKey: ["form", id],
    queryFn: async () => {
      if (!id) return null;
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
        `/api/form/search?perPage=5&sortOrder=desc${query ? `&query=${query}` : ""}`
      );
      return data.data as FormReq[];
    },
    refetchOnWindowFocus: false,
  });
}

export function useUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: EventForm }) => {
      const response = await api.put(`api/event/update/${id}`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["event", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EventForm) => {
      const response = await api.post("api/event/create", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
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

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/api/event/delete/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}
