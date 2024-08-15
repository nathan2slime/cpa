import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { logger } from '~/logger';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      this.$use(async (params, next) => {
        if (!params.args) params.args = {};

        if (params.args.where) params.args.where.deletedAt = null;

        return next(params);
      });

      await this.$connect();
    } catch (e) {
      logger.error('connection in database');
    }
  }
}
