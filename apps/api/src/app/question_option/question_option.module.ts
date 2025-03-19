import { Module } from '@nestjs/common'

import { QuestionOptionController } from '~/app/question_option/question_option.controller'
import { QuestionOptionService } from '~/app/question_option/question_option.service'
import { PrismaService } from '~/database/prisma.service'

@Module({
  imports: [],
  controllers: [QuestionOptionController],
  providers: [QuestionOptionService, PrismaService]
})
export class QuestionOptionModule {}
