import { Session } from "@cpa/database";
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";

import { SignInDto } from "~/app/auth/auth.dto";
import { AuthService } from "~/app/auth/auth.service";
import { AUTH_COOKIE } from "~/constants";

import { env } from "@cpa/env";
import { JwtAuthGuard } from "~/app/auth/auth.guard";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: "Retorna sessão atual",
  })
  async auth(@Req() req: Request, @Res() res: Response) {
    return res.status(HttpStatus.OK).json(req.user);
  }

  @Post("signout")
  @ApiResponse({
    status: 200,
    description: "Expira sessão atual",
  })
  @UseGuards(JwtAuthGuard)
  async signOut(@Req() req: Request, @Res() res: Response) {
    const session = req.user as Session;
    await this.authService.signOut(session);
    return res.status(HttpStatus.OK).send();
  }

  @Patch("refresh")
  @UseGuards(AuthGuard("refresh"))
  @ApiResponse({
    status: 200,
    description: "Atualiza accessToken por refreshToken da sessão atual",
  })
  async refresh(@Req() req: Request, @Res() res: Response) {
    const session = req.user as Session;
    const { accessToken, refreshToken } = session;

    res.cookie(
      AUTH_COOKIE,
      { accessToken, refreshToken },
      {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        path: "/",
        expires: new Date(
          Date.now() + require("ms")(env.REFRESH_TOKEN_EXPIRES_IN)
        ),
      }
    );
    return res.status(HttpStatus.OK).json(session);
  }

  @Post("signin")
  @ApiResponse({ status: 200, description: "Retorna uma nova sessão" })
  async signIn(@Body() body: SignInDto, @Res() res: Response) {
    const data = await this.authService.signIn(body);

    const { accessToken, refreshToken } = data;
    res.cookie(
      AUTH_COOKIE,
      { accessToken, refreshToken },
      {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        path: "/",
        expires: new Date(
          Date.now() + require("ms")(env.REFRESH_TOKEN_EXPIRES_IN)
        ),
      }
    );
    return res.status(HttpStatus.OK).json(data);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("signout")
  @ApiResponse({
    status: 200,
    description: "Expira sessão atual",
  })
  async logout(@Req() req: Request, @Res() res: Response) {
    const session = req.user as Session;
    await this.authService.signOut(session);
    return res.status(HttpStatus.OK).send();
  }
}
