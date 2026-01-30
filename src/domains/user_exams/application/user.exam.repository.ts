import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserExam } from '../../../entities/user.exam';
import { Repository } from 'typeorm';

@Injectable()
export class UserExamRepository {
  constructor(
    @InjectRepository(UserExam) private readonly repo: Repository<UserExam>,
  ) {}

  public async save(userExam: UserExam) {
    return await this.repo.save(userExam);
  }

  public async findById(userExamId: number) {
    return await this.repo.findOne({
      where: { id: userExamId },
      relations: [
        'examSet',
        'examSet.answers',
        'userAnswers',
        'userAnswers.answer',
      ],
    });
  }
}
