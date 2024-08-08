import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

import { SignInDto } from './auth.dto';
import { INVALID_CREDENTIALS, USER_NOT_FOUND } from '~/errors';
import { UserService } from '~/user/user.service';
import { SessionService } from '~/session/session.service';
import { Session } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private sessionService: SessionService,
    private userService: UserService,
  ) {}

  async signIn(data: SignInDto) {
    const user = await this.userService.getPassword({ login: data.login });
    if (!user) throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);

    const isValidPassword = await compare(data.password, user.password);
    if (!isValidPassword)
      throw new HttpException(INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);

    user.password = undefined;

    const session = await this.sessionService.create(user.id);

    return session;
  }

  async signOut(session: Session) {
    await this.sessionService.expireSession(session.id);
  }
}
