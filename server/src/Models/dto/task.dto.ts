import { IsNotEmpty, IsDateString, IsString, IsOptional, IsNumber, isNotEmpty } from 'class-validator';
import { Client } from "../client.model";
import { Tag } from '../tag.model';
import { User } from '../../Models/user.model';
import { ApiProperty } from '@nestjs/swagger';
import { Priority } from '../priority.model';
import { Status } from '../status.model';
import { CheckList } from '../checkList.model';

export class CreateTaskDto {
  @IsOptional()
  client: Client[];

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
    @IsString()
    status: Status;

    @IsOptional()
    assignedTo: User[];

    @IsNotEmpty()
    tags: Tag[];

    @IsNotEmpty()
    @IsString()
    priority: Priority;

    @IsOptional()
    deadline: Date;

    @IsOptional()
    googleId: string;

    @IsOptional()
    images: string[];
    
    @IsOptional()
    checkList: CheckList[];
  createTaskDto: Promise<Client>;
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
