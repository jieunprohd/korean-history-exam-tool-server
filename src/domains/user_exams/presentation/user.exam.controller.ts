import { Controller, Get, Post } from '@nestjs/common';

@Controller('user-exam')
export class UserExamController {
  constructor() {}

  @Post()
  public async startUserExam() {
    // 시험 시작 (examSet 생성)
    // examSetId, userId (Bearer Token)
  }

  @Post('/:userExamId/answer')
  public async answerUserExam() {
    // 각 항목별 정답 입력
    // userExamId, userId (Bearer Token), questionNumber, answer
  }

  @Get('/:userExamId')
  public async getUserExamResult() {
    // 시험 점수 확인
    // userExamId, userId (Bearer Token)
  }
}
