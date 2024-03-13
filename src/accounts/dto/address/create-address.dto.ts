import { IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  readonly street: string;

  @IsString()
  readonly number: string;

  @IsString()
  readonly district: string;

  @IsString()
  readonly complement: string;

  @IsString()
  readonly city: string;

  @IsString()
  readonly state: string;

  @IsString()
  readonly postalCode: string;

  @IsString()
  readonly country: string;
}
