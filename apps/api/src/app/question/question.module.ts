import { Module } from '@nestjs/common'

import { QuestionController } from '~/app/question/question.controller'
import { QuestionService } from '~/app/question/question.service'
import { PrismaService } from '~/database/prisma.service'

@Module({
  imports: [],
  controllers: [QuestionController],
  providers: [QuestionService, PrismaService]
})
export class QuestionModule {}
