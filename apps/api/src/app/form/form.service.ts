import { Prisma, Session } from "@cpa/database";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { PaginateWithNameTagDto } from "~/app/app.dto";
import { CreateFormDto, UpdateFormDto } from "~/app/form/form.dto";
import { PrismaService } from "~/database/prisma.service";

@Injectable()
export class FormService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateFormDto) {
    return this.prisma.form.create({ data });
  }

  async getFull(id: string, session: Session) {
    const event = await this.prisma.event.findUnique({
      where: { id, deletedAt: null },
    });

    const answer = await this.prisma.answer.findFirst({
      where: {
        eventId: id,
        userId: session.userId,
        deletedAt: null,
      },
    });

    if (answer) {
      throw new HttpException("Evento já respondido", HttpStatus.NO_CONTENT);
    }

    if (!event) {
      throw new HttpException("Evento não encontrado", HttpStatus.NOT_FOUND);
    }

    return this.prisma.form.findUnique({
      where: {
        id: event.formId,
        deletedAt: null,
      },
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
    });
  }

  async getById(id: string) {
    const items = await this.prisma.form.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        questions: true,
      },
    });

    return {
      ...items,
      questions: items.questions.filter((e) => e.deletedAt == null),
    };
  }

  async remove(where: Prisma.FormWhereUniqueInput) {
    return this.prisma.form.update({
      where,
      data: { deletedAt: new Date() },
    });
  }

  async update(where: Prisma.FormWhereUniqueInput, data: UpdateFormDto) {
    return this.prisma.form.update({
      where,
      data,
    });
  }

  async paginate({
    perPage,
    query,
    page,
    sortField,
    sortOrder,
    tag,
  }: PaginateWithNameTagDto) {
    const where = {
      deletedAt: null,
      ...(query && {
        title: {
          contains: query,
          mode: Prisma.QueryMode.insensitive,
        },
      }),
      ...(tag && {
        TagOnForm: {
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

    const total = await this.prisma.form.count({ where });

    const data = await this.prisma.form.findMany({
      take: perPage,
      skip: page === 1 ? 0 : perPage * (page - 1),
      where,
      orderBy: sortField
        ? [{ [sortField]: sortOrder }]
        : {
            createdAt: "asc",
          },
    });

    const pages = Math.ceil(total / perPage);

    return {
      total,
      data,
      pages,
      perPage,
      page,
    };
  }
}
