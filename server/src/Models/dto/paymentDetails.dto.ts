import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsNumber, IsDateString } from "class-validator";

export class CreatePaymentDetailsDto {

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsNumber()
    sumForMonth: number;

    @ApiProperty({ type: String, format: 'date-time' })
    @IsNotEmpty()
    @IsDateString()
    dateStart: string;

    @ApiProperty({ type: String, format: 'date-time' })
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
    id: string;

    @ApiProperty({ type: Number, required: false })
    @IsOptional()
    @IsNumber()
    sumForMonth?: number;

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
