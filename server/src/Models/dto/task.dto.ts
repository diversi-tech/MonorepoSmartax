import { IsNotEmpty, IsDateString, IsString, IsOptional, IsNumber, isNotEmpty } from 'class-validator';
import { Client } from "../client.model";
import { Tag } from '../tag.model';
import { User } from '../../Models/user.model';
import { ApiProperty } from '@nestjs/swagger';
import { Priority } from '../priority.model';
import { Status } from '../status.model';
import { CheckList } from '../checkList.model';
import { Types } from 'mongoose';
import { Task } from '../task.model';

export class CreateTaskDto {
    @IsNotEmpty()
    // client: Client;
    client:Types.ObjectId
    
    @ApiProperty({ description: 'The task parent ID' })
    @IsString()
    @IsOptional()
    // parent?: string;
    parent?:Task

    @IsOptional()
    @ApiProperty({ description: 'The subTasks ID array' })
    @IsString()
    // subTasks?: string[];
    subTasks?: Task[];


    @IsOptional()
    @IsString()
    taskName: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsDateString()
    dueDate: Date;

    @IsOptional()
    @IsDateString()
    startDate: Date;

    @IsOptional()
    // @IsString()
    // status: Status;
    status: Types.ObjectId

    @IsOptional()
    // assignedTo: User[];
    assignedTo: Types.ObjectId[]

    @IsOptional()
    // tags: Tag[];
    tags: Types.ObjectId[]

    @IsOptional()
    // @IsString()
    // priority: Priority;
    priority: Types.ObjectId

    @IsOptional()
    deadline: Date;

    @IsOptional()
    googleId: string;

    @IsOptional()
    images: string[];
    
    @IsOptional()
    checkList: CheckList[];
}

export class UpdateTaskDto {

    @ApiProperty({ description: 'The task ID' })
    @IsOptional()
    @IsString()
    id: string;

    @IsOptional()
    @ApiProperty({ description: 'The task parent ID' })
    @IsString()
    parent: string;

    @IsOptional()
    @ApiProperty({ description: 'The subTasks ID array' })
    subTasks: string[];

    @IsOptional()
    client?: Types.ObjectId;

    @IsOptional()
    @IsString()
    taskName?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsDateString()
    dueDate?: Date;

    @IsOptional()
    // @IsString()
    status?: Types.ObjectId;

    @IsOptional()
    assignedTo?: Types.ObjectId[];

    @IsOptional()
    tags: Types.ObjectId[];

    @IsOptional()
    // @IsString()
    priority?: Types.ObjectId;

    @IsOptional()
    startDate?: Date;

    @IsOptional()
    deadline?: Date;

    @IsOptional()
    googleId?: string;

    @IsOptional()
    images?: string[];

    @IsOptional()
    checkList?: CheckList[];

}
