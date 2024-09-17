import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {  IsString, IsOptional } from 'class-validator';
import { StepField } from '../stepField.model';
import { Status } from '../status.model';


@Schema()
export class CreateYearlyReportDto {

    @ApiProperty({ example: 'user_id_example' })
    @IsOptional()
    idClient: string;

    @ApiProperty({  example: ['assignee1', 'assignee2'] })
    @IsOptional()
    assignee: string[];

    @ApiProperty({ example: 'employee_id_example' })
    @IsOptional()
    idEmploye: string;

    @ApiProperty({ example: '2023' })
    @IsOptional()
    yearReport: string;

    @ApiProperty({ example: new Date() })
    @IsOptional()
    dateTime: Date;

    @ApiProperty({ example: 100 })
    @IsOptional()
    price: number;

    @ApiProperty({ example: 50 })
    @IsOptional()
    paymentAmountPaid: number;

    @ApiProperty({ example: 50 })
    @IsOptional()
    balanceDue: number;

    @ApiProperty()
    @IsOptional()
    stepsList: StepField[];

    @ApiProperty()
    @IsOptional()
    @IsString()
    entityType: string;

    @ApiProperty()
    @IsOptional()
    status: Status;
}

export class UpdateYearlyReportDto {

    @ApiProperty({ example: 'user_id_example' })
    @IsOptional()
    idClient: string;

    @ApiProperty({ example: ['assignee1', 'assignee2'] })
    @IsOptional()
    assignee: string[];

    @ApiProperty({ example: 'employee_id_example' })
    @IsOptional()
    idEmploye: string;

    @ApiProperty({ example: '2023' })
    @IsOptional()
    yearReport: string;

    @ApiProperty({ example: new Date() })
    @IsOptional()
    dateTime: Date;

    @ApiProperty({ example: 100 })
    @IsOptional()
    price: number;

    @ApiProperty({ example: 50 })
    @IsOptional()
    paymentAmountPaid: number;

    @ApiProperty({ example: 50 })
    @IsOptional()
    balanceDue: number;

    @ApiProperty()
    @IsOptional()
    stepsList: StepField[];

    @ApiProperty()
    @IsOptional()
    entityType: string;

    @ApiProperty()
    @IsOptional()
    status: Status;
}