import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateDocTypeDto {

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    name: string;
}

export class UpdateDocTypeDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @IsString()
    name?: string;
}

