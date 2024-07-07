// import { ApiProperty } from '@nestjs/swagger';
// import { IsNotEmpty, IsString, IsEmail, IsOptional, MinLength, MaxLength, Matches, isString, IsDateString, isNumber, IsNumber } from 'class-validator';
// import { Step1 } from '../Steps/step1.model';

// export class CreateYearlyReportDto {
//     // * @Prop()
//     // idUser: string;

//     // @Prop()
//     // assignee: string[];
    
//     // @Prop()
//     // idEmploye: string;

//     // @Prop()
//     // yearReport: string;

//     // @Prop()
//     // dateTime: Date;

//     // @Prop()
//     // price: number;

//     // @Prop()
//     // paymentAmountPaid: number;

//     // @Prop()
//     // balanceDue: number;

//     // @Prop()
//     // step1: Step1;*
//     @ApiProperty({type:String, description: 'The user id' })
//     @IsNotEmpty()
//     @IsString()
//     idUser: string;

//     @ApiProperty({ description: 'The assignee employes id' })
//     @IsNotEmpty()
//     @IsString()
//     assignee: string[];

//     @ApiProperty({ description: 'The curent employe id' })
//     @IsNotEmpty()
//     @IsString()
//     idEmploye: string;

//     @ApiProperty({ description: 'year report' })
//     @IsNotEmpty()
//     @IsString()
//     yearReport: string;
     
//     @ApiProperty({ type: Date, example: new Date() })
//     @IsNotEmpty()
//     @IsDateString()
//     dateTime: Date;

//     @ApiProperty()
//     @IsNumber()
//     price: number;

//     @ApiProperty()
//     @IsNumber()
//     paymentAmountPaid: number;

//     @ApiProperty()
//     @IsNumber()
//     balanceDue: number;

//     @ApiProperty()
//     step1: Step1;
   
// }

// export class UpdateYearlyReportDto {

  
// }
