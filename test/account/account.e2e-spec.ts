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