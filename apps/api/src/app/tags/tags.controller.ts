import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateTagDTO } from "~/app/tags/tags.dto";
import { TagsService } from "~/app/tags/tags.service";

@Controller("tags")
@ApiTags("Tags")
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post("create")
  async create(@Body() tag: CreateTagDTO) {
    return await this.tagsService.create(tag);
  }

  @Delete("remove/:id")
  async remove(@Param("id") id: string) {
    return await this.tagsService.remove(id);
  }

  @Get("show/event/:id")
  async showByEvent(@Param("id") id: string) {
    return await this.tagsService.showByEvent(id);
  }

  @Get("show/form/:id")
  async showByForm(@Param("id") id: string) {
    return await this.tagsService.showByForm(id);
  }
}
