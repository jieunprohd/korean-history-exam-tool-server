import { Module } from '@nestjs/common';
import { AnswerController } from './presentation/answer.controller';
import { AnswerService } from './application/answer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamSetRepository } from './application/exam.set.repository';
import { AnswerRepository } from './application/answer.repository';
import { ExamSet } from '../../entities/exam.set';
import { Answer } from '../../entities/answer';

@Module({
  imports: [TypeOrmModule.forFeature([ExamSet, Answer])],
  controllers: [AnswerController],
  providers: [AnswerService, ExamSetRepository, AnswerRepository],
  exports: [AnswerService],
})
export class AnswerModule {}
