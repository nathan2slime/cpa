import { api } from '@/api'
import { AuthSchema } from '@/schemas/auth'
import { AuthData } from '@/types/auth.types'

export const sigInService = async (payload: AuthSchema) => {
  const res = await api.post<AuthData>('/api/auth/signin', payload)

  if (res) return res.data
}

export const authService = async () => {
  const res = await api.get<AuthData>('/api/auth')

  if (res) {
    return res.data
  }
  return await refreshAuthService()
}

export const refreshAuthService = async () => {
  const res = await api.patch<AuthData>('/api/auth/refresh')

  if (res) return res.data
}
