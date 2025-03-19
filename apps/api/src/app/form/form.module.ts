import { Module } from '@nestjs/common'

import { FormController } from '~/app/form/form.controller'
import { FormService } from '~/app/form/form.service'
import { PrismaService } from '~/database/prisma.service'

@Module({
  imports: [],
  controllers: [FormController],
  providers: [FormService, PrismaService]
})
export class FormModule {}
