import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateFormDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string
}

export class UpdateFormDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string
}
