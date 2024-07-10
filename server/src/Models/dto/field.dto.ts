
import { IsNotEmpty, IsString, IsDateString, IsOptional, IsPhoneNumber, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

import { Task } from '../task.model';
import mongoose from 'mongoose';




export class CreateFieldDto {

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    key: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    type?:string;



   
}

export class UpdateFieldDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({ type: String, required: true })
    @IsOptional()
    @IsString()
    key?: string;
    
    @ApiProperty({ type: String, required: true })
    @IsOptional()
    @IsString()
    type?:string;

}

