import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { FinancialTransactionModule } from './financial-transaction/financial-transaction.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import * as Joi from '@hapi/joi';
import appConfig from './config/app.config';

/**
 * ***************** section_4 *****************
 * O serviço ConfigModule do NestJS fornece uma maneira conveniente de carregar e acessar configurações de ambiente em uma aplicação. Ele permite que você defina variáveis de ambiente em um arquivo .env e as acesse facilmente em todo o seu aplicativo.
 *
 * Além disso, o ConfigModule suporta a validação e a tipagem das configurações, tornando mais fácil garantir que suas configurações sejam definidas corretamente e que tenham os tipos esperados.
 * 
 * E1.
 *
 * Configure o .env
 *
 * npm i @nestjs/config
 *
 * ConfigModule.forRoot(),
 *
 * E2.
 *
 * Validação de schema
 * 
 * npm install @hapi/joi
 * npm install --save-dev @types/hapi__joi
 * 
 * Para validar que uma variável de ambiente foi configurada use a Joi.required() dentro do Joi.object({}), Tudo que não for configurado ali será opicional.
 * Você pode passar um valor default entre outros (consultar doc da lib)
 * 
 * Essa Validação é importante principalmente para configurações mais complexas.
 *
 */

@Module({
  imports: [
    /**
     *  ***************** section_4 *****************
     * Antes de refatorar o forRoot do typeOrmModule para a versão Async
     * 
     * o typeoOrmModule por usar o process.env deve ser configurado após o ConfigModule
     * 
     * ConfigModule.forRoot({
     *   load: [appConfig],
     *   validationSchema: Joi.object({
     *     DATABASE_HOST: Joi.required(),
     *     DATABASE_PORT: Joi.number().default(5432),
     *   })
     * }),
     * 
     * TypeOrmModule.forRoot({
     *   type: 'postgres', // tipo do banco de dados
     *   host: process.env.DATABASE_HOST,
     *   port: +process.env.DATABASE_PORT, // porta do banco de dados
     *   username: process.env.DATABASE_USER, // nome de usuário
     *   password: process.env.DATABASE_PASSWORD, // senha do usuário
     *   database: process.env.DATABASE_NAME, // nome do banco de dados
     *   autoLoadEntities: true, // modelos serão carregados automaticamente
     *   synchronize: true, // suas entidades serão sincronizadas com o banco de dados (recomendado: desativar em produção)
     * }),
     * 
     * */
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: true,
      })
    }),
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
      })
    }),
    AccountsModule,
    FinancialTransactionModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
