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


    @IsNotEmpty()
    @IsString()
    taskName: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsDateString()
    dueDate: Date;

    @IsNotEmpty()
    @IsDateString()
    startDate: Date;

    @IsNotEmpty()
    // @IsString()
    // status: Status;
    status: Types.ObjectId

    @IsOptional()
    // assignedTo: User[];
    assignedTo: Types.ObjectId[]

    @IsNotEmpty()
    // tags: Tag[];
    tags: Types.ObjectId[]

    @IsNotEmpty()
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
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({ description: 'The task parent ID' })
    @IsString()
    parent: string;

    @ApiProperty({ description: 'The subTasks ID array' })
    subTasks: string[];

    @IsOptional()
    client?: Client;

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
    @IsString()
    status?: string;

    @IsOptional()
    assignedTo?: User[];

    @IsOptional()
    tags: Tag[];

    @IsOptional()
    @IsString()
    priority?: Priority;

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
