import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../entities/user';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  public async findByEmail(email: string) {
    return await this.repo.findOne({ where: { email } });
  }

  public async save(user: User) {
    return await this.repo.save(user);
  }
}
