import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserRequest } from './dto/create.user.request';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { User } from '../../../entities/user';
import { JwtService } from '@nestjs/jwt';
import { LoginUserRequest } from './dto/login.user.request';
import { AccessTokenPayload } from '../../../commons/decorators/token.payload';
import { CommonResponse } from '../../../commons/response/common.response';
import { CreateUserResponse } from './dto/create.user.response';
import { ResponseCode } from '../../../commons/constants/response.code';

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
    const user = await this.userRepository.save(
      User.from(request, hashedPassword),
    );

    const accessToken = await this.createUserToken(user);

    return CommonResponse.of(
      new CreateUserResponse(user.id, accessToken),
      true,
      ResponseCode.CREATED,
    );
  }

  public async loginUser(request: LoginUserRequest) {
    const user = await this.userRepository.findByEmail(request.email);

    if (!user) {
      throw new NotFoundException('해당 이메일의 사용자가 존재하지 않습니다.');
    }

    const isSamePassword = await bcrypt.compare(
      request.password,
      user.password,
    );

    if (!isSamePassword) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    }

    const accessToken = await this.createUserToken(user);

    return CommonResponse.of(
      new CreateUserResponse(user.id, accessToken),
      true,
      ResponseCode.OK,
    );
  }

  public async findUserById(userId: string) {
    const user = await this.userRepository.findByUserId(userId);

    if (!user) {
      throw new NotFoundException('해당 사용자가 존재하지 않습니다.');
    }

    return user;
  }

  public async findUserByUserIdOrElseThrow(userId: string) {
    const user = await this.userRepository.findByUserId(userId);

    if (!user) {
      throw new NotFoundException('사용자가 존재하지 않습니다.');
    }

    return user;
  }

  private async createUserToken(user: User) {
    const payload: AccessTokenPayload = {
      userId: user.id.toString(),
      username: user.username,
      email: user.email,
    };

    return this.jwtService.sign(payload, {
      secret: 'secretKey',
      expiresIn: '1h',
    });
  }
}
