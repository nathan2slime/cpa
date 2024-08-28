import { Module } from '@nestjs/common';

import { PrismaService } from '~/database/prisma.service';
import { ActivityService } from '~/app/activity/activity.service';
import { ActivityController } from '~/app/activity/activity.controller';

@Module({
  imports: [],
  controllers: [ActivityController],
  providers: [ActivityService, PrismaService],
})
export class ActivityModule {}
