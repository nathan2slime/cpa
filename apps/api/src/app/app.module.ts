import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthModule } from '~/app/auth/auth.module';
import { HealthModule } from '~/app/health/health.module';
import { CourseModule } from '~/app/course/course.module';
import { FormModule } from '~/app/form/form.module';
import { QuestionModule } from '~/app/question/question.module';
import { QuestionOptionModule } from '~/app/question_option/question_option.module';
import { EventModule } from '~/app/event/event.module';
import { AnswerModule } from '~/app/answer/answer.module';

@Module({
  imports: [
    PassportModule,
    AuthModule,
    FormModule,
    QuestionModule,
    QuestionOptionModule,
    CourseModule,
    AnswerModule,
    HealthModule,
    EventModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
