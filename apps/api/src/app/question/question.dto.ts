import { QuestionType } from "@cpa/database";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { IsUUID, IsInt, Min } from "class-validator";

export class CreateQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  form: string;

  @ApiProperty({ enum: QuestionType, required: true })
  @IsEnum(QuestionType)
  @IsNotEmpty()
  type: QuestionType;

  @ApiProperty()
  @IsNotEmpty()
  title: string;
}

export class QueryQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  form: string;
}

export class UpdateQuestionDto {
  @ApiProperty()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsOptional()
  order: number;
}

export class ReorderQuestionDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  order: number;
}
