import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Query,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { UserImportService } from './user-import.service'
import { Role } from '@cpa/database'
import { Roles } from '../auth/auth.decorator'
import { JwtAuthGuard } from '../auth/auth.guard'
import { RoleGuard } from '../auth/role.guard'

@Controller('user-import')
export class UserImportController {
  constructor(private readonly userImportService: UserImportService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  @UseInterceptors(FileInterceptor('file'))
  async importUsers(
    @UploadedFile() file: Express.Multer.File,
    @Query('deleteExistingUsers') deleteExistingUsers: string,
  ) {
    const shouldDelete = deleteExistingUsers === 'true'
    return this.userImportService.importUsers(file.buffer, shouldDelete)
  }
}
