import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthModule } from '~/auth/auth.module';

@Module({
  imports: [PassportModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
