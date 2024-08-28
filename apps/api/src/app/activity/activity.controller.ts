import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Role } from '@prisma/client';

import { Roles } from '~/app/auth/auth.decorator';
import { RoleGuard } from '~/app/auth/role.guard';
import { JwtAuthGuard } from '~/app/auth/auth.guard';
import { ActivityService } from '~/app/activity/activity.service';
import { CreateActivityDto } from '~/app/activity/activity.dto';

@Controller('activity')
@ApiTags('Activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  async create(@Res() res: Response, @Body() body: CreateActivityDto) {
    const data = await this.activityService.create(body);

    return res.status(HttpStatus.CREATED).json(data);
  }
}
