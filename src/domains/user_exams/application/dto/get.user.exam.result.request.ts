import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetUserExamResultRequest {
  @IsNumber()
  @IsNotEmpty()
  userExamId: number;
}
