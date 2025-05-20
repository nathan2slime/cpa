import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { PaginateWithNameTagDto } from "~/app/app.dto";

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

  @ApiProperty({ required: true })
  @IsNotEmpty()
  form: string;

  @ApiProperty({ required: false })
  @IsOptional()
  startDate: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  endDate: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  courses: string[];
}

export class PaginateWithCourseDto extends PaginateWithNameTagDto {
  @ApiProperty({ required: false })
  @IsOptional()
  course: string;
}
