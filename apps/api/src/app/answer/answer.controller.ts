import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

import { CreateAnswerDto } from '~/app/answer/answer.dto';
import { JwtAuthGuard } from '~/app/auth/auth.guard';
import { AnswerService } from '~/app/answer/answer.service';

@UseGuards(JwtAuthGuard)
@ApiTags('Answer')
@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post('create')
  async create(
    @Body() body: CreateAnswerDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const data = await this.answerService.create(body, req.user);
    return res.status(HttpStatus.CREATED).json(data);
  }
}
