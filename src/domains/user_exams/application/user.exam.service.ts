import { BadRequestException, Injectable } from '@nestjs/common';
import { UserExamRepository } from './user.exam.repository';
import { StartUserExamRequest } from './dto/start.user.exam.request';
import { UserExam } from '../../../entities/user.exam';
import { AnswerQuestionRequest } from './dto/answer.question.request';
import { GetUserExamResultRequest } from './dto/get.user.exam.result.request';
import { AuthService } from '../../auth/application/auth.service';
import { ExamService } from '../../exams/application/exam.service';
import { AnswerService } from '../../answers/application/answer.service';

@Injectable()
export class UserExamService {
  constructor(
    private readonly userExamRepository: UserExamRepository,
    private readonly examService: ExamService,
    private readonly answerService: AnswerService,
    private readonly authService: AuthService,
  ) {}

  public async startExam(userId: string, request: StartUserExamRequest) {
    const user = await this.authService.findUserByUserIdOrElseThrow(userId);

    const examSet = await this.examService.findExamSetById(request.examSetId);

    const userExam = await this.userExamRepository.save(
      UserExam.from(examSet, user),
    );

    return userExam; // TODO 시작 성공 / 실패
  }

  public async answerQuestion(userId: string, request: AnswerQuestionRequest) {
    await this.authService.findUserByUserIdOrElseThrow(userId);

    const userExam = await this.findUserExamByIdOrElseThrow(request.userExamId);

    const rightAnswer = await this.answerService.getRightAnswersByUserExam(
      userExam,
      request.questionNumber,
    );

    await this.answerService.saveUserAnswerByUserExam(
      request.answer,
      userExam,
      rightAnswer,
    );

    if (rightAnswer.answer === request.answer) {
      return '맞음'; // TODO 제대로 리턴해야함
    }

    return '틀림';
  }

  public async getUserExamResult(
    userId: string,
    request: GetUserExamResultRequest,
  ) {
    await this.authService.findUserByUserIdOrElseThrow(userId);

    const userExam = await this.findUserExamByIdOrElseThrow(request.userExamId);

    const { totalScore, userScore } =
      await this.answerService.getScoresByUserExam(userExam);

    return { totalScore, userScore };
  }

  private async findUserExamByIdOrElseThrow(userExamId: number) {
    const userExam = await this.userExamRepository.findById(userExamId);

    if (!userExam) {
      throw new BadRequestException('해당 시험이 존재하지 않습니다.');
    }

    return userExam;
  }
}
