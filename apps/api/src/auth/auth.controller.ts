import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { AuthService } from '~/auth/auth.service';

import { logger } from '~/logger';

@Controller('auth')
@ApiTags('Authenticate')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async signIn(@Req() req: Request, @Res() res: Response) {
    try {
      // const res = await this.authService.create()
    } catch (error) {
      
    } 
  }
}
