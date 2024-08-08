import { Module } from '@nestjs/common';

import { PrismaService } from '~/database/prisma.service';
import { CourseController } from '~/course/course.controller';
import { CourseService } from '~/course/course.service';

@Module({
  imports: [],
  controllers: [CourseController],
  providers: [CourseService, PrismaService],
  exports: [],
})
export class CourseModule {}
