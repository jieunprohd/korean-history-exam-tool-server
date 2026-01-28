import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Answer } from './answer';
import { UserExam } from './user.exam';

@Entity({ name: 'EXAM_SETS' })
export class ExamSet {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'NAME' })
  name: string;

  @CreateDateColumn({ name: 'CREATED_AT' })
  createdAt: Date;

  @OneToMany(() => Answer, (answer) => answer.examSet)
  answers: Answer[];

  @OneToMany(() => UserExam, (userExam) => userExam.examSet)
  userExams: UserExam[];

  constructor(fileOriginalName: string) {
    this.name = this.getFileName(fileOriginalName);
  }

  private getFileName(fileOriginalName: string) {
    const split = fileOriginalName?.split('.');
    split?.pop();
    return split?.join('.');
  }
}
