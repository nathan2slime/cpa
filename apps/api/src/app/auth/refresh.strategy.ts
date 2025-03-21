import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { env } from '@cpa/env'
import { SessionService } from '~/app/session/session.service'
import { AUTH_COOKIE } from '~/constants'
import { JwtAuthPayload } from '~/types/auth.types'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private readonly sessionService: SessionService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          if (req) {
            const data = req.cookies[AUTH_COOKIE]

            if (data && data.refreshToken) return data.refreshToken
          }

          return null
        }
      ]),
      ignoreExpiration: true,
      secretOrKey: env.SESSION_KEY
    })
  }

  async validate(payload: JwtAuthPayload) {
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      await this.sessionService.expireSession(payload.sessionId)
    } else {
      const session = await this.sessionService.refresh(payload)

      if (session) return session
    }

    throw new UnauthorizedException()
  }
}
