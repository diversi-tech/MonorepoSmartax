import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString, IsString, MaxLength, IsBoolean } from 'class-validator';
import { Types } from 'mongoose'; // Import Types from mongoose
import { StepField } from '../stepField.model';
import { Status } from '../status.model';

@Schema()
export class CreateYearlyReportDto  {
    
    @Prop()
    @ApiProperty({ example: 'user_id_example' })
    @IsNotEmpty()
    idClient: string;

    @Prop()
    @ApiProperty({ type: [String], example: ['assignee1', 'assignee2'] })
    @IsNotEmpty()
    assignee: string[];

    @Prop()
    @ApiProperty({ example: 'employee_id_example' })
    @IsNotEmpty()
    idEmploye: string;

    @Prop()
    @ApiProperty({ example: '2023' })
    @IsNotEmpty()
    yearReport: string;

    @Prop()
    @ApiProperty({ example: new Date() })
    @IsNotEmpty()
    @IsDateString()
    dateTime: Date;

    @Prop()
    @ApiProperty({ example: 100 })
    @IsNotEmpty()
    price: number;

    @Prop()
    @ApiProperty({ example: 50 })
    @IsNotEmpty()
    paymentAmountPaid: number;

    @Prop()
    @ApiProperty({ example: 50 })
    @IsNotEmpty()
    balanceDue: number;

    @Prop([StepField])
    @ApiProperty({ type: [StepField] })
    @IsNotEmpty()
    stepsList: StepField[];

    @Prop()
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    entityType: string;

    @Prop()
    @ApiProperty()
    @IsNotEmpty()
    status: Status;

}

export class UpdateYearlyReportDto  {
    
    @Prop()
    @ApiProperty({ example: 'user_id_example' })
    @IsNotEmpty()
    idClient: string;

    @Prop()
    @ApiProperty({ type: [String], example: ['assignee1', 'assignee2'] })
    @IsNotEmpty()
    assignee: string[];

    @Prop()
    @ApiProperty({ example: 'employee_id_example' })
    @IsNotEmpty()
    idEmploye: string;

    @Prop()
    @ApiProperty({ example: '2023' })
    @IsNotEmpty()
    yearReport: string;

    @Prop()
    @ApiProperty({ example: new Date() })
    @IsNotEmpty()
    @IsDateString()
    dateTime: Date;

    @Prop()
    @ApiProperty({ example: 100 })
    @IsNotEmpty()
    price: number;

    @Prop()
    @ApiProperty({ example: 50 })
    @IsNotEmpty()
    paymentAmountPaid: number;

    @Prop()
    @ApiProperty({ example: 50 })
    @IsNotEmpty()
    balanceDue: number;

    @Prop([StepField])
    @ApiProperty({ type: [StepField] })
    @IsNotEmpty()
    stepsList: StepField[];

    @Prop()
    @ApiProperty()
    @IsNotEmpty()
    entityType: string;

    @Prop()
    @ApiProperty()
    @IsNotEmpty()
    status: Status;
}