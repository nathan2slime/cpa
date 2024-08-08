import { ApiProperty } from '@nestjs/swagger';
import { CourseType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: CourseType })
  @IsEnum(CourseType)
  @IsNotEmpty()
  type: CourseType;
}

export class UpdateCourseDto {
  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty({ enum: CourseType })
  @IsOptional()
  @IsEnum(CourseType)
  type: CourseType;
}
