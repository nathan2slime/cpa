import { Module } from '@nestjs/common'

import { EventController } from '~/app/event/event.controller'
import { EventService } from '~/app/event/event.service'
import { PrismaService } from '~/database/prisma.service'

@Module({
  imports: [],
  controllers: [EventController],
  providers: [EventService, PrismaService]
})
export class EventModule {}
