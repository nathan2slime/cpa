import axios, { AxiosError } from 'axios'

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
    console.log(error)

    return Promise.resolve(null)
  }
)
