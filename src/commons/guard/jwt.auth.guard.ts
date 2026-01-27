import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../../domains/auth/application/auth.service';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    try {
      const can = await super.canActivate(context);
      if (!can) {
        return false;
      }
    } catch (e) {
      this.logger.error(e);
      throw e;
    }

    const request = context.switchToHttp().getRequest();
    await this.authService.findUserById(request.user.userId);

    return true;
  }
}
