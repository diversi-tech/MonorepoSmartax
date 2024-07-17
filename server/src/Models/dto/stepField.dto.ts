import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, isBoolean, IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";

export class CreateStepFieldDto {
    @ApiProperty({ description: 'The value name' })
    @IsNotEmpty()
    @IsString()
    value: string;

    @ApiProperty({type: Boolean,description:'Is it complete?'})
    @IsBoolean()
    isCompleted: Boolean 

    @ApiProperty({  description: 'The step number'})
    @IsInt()
    @Min(1)
    @Max(5)
    stepNumber: number;

    @ApiProperty({ description: 'The type ' })
    @IsNotEmpty()
    @IsString()
    type: string;
    
}

export class UpdateStepFieldDto {

    @ApiProperty({ description: 'The value name' })
    @IsNotEmpty()
    @IsString()
    value: string;

    @ApiProperty({type: Boolean,description:'Is it complete?'})
    @IsBoolean()
    isCompleted: Boolean 

    @ApiProperty({  description: 'The step number'})
    @IsInt()
    @Min(1)
    @Max(5)
    stepNumber: number;

    @ApiProperty({ description: 'The type ' })
    @IsNotEmpty()
    @IsString()
    type: string;
    

}