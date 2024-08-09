// import { ApiProperty } from '@nestjs/swagger';
// import { IsNotEmpty, IsDateString, IsString, IsOptional, MaxLength } from 'class-validator';
// import { Types } from 'mongoose';


// export class CreateCommunicationDto {
//     @ApiProperty({ type: String, example: 'client_id_example' })
//     @IsNotEmpty()
//     client: Types.ObjectId;

//     @ApiProperty({ type: Date, example: new Date() })
//     @IsNotEmpty()
//     @IsDateString()
//     date: Date;

//     @ApiProperty({ type: String, example: 'Meeting' })
//     @IsNotEmpty()
//     @IsString()
//     Subject: string;

//     @ApiProperty({ type: String, example: 'Discussion summary' })
//     @IsNotEmpty()
//     @IsString()
//     @MaxLength(100)
//     summary: string;

//     @ApiProperty({ type: String, example: 'user_id_example' })
//     @IsNotEmpty()
//     assignedTo: Types.ObjectId;

    
//     @ApiProperty({ type: Boolean, example: 'false' })
//     @IsNotEmpty()
//     @IsString()
//     Status : boolean
// }

// export class UpdateCommunicationDto {
//     @ApiProperty({ type: String, example: 'client_id_example', required: false })
//     @IsOptional()
//     client?: Types.ObjectId;

//     @ApiProperty({ type: Date, example: new Date(), required: true })
//     @IsOptional()
//     @IsDateString()
//     date?: Date;

//     @ApiProperty({ type: String, example: 'Meeting', required: true })
//     @IsOptional()
//     @IsString()
//     Subject?: string;

//     @ApiProperty({ type: String, example: 'Discussion summary', required: true })
//     @IsOptional()
//     @IsString()
//     @MaxLength(255)
//     summary?: string;

//     @ApiProperty({ type: String, example: 'user_id_example', required: true })
//     @IsOptional()
//     assignedTo?: Types.ObjectId;
    
//     @ApiProperty({ type: Boolean, example: 'false', required: true })
//     @IsOptional()
//     @IsString()
//     Status?: boolean;

//     @ApiProperty({ type: String, example: '123456789', required: true })
//     @IsOptional()
//     id?: string;
// }

import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCommunicationDto {
  @ApiProperty({
    type: String,
    example: 'client_id_example',
    description: 'The client ID as a string',
  })
  @IsString()
  @IsNotEmpty()
  client: string; // ObjectId as string

  @ApiProperty({
    type: Date,
    example: new Date(),
    description: 'The date of the communication',
  })
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    type: String,
    example: 'Meeting',
    description: 'The subject of the communication',
  })
  @IsString()
  @IsNotEmpty()
  Subject: string;

  @ApiProperty({
    type: String,
    example: 'Discussion summary',
    description: 'Summary of the communication',
  })
  @IsString()
  @IsNotEmpty()
  summary: string;

  @ApiProperty({
    type: String,
    example: 'user_id_example',
    description: 'The ID of the user assigned to the communication',
    required: false,
  })
  @IsString()
  @IsOptional()
  assignedTo: string | null; // Store SelectItem's value (assumed to be string)

  @ApiProperty({
    type: Boolean,
    example: false,
    description: 'The status of the communication',
  })
  @IsBoolean()
  @IsNotEmpty()
  Status: boolean;
}

export class UpdateCommunicationDto {
  @ApiProperty({
    type: String,
    example: 'client_id_example',
    description: 'The client ID as a string',
    required: false,
  })
  @IsString()
  @IsOptional()
  client?: string; // ObjectId as string

  @ApiProperty({
    type: Date,
    example: new Date(),
    description: 'The date of the communication',
    required: false,
  })
  @IsDate()
  @IsOptional()
  date?: Date;

  @ApiProperty({
    type: String,
    example: 'Meeting',
    description: 'The subject of the communication',
    required: false,
  })
  @IsString()
  @IsOptional()
  Subject?: string;

  @ApiProperty({
    type: String,
    example: 'Discussion summary',
    description: 'Summary of the communication',
    required: false,
  })
  @IsString()
  @IsOptional()
  summary?: string;

  @ApiProperty({
    type: String,
    example: 'user_id_example',
    description: 'The ID of the user assigned to the communication',
    required: false,
  })
  @IsString()
  @IsOptional()
  assignedTo?: string | null; // Store SelectItem's value (assumed to be string)

  @ApiProperty({
    type: Boolean,
    example: false,
    description: 'The status of the communication',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  Status?: boolean;
}
