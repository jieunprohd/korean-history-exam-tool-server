import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserRequest } from './dto/create.user.request';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { User } from '../../../entities/user';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenPayload } from '../../answers/application/token.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  public async createUser(request: CreateUserRequest) {
    const existingUser = await this.userRepository.findByEmail(request.email);

    if (existingUser) {
      throw new BadRequestException('동일한 이메일의 사용자가 존재합니다.');
    }

    const hashedPassword = await bcrypt.hash(request.password, 10);
    await this.userRepository.save(User.from(request, hashedPassword));

    const accessToken = await this.createUserToken(existingUser);
    return accessToken; // TODO CommonResponse 형태 변경 필요
  }

  private async createUserToken(user: User) {
    const payload: AccessTokenPayload = {
      userId: user.id.toString(),
      username: user.username,
      email: user.email,
    };

    return this.jwtService.sign(payload, {
      expiresIn: '1d', // TODO env 이동 필요
      secret: '',
    });
  }
}
