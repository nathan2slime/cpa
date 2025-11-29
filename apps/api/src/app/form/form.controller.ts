import { Role } from "@cpa/database";
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
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";

import { PaginateWithNameTagDto } from "~/app/app.dto";
import { Roles } from "~/app/auth/auth.decorator";
import { JwtAuthGuard } from "~/app/auth/auth.guard";
import { RoleGuard } from "~/app/auth/role.guard";
import { CreateFormDto, UpdateFormDto } from "~/app/form/form.dto";
import { FormService } from "~/app/form/form.service";
import { AuthenticatedRequest } from "~/types/custom-request";

@Controller("form")
@ApiTags("Form")
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post("create")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  async create(@Res() res: Response, @Body() body: CreateFormDto) {
    const data = await this.formService.create(body);

    return res.status(HttpStatus.CREATED).json(data);
  }

  @Post("duplicate/:id")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  async duplicate(@Res() res: Response, @Param("id") id: string) {
    const data = await this.formService.duplicate(id);

    return res.status(HttpStatus.CREATED).json(data);
  }

  @Delete("remove/:id")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  async remove(@Res() res: Response, @Param("id") id: string) {
    await this.formService.remove({ id });

    return res.status(HttpStatus.OK).send();
  }

  @Patch("update/:id")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  async update(
    @Res() res: Response,
    @Param("id") id: string,
    @Body() body: UpdateFormDto
  ) {
    const data = await this.formService.update({ id }, body);

    return res.status(HttpStatus.OK).json(data);
  }

  @Get("show/:id")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN, Role.USER])
  async show(@Res() res: Response, @Param("id") id: string) {
    const data = await this.formService.getById(id);

    return res.status(HttpStatus.OK).json(data);
  }

  @Get("full/event/:id")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN, Role.USER])
  async full(
    @Res() res: Response,
    @Param("id") id: string,
    @Req() req: AuthenticatedRequest
  ) {
    const session = req.user;
    const data = await this.formService.getFull(id, session);

    return res.status(HttpStatus.OK).json(data);
  }

  @Get("show")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  async search(@Res() res: Response, @Query() query: PaginateWithNameTagDto) {
    const data = await this.formService.paginate(query);

    return res.status(HttpStatus.OK).json(data);
  }
}
