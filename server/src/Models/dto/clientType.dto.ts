
import { IsNotEmpty, IsString, IsDateString, IsOptional, IsPhoneNumber, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'
import { Field } from 'multer';
import { Task } from '../task.model';
import mongoose from 'mongoose';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';



export class CreateClientTypeDto {

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ type: Array<String>, required: true })
    @IsOptional()
    tasks?:Array<String>;

    @ApiProperty({ type: Array<String>, required: true })
    @IsOptional()
    fields?: Array<String>;

   
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
    tasks?:Array<String>;

    @ApiProperty({ type: Array<String>, required: true })
    @IsOptional()
    @IsString()
    fields?:Array<String>;

    

    
}

