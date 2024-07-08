import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString, IsString, IsOptional } from 'class-validator';
import { Types } from 'mongoose';


export class CreateDocumentsDto {
    @ApiProperty()
    @IsNotEmpty()
    fileId: Types.ObjectId;

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ type: Date, example: new Date() })
    @IsNotEmpty()
    @IsDateString()
    date: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    viewLink: string;

    @ApiProperty({ type: String, example: 'client_id_example' })
    @IsNotEmpty()
    client: Types.ObjectId;

    @ApiProperty()
    @IsOptional()
    status: string;

    @ApiProperty()
    @IsOptional()
    userUpload:Types.ObjectId;
    @ApiProperty()
    @IsOptional()
    userCare: Types.ObjectId;

  
}

export class UpdateDocumentsDto {

    @ApiProperty({ type: Date, example: new Date(), required: true })
    @IsOptional()
    @IsDateString()
    date?: Date;
    
    @ApiProperty()
    @IsOptional()
    status: string;
}

