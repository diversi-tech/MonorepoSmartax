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
  bankDetail: string;
  @ApiProperty()
  @IsString()
  userName: string;
  @ApiProperty()
  @IsString()
  password: string;
  @ApiProperty()
  @IsString()
  creditCardCNumber: string;
  @ApiProperty()
  @IsString()
  creditCardCValidity: string;
  @ApiProperty()
  @IsString()
  digitsOnTheBack: string;
  @ApiProperty()
  @IsBoolean()
  isCreditCard: boolean;
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
