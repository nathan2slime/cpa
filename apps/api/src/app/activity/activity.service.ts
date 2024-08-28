import { Injectable } from '@nestjs/common';

import { CreateActivityDto } from '~/app/activity/activity.dto';
import { PrismaService } from '~/database/prisma.service';

@Injectable()
export class ActivityService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ courses, form, ...data }: CreateActivityDto) {
    return this.prisma.activity.create({
      data: {
        ...data,
        form: { connect: { id: form } },
        courses: {
          connect: courses.map((courseId) => ({ id: courseId })),
        },
      },
    });
  }
}
