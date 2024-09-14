import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Role } from '@prisma/client';

import { Roles } from '~/app/auth/auth.decorator';
import { RoleGuard } from '~/app/auth/role.guard';
import { JwtAuthGuard } from '~/app/auth/auth.guard';
import { EventService } from '~/app/event/event.service';
import {
  CreateEventDto,
  UpdateEventDto,
} from '~/app/event/event.dto';

@Controller('event')
@ApiTags('Event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  async create(@Res() res: Response, @Body() body: CreateEventDto) {
    const data = await this.eventService.create(body);

    return res.status(HttpStatus.CREATED).json(data);
  }

  @Get('show')
  async getAll(@Res() res: Response) {
    const data = await this.eventService.getAll();

    return res.status(HttpStatus.OK).json(data);
  }

  @Get('show/:id')
  async getById(@Param('id') id: string, @Res() res: Response) {
    const data = await this.eventService.getById(id);

    return res.status(HttpStatus.OK).json(data);
  }

  @Put('update/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: UpdateEventDto,
  ) {
    const data = await this.eventService.update(id, body);

    return data;
  }
}
