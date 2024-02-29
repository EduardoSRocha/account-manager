import { Injectable } from '@nestjs/common';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto/create-account.dto';
import { UpdateAccountDto } from './dto/create-account.dto/update-account.dto';

@Injectable()
export class AccountsService {
    private accounts: Account[] = [
        {
            id: 1,
            account_number: "987654321",
            account_holder: "João Silva",
            transactions: ["Transaction1", "Transaction2", "Transaction3"],
            branch_number: "1234",
            baas_provider: "SomeProvider",
            address_id: "987654",
            cellphone: "123-456-7890"
        }
    ];

    findAll() {
        return this.accounts;
    }

    findOne(id: string) {
        return this.accounts.find(item => item.id === +id);
    }

    create(createAccountData: CreateAccountDto) {
        const id:number = this.accounts.length + 1
        const accountCreated: Account = {
            id,
            ...createAccountData
        }

        this.accounts.push(accountCreated)
        return accountCreated
    }
    
    update(id: string, updateAccountsDto: UpdateAccountDto) {
        const existingAccount = this.findOne(id);
        if (existingAccount) {
            // update the existing entity
        }
    }
    
    remove(id: string) {
        const accountsIndex = this.accounts.findIndex(item => item.id === +id);
        
        if (accountsIndex >= 0) {
            this.accounts.splice(accountsIndex, 1);
        }
    }
}
