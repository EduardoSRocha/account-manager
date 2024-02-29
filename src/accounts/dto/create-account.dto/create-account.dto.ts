import { IsArray, IsString } from 'class-validator';
export class CreateAccountDto {
  @IsString()
  readonly account_number: string;

  @IsString()
  readonly account_holder: string;

  @IsString({ each: true })
  readonly transactions: string[];

  @IsString()
  readonly branch_number: string;

  @IsString()
  readonly baas_provider: string;

  @IsString()
  readonly address_id: string;

  @IsString()
  readonly cellphone: string;
}
