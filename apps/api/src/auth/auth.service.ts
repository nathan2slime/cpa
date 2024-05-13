import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { TokenType } from '@prisma/client';

import { PrismaService } from '~/database/prisma.service';
import { TokenService } from '~/token/token.service';

import { exclude } from '~/database/utils';
import { SignInDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private tokenService: TokenService,
  ) {}

  async create(payload: SignInDto) {
    const user = await this.prisma.user.create({
      data: {
        email: 'email',
        password: await hash('password', 10),
      },
    });

    const token = await this.tokenService.create(user.id, TokenType.AUTH);

    return {
      user: exclude(user, ['password']),
      token,
    };
  }
}
