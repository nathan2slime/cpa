import { PrismaClient } from '@cpa/database'
import { env } from '@cpa/env'

export const prisma = new PrismaClient({ datasourceUrl: env.DATABASE_URL })
