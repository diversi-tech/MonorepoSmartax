import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTimerDto {
    @ApiProperty({ description: 'task id' })
    @IsNotEmpty()
    @IsString()
    taskId: string;

    @ApiProperty({ description: 'user id' })
    @IsNotEmpty()
    @IsString()
    userId: string;

    @ApiProperty({ description: 'start time' })
    @IsNotEmpty()
    @IsString()
    start: Date;

    @ApiProperty({ description: 'end time' })
    @IsNotEmpty()
    @IsString()
    end: Date;
}

export class UpdateTimerDto {
    @ApiProperty({ description: 'timer id' })
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({ description: 'task id' })
    @IsNotEmpty()
    @IsString()
    taskId: string;

    @ApiProperty({ description: 'user id' })
    @IsNotEmpty()
    @IsString()
    userId: string;

    @ApiProperty({ description: 'start time' })
    @IsNotEmpty()
    @IsString()
    start: Date;

    @ApiProperty({ description: 'end time' })
    @IsNotEmpty()
    @IsString()
    end: Date;
}