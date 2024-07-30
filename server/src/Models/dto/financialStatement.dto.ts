import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNumber, IsOptional } from "class-validator";
import { Client } from "../client.model";
import { Status } from "../status.model";
import { StepField } from "../stepField.model";
import { User } from "../user.model";
import { Year } from "../year.model";

export class UpdateFinancialStatementDto {
    @ApiProperty({ required: false, example: true })
    @IsOptional()
    @IsBoolean()
    isInterested?: boolean;

    @ApiProperty({ required: false, example: '<client_id>' })
    @IsOptional()
    client: Client;

    @ApiProperty({ required: false, example: ['<user_id_1>', '<user_id_2>'] })
    @IsOptional()
    assignee: User[];

    @ApiProperty({ required: false, example: '<user_id>' })
    @IsOptional()
    lastEmployeeWhoTreated: User;

    @ApiProperty({ required: false, example: '<year_id>' })
    @IsOptional()
    year: Year;

    @ApiProperty({ required: false, example: '2022-01-01' })
    @IsOptional()
    @IsDate()
    date?: Date;

    @ApiProperty({ required: false, example: 100 })
    @IsOptional()
    @IsNumber()
    price?: number;

    @ApiProperty({ required: false, example: 50 })
    @IsOptional()
    @IsNumber()
    paymentAmountPaid?: number;

    @ApiProperty({ required: false, example: 50 })
    @IsOptional()
    @IsNumber()
    balanceDue?: number;

    @ApiProperty({ required: false, example: 'entityType' })
    @IsOptional()
    entityType: string;

    @ApiProperty({ required: false, type: [StepField] })
    @IsOptional()
    stepsList: StepField[];

    @ApiProperty({ required: false, example: '<status_id>' })
    @IsOptional()
    status: Status;

    @ApiProperty({ required: false, example: { dateTime: '2022-01-01', comment: 'Example comment' } })
    @IsOptional()
    followUp: { dateTime: Date, comment: string };

    @ApiProperty({ required: false, example: '2023-01-01' })
    @IsOptional()
    @IsDate()
    finalSubmissionDate: Date;
}

export class CreateFinancialStatementDto {
    @ApiProperty({ example: true })
    @IsBoolean()
    isInterested: boolean;

    @ApiProperty({ example: '<client_id>' })
    client: Client;

    @ApiProperty({ example: ['<user_id_1>', '<user_id_2>'] })
    assignee: User[];

    @ApiProperty({ example: '<user_id>' })
    lastEmployeeWhoTreated: User;

    @ApiProperty({ example: '<year_id>' })
    year: Year;

    @ApiProperty({ example: '2022-01-01' })
    @IsDate()
    date: Date;

    @ApiProperty({ example: 100 })
    @IsNumber()
    price: number;

    @ApiProperty({ example: 50 })
    @IsNumber()
    paymentAmountPaid: number;

    @ApiProperty({ example: 50 })
    @IsNumber()
    balanceDue: number;

    @ApiProperty({ example: 'entityType' })
    entityType: string;

    @ApiProperty({ type: [StepField] })
    stepsList: StepField[];

    @ApiProperty({ example: '<status_id>' })
    status: Status;

    @ApiProperty({ example: { dateTime: '2022-01-01', comment: 'Example comment' } })
    followUp: { dateTime: Date, comment: string };

    @ApiProperty({ example: '2023-01-01' })
    @IsDate()
    finalSubmissionDate: Date;
}