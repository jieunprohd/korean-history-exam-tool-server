import { Module } from '@nestjs/common';
import { ExamController } from './presentation/exam.controller';
import { ExamService } from './application/exam.service';
import { ExamSetRepository } from '../answers/application/exam.set.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamSet } from '../../entities/exam.set';
import { PdfsModule } from '../pdfs/pdfs.module';

@Module({
  imports: [TypeOrmModule.forFeature([ExamSet]), PdfsModule],
  controllers: [ExamController],
  providers: [ExamService, ExamSetRepository],
  exports: [ExamService, ExamSetRepository],
})
export class ExamModule {}
