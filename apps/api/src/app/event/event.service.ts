import { Prisma } from "@cpa/database";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import {
  CreateEventDto,
  PaginateWithCourseDto,
  UpdateEventDto,
} from "~/app/event/event.dto";
import { PrismaService } from "~/database/prisma.service";

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ courses, form, ...data }: CreateEventDto) {
    let courseIds = courses;

    if (courses === "ALL") {
      const allCourses = await this.prisma.course.findMany({
        select: { id: true },
      });
      courseIds = allCourses.map((course) => course.id);
    }

    const event = await this.prisma.event.create({
      data: {
        ...data,
        form: { connect: { id: form } },
      },
    });

    if (Array.isArray(courseIds)) {
      await Promise.all(
        courseIds.map(async (e) =>
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
    }

    return event;
  }

  async getById(id: string) {
    const event = await this.prisma.event.findUnique({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        form: {
          include: {
            questions: {
              where: {
                deletedAt: null,
              },
              include: {
                options: {
                  where: {
                    deletedAt: null,
                  },
                },
              },
            },
          },
        },
        courses: {
          include: {
            course: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    const courseIds = event?.courses.map((course) => course.course.id) || [];

    return {
      ...event,
      courses: courseIds,
    };
  }

  async paginate({
    perPage,
    query,
    page,
    sortField,
    sortOrder,
    tag,
    course,
    status,
  }: PaginateWithCourseDto) {
    const now = new Date();
    let whereClause = {};

    if (status === "agendado") {
      whereClause = {
        startDate: { gt: now },
      };
    } else if (status === "andamento") {
      whereClause = {
        startDate: { lt: now },
        endDate: { gt: now },
      };
    } else if (status === "encerrado") {
      whereClause = {
        endDate: { lt: now },
      };
    }

    const where: Prisma.EventWhereInput = {
      deletedAt: null,
      ...(query && {
        title: {
          contains: query,
          mode: Prisma.QueryMode.insensitive,
        },
      }),
      ...whereClause,
      ...(course && {
        courses: {
          some: {
            course: {
              id: {
                equals: course,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          },
        },
      }),
      ...(tag && {
        TagOnEvent: {
          some: {
            tag: {
              name: {
                equals: tag,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          },
        },
      }),
    };

    const total = await this.prisma.event.count({
      where,
    });

    const data = await this.prisma.event.findMany({
      take: perPage,
      skip: page === 1 ? 0 : perPage * (page - 1),
      where,
      orderBy: sortField
        ? [{ [sortField]: sortOrder }]
        : {
            updatedAt: "asc",
          },
    });

    const pages = Math.ceil(total / perPage);

    return {
      total,
      data: data.map((event) => ({
        ...event,
        status:
          event.startDate < now && event.endDate > now
            ? "em andamento"
            : event.startDate > now
            ? "agendado"
            : "encerrado",
      })),
      pages,
      perPage,
      page,
    };
  }

  async getAll() {
    return this.prisma.event.findMany({ where: { deletedAt: null } });
  }

  async toggleActive(id: string) {
    const event = await this.prisma.event.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!event)
      throw new HttpException("Event not found", HttpStatus.NOT_FOUND);

    return this.prisma.event.update({
      data: {
        active: !event.active,
      },
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    await this.prisma.courseEvent.updateMany({ where: { eventId: id },
      data: {
        deletedAt: new Date(),
      },
    });

    return this.prisma.event.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async update(id: string, { courses, form, ...data }: UpdateEventDto) {
    let courseIdsToUpdate = courses;

    if (courses === "ALL") {
      const allCourses = await this.prisma.course.findMany({
        select: { id: true },
      });
      courseIdsToUpdate = allCourses.map((course) => course.id);
    }

    await this.prisma.event.update({
      data: {
        ...data,
        form: {
          connect: {
            id: form,
          },
        },
      },
      where: {
        id,
      },
    });

    if (courseIdsToUpdate) {
      await this.prisma.courseEvent.deleteMany({
        where: {
          eventId: id,
        },
      });

      if (Array.isArray(courseIdsToUpdate)) {
        await this.prisma.courseEvent.createMany({
          data: courseIdsToUpdate.map((courseId) => ({
            courseId,
            eventId: id,
          })),
        });
      }
    }

    return this.prisma.event.findUnique({ where: { id } });
  }
}
