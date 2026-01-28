import { Global, Module } from '@nestjs/common';
import { AuthController } from './presentation/auth.controller';
import { AuthService } from './application/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserRepository } from './application/user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../commons/guard/jwt.strategy';
import { JwtAuthGuard } from '../../commons/guard/jwt.auth.guard';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'secretKey', // TODO env 이동 필요
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    UserRepository,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [AuthService, JwtService, JwtAuthGuard],
})
export class AuthModule {}
