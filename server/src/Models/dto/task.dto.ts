import { IsNotEmpty, IsDateString, IsString, IsOptional, IsNumber } from 'class-validator';
import { Client } from "../client.model";

export class CreateTaskDto {
    @IsNotEmpty()
    client: Client;

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
    @IsString()
    status: string;

    @IsNotEmpty()
    @IsNumber()
    assignedTo: number;
}

export class UpdateTaskDto {
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
    @IsNumber()
    assignedTo?: number;
}
