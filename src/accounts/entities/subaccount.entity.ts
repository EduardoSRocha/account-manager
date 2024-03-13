import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './account.entity';

@Entity()
export class SubAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accountNumber: string;

  @ManyToOne(() => Account, (account) => account.subAccounts)
  account: Account;

  @Column()
  isAccountActive?: boolean;

  @Column()
  isAccountBlocked?: boolean;
}
