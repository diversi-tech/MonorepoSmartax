import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
export class UpdateBillingDto {
    @ApiProperty({ type: String, example: 'client_id', required: false })
    @IsOptional()
    client?: Types.ObjectId;

    @ApiProperty({ type: String, example: '5000', required: false })
    @IsOptional()
    @IsString()
    amount?: string;

    @ApiProperty({ type: String, example: 'status_id' , required: false })
    @IsOptional()
    @IsString()
    status?:  Types.ObjectId;

    @ApiProperty({ type: Date, example: new Date(), required: false })
    @IsOptional()
    @IsDateString()
    dueDate?: Date;

    @ApiProperty({ type: Date, example: new Date(), required: false })
    @IsOptional()
    @IsDateString()
    paidDate?: Date;

    @ApiProperty({ type: String, example: 'user_id', required: false })
    @IsOptional()
    assignedTo?: Types.ObjectId;

    @ApiProperty({ type: String, example: '123456789', required: false })
    @IsOptional()
    @IsString()
    id?: string;
}
export class CreateBillingDto {
    @ApiProperty({ type: String, example: 'client_id' })
    @IsNotEmpty()
    client: Types.ObjectId;

    @ApiProperty({ type: String, example: '5000' })
    @IsNotEmpty()
    @IsString()
    amount: string;

    @ApiProperty({ type: String, example: 'status_id' })
    @IsNotEmpty()
    status:  Types.ObjectId;

    @ApiProperty({ type: Date, example: new Date() })
    @IsNotEmpty()
    @IsDateString()
    dueDate: Date;

    @ApiProperty({ type: Date, example: new Date() })
    @IsDateString()
    paidDate: Date;

    @ApiProperty({ type: String, example: 'user_id' })
    @IsNotEmpty()
    assignedTo: Types.ObjectId;
}
