import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { compare } from 'bcryptjs'

import { Session } from '@cpa/database'
import { SessionService } from '~/app/session/session.service'
import { UserService } from '~/app/user/user.service'
import { INVALID_CREDENTIALS, USER_NOT_FOUND } from '~/errors'
import { SignInDto } from './auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private sessionService: SessionService,
    private userService: UserService
  ) {}

  async signIn(data: SignInDto) {
    const user = await this.userService.getPassword({ login: data.login })
    if (!user) throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND)

    const isValidPassword = await compare(data.password, user.password)
    if (!isValidPassword) throw new HttpException(INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED)

    user.password = undefined

    const session = await this.sessionService.create(user.id)

    return session
  }

  async signOut(session: Session) {
    await this.sessionService.expireSession(session.id)
  }
}
