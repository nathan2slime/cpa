import { Module } from '@nestjs/common'
import { UserImportController } from './user-import.controller'
import { UserImportService } from './user-import.service'

@Module({
  controllers: [UserImportController],
  providers: [UserImportService],
})
export class UserImportModule {}
