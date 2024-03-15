import { INestApplication } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountsModule } from "src/accounts/accounts.module";

describe ('[Feature] Account - /accounts',() => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AccountsModule,
                TypeOrmModule.forRoot({
                    type: 'postgres',
                    host: 'localhost',
                    port: 5433,
                    username: 'postgres',
                    password: 'pass123',
                    database: 'postgres',
                    autoLoadEntities: true,
                    synchronize: true,
                  }),
            ],
        }).compile()

        app = moduleFixture.createNestApplication();
        await app.init()
    })

    /**
     * estratégias de testes com DB
     * 
     * 1. Mocar interações
     * 2. disk-based DB [sequelize]
     * 3. adicionar uma db testing adicional
     * 
     * para fazer os testes vamos criar uma instãncia especial do postgress
     * 
     * vamos iniciá-la antes do test:e2e e depois dele:
     *  - configure o package.json com mais esses dois scripts
     *      "pretest:e2e": "docker compose up -d test-db",
     *      "posttest:e2e": "docker compose stop test-db && docker-compose rm -f test-db"
     *  - configure o docker-compose.yml
     *   test-db:
     *      image: postgres
     *      restart: always
     *      ports:
     *        - "5433:5432"
     *      environment:
     *        POSTGRES_PASSWORD: pass123
     * 
     * 
     * Uma boa prática para os testes é utilizar o método todo, dessa forma você sabe que tem aquele teste específico para escrever
     *  
     * it.todo('Create [ POST /]')
     * it.todo('Get all [ GET/]')
     * it.todo('Get one [ GET/:id]')
     * it.todo('Update one [ PATH/:id]')
     * it.todo('Update one [ PUT/:id]')
     * it.todo('Delete one [ DELETE/:id]')
     * 
     */

    it.todo('Create [ POST /]')
    it.todo('Get all [ GET/]')
    it.todo('Get one [ GET/:id]')
    it.todo('Update one [ PATH/:id]')
    it.todo('Update one [ PUT/:id]')
    it.todo('Delete one [ DELETE/:id]')

    afterAll(async () => {
        await app.close()
    })

})