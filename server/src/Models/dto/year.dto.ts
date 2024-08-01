import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createYearDto{
    @ApiProperty({ 

    })
    @IsNotEmpty()
    @IsString()
    yearNum: string;
}