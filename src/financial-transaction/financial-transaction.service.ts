import { Injectable } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';

@Injectable()
export class FinancialTransactionService {
  constructor(private readonly accountService: AccountsService) {}
}
