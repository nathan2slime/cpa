import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

import { env } from '~/env';
import { AUTH_COOKIE } from '~/constants';
import { SessionService } from '~/session/session.service';
import { JwtAuthPayload } from '~/types/auth.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly sessionService: SessionService) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          if (req) {
            const data = req.cookies[AUTH_COOKIE];

            if (data && data.accessToken) return data.accessToken;
          }

          return null;
        },
      ]),
      secretOrKey: env.SECRET_KEY,
    });
  }

  async validate(payload: JwtAuthPayload) {
    const session = await this.sessionService.findById(payload.sessionId);

    if (session) return session;

    throw new UnauthorizedException();
  }
}