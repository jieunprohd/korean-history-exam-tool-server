import { Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('register')
  public async register() {
    // 회원가입
    // username, email, password
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
