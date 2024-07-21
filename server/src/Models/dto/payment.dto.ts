import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsNumber, ValidateNested, IsArray, IsMongoId } from "class-validator";
import { Type } from "class-transformer";
import { PaymentDetails } from "../paymentDetails.model";
import { PaymentMethod } from "../paymentMethod.model";
import { Billing } from "../billing.model";
import { ObjectId } from "typeorm";
import { Types } from "mongoose";

export class CreatePaymentDto {
    @ApiProperty({ type: PaymentDetails })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => PaymentDetails)
    mainPaymentDetails: PaymentDetails;

    @ApiProperty({ type: PaymentDetails })
    @ValidateNested()
    @Type(() => PaymentDetails)
    morePaymentDetails: PaymentDetails[];

    @ApiProperty({ type: Number, default: 0 })
    @IsOptional()
    @IsNumber()
    totalPayment: number = 0;

    @ApiProperty({ type: PaymentMethod })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => PaymentMethod)
    paymentMethod: PaymentMethod;

    @ApiProperty({ type: [Types.ObjectId], required: false, default: [] })
    @IsOptional()
    @IsArray()
    @IsMongoId()
    paymentHistory: PaymentDetails[] = [];

    @ApiProperty({ type: [Types.ObjectId], required: false, default: [] })
    @IsOptional()
    @IsArray()
    @IsMongoId()
    billingHistory: Billing[] = [];
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
    mainPaymentDetails?: PaymentDetails;

    @ApiProperty({ type: PaymentDetails })
    @IsOptional()
    @ValidateNested()
    @Type(() => PaymentDetails)
    morePaymentDetails?: PaymentDetails[];

    @ApiProperty({ type: Number, required: false, default: 0 })
    @IsOptional()
    @IsNumber()
    totalPayment?: number = 0;

    @ApiProperty({ type: PaymentMethod, required: false })
    @IsOptional()
    @ValidateNested()
    @Type(() => PaymentMethod)
    paymentMethod?: PaymentMethod;

    @ApiProperty({ type: [Types.ObjectId], required: false, default: [] })
    @IsOptional()
    @IsArray()
    @IsMongoId()
    paymentHistory?: PaymentDetails[] = [];

    @ApiProperty({ type: [Types.ObjectId], required: false, default: [] })
    @IsOptional()
    @IsArray()
    @IsMongoId()
    billingHistory?: Billing[] = [];
}
