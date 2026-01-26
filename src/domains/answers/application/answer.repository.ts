import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Answer } from '../../../entities/answer';
import { ExamSet } from '../../../entities/exam.set';

@Injectable()
export class AnswerRepository {
  constructor(
    @InjectRepository(Answer)
    private readonly repo: Repository<Answer>,
  ) {}

  public async findByExamSet(examSet: ExamSet) {
    return await this.repo.find({
      where: {
        examSet,
      },
      order: { questionNumber: 'ASC' },
      relations: ['examSet'],
    });
  }

  public async save(answer: Answer) {
    await this.repo.save(answer);
  }
}
