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