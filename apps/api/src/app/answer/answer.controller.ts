import { Body, Controller, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'

import { CreateAnswerDto } from '~/app/answer/answer.dto'
import { AnswerService } from '~/app/answer/answer.service'
import { JwtAuthGuard } from '~/app/auth/auth.guard'

@UseGuards(JwtAuthGuard)
@ApiTags('Answer')
@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post('create')
  async create(@Body() body: CreateAnswerDto, @Res() res: Response, @Req() req: Request) {
    const data = await this.answerService.create(body, req.user)
    return res.status(HttpStatus.CREATED).json(data)
  }
}
