import { Injectable, NotFoundException } from '@nestjs/common';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto/create-account.dto';
import { UpdateAccountDto } from './dto/create-account.dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
// import { Address } from './entities/address.entity';
import { SubAccount } from './entities/subaccount.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,

        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,

        // @InjectRepository(Address)
        // private readonly addressRepository: Repository<Address>,

        @InjectRepository(SubAccount)
        private readonly subAccountRepository: Repository<SubAccount>
    ) {}

    findAll(paginationQuery: PaginationQueryDto) {
        const { limit, offset} = paginationQuery
        return this.accountRepository.find({
            relations: [
                'companies',
            ],
            skip: offset,
            take: limit
        })
    }

    async findOne(id: string) {
        const account = await this.accountRepository.findOne({ 
            where: {id: +id},
            relations: ['companies']
        })
        if(!account){
            throw new NotFoundException(`Account #${id} not found`)
        }
        return account

    }
    
    async update(id: string, updateAccountDto: UpdateAccountDto) {
        const companies = updateAccountDto.companies && 
            (await Promise.all(
                updateAccountDto.companies.map(name=> this.preloadCompanyByName(name))
            ));
    
        const subAccounts = updateAccountDto.subAccounts &&
            (await Promise.all(
                updateAccountDto.subAccounts.map(accountNumber => this.preloadSubAccountByAccountNumber(accountNumber))
            ));
    
        const account = await this.accountRepository.preload({
            id: +id,
            ...updateAccountDto,
            companies,
            subAccounts
        });
    
        if(!account){
            throw new NotFoundException(`Account #${id} not found`);
        }
    
        return this.accountRepository.save(account);
    }
    async remove(id: string) {
        // Encontrar a conta pelo ID
        const account = await this.findOne(id)
        return this.accountRepository.remove(account)
    }

    async create(createAccountDto: CreateAccountDto) {
        let companies = [];
        if (createAccountDto.companies && createAccountDto.companies.length > 0) {
            companies = await Promise.all(
                createAccountDto.companies.map(name => this.preloadCompanyByName(name))
            );
        }
    
        let subAccounts = [];
        if (createAccountDto.subAccounts && createAccountDto.subAccounts.length > 0) {
            subAccounts = await Promise.all(
                createAccountDto.subAccounts.map(accountNumber => this.preloadSubAccountByAccountNumber(accountNumber))
            );
        }
    
        // let address = null;
        // if (createAccountDto.address && typeof(createAccountDto.address) !== 'string') {
        //     address = await this.preloadAddressById(createAccountDto.address)
        // } else {
        //     address = createAccountDto.address
        // }
    
        const account = {
            ...createAccountDto,
            companies,
            subAccounts
            // address
        };
    
        return this.accountRepository.save(account);
    }
    

    private async preloadCompanyByName(name: string): Promise<Company> {
        const existingCompany = await this.companyRepository.findOne({
            where: { name }
        })

        if(existingCompany){
            return existingCompany
        }

        return this.companyRepository.create({ name })
    }

    // private async preloadAddressById(address: Address): Promise<Address | null> {
    //     if(!address){
    //         return null; // Se subAccountName for nulo ou indefinido, retornar null
    //     }

    //     const existingAddress = await this.addressRepository.findOne({
    //         where: { id: address.id }
    //     })

    //     if (existingAddress) {
    //         return existingAddress;
    //     }

    //     return this.addressRepository.create(address);
  
    // }

    private async preloadSubAccountByAccountNumber(subAccountName: string): Promise<SubAccount | null> {
        if (!subAccountName) {
            return null; // Se subAccountName for nulo ou indefinido, retornar null
        }
    
        const existingSubAccount = await this.subAccountRepository.findOne({
            where: { accountNumber: subAccountName }
        });
    
        if (existingSubAccount) {
            return existingSubAccount;
        }
    
        return this.subAccountRepository.create({ accountNumber: subAccountName });
    }
    
}
