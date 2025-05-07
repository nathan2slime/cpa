import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateTagDTO } from "~/app/tags/tags.dto";
import { PrismaService } from "~/database/prisma.service";

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(tag: CreateTagDTO) {
    const tagsAlreadyExists = await this.prisma.tag.findUnique({
      where: { name: tag.name },
    });

    if (tagsAlreadyExists)
      throw new HttpException("Essa tag já existe", HttpStatus.CONFLICT);

    if (!tag.event && !tag.form)
      throw new HttpException(
        "Informe um evento ou um form para a tag",
        HttpStatus.BAD_REQUEST
      );

    return this.prisma.tag.create({
      data: {
        name: tag.name,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.tag.delete({
      where: {
        id: id,
      },
    });
  }
}
