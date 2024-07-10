import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString, IsString, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { DocType } from '../docType.model';


export class CreateDocsDto {
    @ApiProperty({ type: String, required: true })
    @IsNotEmpty()
    _id: string;

    @ApiProperty()
    @IsNotEmpty()
    name: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    viewLink: string;
    
    @ApiProperty({ type: String, example: 'client_id_example' })
    @IsNotEmpty()
    client: Types.ObjectId;

    @ApiProperty({ type: Date, example: new Date() })
    @IsNotEmpty()
    @IsDateString()
    date: Date;
    
    
    @ApiProperty({type:String})
    @IsOptional()
    userUpload:Types.ObjectId;
    
    @ApiProperty({type:String})
    DocType: DocType;
    
    @ApiProperty()
    @IsOptional()
    status: string;
}

export class UpdateDocsDto {
    
    @ApiProperty({ type: String, required: true })
    @IsNotEmpty()
    _id: string;

    @ApiProperty()
    @IsNotEmpty()
    name: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    viewLink: string;
    
    @ApiProperty({ type: String, example: 'client_id_example' })
    @IsNotEmpty()
    client: Types.ObjectId;

    @ApiProperty({ type: Date, example: new Date() })
    @IsNotEmpty()
    @IsDateString()
    date: Date;
    
    
    @ApiProperty({type:String})
    @IsOptional()
    userUpload:Types.ObjectId;
    
    @ApiProperty({type:String})
    DocType: DocType;
    
    @ApiProperty()
    @IsOptional()
    status: string;
}

