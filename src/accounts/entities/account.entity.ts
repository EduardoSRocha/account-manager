import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Company } from "./company.entity";
import { SubAccount } from "./subaccount.entity";
// import { Address } from "./address.entity"

@Entity() //sql table === 'account'
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    accountNumber: string;

    @Column()
    accountHolder: string;

    @Column()
    branchNumber: string;

    @Column()
    baasProvider: string;

    @JoinTable()
    @ManyToMany(
        () => Company, 
        {
            cascade: true,
        }
    ) 
    companies: Company[];

    @Column()
    cellphone: string;

    @OneToMany(() => SubAccount, subAccount => subAccount.account)
    subAccounts?: SubAccount[];

    // @OneToOne(() => Address, { eager: true })
    // @JoinColumn()
    // address?: string | Address;

    
}