import { Injectable } from '@nestjs/common'

import { CreateCourseDto, UpdateCourseDto } from '~/app/course/course.dto'
import { PrismaService } from '~/database/prisma.service'

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCourseDto) {
    return this.prisma.course.create({ data })
  }

  async getAll() {
    return this.prisma.course.findMany({
      where: {
        deletedAt: null
      }
    })
  }

  async getById(id: string) {
    return this.prisma.course.findUnique({ where: { id } })
  }

  async update(id: string, data: UpdateCourseDto) {
    return this.prisma.course.update({
      data,
      where: { id }
    })
  }

  async remove(id: string) {
    return this.prisma.course.update({
      data: { deletedAt: new Date() },
      where: { id }
    })
  }
}
