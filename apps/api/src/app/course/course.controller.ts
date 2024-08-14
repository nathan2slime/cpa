import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Response } from 'express';

import { Roles } from '~/app/auth/auth.decorator';
import { JwtAuthGuard } from '~/app/auth/auth.guard';
import { RoleGuard } from '~/app/auth/role.guard';

import { CourseService } from '~/app/course/course.service';
import { CreateCourseDto, UpdateCourseDto } from '~/app/course/course.dto';

@ApiTags('Curso')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('create')
  @ApiResponse({
    status: 201,
    description: 'Cria um novo curso',
  })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  async create(@Body() body: CreateCourseDto, @Res() res: Response) {
    const data = await this.courseService.create(body);

    return res.status(HttpStatus.CREATED).json(data);
  }

  @Get('show')
  @ApiResponse({
    status: 200,
    description: 'Retorna todos os cursos',
  })
  async getAll(@Res() res: Response) {
    const data = await this.courseService.getAll();

    return res.status(HttpStatus.OK).json(data);
  }

  @Get('show/:id')
  @ApiResponse({
    status: 200,
    description: 'Retorna um curso',
  })
  async getById(@Param('id') id: string, @Res() res: Response) {
    const data = await this.courseService.getById(id);

    return res.status(HttpStatus.OK).json(data);
  }

  @Delete('remove/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  @ApiResponse({
    status: 200,
    description: 'Remove um curso',
  })
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.courseService.remove(id);

    return res.status(HttpStatus.OK).send();
  }

  @Patch('update/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  @ApiResponse({
    status: 200,
    description: 'Atualiza um curso',
  })
  async update(
    @Param('id') id: string,
    @Body() body: UpdateCourseDto,
    @Res() res: Response,
  ) {
    const data = await this.courseService.update(id, body);

    return res.status(HttpStatus.OK).json(data);
  }
}
