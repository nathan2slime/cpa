import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  responsible: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  form: string;

  @ApiProperty({ required: false })
  @IsOptional()
  startDate: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  endDate: Date;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  courses: string[];

  @ApiProperty({ required: true })
  @IsNotEmpty()
  open: boolean;
}


export class UpdateEventDto {
  @ApiProperty({ required: false })
  @IsOptional()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  description: string;

  @ApiProperty({ required: false })
  @IsOptional()
  responsible: string;

  @ApiProperty({ required: false })
  @IsOptional()
  startDate: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  endDate: Date;
  
  @ApiProperty({ required: false })
  @IsOptional()
  courses: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  open: boolean;
}

