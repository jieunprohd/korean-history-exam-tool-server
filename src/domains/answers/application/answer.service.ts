import { BadRequestException, Injectable } from '@nestjs/common';
import { pdf2array } from 'pdf2array';
import { ExamSetRepository } from './exam.set.repository';
import { AnswerRepository } from './answer.repository';
import { ExamSet } from '../../../entities/exam.set';
import { Answer } from '../../../entities/answer';
import { UserExam } from '../../../entities/user.exam';
import { UserAnswerRepository } from './user.answer.repository';
import { UserAnswer } from '../../../entities/user.answer';
import { GetExamResultResponse } from './dto/get.exam.result.response';
import { CommonResponse } from '../../../commons/response/common.response';
import { GetAnalyzeAnswerResponse } from './dto/get.analyze.answer.response';
import { ResponseCode } from '../../../commons/constants/response.code';
import { PdfsService } from '../../pdfs/application/pdfs.service';
import { PdfType } from '../../../entities/pdf.uploads';
import { TokenUserInterface } from '../../../commons/decorators/token.user.interface';

@Injectable()
export class AnswerService {
  constructor(
    private readonly examSetRepository: ExamSetRepository,
    private readonly answerRepository: AnswerRepository,
    private readonly userAnswerRepository: UserAnswerRepository,
    private readonly pdfsService: PdfsService,
  ) {}

  public async analyzeAnswersByPdf(
    file: Express.Multer.File,
    user: TokenUserInterface,
  ) {
    await this.pdfsService.uploadPdf(file, user.userId, PdfType.ANSWER);
    const examSet = await this.findExamSetOrElseCreate(file);

    return CommonResponse.of(
      GetAnalyzeAnswerResponse.from(examSet),
      true,
      ResponseCode.CREATED,
    );
  }

  public async getScoresByUserExam(userExam: UserExam) {
    const userAnswers =
      await this.userAnswerRepository.findByUserExam(userExam);

    return GetExamResultResponse.from(userAnswers);
  }

  public async getRightAnswersByUserExam(
    userExam: UserExam,
    questionNumber: number,
  ) {
    return await this.answerRepository.findByExamSetAndQuestionNumber(
      userExam.examSet,
      questionNumber,
    );
  }

  public async saveUserAnswerByUserExam(
    answer: number,
    userExam: UserExam,
    rightAnswer: Answer,
  ) {
    return await this.userAnswerRepository.save(
      UserAnswer.from(answer, userExam, rightAnswer),
    );
  }

  private async findExamSetOrElseCreate(file: Express.Multer.File) {
    const examSet = await this.examSetRepository.findByName(file.originalname);

    if (!examSet) {
      const savedExamSet = await this.examSetRepository.save(
        new ExamSet(file.originalname),
      );
      await this.getExtractedQuestions(file, savedExamSet);

      return await this.examSetRepository.findById(savedExamSet.id);
    }

    return examSet;
  }

  private async getExtractedQuestions(
    file: Express.Multer.File,
    examSet: ExamSet,
  ) {
    const fileToTableString = await this.parsePdf(file);
    return await this.extractQuestions(fileToTableString, examSet);
  }

  private async extractQuestions(data: string[][], examSet: ExamSet) {
    console.log(data, examSet);
    const questionRows = data.slice(4, 14);

    for (const row of questionRows) {
      for (let i = 0; i < row.length; i += 3) {
        const questionNumber = Number(row[i]);
        const answer = row[i + 1];
        const score = Number(row[i + 2]);

        if (!questionNumber || !answer || !score) {
          throw new BadRequestException('정답지 추출 중 문제가 발생했습니다.');
        }

        await this.answerRepository.save(
          Answer.from(
            examSet,
            questionNumber,
            this.answerToNumber(answer),
            score,
          ),
        );
      }
    }

    return await this.answerRepository.findByExamSet(examSet);
  }

  private answerToNumber(answer: string): number {
    const map: Record<string, number> = {
      '①': 1,
      '②': 2,
      '③': 3,
      '④': 4,
      '⑤': 5,
    };
    return map[answer];
  }

  private async parsePdf(file: Express.Multer.File) {
    try {
      const fileBuffer = file.buffer;
      const arrayBuffer = this.bufferToArrayBuffer(fileBuffer);

      return await pdf2array(arrayBuffer);
    } catch (error) {
      console.error(error);
      throw new BadRequestException('PDF 텍스트 추출 실패');
    }
  }

  private bufferToArrayBuffer(buffer: Buffer): ArrayBuffer {
    const ab = new ArrayBuffer(buffer.length);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buffer.length; i++) {
      view[i] = buffer[i];
    }
    return ab;
  }
}
