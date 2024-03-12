import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { FinancialTransactionModule } from './financial-transaction/financial-transaction.module';

@Module({
  imports: [
    AccountsModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // tipo do banco de dados
      host: 'localhost', // host do banco de dados
      port: 5432, // porta do banco de dados
      username: 'postgres', // nome de usuário
      password: 'pass123', // senha do usuário
      database: 'postgres', // nome do banco de dados
      autoLoadEntities: true, // modelos serão carregados automaticamente
      synchronize: true, // suas entidades serão sincronizadas com o banco de dados (recomendado: desativar em produção)
    }),
    FinancialTransactionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
