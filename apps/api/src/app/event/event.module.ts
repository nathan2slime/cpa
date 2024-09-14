import { Module } from '@nestjs/common';

import { PrismaService } from '~/database/prisma.service';
import { EventService } from '~/app/event/event.service';
import { EventController } from '~/app/event/event.controller';

@Module({
  imports: [],
  controllers: [EventController],
  providers: [EventService, PrismaService],
})
export class EventModule {}
