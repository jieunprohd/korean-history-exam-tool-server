import { ExamService } from './application/exam.service';
import { ExamController } from './presentation/exam.controller';
import { Module } from '@nestjs/common';
import { AnswerModule } from '../answers/answer.module';

@Module({
  imports: [AnswerModule],
  controllers: [ExamController],
  providers: [ExamService],
  exports: [ExamService],
})
export class ExamModule {}
