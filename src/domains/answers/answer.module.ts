import { Module } from '@nestjs/common';
import { AnswerController } from './presentation/answer.controller';
import { AnswerService } from './application/answer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamSetRepository } from './application/exam.set.repository';
import { AnswerRepository } from './application/answer.repository';
import { ExamSet } from '../../entities/exam.set';
import { Answer } from '../../entities/answer';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ExamSet, Answer]), AuthModule],
  controllers: [AnswerController],
  providers: [AnswerService, ExamSetRepository, AnswerRepository],
  exports: [AnswerService],
})
export class AnswerModule {}
