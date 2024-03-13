import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { DataSource, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Address } from './entities/address.entity';
import { SubAccount } from './entities/subaccount.entity';
import { FinancialTransaction } from './entities/financial-transaction.entity';
import { Company } from './entities/company.entity';


type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
})

describe('AccountsController', () => {
  let controller: AccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(Account), useValue: createMockRepository() },
        { provide: getRepositoryToken(Address), useValue: createMockRepository()},
        { provide: getRepositoryToken(SubAccount), useValue: createMockRepository()},
        { provide: getRepositoryToken(FinancialTransaction), useValue: createMockRepository()},
        { provide: getRepositoryToken(Company), useValue: createMockRepository()},
        { provide: getRepositoryToken(Event), useValue: createMockRepository()},
      ],
      controllers: [
        AccountsController,
      ],
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
