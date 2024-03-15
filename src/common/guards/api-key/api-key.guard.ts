import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import { Reflector } from '@nestjs/core';

/**
 * Os guards atuam como filtros antes que uma rota seja manipulada. Eles podem permitir ou negar o acesso a uma rota com base em lógica específica definida por você. Essa lógica pode incluir verificações de autenticação, autorização, estado da sessão do usuário, entre outros.
 */
@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();

    const authHeader = request.header('Authorization');
    return authHeader === this.configService.get('API_KEY');
  }
}
