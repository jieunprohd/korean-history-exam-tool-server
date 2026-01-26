import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PdfFileInterceptor } from '../../../commons/interceptors/pdf.file.interceptor';
import { FileService } from '../application/file.service';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('')
  @UseInterceptors(PdfFileInterceptor)
  public async analyzeAnswer(
    @Body() request: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.fileService.analyzeAnswersByPdf(file);
  }
}
