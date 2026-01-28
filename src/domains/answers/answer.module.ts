import { Module } from '@nestjs/common';
import { AnswerController } from './presentation/answer.controller';
import { AnswerService } from './application/answer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamSet } from '../../entities/exam.set';
import { ExamSetRepository } from './application/exam.set.repository';
import { AnswerRepository } from './application/answer.repository';
import { Answer } from '../../entities/answer';
import { UserAnswer } from '../../entities/user.answer';
import { UserAnswerRepository } from './application/user.answer.repository';
import { PdfsModule } from '../pdfs/pdfs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExamSet, Answer, UserAnswer]),
    PdfsModule,
  ],
  controllers: [AnswerController],
  providers: [
    AnswerService,
    ExamSetRepository,
    AnswerRepository,
    UserAnswerRepository,
  ],
  exports: [AnswerService, AnswerRepository],
})
export class AnswerModule {}
