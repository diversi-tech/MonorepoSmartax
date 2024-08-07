import { Prop, Schema} from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { StepFieldController } from 'server/src/controller/yearlyReport/stepField.controller';
import { StepFieldMonth, stepFieldMonthModel } from '../stepFieldMonth.model';
import { Status } from '../status.model';
import { Types } from 'mongoose';

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

    @Prop({type: Map, of: [{ type: stepFieldMonthModel }] })
    @ApiProperty({})
    @IsNotEmpty()
    monthlyReportFields: Map<string, Types.Array<StepFieldMonth>>;

    @Prop()
    @ApiProperty()
    @IsNotEmpty()
    status: Status[];

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

    @Prop({type: Map, of: [{ type: stepFieldMonthModel }]})
    @ApiProperty({})
    @IsNotEmpty()
    monthlyReportFields: Map<string, Types.Array<StepFieldMonth>>;

    @Prop()
    @ApiProperty()
    @IsNotEmpty()
    status: Status[];
}