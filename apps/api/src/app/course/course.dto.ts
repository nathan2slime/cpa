import { CourseType } from '@cpa/database'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateCourseDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  name: string

  @ApiProperty({ enum: CourseType, required: true })
  @IsEnum(CourseType)
  @IsNotEmpty()
  type: CourseType
}

export class UpdateCourseDto {
  @ApiProperty({ required: false })
  @IsOptional()
  name: string

  @ApiProperty({ enum: CourseType, required: false })
  @IsOptional()
  @IsEnum(CourseType)
  type: CourseType
}
