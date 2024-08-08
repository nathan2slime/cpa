import { parseEnv } from 'znv';
import { z } from 'zod';
import { config } from 'dotenv';

config();

const { NODE_ENV } = parseEnv(process.env, {
  NODE_ENV: z
    .enum(['production', 'test', 'development'] as const)
    .default('development'),
});

const envSchema = {
  DATABASE_URL: z.string().url(),
  ROOT_LOGIN: z.string().default("root"),
  ROOT_PASSWORD: z.string().default("root"),
  SECRET_KEY: z.string().min(4),
  API_PORT: z.string().min(1).default('3000'),
  ACCESS_TOKEN_EXPIRES_IN: z.string().default('3d'),
  REFRESH_TOKEN_EXPIRES_IN: z.string().default('30d'),
};

export const env =
  NODE_ENV == 'test' ? process.env : parseEnv(process.env, envSchema);
