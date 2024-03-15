### Lembre-se💡
você tem que buildar pra rodar localmente


### Criar a Migration com TypeOrm 
```sh
npx typeorm migration:create src/migrations/EntityRefactor
```
### Compilar o projeto
```sh
npm run build
```
 
### Rodarmigration(s) 
```sh
npx typeorm migration:run -d dist/typeorm-cli.config
```

### Reverter migration(s)
```sh
npx typeorm migration:revert -d dist/typeorm-cli.config
```
 
### Gerar migrations automaticamente com TypeOrm
```sh
npx typeorm migration:generate src/migrations/SchemaSync -d dist/typeorm-cli.config
```

### config raiz do projeto
```ts
import { DataSource } from "typeorm";

export default new DataSource({
        type: 'postgres', // tipo do banco de dados
        host: 'localhost', // host do banco de dados
        port: 5432, // porta do banco de dados
        username: 'postgres', // nome de usuário
        password: 'pass123', // senha do usuário
        database: 'postgres', // nome do banco de dados
        synchronize: true, // suas entidades serão sincronizadas com o banco de dados (recomendado: desativar em produção)
        entities: [],
        migrations: []
})
```