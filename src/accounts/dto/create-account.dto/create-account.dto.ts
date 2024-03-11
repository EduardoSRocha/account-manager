import { IsString, IsOptional } from 'class-validator'
// import { Address } from 'src/accounts/entities/address.entity';
export class CreateAccountDto {

    @IsString()
    readonly accountNumber: string;

    @IsString()
    readonly accountHolder: string;
    
    @IsString()
    readonly branchNumber: string;
    
    @IsString()
    readonly baasProvider: string;
    
    // @IsOptional()
    // readonly address?: string | Address;
    
    @IsString()
    readonly cellphone: string;

    @IsString({ each: true })
    readonly companies: string[];

    @IsOptional()
    @IsString({ each: true })
    readonly subAccounts?: string[];
    
}