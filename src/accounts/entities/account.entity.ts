import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity() //sql table === 'account'
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    account_number: string;

    @Column()
    account_holder: string;

    @Column('json', { nullable: true })
    transactions: string[];

    @Column()
    branch_number: string;

    @Column()
    baas_provider: string;

    @Column()
    address_id: string;

    @Column()
    cellphone: string;
}