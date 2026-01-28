import { Module } from '@nestjs/common';
import { AnswerController } from './presentation/answer.controller';
import { AnswerService } from './application/answer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamSetRepository } from './application/exam.set.repository';
import { AnswerRepository } from './application/answer.repository';
import { ExamSet } from '../../entities/exam.set';
import { Answer } from '../../entities/answer';
import { AuthModule } from '../auth/auth.module';
import { UserAnswer } from '../../entities/user.answer';
import { UserAnswerRepository } from './application/user.answer.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExamSet, Answer, UserAnswer]),
    AuthModule,
  ],
  controllers: [AnswerController],
  providers: [
    AnswerService,
    ExamSetRepository,
    AnswerRepository,
    UserAnswerRepository,
  ],
  exports: [
    AnswerService,
    ExamSetRepository,
    AnswerRepository,
    UserAnswerRepository,
  ],
})
export class AnswerModule {}
