import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class QuestionAnswerDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  value?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  optionId?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  questionId: string;
}

export class CreateAnswerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  eventId: string;

  @ApiProperty({
    type: [QuestionAnswerDto],
  })
  @IsNotEmpty()
  data: QuestionAnswerDto[];
}

export class FilterByCourseDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  course?: string;
}
