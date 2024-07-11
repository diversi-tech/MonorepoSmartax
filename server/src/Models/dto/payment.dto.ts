import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsNumber, ValidateNested, IsArray, IsMongoId } from "class-validator";
import { Type } from "class-transformer";
import { PaymentDetails } from "../paymentDetails.model";
import { PaymentMethod } from "../paymentMethod.model";

export class CreatePaymentDto {
    @ApiProperty({ type: PaymentDetails })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => PaymentDetails)
    paymentDetails: PaymentDetails;

    @ApiProperty({ type: Number, default: 0 })
    @IsOptional()
    @IsNumber()
    totalPayment: number = 0;

    @ApiProperty({ type: PaymentMethod })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => PaymentMethod)
    paymentMethod: PaymentMethod;

    @ApiProperty({ type: [String], required: false, default: null })
    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    paymentHistory: string[] = null;

    @ApiProperty({ type: [String], required: false, default: null })
    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    billingHistory: string[] = null;
}

export class UpdatePaymentDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsMongoId()
    id: string;

    @ApiProperty({ type: PaymentDetails, required: false })
    @IsOptional()
    @ValidateNested()
    @Type(() => PaymentDetails)
    paymentDetails?: PaymentDetails;

    @ApiProperty({ type: Number, required: false, default: 0 })
    @IsOptional()
    @IsNumber()
    totalPayment?: number = 0;

    @ApiProperty({ type: PaymentMethod, required: false })
    @IsOptional()
    @ValidateNested()
    @Type(() => PaymentMethod)
    paymentMethod?: PaymentMethod;

    @ApiProperty({ type: [String], required: false, default: null })
    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    paymentHistory?: string[] = null;

    @ApiProperty({ type: [String], required: false, default: null })
    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    billingHistory?: string[] = null;
}
