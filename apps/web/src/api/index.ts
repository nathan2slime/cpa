import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'

export const api = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

const isServer = typeof window === 'undefined'

api.interceptors.response.use(
  response => {
    if (isServer) {
    }

    return response
  },
  (error: AxiosError) => {
    const exclude = ['/api/auth', '/api/auth/refresh']
    if (error.response) {
      const data = error.response.data as Record<string, string>

      if (data) {
        if (!exclude.includes(data.path) && !isServer) {
          toast.error(data.message)
        }
      }
    }

    return Promise.resolve(null)
  }
)
