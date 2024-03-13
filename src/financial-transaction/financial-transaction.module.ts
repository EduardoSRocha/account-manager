import { Module } from '@nestjs/common';
import { FinancialTransactionService } from './financial-transaction.service';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
  imports: [AccountsModule],
  providers: [FinancialTransactionService],
})
export class FinancialTransactionModule {}
