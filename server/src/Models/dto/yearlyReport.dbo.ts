import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString, IsString, isNumber, IsNumber, ValidateNested, IsOptional } from 'class-validator';
import { StepField } from '../stepField.model';
import { Status } from '../status.model';
import { Index } from 'typeorm';
import { Type } from 'class-transformer';

@Schema()
export class CreateYearlyReportDto {

    @ApiProperty({ example: 'user_id_example', required: true })
    @IsNotEmpty()
    @IsString()
    idClient: string;

    @ApiProperty({ example: ['assignee1', 'assignee2'], required: false })
    @IsString({ each: true })
    assignee: string[];

    @ApiProperty({ example: 'employee_id_example', required: true })
    @IsNotEmpty()
    @IsString()
    idEmploye: string;

    @ApiProperty({ example: '2023', required: true })
    @IsNotEmpty()
    yearReport: string;

    @ApiProperty({ example: new Date() , required: true})
    @IsNotEmpty()
    @IsDateString()
    dateTime: Date;

    @ApiProperty({ example: 100 , required: true})
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty({ example: 50, required: true})
    @IsNotEmpty()
    @IsNumber()
    paymentAmountPaid: number;

    @ApiProperty({ example: 50,required: true })
    @IsNotEmpty()
    @IsNumber()
    balanceDue: number;

    @ApiProperty({ type: [StepField],required: true })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => StepField)
    stepsList: StepField[];

    @ApiProperty({required: true})
    @IsNotEmpty()
    @IsString()
    entityType: string;

    @ApiProperty({required: true})
    @IsNotEmpty()
    status: Status;
}

export class UpdateYearlyReportDto {

    @ApiProperty({ example: 'user_id_example', required: false })
    @IsOptional()
    @IsString()
    idClient?: string;

    @ApiProperty({ example: ['assignee1', 'assignee2'], required: false })
    @IsOptional()
    @IsString({ each: true })
    assignee?: string[];

    @ApiProperty({ example: 'employee_id_example', required: false })
    @IsOptional()
    @IsString()
    idEmploye?: string;

    @ApiProperty({ example: '2023', required: false })
    @IsOptional()
    yearReport?: string;

    @ApiProperty({ example: new Date() , required: false})
    @IsOptional()
    @IsDateString()
    dateTime?: Date;

    @ApiProperty({ example: 100 , required: false})
    @IsOptional()
    @IsNumber()
    price?: number;

    @ApiProperty({ example: 50, required: false})
    @IsOptional()
    @IsNumber()
    paymentAmountPaid?: number;

    @ApiProperty({ example: 50,required: false })
    @IsOptional()
    @IsNumber()
    balanceDue?: number;

    @ApiProperty({ type: [StepField],required: false })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => StepField)
    stepsList?: StepField[];

    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    entityType?: string;

    @ApiProperty({required: false})
    @IsOptional()
    status?: Status;
}