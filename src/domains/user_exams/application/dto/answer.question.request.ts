import { IsNotEmpty, IsNumber } from 'class-validator';

export class AnswerQuestionRequest {
  @IsNumber()
  @IsNotEmpty()
  questionNumber: number;

  @IsNumber()
  @IsNotEmpty()
  answer: number;
}
