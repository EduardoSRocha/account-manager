/**
* 💡 Lembre-se💡
* você tem que buildar pra rodar localmente
*/

// Creating a TypeOrm Migration
npx typeorm migration:create src/migrations/EntityRefactor

// Compilar o projeto
npm run build
 
// Rodarmigration(s) 
npx typeorm migration:run -d dist/typeorm-cli.config
 
// Reverter migration(s)
npx typeorm migration:revert -d dist/typeorm-cli.config
 
// Gerar migrations automaticamente com TypeOrm
npx typeorm migration:generate src/migrations/SchemaSync -d dist/typeorm-cli.config