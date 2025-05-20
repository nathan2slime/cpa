"use client"

import { api } from "@/api"
import type { CoursesReq } from "@/types/courseType"
import { useQuery } from "@tanstack/react-query"

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await api.get<CoursesReq[]>("api/course/show")
      return data
    },
  })
}
