import { Module } from '@nestjs/common'

import { CourseController } from '~/app/course/course.controller'
import { CourseService } from '~/app/course/course.service'
import { PrismaService } from '~/database/prisma.service'

@Module({
  imports: [],
  controllers: [CourseController],
  providers: [CourseService, PrismaService],
  exports: []
})
export class CourseModule {}
