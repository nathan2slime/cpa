import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserProfileDto {
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}