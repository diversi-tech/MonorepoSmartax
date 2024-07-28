import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString, IsNotEmpty } from 'class-validator';
import { PaymentMethod } from '../paymentMethod.model';
import { User } from '../user.model';
export class UpdateBillingDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    id?: string;

    @ApiProperty()
    @IsOptional()
    @IsDateString()
    date?: Date;
  
    @ApiProperty()
    @IsOptional()
    amount?: number;

    @ApiProperty()
    @IsOptional()
    paymentMethod?: PaymentMethod;

    @ApiProperty()
    @IsOptional()
    assignedTo?: User;

    @ApiProperty()
    @IsOptional()
    isReturn?: boolean;
}
export class CreateBillingDto {
    @ApiProperty()
    @IsOptional()
    @IsDateString()
    date: Date;
  
    @ApiProperty()
    @IsOptional()
    amount: number;

    @ApiProperty()
    @IsOptional()
    paymentMethod: PaymentMethod;

    @ApiProperty()
    @IsOptional()
    assignedTo: User;

    @ApiProperty({ default: false })
    @IsOptional()
    isReturn?: boolean = false; 
}
