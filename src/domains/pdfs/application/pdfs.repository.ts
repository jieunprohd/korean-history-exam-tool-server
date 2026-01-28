import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PdfUpload } from '../../../entities/pdf.uploads';
import { Repository } from 'typeorm';

@Injectable()
export class PdfsRepository {
  constructor(
    @InjectRepository(PdfUpload)
    private readonly pdfsRepository: Repository<PdfUpload>,
  ) {}

  async save(pdfUpload: PdfUpload): Promise<PdfUpload> {
    return this.pdfsRepository.save(pdfUpload);
  }
}
