### Metadata

Metadata é um forma que o nestJs disponibiliza para adicionarmos routeHandlers. Ele possúi dois parâmetros "key" e "value".
```ts
@Get()
@SetMetadata('key', 'value')
getHello(): string {
    return 'Hello World'
}
```

### Decorator Metadata
uma boa prática para a reutilização de código fazer essas configurações através de decorators. Para isso, crie uma pasta no diretório common chamada decorators e lá crie o arquivo [nome_do_decorator].decorator.ts

```ts
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
```
### Utilizando metadata com guard

Quando usamos em conjunto com guards precisamos utilizar um novo recurso o "Reflector". Ele nos dará a metadata configurada na nossa chamada.

```ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import { Reflector } from '@nestjs/core';

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
```