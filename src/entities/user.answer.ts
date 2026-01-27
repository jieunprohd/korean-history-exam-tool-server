import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Answer } from './answer';
import { UserExam } from './user.exam';

@Entity({ name: 'USER_ANSWERS' })
export class UserAnswer {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'USER_ANSWER' })
  userAnswer: number;

  @CreateDateColumn({ name: 'CREATED_AT' })
  createdAt: Date;

  @ManyToOne(() => UserExam, (userExam) => userExam.userAnswers)
  @JoinColumn({ name: 'USER_EXAM_ID' })
  userExam: UserExam;

  @OneToOne(() => Answer, (answer) => answer.userAnswers)
  @JoinColumn({ name: 'ANSWER_ID' })
  answer: Answer;

  public static from(userAnswer: number, userExam: UserExam, answer: Answer) {
    const response = new UserAnswer();
    response.userAnswer = userAnswer;
    response.userExam = userExam;
    response.answer = answer;
    return response;
  }
}
