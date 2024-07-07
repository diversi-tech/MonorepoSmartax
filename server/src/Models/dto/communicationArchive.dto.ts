import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString,  IsOptional, IsString, MaxLength, IsBoolean } from 'class-validator';
import { Communication } from '../communication.model';
import { Client } from '../client.model';
import { Types } from 'mongoose';

export class CreateCommunicationArchiveDto {
  @ApiProperty({ type: String, example: 'client_id_example' })
  @IsNotEmpty()
  client: Types.ObjectId;

  @ApiProperty({ type: Date, example: new Date() })
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @ApiProperty({ type: String, example: 'Meeting' })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({ type: String, example: 'Discussion summary' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  summary: string;

  @ApiProperty({type: Boolean})
  @IsBoolean()
  isDeleted: Boolean
  
  @ApiProperty({ type: Date, example: new Date() })
  @IsNotEmpty()
  @IsDateString()
  deletedDate: Date;

}

export class UpdateCommunicationArchiveDto {
   
   

   
}