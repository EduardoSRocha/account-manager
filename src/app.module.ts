import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { FinancialTransactionModule } from './financial-transaction/financial-transaction.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

/**
 *  Configure o .env
 * 
 *  npm i @nestjs/config
 *
 *  ConfigModule.forRoot(),
 *  */

/**
 * Validação de schema
 * 
 * npm install @hapi/joi
 * npm install --save-dev @types/hapi__joi
 * 
 * Para validar que uma variável de ambiente foi configurada use a Joi.required() dentro do Joi.object({}), Tudo que não for configurado ali será opicional.
 * Você pode passar um valor default entre outros (consultar doc da lib)
 * 
 * 
 * 
 */

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
      })
    }),
    AccountsModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // tipo do banco de dados
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT, // porta do banco de dados
      username: process.env.DATABASE_USER, // nome de usuário
      password: process.env.DATABASE_PASSWORD, // senha do usuário
      database: process.env.DATABASE_NAME, // nome do banco de dados
      autoLoadEntities: true, // modelos serão carregados automaticamente
      synchronize: true, // suas entidades serão sincronizadas com o banco de dados (recomendado: desativar em produção)
    }),
    FinancialTransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
