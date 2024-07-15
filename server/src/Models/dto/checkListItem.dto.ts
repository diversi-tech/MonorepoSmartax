import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCheckListItemDto {
    @ApiProperty({ type: String, example: 'description'})
    @IsNotEmpty()
    description: string;

    @ApiProperty({ type: Boolean, example: false, default:false })
    @IsNotEmpty()
    isDone: boolean;
}

export class UpdateCheckListItemDto {
    @ApiProperty({ type: String, example: 'description' })
    @IsNotEmpty()
    description: string;

    @ApiProperty({ type: Boolean, example: false })
    @IsNotEmpty()
    isDone: boolean;
}
