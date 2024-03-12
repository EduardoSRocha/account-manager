import { Injectable, NotFoundException } from '@nestjs/common';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/account/create-account.dto';
import { UpdateAccountDto } from './dto/account/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { Address } from './entities/address.entity';
import { SubAccount } from './entities/subaccount.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { CreateAddressDto } from './dto/address/create-address.dto';
import { Event } from 'src/events/entities/event.entity';
import { FinancialTransaction } from './entities/financial-transaction.entity';


@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,

        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,

        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>,

        @InjectRepository(SubAccount)
        private readonly subAccountRepository: Repository<SubAccount>,

        private readonly dataSource: DataSource,
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
    
        let address: Address | undefined;
        if (createAccountDto.address) {
            address = await this.createAddress(createAccountDto.address);
        }
    
        const account = {
            ...createAccountDto,
            companies,
            subAccounts,
            address // Assign the address to the account
        };
    
        return this.accountRepository.save(account);
    }
    
    private async createAddress(addressDto: CreateAddressDto): Promise<Address> {
        const address = this.addressRepository.create(addressDto);
        return this.addressRepository.save(address);
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
    
    async emitFinancialTransactionEvent(account: Account, financialTransaction: FinancialTransaction) {
        const queryRunner = this.dataSource.createQueryRunner();
    
        await queryRunner.connect();
        await queryRunner.startTransaction();
    
        try {
            const cashout = new Event();
            cashout.name = 'cashout';
            cashout.payload = {
                accountPayer: account.id,
                financialTransaction
            };
    
            // Commit da transação
            await queryRunner.commitTransaction();
        } catch (error) {
            // Rollback em caso de erro
            await queryRunner.rollbackTransaction();
            throw error; // Re-lança o erro para ser tratado em um nível superior
        } finally {
            // Sempre liberar o queryRunner
            await queryRunner.release();
        }
    }

}
