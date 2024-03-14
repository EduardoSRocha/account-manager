import { Test, TestingModule } from '@nestjs/testing';
import { FinancialTransactionService } from './financial-transaction.service';
import { AccountsService } from '../accounts/accounts.service';
import { DataSource, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Account } from '../accounts/entities/account.entity';
import { Address } from '../accounts/entities/address.entity';
import { SubAccount } from '../accounts/entities/subaccount.entity';
import { Company } from '../accounts/entities/company.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('FinancialTransactionService', () => {
  let service: FinancialTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FinancialTransactionService,
        AccountsService,
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(Account),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Address),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(SubAccount),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Company),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<FinancialTransactionService>(
      FinancialTransactionService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
