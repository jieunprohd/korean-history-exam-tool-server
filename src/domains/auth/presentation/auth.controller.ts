import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserRequest } from '../application/dto/create.user.request';
import { AuthService } from '../application/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Body() request: CreateUserRequest) {
    return await this.authService.createUser(request);
  }

  @Post('login')
  public async login() {
    // 로그인
    // email, password
  }

  @Get()
  public async getUserByToken() {
    // 유저 저옵 조회
    // Bearer Token
  }
}
