import { IsNotEmpty, IsDateString, IsString, IsOptional, IsNumber, isNotEmpty, isString, isDateString, IsBoolean } from 'class-validator';
import { Client } from "../client.model";
import { Tag } from '../tag.model';
import { User } from '../../Models/user.model';
import { ApiProperty } from '@nestjs/swagger';
import { Priority } from '../priority.model';
import { Status } from '../status.model';
import { CheckList } from '../checkList.model';

export class createTaskArchiveDTO{

@IsNotEmpty()
client:Client;

@IsNotEmpty()
@IsString()
taskName:string

@IsNotEmpty()
@IsString()
description:string;

@IsNotEmpty()
@IsDateString()
dueDate:Date;

@IsNotEmpty()
@IsDateString()
startDate:Date;

@IsNotEmpty()
@IsString()
status:Status;

@IsOptional()
assignedTo:User[];

@IsNotEmpty()
tags:Tag[];

@IsNotEmpty()
@IsString()
priority:Priority;

@IsOptional()
deadline:Date;

@IsOptional()
googleId:string;

@IsOptional()
images:string[];

@IsOptional()
checkList:CheckList[];

//added to taskArchive:
@IsOptional()
storeDate: Date;

    

@IsBoolean()
isDeleted: Boolean

@IsNotEmpty()
@IsDateString()
deletedDate: Date;

}
export class UpdateTaskArchiveDTO{

    // @ApiProperty({ description: 'The task ID' })
    // @IsNotEmpty()
    // @IsString()
    // id: string;

    // @IsOptional()
    // client?:Client;

    // @IsOptional()
    // @IsString()
    // taskName?:string;

    // @IsOptional()
    // @IsString()
    // description?: string;

    // @IsOptional()
    // @IsDateString()
    // dueDate?: Date;

    // @IsOptional()
    // @IsString()
    // status?: string;

    // @IsOptional()
    // assignedTo?: User[];

    // @IsOptional()
    // tags: Tag[];

    // @IsOptional()
    // @IsString()
    // priority?: Priority;

    // @IsOptional()
    // startDate?: Date;

    // @IsOptional()
    // deadline?: Date;

    // @IsOptional()
    // googleId?: string;

    // @IsOptional()
    // images?: string[];

    // @IsOptional()
    // checkList?: CheckList[];

    //added to taskArchive:
    
}
