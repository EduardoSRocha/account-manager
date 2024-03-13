import {
  IsString,
  IsOptional,
  ValidateNested,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateAddressDto } from '../address/create-address.dto'; // Importe o DTO correto para o endereço

export class CreateAccountDto {
  @ApiProperty({ description: 'Número da conta' })
  @IsString()
  readonly accountNumber: string;

  @ApiProperty({ description: 'Nome completo do titular da conta' })
  @IsString()
  readonly fullname?: string;

  @ApiProperty({ description: 'Número da agência' })
  @IsString()
  readonly branchNumber: string;

  @ApiProperty({ description: 'Provedor BAAS' })
  @IsString()
  readonly baasProvider: string;

  @ApiProperty({ description: 'Endereço' })
  @ValidateNested() // Indica que é um objeto aninhado que precisa ser validado
  @Type(() => CreateAddressDto) // Especifica o tipo do objeto AddressDto
  readonly address: CreateAddressDto; // Use o DTO AddressDto para representar o endereço

  @ApiProperty({ description: 'Número de celular' })
  @IsString()
  readonly cellphone: string;

  @ApiProperty({ description: 'Empresa Detêm a Conta' })
  @IsString({ each: true })
  readonly companies: string[];

  @ApiProperty({ description: 'Contas subsidiárias' })
  @IsOptional()
  @IsString({ each: true })
  readonly subAccounts?: string[];

  @ApiProperty({ description: 'Saldo da conta' })
  @IsOptional()
  @IsNumber()
  readonly balance?: number | null;

  @ApiProperty({ description: 'Fundos retidos na conta' })
  @IsOptional()
  @IsNumber()
  readonly fundsOnHold?: number | null;

  @ApiProperty({ description: 'Conta fechada' })
  @IsOptional()
  @IsBoolean()
  readonly isAccountClosed?: boolean | null;

  @ApiProperty({ description: 'Conta bloqueada' })
  @IsOptional()
  @IsBoolean()
  readonly isAccountBlocked?: boolean | null;
}
