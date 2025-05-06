import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateQuestionOptionDto {
  @ApiProperty()
  @IsNotEmpty()
  question: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @Min(0)
  // weight: number;

  @ApiProperty()
  @IsNotEmpty()
  title: string;
}

export class QueryQuestionOptionDto {
  @ApiProperty()
  @IsNotEmpty()
  question: string;
}

export class UpdateQuestionOptionDto {
  // @ApiProperty()
  // @IsNotEmpty()
  // @Min(0)
  // weight: number;

  @ApiProperty()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsOptional()
  order: number;
}
