import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PdfFileInterceptor } from '../../../commons/interceptors/pdf.file.interceptor';
import { AnswerService } from '../application/answer.service';
import { JwtAuthGuard } from '../../../commons/guard/jwt.auth.guard';
import { TokenUser } from '../../../commons/decorators/token.user';
import { TokenUserInterface } from '../../../commons/decorators/token.user.interface';

@Controller('answers')
export class AnswerController {
  constructor(private readonly fileService: AnswerService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(PdfFileInterceptor)
  public async analyzeAnswer(
    @TokenUser() user: TokenUserInterface,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.fileService.analyzeAnswersByPdf(file, user);
  }
}
