import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExamSet } from './exam.set';
import { User } from './user';
import { UserAnswer } from './user.answer';
import { UserExamStatusType } from '../commons/enum/user.exam.status.type';

@Entity({ name: 'USER_EXAM' })
export class UserExam {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'TOTAL_SCORE' })
  totalScore: number;

  @Column({ name: 'STATUS' })
  status: UserExamStatusType;

  @CreateDateColumn({ name: 'CREATED_AT' })
  createdAt: Date;

  @CreateDateColumn({ name: 'FINISHED_AT' })
  finishedAt: Date;

  @ManyToOne(() => ExamSet, (examSet) => examSet.userExams)
  @JoinColumn({ name: 'EXAM_SET_ID' })
  examSet: ExamSet;

  @ManyToOne(() => User, (user) => user.userExams)
  @JoinColumn({ name: 'USER_ID' })
  user: User;

  @OneToMany(() => UserAnswer, (userAnswer) => userAnswer.userExam)
  userAnswers: UserAnswer[];

  public static from(examSet: ExamSet, user: User) {
    const response = new UserExam();
    response.examSet = examSet;
    response.user = user;
    response.totalScore = 0;
    response.status = UserExamStatusType.STARTED;
    response.createdAt = new Date();
    return response;
  }

  public updateUserExamToFinished() {
    this.setStatus(UserExamStatusType.FINISHED);
    this.setFinishedAt();
    return this;
  }

  public isFinishedUserExam() {
    return !!this.finishedAt && this.status === UserExamStatusType.FINISHED;
  }

  private setStatus(status: UserExamStatusType) {
    this.status = status;
  }

  private setFinishedAt() {
    this.finishedAt = new Date();
  }
}
