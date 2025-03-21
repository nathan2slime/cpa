import { Role } from '@cpa/database'
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Response } from 'express'

import { Roles } from '~/app/auth/auth.decorator'
import { JwtAuthGuard } from '~/app/auth/auth.guard'
import { RoleGuard } from '~/app/auth/role.guard'
import { CreateQuestionDto, QueryQuestionDto, UpdateQuestionDto } from '~/app/question/question.dto'
import { QuestionService } from '~/app/question/question.service'

@Controller('question')
@ApiTags('Question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  async create(@Res() res: Response, @Body() body: CreateQuestionDto) {
    const data = await this.questionService.create(body)

    return res.status(HttpStatus.CREATED).json(data)
  }

  @Delete('remove/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  async remove(@Res() res: Response, @Param('id') id: string) {
    await this.questionService.remove({ id })

    return res.status(HttpStatus.OK).send()
  }

  @Patch('update/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  async update(@Res() res: Response, @Param('id') id: string, @Body() body: UpdateQuestionDto) {
    const data = await this.questionService.update({ id }, body)

    return res.status(HttpStatus.OK).json(data)
  }

  @Get('show')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN, Role.USER])
  async show(@Res() res: Response, @Query() query: QueryQuestionDto) {
    const data = await this.questionService.show(query)

    return res.status(HttpStatus.OK).json(data)
  }
}
