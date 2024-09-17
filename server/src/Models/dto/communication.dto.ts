import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString, IsString, IsOptional, MaxLength, IsBoolean } from 'class-validator';
import { Types } from 'mongoose';


export class CreateCommunicationDto {
    @ApiProperty({ type: String, example: 'client_id_example' ,required: true})
    @IsNotEmpty()
    client: Types.ObjectId;

    @ApiProperty({ type: Date, example: new Date() ,required: true})
    @IsNotEmpty()
    @IsDateString()
    date: Date;

    @ApiProperty({ type: String, example: 'Meeting' ,required: true})
    @IsNotEmpty()
    @IsString()
    Subject: string;

    @ApiProperty({ type: String, example: 'Discussion summary' ,required: true})
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    summary: string;

    @ApiProperty({ type: String, example: 'user_id_example' ,required: true})
    @IsNotEmpty()
    assignedTo: Types.ObjectId;

    
    @ApiProperty({ type: Boolean, example: 'false' ,required: true})
    @IsNotEmpty()
    @IsBoolean()
    // @IsString()
    Status : boolean
}

export class UpdateCommunicationDto {
    @ApiProperty({ type: String, example: 'client_id_example', required: false })
    @IsOptional()
    client?: Types.ObjectId;

    @ApiProperty({ type: Date, example: new Date(), required: true })
    @IsOptional()
    // @IsDateString()
    date?: Date;

    @ApiProperty({ type: String, example: 'Meeting', required: true })
    @IsOptional()
    @IsString()
    Subject?: string;

    @ApiProperty({ type: String, example: 'Discussion summary', required: true })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    summary?: string;

    @ApiProperty({ type: String, example: 'user_id_example', required: true })
    @IsOptional()
    assignedTo?: Types.ObjectId;
    
    @ApiProperty({ type: Boolean, example: 'false', required: true })
    @IsOptional()
    // @IsString()
    Status?: boolean;

    @ApiProperty({ type: String, example: '123456789', required: true })
    @IsOptional()
    id?: string;
}

