import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsNumber, IsDateString } from "class-validator";
import { Frequency } from "../frequency.model";

export class CreatePaymentDetailsDto {

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsNumber()
    sumForMonth: number;

    @ApiProperty({ type: Number})
    @IsOptional()
    @IsNumber()
    maxHours?: number;

    @ApiProperty()
    @IsOptional()
    frequency?: Frequency;

    @ApiProperty({ type: String, format: 'date-time' })
    @IsNotEmpty()
    @IsDateString()
    dateStart: string;

    @ApiProperty({ type: String, format: 'date-time' ,required: false,default: null})
    @IsOptional()
    @IsDateString()
    dateFinish?: string;

    @ApiProperty({ type: String })
    @IsOptional()
    @IsString()
    description?: string;
}

export class UpdatePaymentDetailsDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    _id: string;

    @ApiProperty({ type: Number, required: false })
    @IsOptional()
    @IsNumber()
    sumForMonth?: number;


    @ApiProperty({ type: Number, required: false})
    @IsOptional()
    @IsNumber()
    maxHours?: number;

    @ApiProperty({required: false })
    @IsOptional()
    @IsNumber()
    frequency?: Frequency;

    @ApiProperty({ type: String, format: 'date-time', required: false })
    @IsOptional()
    @IsDateString()
    dateStart?: string;

    @ApiProperty({ type: String, format: 'date-time', required: false })
    @IsOptional()
    @IsDateString()
    dateFinish?: string;

    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @IsString()
    description?: string;
}
