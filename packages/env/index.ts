import { createEnv } from '@t3-oss/env-core'

import { z } from 'zod'

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    SESSION_KEY: z.string().min(1),
    ACCESS_TOKEN_EXPIRES_IN: z.string().default('7d'),
    REFRESH_TOKEN_EXPIRES_IN: z.string().default('30d'),
    CLIENT_URL: z.string().url(),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development')
  },
  clientPrefix: 'NEXT_PUBLIC_',
  client: {
    NEXT_PUBLIC_API_URL: z.string().url()
  },
  runtimeEnv: {
    CLIENT_URL: process.env.CLIENT_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_URL: process.env.REDIS_URL,
    SESSION_KEY: process.env.SESSION_KEY,
    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD
  },
  skipValidation: process.env.NODE_ENV === 'test',
  emptyStringAsUndefined: true
})
