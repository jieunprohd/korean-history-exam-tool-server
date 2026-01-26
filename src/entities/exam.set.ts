import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Answer } from './answer';

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
}
