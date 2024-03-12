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

/**
// Run migration(s) 
npx typeorm migration:run -d dist/typeorm-cli.config

// REVERT migration(s)
npx typeorm migration:revert -d dist/typeorm-cli.config

// Let TypeOrm generate migrations (for you)
npx typeorm migration:generate src/migrations/SchemaSync -d dist/typeorm-cli.config

// Let TypeOrm generate migrations (for you)
npx typeorm migration:generate src/migrations/SchemaSync -d dist/typeorm-cli.config

 */
