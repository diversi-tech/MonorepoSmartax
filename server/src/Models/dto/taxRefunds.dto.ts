import { Prop, Schema} from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { StepField } from '../stepField.model';
import { Status } from '../status.model';

@Schema()
export class CreateTaxRefundsDto  {
    
    @Prop()
    @ApiProperty({ example: 'user_id_example' })
    @IsNotEmpty()
    idClient: string;

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
   

    @Prop()
    @ApiProperty({ type: [String], example: ['assignee1', 'assignee2'] })
    @IsNotEmpty()
    assignee: string[];

    @Prop()
    @ApiProperty({ example: 100 })
    @IsNotEmpty()
    price: number;

    @Prop()
    @ApiProperty({ example: 50 })
    @IsNotEmpty()
    paymentAmountPaid: number;

    @Prop()
    @ApiProperty({ example: 50 })
    @IsNotEmpty()
    balanceDue: number;

    @Prop()
    @ApiProperty()
    @IsNotEmpty()
    status: Status;


}

export class UpdateTaxRefundsDto  {
    
    @Prop()
    @ApiProperty({ example: 'user_id_example' })
    @IsNotEmpty()
    idClient: string;

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

    @Prop()
    @ApiProperty()
    @IsNotEmpty()
    status: Status;
     
   

    @Prop()
    @ApiProperty({ type: [String], example: ['assignee1', 'assignee2'] })
    @IsNotEmpty()
    assignee: string[];


    @Prop()
    @ApiProperty({ example: 100 })
    @IsNotEmpty()
    price: number;

    @Prop()
    @ApiProperty({ example: 50 })
    @IsNotEmpty()
    paymentAmountPaid: number;

    @Prop()
    @ApiProperty({ example: 50 })
    @IsNotEmpty()
    balanceDue: number;

    @Prop()
    @ApiProperty()
    @IsNotEmpty()
    entityType: string;

}