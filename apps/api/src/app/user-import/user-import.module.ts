import { Module } from '@nestjs/common'
import { UserImportController } from './user-import.controller'
import { UserImportService } from './user-import.service'
import { PrismaService } from '~/database/prisma.service'

@Module({
  controllers: [UserImportController],
  providers: [UserImportService, PrismaService],
})
export class UserImportModule {}
