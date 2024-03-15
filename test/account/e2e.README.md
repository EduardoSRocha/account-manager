### estratégias de testes com DB
 
 1. Mocar interações ❌
 2. disk-based DB [sequelize] ❌
 3. adicionar uma db testing adicional ✅
 
###  3. adicionar uma db testing adicional
 
vamos iniciá-la antes do test:e2e e depois dele:

  - configure o package.json com mais esses dois scripts
```json
      "pretest:e2e": "docker compose up -d test-db",
      "posttest:e2e": "docker compose stop test-db && docker-compose rm -f test-db"
```
  - configure o docker-compose.yml

```yml
   test-db:
      image: postgres
      restart: always
      ports:
        - "5433:5432"
      environment:
        POSTGRES_PASSWORD: pass123
```
 
💡 DICA: Uma boa prática para os testes é utilizar o método todo, dessa forma você sabe que tem aquele teste específico para escrever

```ts
it.todo('Create [ POST /]')
it.todo('Get all [ GET/]')
it.todo('Get one [ GET/:id]')
it.todo('Update one [ PATH/:id]')
it.todo('Update one [ PUT/:id]')
it.todo('Delete one [ DELETE/:id]')
```
