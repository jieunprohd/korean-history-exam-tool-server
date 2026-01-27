import { Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { PdfFileInterceptor } from '../../../commons/interceptors/pdf.file.interceptor';
import { ExamService } from '../application/exam.service';

@Controller('exams')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Get()
  public async getAllExams() {
    return await this.examService.findAllExamSets();
  }

  @Get('/:examId')
  public async getExamById(@Param('examId') examId: number) {
    return await this.examService.findExamSetById(examId);
  }

  @Post()
  @UseInterceptors(PdfFileInterceptor)
  public async uploadExamPdf() {
    // 시험 문제집 파일 업로드
    // pdf
  }
}
