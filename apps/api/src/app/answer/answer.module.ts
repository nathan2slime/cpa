import { Module } from '@nestjs/common'

import { AnswerController } from '~/app/answer/answer.controller'
import { AnswerService } from '~/app/answer/answer.service'
import { PrismaService } from '~/database/prisma.service'

@Module({
  controllers: [AnswerController],
  providers: [PrismaService, AnswerService]
})
export class AnswerModule {}
