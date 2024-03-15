## Binding Techniques | Métodos de associação

No ecossistema do NestJS, os conceitos de filters, guards, interceptors e pipes formam um conjunto poderoso de ferramentas para controle de fluxo, segurança e manipulação de dados em aplicativos Node.js, permitindo uma arquitetura robusta e modular.

Essas ferramentas podem ser associadas ao código nos contextos [escopos]:

### Global

#### app.useGlobalFilters

#### app.useGlobalGuards

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
