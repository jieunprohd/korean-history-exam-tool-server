import { IsNotEmpty, IsNumber } from 'class-validator';

export class StartUserExamRequest {
  @IsNumber()
  @IsNotEmpty()
  examSetId: number;
}
