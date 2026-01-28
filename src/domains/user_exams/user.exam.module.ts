import { UserExamController } from './presentation/user.exam.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserExam } from '../../entities/user.exam';
import { ExamModule } from '../exams/exam.module';
import { AuthModule } from '../auth/auth.module';
import { AnswerModule } from '../answers/answer.module';
import { UserExamService } from './application/user.exam.service';
import { Module } from '@nestjs/common';
import { UserExamRepository } from './application/user.exam.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserExam]),
    ExamModule,
    AnswerModule,
    AuthModule,
  ],
  controllers: [UserExamController],
  providers: [UserExamService, UserExamRepository],
  exports: [UserExamService, UserExamRepository],
})
export class UserExamModule {}
