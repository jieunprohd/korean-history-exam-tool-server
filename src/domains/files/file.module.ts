import { Module } from '@nestjs/common';
import { FileController } from './presentation/file.controller';
import { FileService } from './application/file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamSetRepository } from './application/exam.set.repository';
import { AnswerRepository } from './application/answer.repository';
import { ExamSet } from '../../entities/exam.set';
import { Answer } from '../../entities/answer';

@Module({
  imports: [TypeOrmModule.forFeature([ExamSet, Answer])],
  controllers: [FileController],
  providers: [FileService, ExamSetRepository, AnswerRepository],
  exports: [FileService],
})
export class FileModule {}
