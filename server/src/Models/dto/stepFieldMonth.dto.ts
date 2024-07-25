import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, isBoolean, IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";

export class CreateStepFieldMonthDto {
    @ApiProperty({ description: 'The value name' })
    @IsNotEmpty()
    @IsString()
    value: string;

    @ApiProperty({type: Boolean,description:'Is it complete?'})
    @IsBoolean()
    isCompleted: Boolean 

    @ApiProperty({ description: 'The type ' })
    @IsNotEmpty()
    @IsString()
    type: string;
    
}

export class UpdateStepFieldMonthDto {

    @ApiProperty({ description: 'The value name' })
    @IsNotEmpty()
    @IsString()
    value: string;

    @ApiProperty({type: Boolean,description:'Is it complete?'})
    @IsBoolean()
    isCompleted: Boolean 

    @ApiProperty({ description: 'The type ' })
    @IsNotEmpty()
    @IsString()
    type: string;
    

}