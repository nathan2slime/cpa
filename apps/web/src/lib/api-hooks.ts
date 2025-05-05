"use client"

import { api } from "@/api"
import type { CoursesReq } from "@/types/courseType"
import type { EventForm, EventReq } from "@/types/event.types"
import type { FormReq } from "@/types/form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export function useEvent(id: string) {
  return useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const { data } = await api.get<EventReq>(`/api/event/show/${id}`)
      return data
    },
  })
}

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await api.get<CoursesReq[]>("api/course/show")
      return data
    },
  })
}

export function useForm(id: string | undefined) {
  return useQuery({
    queryKey: ["form", id],
    queryFn: async () => {
      if (!id) return null
      const { data } = await api.get<FormReq>(`api/form/show/${id}`)
      return data
    },
    enabled: !!id,
  })
}

export function useSearchForms(query: string) {
  return useQuery({
    queryKey: ["forms", "search", query],
    queryFn: async () => {
      const { data } = await api.get(`/api/form/search?perPage=5&sortOrder=desc${query ? `&query=${query}` : ""}`)
      return data.data as FormReq[]
    },
    refetchOnWindowFocus: false,
  })
}

export function useUpdateEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: EventForm }) => {
      const response = await api.put(`api/event/update/${id}`, data)
      return response.data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["event", variables.id] })
      queryClient.invalidateQueries({ queryKey: ["events"] })
    },
  })
}

export function useCreateEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: EventForm) => {
      const response = await api.post("api/event/create", data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] })
    },
  })
}
