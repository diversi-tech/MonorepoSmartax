import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Types } from "mongoose";
import { CheckListItem } from "../checkListItem.model";

export class CreateCheckListDto {
    @ApiProperty({ type: String, example: 'name', required: true })
    @IsNotEmpty()
    name: string;

    // @ApiProperty({ type: [CheckListItem] })
    @IsNotEmpty()
    items:CheckListItem[];
}

export class UpdateCheckListDto {
    @ApiProperty({ type: String, example: 'name', required: true })
    @IsNotEmpty()
    name: string;

    // @ApiProperty({ type: [CheckListItem] })
    @IsNotEmpty()
    items:CheckListItem[];

}
