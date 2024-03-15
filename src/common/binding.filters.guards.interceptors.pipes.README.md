## Binding Techniques | Métodos de associação

No ecossistema do NestJS, os conceitos de filters, guards, interceptors e pipes formam um conjunto poderoso de ferramentas para controle de fluxo, segurança e manipulação de dados em aplicativos Node.js, permitindo uma arquitetura robusta e modular.

Essas ferramentas podem ser associadas ao código nos contextos globais, de controladores, de métodos e parâmetros.

- Filters (Filtros): São responsáveis por interceptar exceções lançadas durante o processamento de solicitações HTTP e podem manipular a resposta antes de ser enviada de volta ao cliente. Eles não estão diretamente relacionados aos princípios do SOLID.

- Guards (Guardas): São usados para controlar o acesso aos manipuladores de rota com base em determinadas condições, como autenticação ou autorização. Novamente, enquanto seguem o conceito de interceptação, não são especificamente relacionados ao SOLID.

- Interceptors (Interceptadores): Interceptam solicitações antes ou depois que elas atinjam os manipuladores de rota e as respostas antes de serem enviadas de volta ao cliente. Eles são mais uma técnica de manipulação de solicitações e respostas do que um padrão de design do SOLID.

- Pipes (Tubos): São utilizados para validar e transformar dados de entrada antes que eles alcancem os manipuladores de solicitação. Assim como os outros conceitos mencionados, os pipes são mais uma técnica específica do NestJS para garantir a integridade dos dados.

### Global

#### app.useGlobalFilters

no exemplo abaixo:

- @Catch(HttpException): Este é um decorador que marca a classe HttpExceptionFilter como um filtro de exceção para lidar com exceções do tipo HttpException. Ele diz ao NestJS que esta classe deve ser acionada sempre que ocorrer uma exceção do tipo HttpException.
- export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter: Aqui declaramos a classe HttpExceptionFilter que implementa a interface ExceptionFilter. Isso significa que a classe deve fornecer uma implementação para o método catch, que é chamado quando uma exceção ocorre.
- catch(exception: T, host: ArgumentsHost): Este é o método catch implementado pela classe. Ele é chamado sempre que uma exceção do tipo HttpException é lançada durante o processamento de uma solicitação HTTP.
- exception: T: Este parâmetro representa a exceção que foi lançada. Ele é do tipo genérico T, que é uma HttpException ou qualquer subclasse dela.
- host: ArgumentsHost: Este parâmetro contém informações sobre o contexto da solicitação HTTP atual.
- const contex = host.switchToHttp(): Aqui estamos mudando o contexto do host para o contexto HTTP usando o método switchToHttp(). Isso nos permite acessar objetos relacionados ao contexto HTTP, como a resposta.
- const response = contex.getResponse<Response>(): Aqui estamos obtendo o objeto de resposta HTTP do contexto. Estamos tipando-o como Response para ter acesso aos métodos específicos do Express.js.
- const status = exception.getStatus(): Aqui estamos obtendo o código de status HTTP da exceção usando o método getStatus() da exceção.
- const exceptionResponse = exception.getResponse(): Aqui estamos obtendo a resposta da exceção usando o método getResponse() da exceção. Esta resposta pode ser uma mensagem de erro ou um objeto contendo detalhes do erro.
- const error = ...: Aqui estamos verificando se a resposta é uma string (mensagem de erro) ou um objeto. Se for uma string, criamos um objeto contendo a mensagem de erro. Se não for, usamos o próprio objeto de resposta da exceção.
- response.status(status).json({...}): Aqui estamos definindo o código de status da resposta usando o método status() e, em seguida, enviando a resposta JSON para o cliente com os detalhes do erro e um carimbo de data e hora.

```ts

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const contex = host.switchToHttp();
    const response = contex.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const error =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object);

    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
    });
  }
}
```

