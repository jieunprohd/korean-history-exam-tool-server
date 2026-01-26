import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreateUserRequest } from '../domains/auth/application/dto/create.user.request';

@Entity({ name: 'USER' })
export class User {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column('varchar', { name: 'USER_NAME' })
  username: string;

  @Column('varchar', { name: 'EMAIL' })
  email: string;

  @Column('varchar', { name: 'PASSWORD' })
  password: string;

  @CreateDateColumn({ name: 'CREATED_AT' })
  createdAt: Date;

  public static from(
    createUserRequest: CreateUserRequest,
    hashedPassword: string,
  ) {
    const response = new User();
    response.email = createUserRequest.email;
    response.username = createUserRequest.username;
    response.password = hashedPassword;
    return response;
  }
}
