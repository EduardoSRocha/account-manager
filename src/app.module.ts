import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { FinancialTransactionModule } from './financial-transaction/financial-transaction.module';
import { ConfigModule } from '@nestjs/config';

/**
 *  npm i @nestjs/config
 *
 *
 *  ConfigModule.forRoot(),
 *  */

@Module({
  imports: [
    ConfigModule.forRoot(),
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