#### app.useGlobalGuards
- @Injectable(): Este é um decorador que marca a classe ApiKeyGuard como um provedor gerenciado pelo NestJS, o que significa que ele pode ser injetado em outras partes do código.
- export class ApiKeyGuard implements CanActivate: Aqui declaramos a classe ApiKeyGuard, que implementa a interface CanActivate. Isso significa que a classe deve fornecer uma implementação para o método canActivate, que determina se uma rota pode ou não ser ativada com base em algumas condições.
- constructor(...) {}: Este é o construtor da classe ApiKeyGuard. Ele recebe duas dependências injetadas: reflector e configService.
- private readonly reflector: Reflector: Esta é uma instância do Reflector, que é usado para obter metadados associados a um controlador ou método de controlador.
- private readonly configService: ConfigService: Esta é uma instância do ConfigService, que é usado para acessar as configurações da aplicação.
- canActivate(context: ExecutionContext): Este é o método canActivate implementado pela classe. Ele é chamado sempre que o guard é usado para proteger uma rota.
- context: ExecutionContext: Este parâmetro contém informações sobre o contexto da solicitação atual, incluindo o manipulador associado à rota.
- const isPublic = ...: Aqui estamos usando o Reflector para obter metadados associados ao manipulador (handler) da rota. Estamos verificando se a rota é marcada como pública usando a chave IS_PUBLIC_KEY.
- if (isPublic) { return true; }: Se a rota for marcada como pública, permitimos o acesso, retornando true.
- const request = ...: Aqui estamos obtendo o objeto de solicitação HTTP do contexto usando switchToHttp(). Estamos tipando-o como Request.
- const authHeader = request.header('Authorization'): Aqui estamos obtendo o cabeçalho de autorização da solicitação HTTP.
- return authHeader === this.configService.get('API_KEY'): Aqui estamos verificando se o cabeçalho de autorização é igual à chave da API configurada na ConfigService. Se for igual, permitimos o acesso retornando true; caso contrário, negamos o acesso retornando false.

```ts
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

#### app.useGlobalInterceptors

#### app.useGlobalPipes

- Esta função é usada para aplicar pipes de validação de forma global em toda a aplicação.
- Quando você usa app.useGlobalPipes(), você está definindo que os pipes especificados serão aplicados a todas as rotas da aplicação, a menos que substituídos localmente dentro dos controladores individuais.
- Isso é útil quando você deseja aplicar um conjunto padrão de pipes de validação a todas as solicitações da sua aplicação.
####

Configurando através do providers do AppModule

- APP_PIPE
    - Você pode configurar um pipe como um provedor dentro do AppModule, definindo o pipe sob a chave APP_PIPE.
    - Isso permite que você injete esse pipe em componentes específicos, como controladores, serviços ou módulos, se necessário.
    - Ao configurar um pipe dessa maneira, você está disponibilizando-o para injeção de dependência em toda a aplicação, o que significa que você pode usá-lo em qualquer lugar onde a injeção de dependência seja suportada no NestJS.

*** Resumo ***

    Usar app.useGlobalPipes() aplica o pipe globalmente em toda a aplicação, enquanto configurar um pipe no providers do AppModule permite que ele seja injetado e usado em componentes específicos quando necessário. Ambos têm seus usos, dependendo dos requisitos específicos do seu aplicativo.

### Controller
Adicionar o decorator @usePipes() acima do controller
```ts
@UsePipes(new ValidationPipe())
@Controller('account')
export class AccountController{
    /**
     * 👇
     * ... código
     * 👆
     */
}
```

### Method
Adicionar o decorator @usePipes() acima do método dentro do controller
```ts

@Controller('account')
export class AccountController{
    /**
     * 👇
     * ... código
     * 👆
     */
    @UsePipes(new ValidationPipe())
    @Get(':id')
    findOne(@Param('id', new ValidationPipe()) id: number) {
     /**
     * 👇
     * ... código
     * 👆
     */
}
}
```

### Param * específico para pipes
Adicionar validationPipe dentro dos decorators:

@Body

```ts
  @Post()
  createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
     /**
     * 👇
     * ... Lógica para criar um usuário
     * 👆
     */
  }
```
@Params

```ts
@Get(':id')
findOne(@Param('id', new ValidationPipe()) id: number) {
     /**
     * 👇
     * ... Lógica para buscar dados com base no parâmetro da rota
     * 👆
     */
}
```
@Headers

```ts
@Get()
findAll(@Headers(new ValidationPipe()) headers: any) {
    /**
     * 👇
     * ... Lógica para manipular os cabeçalhos da solicitaçãorota
     * 👆
     */
}
```
@Request

```ts
@Post()
create(@Request(new ValidationPipe()) req: Request) {
    /**
     * 👇
     * ... Lógica para criar algo com base na solicitação completa
     * 👆
     */
}
```
@Query

```ts
@Get()
findAll(@Query(new ValidationPipe()) query: any) {
     /**
     * 👇
     * ... Lógica para buscar dados com base nos parâmetros da query
     * 👆
     */
}
```
