
import { IsNotEmpty, IsString, IsDateString, IsOptional, IsPhoneNumber, Length, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

import { Task } from '../task.model';
import mongoose from 'mongoose';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { Field } from '../field.model';
import { CreateFieldDto } from './field.dto';



export class CreateClientTypeDto {

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    tasks: string[]


    @ApiProperty({ type: [CreateFieldDto], required: true })
    @IsOptional()
    fields?: CreateFieldDto[];;

   
}

export class UpdateClientTypeDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    _id: string;

    @ApiProperty({ type: String})
    @IsOptional()
    @IsString()
    name?: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    tasks: string[]

    @ApiProperty({ type: Array<Field>})
    @IsOptional()
    fields?: Field[];

    

    
}

