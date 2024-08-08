
import { IsNotEmpty, IsString, IsDateString, IsOptional, IsPhoneNumber, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'
import { Field } from '../field.model';



export class CreateClientFieldDto {

    @ApiProperty()//{ type: Field, required: true }
    @IsOptional()
    field?: Field;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    value: string;

   
}

export class UpdateClientFieldDto {
    // @ApiProperty()
    // @IsNotEmpty()
    // @IsString()
    // _id: string;


    @ApiProperty({ type: Field, required: true })
    @IsOptional()
    field?: Field;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    value: string;

    
}

