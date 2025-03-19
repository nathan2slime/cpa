import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class SignInDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  login: string

  @ApiProperty({ required: true })
  @IsNotEmpty()
  password: string
}
