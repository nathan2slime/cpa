import { Module } from "@nestjs/common";
import { TagsController } from "~/app/tags/tags.controller";
import { TagsService } from "~/app/tags/tags.service";
import { PrismaService } from "~/database/prisma.service";

@Module({
  imports: [],
  controllers: [TagsController],
  providers: [PrismaService, TagsService],
})
export class TagsModule {}
