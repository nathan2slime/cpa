import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthModule } from '~/auth/auth.module';
import { HealthModule } from '~/health/health.module';
import { CourseModule } from '~/course/course.module';

@Module({
  imports: [PassportModule, AuthModule, CourseModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
