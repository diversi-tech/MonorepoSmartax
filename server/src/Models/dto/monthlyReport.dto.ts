import { Prop, Schema} from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { StepFieldController } from 'server/src/controller/yearlyReport/stepField.controller';
import { StepFieldMonth } from '../stepFieldMonth.model';
import { Status } from '../status.model';

@Schema()
export class CreateMonthlyReportDto  {
    
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
    reportDate: Date;

    @Prop([StepFieldController])
    @ApiProperty({ type: [StepFieldMonth] })
    @IsNotEmpty()
    monthlyReportFields: StepFieldMonth[];

}

export class UpdateMonthlyReportDto  {
    
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
    reportDate: Date;

    @Prop([StepFieldMonth])
    @ApiProperty({ type: [StepFieldMonth] })
    @IsNotEmpty()
    monthlyReportFields: StepFieldMonth[];

    @Prop()
    @ApiProperty()
    @IsNotEmpty()
    status: Status;
}