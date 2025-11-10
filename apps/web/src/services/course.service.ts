import { api } from '@/api'
import { CourseType } from '@/types/courseType'

export type CreateCoursePayload = {
  name: string
  type: CourseType
}

export type UpdateCoursePayload = {
  name?: string
  type?: CourseType
}

export type Course = {
  id: string
  name: string
  type: CourseType
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export const createCourseService = async (payload: CreateCoursePayload) => {
  const res = await api.post<Course>('/api/course', payload)
  return res.data
}

export const getAllCoursesService = async () => {
  const res = await api.get<Course[]>('/api/course/show')
  return res.data
}

export const getCourseByIdService = async (id: string) => {
  const res = await api.get<Course>(`/api/course/show/${id}`)
  return res.data
}

export const updateCourseService = async (id: string, payload: UpdateCoursePayload) => {
  const res = await api.patch<Course>(`/api/course/update/${id}`, payload)
  return res.data
}

export const removeCourseService = async (id: string) => {
  await api.delete(`/api/course/remove/${id}`)
}
