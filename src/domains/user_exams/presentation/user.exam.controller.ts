import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../commons/guard/jwt.auth.guard';
import { StartUserExamRequest } from '../application/dto/start.user.exam.request';
import { UserExamService } from '../application/user.exam.service';
import { AnswerQuestionRequest } from '../application/dto/answer.question.request';

@Controller('user-exam')
export class UserExamController {
  constructor(private readonly userExamService: UserExamService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  public async startUserExam(@Body() request: StartUserExamRequest) {
    return await this.userExamService.startExam('', request); // TODO userId CurrentUser 변환 필요
  }

  @Post('/:userExamId/answer')
  @UseGuards(JwtAuthGuard)
  public async answerUserExam(@Body() request: AnswerQuestionRequest) {
    return await this.userExamService.answerQuestion('', request); // TODO userId CurrentUser 변환 필요
  }

  @Get('/:userExamId')
  @UseGuards(JwtAuthGuard)
  public async getUserExamResult(@Body() request: AnswerQuestionRequest) {
    return await this.userExamService.getUserExamResult('', request); // TODO userId CurrentUser 변환 필요
  }
}
