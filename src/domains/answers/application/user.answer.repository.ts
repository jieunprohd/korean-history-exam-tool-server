import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAnswer } from '../../../entities/user.answer';
import { UserExam } from '../../../entities/user.exam';

@Injectable()
export class UserAnswerRepository {
  constructor(
    @InjectRepository(UserAnswer) private readonly repo: Repository<UserAnswer>,
  ) {}

  public async save(userAnswer: UserAnswer) {
    return await this.repo.save(userAnswer);
  }

  public async findByUserExam(userExam: UserExam) {
    return await this.repo.find({
      where: { userExam },
      relations: ['answer'],
    });
  }
}
