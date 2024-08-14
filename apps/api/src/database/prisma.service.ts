import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { logger } from '~/logger';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      await this.$connect();

      this.$extends({
        query: {
          $allModels: {
            $allOperations(payload) {
              const { query } = payload;

              const args = payload.args as Record<string, object>;

              args.where = {
                ...args.where,
                deletedAt: null,
              };

              return query(args);
            },
          },
        },
      });
    } catch (e) {
      logger.error('connection in database');
    }
  }
}
