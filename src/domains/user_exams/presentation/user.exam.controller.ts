import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../commons/guard/jwt.auth.guard';
import { StartUserExamRequest } from '../application/dto/start.user.exam.request';
import { UserExamService } from '../application/user.exam.service';
import { AnswerQuestionRequest } from '../application/dto/answer.question.request';
import { TokenUserInterface } from '../../../commons/decorators/token.user.interface';
import { TokenUser } from 'src/commons/decorators/token.user';

@Controller('user-exam')
export class UserExamController {
  constructor(private readonly userExamService: UserExamService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  public async startUserExam(
    @TokenUser() user: TokenUserInterface,
    @Body() request: StartUserExamRequest,
  ) {
    return await this.userExamService.startExam(user.userId, request);
  }

  @Post('/:userExamId/answer')
  @UseGuards(JwtAuthGuard)
  public async answerUserExam(
    @TokenUser() user: TokenUserInterface,
    @Body() request: AnswerQuestionRequest,
  ) {
    return await this.userExamService.answerQuestion(user.userId, request);
  }

  @Get('/:userExamId')
  @UseGuards(JwtAuthGuard)
  public async getUserExamResult(
    @TokenUser() user: TokenUserInterface,
    @Body() request: AnswerQuestionRequest,
  ) {
    return await this.userExamService.getUserExamResult(user.userId, request);
  }
}
