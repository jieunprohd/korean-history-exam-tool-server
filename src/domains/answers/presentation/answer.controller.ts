import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PdfFileInterceptor } from '../../../commons/interceptors/pdf.file.interceptor';
import { AnswerService } from '../application/answer.service';
import { Public } from '../../../commons/decorators/public.decorator';

@Controller('files')
export class AnswerController {
  constructor(private readonly fileService: AnswerService) {}

  @Public()
  @Post()
  @UseInterceptors(PdfFileInterceptor)
  public async analyzeAnswer(@UploadedFile() file: Express.Multer.File) {
    return await this.fileService.analyzeAnswersByPdf(file);
  }
}
