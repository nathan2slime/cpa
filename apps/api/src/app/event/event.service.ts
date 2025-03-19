import { Injectable } from '@nestjs/common'

import { PaginationDto } from '~/app/app.dto'
import { CreateEventDto, UpdateEventDto } from '~/app/event/event.dto'
import { PrismaService } from '~/database/prisma.service'

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ courses, form, ...data }: CreateEventDto) {
    const event = await this.prisma.event.create({
      data: {
        ...data,
        form: { connect: { id: form } }
      }
    })

    await Promise.all(
      courses.map(async e =>
        this.prisma.courseEvent.create({
          data: {
            event: {
              connect: {
                id: event.id
              }
            },
            course: {
              connect: {
                id: e
              }
            }
          }
        })
      )
    )

    return event
  }

  async getById(id: string) {
    const event = await this.prisma.event.findUnique({
      where: {
        id,
        deletedAt: null
      },
      include: {
        courses: {
          include: {
            course: {
              select: {
                id: true
              }
            }
          }
        }
      }
    })

    const courseIds = event?.courses.map(course => course.course.id) || []

    return {
      ...event,
      courses: courseIds
    }
  }

  async paginate({ perPage, query, page, sortField, sortOrder }: PaginationDto) {
    const where = query
      ? {
          title: {
            contains: query
          },
          deletedAt: null
        }
      : {
          deletedAt: null
        }
    const total = await this.prisma.event.count({ where })

    const data = await this.prisma.event.findMany({
      take: perPage,
      skip: page === 1 ? 0 : perPage * (page - 1),
      where,
      orderBy: sortField
        ? [{ [sortField]: sortOrder }]
        : {
            createdAt: 'asc'
          }
    })

    const pages = Math.ceil(total / perPage)

    return {
      total,
      data,
      pages,
      perPage,
      page
    }
  }

  async getAll() {
    return this.prisma.event.findMany({ where: { deletedAt: null } })
  }

  async remove(id: string) {
    await this.prisma.courseEvent.deleteMany({ where: { eventId: id } })

    return this.prisma.event.delete({
      where: {
        id
      }
    })
  }

  async update(id: string, { courses = [], form, ...data }: UpdateEventDto) {
    await this.prisma.event.update({
      data: {
        ...data,
        form: {
          connect: {
            id: form
          }
        }
      },
      where: {
        id
      }
    })

    await this.prisma.courseEvent.deleteMany({
      where: {
        event: {
          id
        }
      }
    })

    await this.prisma.courseEvent.createMany({
      data: courses.map(course => ({ courseId: course, eventId: id }))
    })

    return this.prisma.event.findUnique({ where: { id } })
  }
}
