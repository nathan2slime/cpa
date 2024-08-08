import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { PrismaService } from '~/database/prisma.service';
import { HealthController } from '~/health/health.controller';

@Module({
  imports: [TerminusModule],
  providers: [PrismaService],
  controllers: [HealthController],
})
export class HealthModule {}
