import { env } from '@cpa/env'

export const AUTH_COOKIE = 'auth'
export const ACCESS_TOKEN_EXPIRES_IN = env.ACCESS_TOKEN_EXPIRES_IN || '6d'
export const REFRESH_TOKEN_EXPIRES_IN = env.REFRESH_TOKEN_EXPIRES_IN || '30d'
