import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

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
  @IsNotEmpty()
  title: string;
}
