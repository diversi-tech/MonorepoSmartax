import { Prop, Schema} from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

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
}