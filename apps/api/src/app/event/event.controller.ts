import { Role } from "@cpa/database";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";

import { Roles } from "~/app/auth/auth.decorator";
import { JwtAuthGuard } from "~/app/auth/auth.guard";
import { RoleGuard } from "~/app/auth/role.guard";
import { CreateEventDto, UpdateEventDto } from "~/app/event/event.dto";
import { EventService } from "~/app/event/event.service";
import { NameTagPaginationDto } from "../app.dto";

@Controller("event")
@ApiTags("Event")
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post("create")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  async create(@Res() res: Response, @Body() body: CreateEventDto) {
    const data = await this.eventService.create(body);

    return res.status(HttpStatus.CREATED).json(data);
  }

  @Get("show")
  async search(@Res() res: Response, @Query() query: NameTagPaginationDto) {
    const data = await this.eventService.paginate(query);

    return res.status(HttpStatus.OK).json(data);
  }

  @Get("show/:id")
  async getById(@Param("id") id: string, @Res() res: Response) {
    const data = await this.eventService.getById(id);

    return res.status(HttpStatus.OK).json(data);
  }

  @Delete("delete/:id")
  async delete(@Param("id") id: string, @Res() res: Response) {
    await this.eventService.remove(id);

    return res.status(HttpStatus.OK).send();
  }

  @Put("update/:id")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  async update(
    @Res() res: Response,
    @Param("id") id: string,
    @Body() body: UpdateEventDto
  ) {
    const data = await this.eventService.update(id, body);

    return res.status(HttpStatus.OK).json(data);
  }
}
