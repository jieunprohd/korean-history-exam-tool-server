import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnswerModule } from './domains/answers/answer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './domains/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './commons/guard/jwt.auth.guard';
import { ExamModule } from './domains/exams/exam.module';
import { UserExamModule } from './domains/user_exams/user.exam.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '591006',
      database: 'korean_history',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AnswerModule,
    AuthModule,
    ExamModule,
    UserExamModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
