import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ExamSet } from '../../../entities/exam.set';

@Injectable()
export class ExamSetRepository {
  constructor(
    @InjectRepository(ExamSet)
    private readonly repo: Repository<ExamSet>,
  ) {}

  public async findByName(name: string) {
    return await this.repo.findOne({
      where: { name },
      relations: ['answers'],
    });
  }

  public async findById(id: number) {
    return await this.repo.findOne({
      where: { id },
      relations: ['answers'],
    });
  }

  public async save(examSet: ExamSet) {
    return await this.repo.save(examSet);
  }

  public async findAll() {
    return await this.repo.find({
      order: { name: 'ASC' },
    });
  }
}
