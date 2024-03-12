import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Company } from './entities/company.entity'
import { SubAccount } from './entities/subaccount.entity';
import { Address } from './entities/address.entity';
import { Event } from '../events/entities/event.entity';
import { FinancialTransaction } from './entities/financial-transaction.entity'

@Module({
    imports: [ 
        TypeOrmModule.forFeature([Account, Company, SubAccount, Address, Event, FinancialTransaction])
    ],
    controllers: [AccountsController],
    providers: [AccountsService],
    exports: [AccountsService]
})
export class AccountsModule {}
