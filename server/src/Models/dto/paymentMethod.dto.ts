import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePaymentMethodDto {

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    name: string;


    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    color: string;
}

export class UpdatePaymentMethodDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @IsString()
    name?: string;
   

    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @IsString()
    color?: string;
}

