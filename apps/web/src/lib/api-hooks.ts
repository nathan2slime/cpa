"use client"

import { api } from "@/api"
import type { CoursesReq } from "@/types/courseType"
import type { EventForm, EventReq } from "@/types/event.types"
import type { FormReq } from "@/types/form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

// Event queries
export function useEvent(id: string) {
  return useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const { data } = await api.get<EventReq>(`/api/event/show/${id}`)
      return data
    },
  })
}

// Courses queries
export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await api.get<CoursesReq[]>("api/course/show")
      return data
    },
  })
}

// Form queries
export function useForm(id: string | undefined) {
  return useQuery({
    queryKey: ["form", id],
    queryFn: async () => {
      if (!id) return null
      const { data } = await api.get<FormReq>(`api/form/show/${id}`)
      return data
    },
    enabled: !!id, // Only run the query if we have an ID
  })
}

export function useSearchForms(query: string) {
  return useQuery({
    queryKey: ["forms", "search", query],
    queryFn: async () => {
      const { data } = await api.get(`/api/form/search?perPage=5&sortOrder=desc${query ? `&query=${query}` : ""}`)
      return data.data as FormReq[]
    },
    // Don't refetch on window focus for search results
    refetchOnWindowFocus: false,
  })
}

// Event mutations
export function useUpdateEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: EventForm }) => {
      const response = await api.put(`api/event/update/${id}`, data)
      return response.data
    },
    onSuccess: (_, variables) => {
      // Invalidate relevant queries after successful update
      queryClient.invalidateQueries({ queryKey: ["event", variables.id] })
      queryClient.invalidateQueries({ queryKey: ["events"] }) // If you have a list of events
    },
  })
}
