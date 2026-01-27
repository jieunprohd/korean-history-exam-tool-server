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

@Entity({ name: 'USER_EXAM' })
export class UserExam {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'TOTAL_SCORE' })
  totalScore: number;

  @CreateDateColumn({ name: 'CREATED_AT' })
  createdAt: Date;

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
    return response;
  }
}
