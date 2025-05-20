import { Injectable } from "@nestjs/common";
import { CreateTagDTO } from "~/app/tags/tags.dto";
import { PrismaService } from "~/database/prisma.service";

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}

  async showFormTags() {
    const tags = await this.prisma.tagOnForm.findMany({
      include: {
        tag: true,
      },
    });

    const allTags = tags.map((tagForm) => tagForm.tag);

    return Array.from(new Map(allTags.map((tag) => [tag.id, tag])).values());
  }

  async showEventTags() {
    const tags = await this.prisma.tagOnEvent.findMany({
      include: {
        tag: true,
      },
    });

    const allTags = tags.map((tagEvent) => tagEvent.tag);

    return Array.from(new Map(allTags.map((tag) => [tag.id, tag])).values());
  }

  async showByEvent(id: string) {
    const tagsOnEvent = await this.prisma.tagOnEvent.findMany({
      where: {
        eventId: id,
      },
      include: {
        tag: true,
      },
    });

    return tagsOnEvent.map((tagEvent) => tagEvent.tag);
  }

  async showByForm(id: string) {
    const tagsOnForm = await this.prisma.tagOnForm.findMany({
      where: {
        formId: id,
      },
      include: {
        tag: true,
      },
    });

    return tagsOnForm.map((tagForm) => tagForm.tag);
  }

  async create(tag: CreateTagDTO) {
    if (tag.event) {
      const existingTag = await this.prisma.tag.upsert({
        where: {
          name: tag.name,
        },
        update: {},
        create: {
          name: tag.name,
        },
      });

      return this.prisma.tagOnEvent.create({
        data: {
          tagId: existingTag.id,
          eventId: tag.event,
        },
      });
    }

    if (tag.form) {
      const existingTag = await this.prisma.tag.upsert({
        where: {
          name: tag.name,
        },
        update: {},
        create: {
          name: tag.name,
        },
      });

      return this.prisma.tagOnForm.create({
        data: {
          tagId: existingTag.id,
          formId: tag.form,
        },
      });
    }
  }

  async remove(id: string) {
    return this.prisma.tag.delete({
      where: {
        id: id,
      },
    });
  }
}
