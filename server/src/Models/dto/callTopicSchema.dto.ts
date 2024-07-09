import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'


export class callTopicSchemaDto {

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    name: string;
}