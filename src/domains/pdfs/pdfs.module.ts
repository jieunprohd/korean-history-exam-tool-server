import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PdfUpload } from '../../entities/pdf.uploads';
import { PdfsService } from './application/pdfs.service';
import { PdfsRepository } from './application/pdfs.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([PdfUpload]), ConfigModule],
  providers: [PdfsService, PdfsRepository],
  exports: [PdfsService],
})
export class PdfsModule {}
