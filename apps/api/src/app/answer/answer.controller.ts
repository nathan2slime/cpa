import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import { Role } from "@cpa/database";
import { CreateAnswerDto } from "~/app/answer/answer.dto";
import { AnswerService } from "~/app/answer/answer.service";
import { Roles } from "~/app/auth/auth.decorator";
import { RoleGuard } from "~/app/auth/role.guard";
import { JwtAuthGuard } from "~/app/auth/auth.guard";

@ApiTags("Answer")
@Controller("answer")
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post("create")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.USER])
  async create(
    @Body() body: CreateAnswerDto,
    @Res() res: Response,
    @Req() req: Request
  ) {
    const data = await this.answerService.create(body, req.user);
    return res.status(HttpStatus.CREATED).json(data);
  }

  @Get("/answered/:id")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.USER, Role.ADMIN])
  async getAnswered(
    @Res() res: Response,
    @Req() req: Request,
    @Param("id") id: string
  ) {
    await this.answerService.getAnswered(id, req.user.userId);
    return res.status(HttpStatus.OK).send();
  }

  @Get("event/show/:id")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  async getByEvent(@Param("id") id: string) {
    return this.answerService.getByEvent(id);
  }
}
