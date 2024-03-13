import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Account } from './account.entity';
export enum FinancialTransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
}

export enum FinancialTransactionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

@Index(['account', 'timestamp', 'type'])
@Entity()
export class FinancialTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 18, scale: 8 })
  amount: number;

  @Column({ type: 'enum', enum: FinancialTransactionType })
  type: FinancialTransactionType;

  @Column({
    type: 'enum',
    enum: FinancialTransactionStatus,
    default: FinancialTransactionStatus.PENDING,
  })
  status: FinancialTransactionStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column({ type: 'text' })
  description: string;

  @Index()
  @ManyToOne(() => Account, (account) => account.financialTransactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  account: Account;
}
