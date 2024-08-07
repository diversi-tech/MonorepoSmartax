import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { CheckListItem } from "../checkListItem.model";

export class CreateCheckListDto {
    @ApiProperty({ type: String, example: 'name', required: true })
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    items:CheckListItem[];
}

export class UpdateCheckListDto {
    @ApiProperty({ type: String, example: 'name', required: true })
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    items:CheckListItem[];

}
