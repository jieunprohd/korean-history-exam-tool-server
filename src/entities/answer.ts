import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ExamSet } from './exam.set';
import { UserAnswer } from './user.answer';

@Entity({ name: 'ANSWERS' })
@Unique('UQ_EXAM_QUESTION', ['examSet', 'questionNumber'])
export class Answer {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column('int', { name: 'QUESTION_NUMBER' })
  questionNumber: number;

  @Column('int', { name: 'ANSWER' })
  answer: number;

  @Column('int', { name: 'SCORE' })
  score: number;

  @CreateDateColumn({ name: 'EXTRACTED_AT' })
  extractedAt: Date;

  @ManyToOne(() => ExamSet, (examSet) => examSet.answers, {
    onDelete: 'CASCADE',
  })
  examSet: ExamSet;

  @OneToMany(() => UserAnswer, (userAnswer) => userAnswer.answer)
  userAnswers: UserAnswer[];

  public static from(
    examSet: ExamSet,
    questionNumber: number,
    answer: number,
    score: number,
  ) {
    const response = new Answer();
    response.questionNumber = questionNumber;
    response.answer = answer;
    response.score = score;
    response.examSet = examSet;
    return response;
  }
}
