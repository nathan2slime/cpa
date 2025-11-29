"use client";

import { api } from "@/api";
import type {
  EventForm,
  EventFormPaginationResponse,
  EventReq,
} from "@/types/event.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

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
  const course = searchParams.get("c");
  const status = searchParams.get("s");

  return useQuery({
    queryKey: ["events", page, name, tag, course, status],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("perPage", "5");
      if (tag) params.set("tag", tag);
      if (name) params.set("query", name);
      if (course) params.set("course", course);
      if (status) params.set("status", status);

      const { data } = await api.get<EventFormPaginationResponse>(
        `/api/event/show?${params.toString()}`
      );
      return data;
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

export function useToggleActiveEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.put(`api/event/toggle-active/${id}`);
      return response.data;
    },
    onSuccess: (_, variables) => {
      toast.success("Evento alterado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["event", variables] });
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
