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

import { CreateFormDto, UpdateFormDto } from '~/app/form/form.dto';
import { FormService } from '~/app/form/form.service';
import { Roles } from '~/app/auth/auth.decorator';
import { RoleGuard } from '~/app/auth/role.guard';
import { PaginationDto } from '~/app/app.dto';
import { JwtAuthGuard } from '~/app/auth/auth.guard';

@Controller('form')
@ApiTags('Form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  async create(@Res() res: Response, @Body() body: CreateFormDto) {
    const data = await this.formService.create(body);

    return res.status(HttpStatus.CREATED).json(data);
  }

  @Delete('remove/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  async remove(@Res() res: Response, @Param('id') id: string) {
    await this.formService.remove({ id });

    return res.status(HttpStatus.OK).send();
  }

  @Patch('update/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: UpdateFormDto,
  ) {
    const data = await this.formService.update({ id }, body);

    return res.status(HttpStatus.OK).json(data);
  }

  @Get('search')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  async show(@Res() res: Response, @Query() query: PaginationDto) {
    const data = await this.formService.paginate(query);

    return res.status(HttpStatus.OK).json(data);
  }
}
