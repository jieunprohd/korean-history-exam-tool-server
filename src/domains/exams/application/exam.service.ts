import { ExamSetRepository } from '../../answers/application/exam.set.repository';
import { Injectable } from '@nestjs/common';
import { CommonResponse } from '../../../commons/response/common.response';
import { GetExamSetResponse } from './dto/get.exam.set.response';
import { ResponseCode } from '../../../commons/constants/response.code';
import { PdfsService } from '../../pdfs/application/pdfs.service';
import { PdfType } from '../../../entities/pdf.uploads';

@Injectable()
export class ExamService {
  constructor(
    private readonly examSetRepository: ExamSetRepository,
    private readonly pdfsService: PdfsService,
  ) {}

  public async uploadExamPdf(file: Express.Multer.File, userId: string) {
    return await this.pdfsService.uploadPdf(file, userId, PdfType.QUESTION);
  }

  public async findAllExamSets() {
    return await this.examSetRepository.findAll();
  }

  public async findExamSetById(examSetId: number) {
    const examSet = await this.examSetRepository.findById(examSetId);

    if (!examSet) {
      throw new Error('해당하는 시험이 존재하지 않습니다.');
    }

    return CommonResponse.of(
      GetExamSetResponse.from(examSet),
      true,
      ResponseCode.OK,
    );
  }

  public async findExamSetByExamSetId(examSetId: number) {
    const examSet = await this.examSetRepository.findById(examSetId);

    if (!examSet) {
      throw new Error('해당하는 시험이 존재하지 않습니다.');
    }

    return examSet;
  }
}
