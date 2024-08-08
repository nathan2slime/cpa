import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  Req,
  Patch,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Session } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from '~/auth/auth.service';
import { AUTH_COOKIE } from '~/constants';
import { SignInDto } from '~/auth/auth.dto';

import { JwtAuthGuard } from '~/auth/auth.guard';

@Controller('auth')
@ApiTags('Authenticate')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Get the authenticated user',
  })
  async auth(@Req() req: Request, @Res() res: Response) {
    return res.status(HttpStatus.OK).json(req.user);
  }

  @Post('signout')
  @ApiResponse({
    status: 200,
    description: 'Signs out the logged in user',
  })
  @UseGuards(JwtAuthGuard)
  async signOut(@Req() req: Request, @Res() res: Response) {
    const session = req.user as Session;
    await this.authService.signOut(session);
    return res.status(HttpStatus.OK).send();
  }

  @Patch('refresh')
  @UseGuards(AuthGuard('refresh'))
  @ApiResponse({
    status: 200,
    description: 'Update access token by refresh token',
  })
  async refresh(@Req() req: Request, @Res() res: Response) {
    const session = req.user as Session;
    const { accessToken, refreshToken } = session;

    res.cookie(AUTH_COOKIE, { accessToken, refreshToken }, { httpOnly: true });

    return res.status(HttpStatus.OK).json(session);
  }

  @Post('signin')
  @ApiResponse({ status: 200, description: 'Sign in user' })
  async signIn(@Body() body: SignInDto, @Res() res: Response) {
    const data = await this.authService.signIn(body);

    const { accessToken, refreshToken } = data;
    res.cookie(AUTH_COOKIE, { accessToken, refreshToken }, { httpOnly: true });

    return res.status(HttpStatus.OK).json(data);
  }
}
