import { Module } from '@nestjs/common';

import { AnswerController } from '~/app/answer/answer.controller';
import { PrismaService } from '~/database/prisma.service';
import { AnswerService } from '~/app/answer/answer.service';

@Module({
  controllers: [AnswerController],
  providers: [PrismaService, AnswerService],
})
export class AnswerModule {}
