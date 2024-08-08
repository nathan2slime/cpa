import { Injectable } from '@nestjs/common';

import { PrismaService } from '~/database/prisma.service';
import { CreateCourseDto, UpdateCourseDto } from '~/course/course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCourseDto) {
    return this.prisma.course.create({ data });
  }

  async getAll() {
    return this.prisma.course.findMany();
  }

  async getById(id: string) {
    return this.prisma.course.findUnique({ where: { id } });
  }
  
  async update(id: string, data: UpdateCourseDto) {
    return this.prisma.course.update({
      data,
      where: { id },
    });
  }

  async remove(id: string) {
    return this.prisma.course.update({
      data: { deletedAt: new Date() },
      where: { id },
    });
  }
}
