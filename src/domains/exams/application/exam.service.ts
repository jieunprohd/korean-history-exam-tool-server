import { ExamSetRepository } from '../../answers/application/exam.set.repository';
import { Injectable } from '@nestjs/common';
import { CommonResponse } from '../../../commons/response/common.response';
import { GetExamSetResponse } from './dto/get.exam.set.response';
import { ResponseCode } from '../../../commons/constants/response.code';

@Injectable()
export class ExamService {
  constructor(private readonly examSetRepository: ExamSetRepository) {}

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
}
