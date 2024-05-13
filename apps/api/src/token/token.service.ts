import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Token, TokenType } from '@prisma/client';

import { PrismaService } from '~/database/prisma.service';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async create(userId: string, type: TokenType = TokenType.AUTH) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },

      include: {
        tokens: true,
      },
    });

    let token: Token | null = null;

    const savedToken = user.tokens.find((e) => e.type == type);
    const value = this.jwtService.sign(
      { user: user.id },
      { secret: process.env.TOKEN_HASH },
    );

    if (!!savedToken) {
      savedToken.value = value;

      await this.prisma.token.update({
        where: {
          id: savedToken.id,
        },
        data: {
          value,
        },
      });

      token = savedToken;
    } else {
      token = await this.prisma.token.create({
        data: {
          value,
          type,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    }

    return token;
  }
}
