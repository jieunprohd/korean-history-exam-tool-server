import { PDFDocument } from 'pdf-lib';
import { BadRequestException } from '@nestjs/common';

export class FileService {
  constructor() {}

  public async analyzeAnswersByPdf(file: Express.Multer.File) {
    const pdfData = await PDFDocument.load(file.buffer);
    console.log(pdfData);

    // return JSON.parse(
    //   await OpenAiDocumentExtractor.analyzePdfAnswer(
    //     ExpensePdfType.PDF_ANSWER,
    //     file,
    //   ),
    // );
  }

  private async parsePdf(file: Express.Multer.File) {
    try {
    } catch (error) {
      throw new BadRequestException('PDF 텍스트 추출 실패');
    }
  }
}
