import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from '~/constants';
import { PrismaService } from '~/database/prisma.service';
import { JwtAuthPayload } from '~/types/auth.types';
import { env } from '~/env';
import { exclude } from '~/database/utils';

@Injectable()
export class SessionService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async create(userId: string) {
    const session = await this.prisma.session.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    const payload = { userId, sessionId: session.id };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: env.SECRET_KEY,
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: env.SECRET_KEY,
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });

    const data = await this.prisma.session.update({
      where: {
        id: session.id,
      },
      data: {
        refreshToken,
        accessToken,
      },
      include: {
        user: true,
      },
    });

    const user = exclude(data.user, ['password']);

    return { ...data, user };
  }

  async expireSession(id: string) {
    await this.prisma.session.update({
      where: { id },
      data: { isExpired: true },
    });
  }

  async refresh(payload: JwtAuthPayload) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: env.SECRET_KEY,
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });

    const session = await this.prisma.session.update({
      where: { id: payload.sessionId, isExpired: false },
      data: { accessToken },
      include: { user: true },
    });

    if (session) {
      const user = exclude(session.user, ['password']);

      return { ...session, user };
    }
  }

  async findById(id: string) {
    const session = await this.prisma.session.findUnique({
      where: { id },
      include: { user: true },
    });

    if (session) {
      if (session.isExpired) return null;

      const user = exclude(session.user, ['password']);

      return { ...session, user };
    }
  }
}
