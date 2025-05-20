"use client";

import { api } from "@/api";
import { AnswerType } from "@/types/answer.types";
import type { CoursesReq } from "@/types/courseType";
import type {
  EventForm,
  EventFormPaginationResponse,
  EventReq,
} from "@/types/event.types";
import type { FormReq, FormResponse } from "@/types/form";
import { TagType } from "@/types/tag.type";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

//eventos

export function useEvent(id: string) {
  return useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const { data } = await api.get<EventReq>(`/api/event/show/${id}`);
      return data;
    },
  });
}

export function useEvents(page: number) {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");
  const name = searchParams.get("name");

  return useQuery({
    queryKey: ["events", page, name, tag],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("page", String(page));
      if (tag) params.set("tag", tag);
      if (name) params.set("query", name);

      const { data } = await api.get<EventFormPaginationResponse>(
        `/api/event/show?${params.toString()}`
      );
      return data;
    },
  });
}

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

//Formulários

export function useForms(page: number) {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");
  const name = searchParams.get("name");

  return useQuery({
    queryKey: ["forms", page, name],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("page", String(page));
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

//outros

export function useCreateAnswer() {
  return useMutation({
    mutationFn: async (data: AnswerType) => {
      const response = await api.post("/api/answer/create", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Suas respostas foram enviadas com sucesso!");
      window.location.reload();
    },
  });
}

export const useAnswered = (eventId?: string) => {
  return useQuery({
    queryKey: ["answered", eventId],
    queryFn: async () => {
      if (!eventId) return null;
      const response = await api.get(`/api/answer/answered/${eventId}`);
      return response.status;
    },
    retry: false,
  });
};

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

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await api.get<CoursesReq[]>("api/course/show");
      return data;
    },
  });
}
