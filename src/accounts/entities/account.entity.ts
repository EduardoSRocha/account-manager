import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { SubAccount } from './subaccount.entity';
import { Address } from './address.entity';
import { FinancialTransaction } from './financial-transaction.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accountNumber: string;

  @Column()
  fullname: string;

  @Column()
  branchNumber: string;

  @Column()
  baasProvider: string;

  @JoinTable()
  @ManyToMany(() => Company, {
    cascade: true,
  })
  companies: Company[];

  @Column()
  cellphone: string;

  @OneToMany(() => SubAccount, (subAccount) => subAccount.account)
  subAccounts?: SubAccount[];

  @OneToMany(
    () => FinancialTransaction,
    (financialTransaction) => financialTransaction.account,
  )
  financialTransactions: FinancialTransaction[];

  @OneToOne(() => Address, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  address: Address;

  @Column({ default: 0 })
  balance: number;

  @Column({ default: 0 })
  fundsOnHold: number;

  @Column({ default: false })
  isAccountClosed?: boolean;

  @Column({ default: false })
  isAccountBlocked?: boolean;
}
