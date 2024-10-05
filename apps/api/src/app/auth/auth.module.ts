import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from '~/app/auth/auth.controller';
import { AuthService } from '~/app/auth/auth.service';
import { JwtStrategy } from '~/app/auth/auth.strategy';
import { env } from '~/env';
import { SessionService } from '~/app/session/session.service';
import { UserService } from '~/app/user/user.service';
import { JwtRefreshStrategy } from '~/app/auth/refresh.strategy';
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
