import { BadRequestException } from '@nestjs/common';
import { pdf2array } from 'pdf2array';

export class FileService {
  constructor() {}

  public async analyzeAnswersByPdf(file: Express.Multer.File) {
    const stringParsedPdfData = await this.parsePdf(file);
    return this.extractQuestions(stringParsedPdfData);
  }

  private extractQuestions(data: string[][]) {
    const questions = [];

    const questionRows = data.slice(4, 14);

    for (const row of questionRows) {
      for (let i = 0; i < row.length; i += 3) {
        const number = Number(row[i]);
        const answer = row[i + 1];
        const score = Number(row[i + 2]);

        if (!number || !answer || !score) continue;

        questions.push({
          questionNumber: number,
          questionAnswer: this.answerToNumber(answer),
          questionScore: score,
        });
      }
    }

    return { questions };
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
