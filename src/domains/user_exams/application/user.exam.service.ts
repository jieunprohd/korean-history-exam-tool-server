import { BadRequestException, Injectable } from '@nestjs/common';
import { UserExamRepository } from './user.exam.repository';
import { StartUserExamRequest } from './dto/start.user.exam.request';
import { UserExam } from '../../../entities/user.exam';
import { ExamSetRepository } from '../../answers/application/exam.set.repository';
import { AnswerQuestionRequest } from './dto/answer.question.request';
import { AnswerRepository } from '../../answers/application/answer.repository';
import { GetUserExamResultRequest } from './dto/get.user.exam.result.request';
import { UserAnswerRepository } from './user.answer.repository';
import { UserAnswer } from '../../../entities/user.answer';
import { AuthService } from '../../auth/application/auth.service';

@Injectable()
export class UserExamService {
  constructor(
    private readonly userExamRepository: UserExamRepository,
    private readonly examSetRepository: ExamSetRepository,
    private readonly answerRepository: AnswerRepository,
    private readonly userAnswerRepository: UserAnswerRepository,
    private readonly authService: AuthService,
  ) {}

  public async startExam(userId: string, request: StartUserExamRequest) {
    const user = await this.authService.findUserByUserIdOrElseThrow(userId);

    const examSet = await this.examSetRepository.findById(request.examSetId);

    if (!examSet) {
      throw new BadRequestException('시험이 존재하지 않습니다.');
    }

    const userExam = await this.userExamRepository.save(
      UserExam.from(examSet, user),
    );

    return userExam; // TODO 시작 성공 / 실패
  }

  public async answerQuestion(userId: string, request: AnswerQuestionRequest) {
    await this.authService.findUserByUserIdOrElseThrow(userId);

    const userExam = await this.userExamRepository.findById(request.userExamId);

    if (!userExam) {
      throw new BadRequestException('해당 시험이 존재하지 않습니다.');
    }

    const rightAnswer =
      await this.answerRepository.findByExamSetAndQuestionNumber(
        userExam.examSet,
        request.questionNumber,
      );

    await this.userAnswerRepository.save(
      UserAnswer.from(request.answer, userExam, rightAnswer),
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

    const userExam = await this.userExamRepository.findById(request.userExamId);

    if (!userExam) {
      throw new BadRequestException('해당 시험이 존재하지 않습니다.');
    }

    const userAnswers =
      await this.userAnswerRepository.findByUserExam(userExam);

    const totalScore = userAnswers
      .map((userAnswer) => userAnswer.answer)
      .reduce((a, c) => a + c.score, 0);

    const userScore = userAnswers
      .filter(
        (userAnswer) => userAnswer.userAnswer === userAnswer.answer.answer,
      )
      .map((userAnswer) => userAnswer.answer)
      .reduce((a, c) => a + c.score, 0);

    return { totalScore, userScore };
  }
}
