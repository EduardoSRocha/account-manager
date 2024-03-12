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

/**
 * 
 * Exemplo de injeção e dependencia de constantes.
 * 
 * import { IDPB_LIST } from './account.constants';
 * 
 */

class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

@Module({
    imports: [TypeOrmModule.forFeature([
        Account,
        Company,
        SubAccount,
        Address,
        Event,
        FinancialTransaction
    ])],
    controllers: [AccountsController],
    providers: [
        AccountsService,
        {
            provide: ConfigService,
            useClass: process.env.NODE_ENV === 'development' 
                ? DevelopmentConfigService 
                : ProductionConfigService,
        }
       /**
         * 
         * Exemplo de injeção e dependencia de constantes.
         * 
         * {
         *     provide: IDPB_LIST, 
         *     useValue: [{
         *         "ispb": "00000000",
         *         "name": "BCO DO BRASIL S.A.",
         *         "code": 1,
         *         "fullName": "Banco do Brasil S.A."
         *     }]
         * }
         * 
         */
    ],
    exports: [AccountsService]
})
export class AccountsModule {}

