import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { PrismaService } from '~/database/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.TOKEN_HASH,
    });
  }

  async validate(payload: Record<string, string>) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.user },
      select: {
        id: true,
      },
    });

    if (user) return user;

    throw new UnauthorizedException();
  }
}
