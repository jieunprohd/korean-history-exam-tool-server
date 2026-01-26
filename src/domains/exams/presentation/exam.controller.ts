import { Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { PdfFileInterceptor } from '../../../commons/interceptors/pdf.file.interceptor';

@Controller('exams')
export class ExamController {
  constructor() {}

  @Get()
  public async getAllExams() {
    // 전체 시험 정보 조회
  }

  @Get('/:examId')
  public async getExamById() {
    // 특정 시험 조회
  }

  @Post()
  @UseInterceptors(PdfFileInterceptor)
  public async uploadExamPdf() {
    // 시험 문제집 파일 업로드
    // pdf
  }
}
