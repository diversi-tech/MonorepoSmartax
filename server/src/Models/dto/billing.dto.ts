import { IsNotEmpty, IsString, IsDateString, IsOptional, isString } from 'class-validator';
import { Client } from "../client.model";
///add a conflict,, how to resolve a conflict
export class CreateBillingDto {
    @IsNotEmpty() 
    @IsString()
    client: Client;

    @IsNotEmpty()
    @IsString()
    amount: string;

    @IsNotEmpty()
    @IsString()
    status: string;

    @IsNotEmpty()
    @IsDateString()
    dueDate: Date;

    @IsOptional()
    @IsDateString()
    paidDate?: Date;
}

export class UpdateBillingDto {
    @IsOptional()
    client?: Client;

    @IsOptional()
    @IsString()
    amount?: string;

    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @IsDateString()
    dueDate?: Date;

    @IsOptional()
    @IsDateString()
    paidDate?: Date;
}
