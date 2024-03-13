import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({ description: 'Rua' })
  @IsString()
  readonly street: string;

  @ApiProperty({ description: 'Número' })
  @IsString()
  readonly number: string;

  @ApiProperty({ description: 'Bairro' })
  @IsString()
  readonly district: string;

  @ApiProperty({ description: 'Complemento' })
  @IsOptional()
  @IsString()
  readonly complement: string | null;

  @ApiProperty({ description: 'Cidade' })
  @IsString()
  readonly city: string;

  @ApiProperty({ description: 'Estado' })
  @IsString()
  readonly state: string;

  @ApiProperty({ description: 'CEP' })
  @IsString()
  readonly postalCode: string;

  @ApiProperty({ description: 'País' })
  @IsString()
  readonly country: string;
}
