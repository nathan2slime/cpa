import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthModule } from '~/auth/auth.module';
import { HealthModule } from '~/health/health.module';

@Module({
  imports: [PassportModule, AuthModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
