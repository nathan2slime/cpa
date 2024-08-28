import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthModule } from '~/app/auth/auth.module';
import { HealthModule } from '~/app/health/health.module';
import { CourseModule } from '~/app/course/course.module';
import { FormModule } from '~/app/form/form.module';
import { QuestionModule } from '~/app/question/question.module';
import { QuestionOptionModule } from '~/app/question_option/question_option.module';
import { ActivityModule } from '~/app/activity/activity.module';

@Module({
  imports: [
    PassportModule,
    AuthModule,
    FormModule,
    QuestionModule,
    QuestionOptionModule,
    CourseModule,
    HealthModule,
    ActivityModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
