import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PdfFileInterceptor } from '../../../commons/interceptors/pdf.file.interceptor';
import { ExamService } from '../application/exam.service';
import { JwtAuthGuard } from '../../../commons/guard/jwt.auth.guard';
import { TokenUser } from '../../../commons/decorators/token.user';
import { TokenUserInterface } from '../../../commons/decorators/token.user.interface';

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
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(PdfFileInterceptor)
  public async uploadExamPdf(
    @TokenUser() user: TokenUserInterface,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.examService.uploadExamPdf(file, user.userId);
  }
}
