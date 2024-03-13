import {
  // Inject,
  Injectable,
  NotFoundException,
  Scope,
} from '@nestjs/common';
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
import { ConfigService } from '@nestjs/config';

/**
 * ***************** section_3 ***************** 
 * 
 * E1 E2 E3 E4
 * Interface Bank define a estrutura de um objeto representando informações de um banco.
 * interface Bank {
 *    ispb: string; // O número ISPB do banco, identificador único no sistema financeiro brasileiro.
 *    name: string; // O nome abreviado ou sigla do banco.
 *    code: number; // O código do banco, geralmente um número único atribuído pelo Banco Central do Brasil.
 *    fullName: string; // O nome completo do banco.
 * }
 */

/**
 * ***************** section_3 ***************** 
 * 
 *  Escopo Singleton (por padrão): Este é o escopo padrão. Uma única instância do serviço é criada e compartilhada por todo o aplicativo. Isso significa que todas as classes e componentes que injetam esse serviço recebem a mesma instância.
 *
 *  Escopo Transiente: Cada vez que um serviço é injetado, uma nova instância é criada. Isso garante que cada componente que recebe o serviço obtenha sua própria instância exclusiva.
 *
 *  Escopo de Solicitação (Request): Uma nova instância do serviço é criada para cada requisição HTTP recebida pelo servidor. Isso garante que cada solicitação tenha seu próprio contexto isolado de serviços, útil para garantir que os dados de uma solicitação não afetem as outras.
 *
 *  Escopo de Módulo: Este escopo é controlado pelo módulo em que o serviço está sendo fornecido. Cada módulo tem sua própria instância de serviço. Quando um serviço é fornecido em um módulo, ele é compartilhado por todos os componentes desse módulo.
 */

@Injectable({ scope: Scope.REQUEST })
export class AccountsService {
  constructor(
    /**
     * ***************** section_2 ***************** 
     * 
     * Injeção de dependência do repositório da entidade Account usando o decorator @InjectRepository.
     * Isso permite que o serviço acesse métodos para interagir com a tabela "Account" no banco de dados.
     * 
     */
   
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,

    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,

    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,

    @InjectRepository(SubAccount)
    private readonly subAccountRepository: Repository<SubAccount>,

    private readonly dataSource: DataSource,

    /**
     * ***************** section_3 ***************** 
     * 
     * @Inject('ISPB_LIST') ispb_list: Bank[], //Injeção de dependência do array ISPB_LIST
     * 
     * ***************** section_4 ***************** 
     * 
     * private readonly configService: ConfigService,
     */ 
  ) {
    /**
     * ***************** section_3 ***************** 
     * O array ispb_list é uma lista de objetos do tipo Bank,
     * cada um representando um banco com informações como ISPB, nome, código e nome completo.
     * Ao iniciar o serviço, o array ispb_list é injetado e pode ser acessado em todo o serviço.
     * Isso permite que o serviço utilize informações estáticas sobre os bancos, como ISPBs, para operações futuras.
     * 
     * console.log(ispb_list) // VISUALIZAÇÃO no terminal dos valores ao injetar uma dependencia.
     *
     * E5
     * 
     * ESCOPO
     * testando iniciação da instância: console.log('Account instantiated');
     * 
     * ***************** section_4 ***************** 
     * ANTES DO app.config
     * Por conta da configuração Scope.REQUEST você deve fazer uma request para ver a impressão no console
     * 
     * const databaseHost = this.configService.get<string>('DATABASE_HOST');
     * console.log(databaseHost);
     * 
     * obs.
     * Ao passar um segundo argumento "const databaseHost = this.configService.get<string>('DATABASE_HOST', 'localhost');"
     * o segundo argumento vira o valor default
     * 
     * DEPOIS do app.config
     * 
     * const databaseHost = this.configService.get('database.host', 'localhost');
     * 
     */
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.accountRepository.find({
      relations: ['companies'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const account = await this.accountRepository.findOne({
      where: { id: +id },
      relations: ['companies'],
    });
    if (!account) {
      throw new NotFoundException(`Account #${id} not found`);
    }
    return account;
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    const companies =
      updateAccountDto.companies &&
      (await Promise.all(
        updateAccountDto.companies.map((name) =>
          this.preloadCompanyByName(name),
        ),
      ));

    const subAccounts =
      updateAccountDto.subAccounts &&
      (await Promise.all(
        updateAccountDto.subAccounts.map((accountNumber) =>
          this.preloadSubAccountByAccountNumber(accountNumber),
        ),
      ));

    const account = await this.accountRepository.preload({
      id: +id,
      ...updateAccountDto,
      companies,
      subAccounts,
    });

    if (!account) {
      throw new NotFoundException(`Account #${id} not found`);
    }

    return this.accountRepository.save(account);
  }

  async remove(id: string) {
    const account = await this.findOne(id);
    return this.accountRepository.remove(account);
  }

  async create(createAccountDto: CreateAccountDto) {
    let companies = [];
    if (createAccountDto.companies && createAccountDto.companies.length > 0) {
      companies = await Promise.all(
        createAccountDto.companies.map((name) =>
          this.preloadCompanyByName(name),
        ),
      );
    }

    let subAccounts = [];
    if (
      createAccountDto.subAccounts &&
      createAccountDto.subAccounts.length > 0
    ) {
      subAccounts = await Promise.all(
        createAccountDto.subAccounts.map((accountNumber) =>
          this.preloadSubAccountByAccountNumber(accountNumber),
        ),
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
      address,
    };

    return this.accountRepository.save(account);
  }

  private async createAddress(addressDto: CreateAddressDto): Promise<Address> {
    const address = this.addressRepository.create(addressDto);
    return this.addressRepository.save(address);
  }

  private async preloadCompanyByName(name: string): Promise<Company> {
    const existingCompany = await this.companyRepository.findOne({
      where: { name },
    });

    if (existingCompany) {
      return existingCompany;
    }

    return this.companyRepository.create({ name });
  }

  private async preloadSubAccountByAccountNumber(
    subAccountName: string,
  ): Promise<SubAccount | null> {
    if (!subAccountName) {
      return null; // Se subAccountName for nulo ou indefinido, retornar null
    }

    const existingSubAccount = await this.subAccountRepository.findOne({
      where: { accountNumber: subAccountName },
    });

    if (existingSubAccount) {
      return existingSubAccount;
    }

    return this.subAccountRepository.create({ accountNumber: subAccountName });
  }

  async emitFinancialTransactionEvent(
    account: Account,
    financialTransaction: FinancialTransaction,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const cashout = new Event();
      cashout.name = 'cashout';
      cashout.payload = {
        accountPayer: account.id,
        financialTransaction,
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
