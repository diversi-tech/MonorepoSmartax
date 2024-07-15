import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateTimerDto {
    @ApiProperty({ description: 'task id' })
    @IsNotEmpty()
    @IsString()
    taskId: string;

    @ApiProperty({ description: 'user id' })
    @IsNotEmpty()
    @IsString()
    userId: string;

    @ApiProperty({ description: 'hours' })
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    hours: number;

    @ApiProperty({ description: 'minutes' })
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    minutes: number;

    @ApiProperty({ description: 'seconds' })
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    seconds: number;
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

    @ApiProperty({ description: 'hours' })
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    hours: number;

    @ApiProperty({ description: 'minutes' })
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    minutes: number;

    @ApiProperty({ description: 'seconds' })
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    seconds: number;
}