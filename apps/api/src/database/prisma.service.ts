import { PrismaClient } from '@cpa/database'
import { Injectable, OnModuleInit } from '@nestjs/common'

import { logger } from '~/logger'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      await this.$connect()
    } catch (_e) {
      logger.error('connection in database')
    }
  }
}
