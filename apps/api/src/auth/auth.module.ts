import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { TokenService } from '~/token/token.service';
import { PrismaService } from '~/database/prisma.service';

import { AuthController } from '~/auth/auth.controller';
import { AuthService } from '~/auth/auth.service';
import { JwtStrategy } from '~/auth/auth.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secretOrPrivateKey: process.env.TOKEN_HASH,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    JwtService,
    PrismaService,
    JwtStrategy,
  ],
})
export class AuthModule {}
