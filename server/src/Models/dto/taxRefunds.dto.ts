import { Prop, Schema} from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { StepField } from '../stepField.model';

@Schema()
export class CreateTaxRefundsDto  {
    
    @Prop()
    @ApiProperty({ example: 'user_id_example' })
    @IsNotEmpty()
    idUser: string;

    @Prop()
    @ApiProperty({ example: 'employee_id_example' })
    @IsNotEmpty()
    idEmploye: string;

    @Prop()
    @ApiProperty({ example: '2022-01-01'})
    @IsNotEmpty()
    @IsDateString()
    date: Date;

    @Prop()
    @ApiProperty({ example: '2023' })
    @IsNotEmpty()
    year: string;

    @Prop([StepField])
    @ApiProperty({ type: [StepField] })
    @IsNotEmpty()
    stepsList: StepField[];
}

export class UpdateTaxRefundsDto  {
    
    @Prop()
    @ApiProperty({ example: 'user_id_example' })
    @IsNotEmpty()
    idUser: string;

    @Prop()
    @ApiProperty({ example: 'employee_id_example' })
    @IsNotEmpty()
    idEmploye: string;

    @Prop()
    @ApiProperty({ example: new Date() })
    @IsNotEmpty()
    @IsDateString()
    date: Date;

    @Prop()
    @ApiProperty({ example: '2023' })
    @IsNotEmpty()
    year: string;

    @Prop([StepField])
    @ApiProperty({ type: [StepField] })
    @IsNotEmpty()
    stepsList: StepField[];

}