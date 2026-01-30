import { BadRequestException, Injectable } from '@nestjs/common';
import { UserExamRepository } from './user.exam.repository';
import { StartUserExamRequest } from './dto/start.user.exam.request';
import { UserExam } from '../../../entities/user.exam';
import { AnswerQuestionRequest } from './dto/answer.question.request';
import { AuthService } from '../../auth/application/auth.service';
import { ExamService } from '../../exams/application/exam.service';
import { AnswerService } from '../../answers/application/answer.service';
import { CommonResponse } from '../../../commons/response/common.response';
import { AnswerQuestionResponse } from './dto/answer.question.response';
import { ResponseCode } from '../../../commons/constants/response.code';
import { StartUserExamResponse } from './dto/start.user.exam.respose';
import { GetExamResultResponse } from '../../answers/application/dto/get.exam.result.response';

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

    const examSet = await this.examService.findExamSetByExamSetId(
      request.examSetId,
    );

    const userExam = await this.userExamRepository.save(
      UserExam.from(examSet, user),
    );

    return CommonResponse.of(
      StartUserExamResponse.from(userExam),
      true,
      ResponseCode.OK,
    );
  }

  public async answerQuestion(
    userId: string,
    userExamId: number,
    request: AnswerQuestionRequest,
  ) {
    await this.authService.findUserByUserIdOrElseThrow(userId);

    const userExam = await this.findUserExamByIdOrElseThrow(userExamId);

    if (userExam.isFinishedUserExam()) {
      throw new BadRequestException('종료된 시험입니다.');
    }

    const rightAnswer = userExam.examSet.answers.find(
      (answer) => answer.questionNumber === request.questionNumber,
    );

    await this.answerService.saveUserAnswerByUserExam(
      request.answer,
      userExam,
      rightAnswer,
    );

    return CommonResponse.of(
      AnswerQuestionResponse.from(request.answer, rightAnswer),
      true,
      ResponseCode.OK,
    );
  }

  public async getUserExamResult(userId: string, userExamId: number) {
    await this.authService.findUserByUserIdOrElseThrow(userId);

    const userExam = await this.findUserExamByIdOrElseThrow(userExamId);

    await this.userExamRepository.save(userExam.updateUserExamToFinished());

    return CommonResponse.of(
      GetExamResultResponse.from(userExam),
      true,
      ResponseCode.OK,
    );
  }

  private async findUserExamByIdOrElseThrow(userExamId: number) {
    const userExam = await this.userExamRepository.findById(userExamId);

    if (!userExam) {
      throw new BadRequestException('해당 시험이 존재하지 않습니다.');
    }

    return userExam;
  }
}
