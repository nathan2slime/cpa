import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'

import { HealthController } from '~/app/health/health.controller'
import { PrismaService } from '~/database/prisma.service'

@Module({
  imports: [TerminusModule],
  providers: [PrismaService],
  controllers: [HealthController]
})
export class HealthModule {}
