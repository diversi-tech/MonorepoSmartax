import { IsNumber, IsString, IsBoolean } from 'class-validator';

// DTO for creating new SensitiveData
export class CreateSensitiveDataDto {
  @IsNumber()
  number: number;

  @IsString()
  name: string;

  @IsString()
  clientId: string;

  @IsString()
  bankDetail: string;

  @IsString()
  userName: string;

  @IsString()
  password: string;

  @IsString()
  creditCardCNumber: string;

  @IsString()
  creditCardCValidity: string;

  @IsString()
  digitsOnTheBack: string;

  @IsBoolean()
  isCreditCard: boolean;
}

// DTO for updating existing SensitiveData
export class UpdateSensitiveDataDto {
  @IsNumber()
  number: number;

  @IsString()
  name: string;

  @IsString()
  clientId: string;

  @IsString()
  bankDetail: string;

  @IsString()
  userName: string;

  @IsString()
  password: string;

  @IsString()
  creditCardCNumber: string;

  @IsString()
  creditCardCValidity: string;

  @IsString()
  digitsOnTheBack: string;

  @IsBoolean()
  isCreditCard: boolean;
}