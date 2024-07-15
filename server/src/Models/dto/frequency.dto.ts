import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatefrequencyDto {

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    name: string;


    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    color: string;
}

export class UpdatefrequencyDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @IsString()
    name?: string;
    @ApiProperty()

    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @IsString()
    color?: string;
}

