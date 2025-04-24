import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  withCredentials: true,
});

api.interceptors.request.use(async (req) => {
  const cookie = await cookies();

  req.headers.Cookie = cookie.toString();
  req.withCredentials = true;

  return req;
});

api.interceptors.response.use(
  (response) => response,
  (_error: AxiosError) => {
    return Promise.resolve({ data: null });
  }
);
