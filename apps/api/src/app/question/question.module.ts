import { Module } from '@nestjs/common';

import { PrismaService } from '~/database/prisma.service';
import { QuestionController } from '~/app/question/question.controller';
import { QuestionService } from '~/app/question/question.service';

@Module({
  imports: [],
  controllers: [QuestionController],
  providers: [QuestionService, PrismaService],
})
export class QuestionModule {}
