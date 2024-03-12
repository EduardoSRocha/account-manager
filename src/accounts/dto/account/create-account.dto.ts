import { IsString, IsOptional, ValidateNested, IsNumber, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from '../address/create-address.dto'; // Importe o DTO correto para o endereço

export class CreateAccountDto {
    @IsString()
    readonly accountNumber: string;

    @IsString()
    readonly fullname?: string;
    
    @IsString()
    readonly branchNumber: string;
    
    @IsString()
    readonly baasProvider: string;
    
    @ValidateNested() // Indica que é um objeto aninhado que precisa ser validado
    @Type(() => CreateAddressDto) // Especifica o tipo do objeto AddressDto
    readonly address: CreateAddressDto; // Use o DTO AddressDto para representar o endereço

    @IsString()
    readonly cellphone: string;

    @IsString({ each: true })
    readonly companies: string[];

    @IsOptional()
    @IsString({ each: true })
    readonly subAccounts?: string[];

    @IsOptional()
    @IsNumber()
    readonly balance?: number | null;

    @IsOptional()
    @IsNumber()
    readonly fundsOnHold?: number | null;

    @IsOptional()
    @IsBoolean()
    readonly isAccountClosed?: boolean | null;

    @IsOptional()
    @IsBoolean()
    readonly isAccountBlocked?: boolean | null;
}
