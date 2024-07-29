import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsBoolean } from 'class-validator';

export class CreateSensitiveDataDto {
  @ApiProperty()
  @IsNumber()
  number: number;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  clientId: string;
  @ApiProperty()
  @IsString()
  a: string;
  @ApiProperty()
  @IsString()
  b: string;
  @ApiProperty()
  @IsString()
  c: string;
  @ApiProperty()
  @IsString()
  d: string;
  @ApiProperty()
  @IsString()
  e: string;
  @ApiProperty()
  @IsString()
  f: string;
  @ApiProperty()
  @IsBoolean()
  isExist: boolean;
}

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
