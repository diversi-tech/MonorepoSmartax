import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsDateString, IsNotEmpty, IsNumber, IsString, } from "class-validator";

export class CreateMeetDto {
    @ApiProperty({ description: 'Address to the meeting' })
    @IsNotEmpty()
    @IsString()
    address: string;

    @ApiProperty({ description: 'The date of the meetting' })
    @IsNotEmpty()
    @IsDateString()
    date: Date;

    @ApiProperty({ description: 'Meeting start time' })
    @IsNotEmpty()
    @IsDateString()
    beginningTime: Date;

    @ApiProperty({ description: 'Meeting end time' })
    @IsNotEmpty()
    @IsDateString()
    endTime: Date;

    @ApiProperty({ description: 'User ids' })
    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    usersId: string[]

    @ApiProperty({ description: 'Array of client department ids' })
    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    clientDepartments: string[]
}

export class UpdateMeetDto {

    @ApiProperty({ description: 'The meeting ID' })
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({ description: 'Address to the meeting' })
    @IsNotEmpty()
    @IsString()
    address: string;

    @ApiProperty({ description: 'The date of the meetting' })
    @IsNotEmpty()
    @IsDateString()
    date: Date;

    @ApiProperty({ description: 'Meeting start time' })
    @IsNotEmpty()
    @IsDateString()
    beginningTime: Date;

    @ApiProperty({ description: 'Meeting end time' })
    @IsNotEmpty()
    @IsDateString()
    endTime: Date;

    @ApiProperty({ description: 'Array of User id' })
    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    usersId: string[]

    @ApiProperty({ description: 'Array of client department ids' })
    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    clientDepartments: string[]
}