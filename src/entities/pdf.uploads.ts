import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';

export enum PdfType {
  QUESTION = 'QUESTION',
  ANSWER = 'ANSWER',
}

@Entity('PDF_UPLOADS')
export class PdfUpload {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  filePath: string;

  @Column({ type: 'enum', enum: PdfType })
  type: PdfType;

  @CreateDateColumn()
  uploadDate: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'USER_ID' })
  user: User;
}
