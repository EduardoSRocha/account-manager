import { Injectable, NotFoundException } from '@nestjs/common';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto/create-account.dto';
import { UpdateAccountDto } from './dto/create-account.dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>
    ) {}

    findAll() {
        return this.accountRepository.find()
    }

    async findOne(id: string) {
        const account = await this.accountRepository.findOne({ where: {id: +id}})
        if(!account){
            throw new NotFoundException(`Account #${id} not found`)
        }
        return account

    }

    create(createAccountData: CreateAccountDto) {
        const account = this.accountRepository.create(createAccountData);
        return this.accountRepository.save(account)
    }
    
    async update(id: string, updateAccountsDto: UpdateAccountDto) {
        const account = await this.accountRepository.preload({
            id: +id,
            ...updateAccountsDto
        })
        if(!account){
            throw new NotFoundException(`Account #${id} not found`)
        }
        return this.accountRepository.save(account)
    }
    
    async remove(id: string) {
        // Encontrar a conta pelo ID
        const account = await this.findOne(id)
        return this.accountRepository.remove(account)
    }
}
