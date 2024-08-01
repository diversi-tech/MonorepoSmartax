import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Task } from "../task.model";

export class createYearArchiveDto{
    @ApiProperty({description:'the yearNum' })
    @IsNotEmpty()
    @IsString()
    yearNUm: string;

    @ApiProperty({ description: 'The tasks data' })
    @IsOptional()
    tasksData?:Task[];
}
export class updateYearArchiveDto{

    @ApiProperty({ description: 'The year ID' })
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({description:'the yearNum' })
    @IsNotEmpty()
    @IsString()
    yearNUm: string;

    @ApiProperty({ description: 'The tasks data' })
    @IsOptional()
    tasksData?:Task[];
}
