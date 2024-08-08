import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from '~/auth/auth.controller';
import { AuthService } from '~/auth/auth.service';
import { JwtStrategy } from '~/auth/auth.strategy';
import { env } from '~/env';
import { SessionService } from '~/session/session.service';
import { UserService } from '~/user/user.service';
import { JwtRefreshStrategy } from '~/auth/refresh.strategy';
import { ACCESS_TOKEN_EXPIRES_IN } from '~/constants';
import { PrismaService } from '~/database/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: env.SECRET_KEY,
      signOptions: { expiresIn: ACCESS_TOKEN_EXPIRES_IN },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    SessionService,
    JwtService,
    JwtStrategy,
    UserService,
    JwtRefreshStrategy,
  ],
  exports: [AuthService],

})
export class AuthModule {}
