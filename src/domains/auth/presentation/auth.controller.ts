import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserRequest } from '../application/dto/create.user.request';
import { AuthService } from '../application/auth.service';
import { LoginUserRequest } from '../application/dto/login.user.request';
import { JwtAuthGuard } from '../../../commons/guard/jwt.auth.guard';
import { Public } from '../../../commons/decorators/public.decorator';
import { TokenUser } from '../../../commons/decorators/token.user';
import { TokenUserInterface } from '../../../commons/decorators/token.user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  public async register(@Body() request: CreateUserRequest) {
    return await this.authService.createUser(request);
  }

  @Public()
  @Post('login')
  public async login(@Body() request: LoginUserRequest) {
    return await this.authService.loginUser(request);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  public async getUserByToken(@TokenUser() user: TokenUserInterface) {
    return await this.authService.getAllByUserId(user.userId);
  }
}
