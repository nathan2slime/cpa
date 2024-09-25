import { Injectable } from '@nestjs/common';

import { CreateEventDto, UpdateEventDto } from '~/app/event/event.dto';
import { PrismaService } from '~/database/prisma.service';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ courses, form, ...data }: CreateEventDto) {
    const event = await this.prisma.event.create({
      data: {
        ...data,
        form: { connect: { id: form } },
      },
    });

    await Promise.all(
      courses.map(async (e) =>
        this.prisma.courseEvent.create({
          data: {
            event: {
              connect: {
                id: event.id,
              },
            },
            course: {
              connect: {
                id: e,
              },
            },
          },
        }),
      ),
    );

    return event;
  }

  async getById(id: string) {
    return this.prisma.event.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  async getAll() {
    return this.prisma.event.findMany({ where: { deletedAt: null } });
  }

  async remove(id: string) {
    return this.prisma.event.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        id,
      },
    });
  }

  async update(id: string, { courses = [], ...data }: UpdateEventDto) {
    return this.prisma.event.update({
      data: {
        ...data,
        courses: {
          connect: courses.map((courseId) => ({ id: courseId })),
        },
      },
      where: {
        id,
      },
    });
  }
}
