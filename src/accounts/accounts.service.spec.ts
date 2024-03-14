import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { DataSource, Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { SubAccount } from './entities/subaccount.entity';
import { FinancialTransaction } from './entities/financial-transaction.entity';
import { Company } from './entities/company.entity';
import { Event } from '../events/entities/event.entity';
import { NotFoundException } from '@nestjs/common';

/**
 * Para rodar um arquivo específico de teste
 *
 * npm run test:watch -- src/accounts/accounts.service.spec.ts
 */

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('AccountsService', () => {
  let service: AccountsService;
  let accountRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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
          provide: getRepositoryToken(FinancialTransaction),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Company),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Event),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = await module.resolve<AccountsService>(AccountsService);
    accountRepository = await module.resolve<MockRepository>(
      getRepositoryToken(Account),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when account with ID exists', () => {
      it('should return the account object || status: 200', async () => {
        const accountID = '1';
        const expectedAccount = {};

        accountRepository.findOne.mockReturnValue(expectedAccount);
        const account = await service.findOne(accountID);
        expect(account).toEqual(expectedAccount);
      });

      it('should throw the "NotFoundException"', async () => {
        const coffeeId = '1';
        accountRepository.findOne.mockReturnValue(undefined);

        try {
          await service.findOne(coffeeId);
          expect(false).toBeTruthy(); // we should never hit this line
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Account #${coffeeId} not found`);
        }
      });
    });
  });
});
