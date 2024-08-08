import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString, IsString, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { StepField } from '../stepField.model';
import { Status } from '../status.model';
import { Index } from 'typeorm';
import { Type } from 'class-transformer';

@Schema()
export class CreateYearlyReportDto {

    @ApiProperty({ example: 'user_id_example' ,required: true})
    @IsNotEmpty()
    @IsString()
    idClient: string;

    @ApiProperty({  example: ['assignee1', 'assignee2'],required: true })
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    assignee: string[];

    @ApiProperty({ example: 'employee_id_example',required: true })
    @IsNotEmpty()
    idEmploye: string;

    @ApiProperty({ example: '2023',required: true })
    @IsNotEmpty()
    yearReport: string;

    @ApiProperty({ type: Date, example: new Date() ,required: true})
    @IsNotEmpty()
    @IsDateString()
    dateTime: Date;

    @ApiProperty({ example: 100 ,required: true })
    @IsNotEmpty()
    price: number;

    @ApiProperty({ example: 50 ,required: true})
    @IsNotEmpty()
    paymentAmountPaid: number;

    @ApiProperty({ example: 50 ,required: true})
    @IsNotEmpty()
    balanceDue: number;

    // @ApiProperty({ type: [StepField] })
    // @IsNotEmpty()
    // stepsList: StepField[];
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => StepField)
    stepsList: StepField[];


    @ApiProperty({example: 'entityType',required: true })
    @IsNotEmpty()
    @IsString()
    entityType: string;

    @ApiProperty()
    @IsNotEmpty()
    status: Status;
}

export class UpdateYearlyReportDto {
    
    @ApiProperty({ example: 'user_id_example' ,required: false})
    @IsOptional()
    @IsString()
    idClient?: string;

    @ApiProperty({  example: ['assignee1', 'assignee2'],required: false })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    assignee: string[];

    @ApiProperty({ example: 'employee_id_example',required: false })
    @IsOptional()
    idEmploye: string;

    @ApiProperty({ example: '2023',required: false })
    @IsOptional()
    yearReport: string;

    @ApiProperty({ type: Date, example: new Date() ,required: false})
    @IsOptional()
    @IsDateString()
    dateTime: Date;

    @ApiProperty({ example: 100 ,required: false })
    @IsOptional()
    price: number;

    @ApiProperty({ example: 50 ,required: false})
    @IsOptional()
    paymentAmountPaid: number;

    @ApiProperty({ example: 50 ,required: false})
    @IsOptional()
    balanceDue: number;

    // @ApiProperty({ type: [StepField] })
    // @IsNotEmpty()
    // stepsList: StepField[];
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => StepField)
    stepsList: StepField[];


    @ApiProperty({example: 'entityType',required: false })
    @IsOptional()
    @IsString()
    entityType: string;

    @ApiProperty({required: false })
    @IsOptional()
    status: Status;
}