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

import {
  CreateQuestionOptionDto,
  QueryQuestionOptionDto,
  UpdateQuestionOptionDto,
} from '~/app/question_option/question_option.dto';
import { Roles } from '~/app/auth/auth.decorator';
import { RoleGuard } from '~/app/auth/role.guard';
import { JwtAuthGuard } from '~/app/auth/auth.guard';
import { QuestionOptionService } from '~/app/question_option/question_option.service';

@Controller('question/option')
@ApiTags('QuestionOption')
export class QuestionOptionController {
  constructor(private readonly questionOptionService: QuestionOptionService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  async create(@Res() res: Response, @Body() body: CreateQuestionOptionDto) {
    const data = await this.questionOptionService.create(body);

    return res.status(HttpStatus.CREATED).json(data);
  }

  @Delete('remove/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  async remove(@Res() res: Response, @Param('id') id: string) {
    await this.questionOptionService.remove({ id });

    return res.status(HttpStatus.OK).send();
  }

  @Patch('update/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: UpdateQuestionOptionDto,
  ) {
    const data = await this.questionOptionService.update({ id }, body);

    return res.status(HttpStatus.OK).json(data);
  }

  @Get('show')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  async show(@Res() res: Response, @Query() query: QueryQuestionOptionDto) {
    const data = await this.questionOptionService.show(query);

    return res.status(HttpStatus.OK).json(data);
  }
}
