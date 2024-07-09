import { IsNotEmpty, IsString, IsDateString, IsOptional, IsPhoneNumber, Length, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTagDto } from './tag.dto';
import { UpdateTagDto } from './tag.dto';
import { Type } from 'class-transformer';

export class CreateClientDto {
    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber('IL', { message: 'ContactInfo must be a valid Israeli phone number' })
    @Length(10, 10, { message: 'ContactInfo must be exactly 10 digits' })
    contactInfo: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    businessName: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    source: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    status: string;

    @ApiProperty({ type: Date })
    @IsNotEmpty()
    @IsDateString()
    createdDate: Date;

    @ApiProperty({ type: CreateTagDto, example: {text:"aaaa",color:"red"},required: true  })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreateTagDto)
    tag: CreateTagDto;
}

export class UpdateClientDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({ type: String, required: true })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ type: String, required: true })
    @IsOptional()
    @IsString()
    contactInfo?: string;

    @ApiProperty({ type: String, required: true })
    @IsOptional()
    @IsString()
    businessName?: string;

    @ApiProperty({ type: String, required: true })
    @IsOptional()
    @IsString()
    source?: string;

    @ApiProperty({ type: String, required: true })
    @IsOptional()
    @IsString()
    status?: string;

    @ApiProperty({ type: Date, required: true })
    @IsOptional()
    @IsDateString()
    createdDate?: Date;

    @ApiProperty({ type: UpdateTagDto, example: {text:"aaaa",color:"red"},required: true  })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => UpdateTagDto)
    tag: UpdateTagDto;
}
