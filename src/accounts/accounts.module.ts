import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Company } from './entities/company.entity'
import { SubAccount } from './entities/subaccount.entity';
// import { Address } from './entities/address.entity';

@Module({
    imports: [ 
        TypeOrmModule.forFeature([Account, Company, SubAccount])
    ],
    controllers: [AccountsController],
    providers: [AccountsService]
})
export class AccountsModule {}
