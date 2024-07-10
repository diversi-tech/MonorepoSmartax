
import { IsNotEmpty, IsString, IsDateString, IsOptional, IsPhoneNumber, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

import { Task } from '../task.model';
import mongoose from 'mongoose';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { FieldsTC } from '../fieldsCT.model';



export class CreateClientTypeDto {

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ type: Array<String>, required: true })
    @IsOptional()
    tasks?:string[];

    @ApiProperty({ type: Array<String>, required: true })
    @IsOptional()
    fields?:FieldsTC[];

   
}

export class UpdateClientTypeDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({ type: String, required: true })
    @IsOptional()
    @IsString()
    name?: string;
    
    @ApiProperty({ type: Array<String>, required: true })
    @IsOptional()
    @IsString()
    tasks?:string[];
    @ApiProperty({ type: Array<String>, required: true })
    @IsOptional()
    fields?: FieldsTC[];

    

    
}

