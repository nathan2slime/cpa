import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class QuestionAnswer {
  @ApiProperty()
  @IsNotEmpty()
  value: string;

  @ApiProperty()
  @IsNotEmpty()
  questionId: string;
}

export class CreateAnswerDto {
  @IsNotEmpty()
  @ApiProperty()
  eventId: string;

  @ApiProperty({
    type: [QuestionAnswer],
  })
  @IsNotEmpty()
  data: QuestionAnswer[];
}
