import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsDate, IsNumber } from 'class-validator';

export class CreateWorkLogDto {
  @ApiProperty({ description: 'The employee ID' })
  @IsNotEmpty()
  @IsString()
  employeeId: string;

  @ApiProperty({ description: 'The date of the work log', type: String, format: 'date-time' })
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @ApiProperty({ description: 'The check-in time', type: String, format: 'date-time' })
  @IsNotEmpty()
  @IsDate()
  checkIn: Date;

  @ApiProperty({ description: 'The check-out time', type: String, format: 'date-time', required: false })
  @IsOptional()
  @IsDate()
  checkOut?: Date;

  @ApiProperty({ description: 'The total hours worked', required: false })
  @IsOptional()
  hoursWorked?: number;

  @ApiProperty({ description: 'The overtime hours', required: false })
  @IsOptional()
  @IsNumber()
  overtimeHours?: number; 

  @ApiProperty({ description: 'The overtime hours', required: false })
  @IsOptional()
  @IsNumber()
  overtimeHours150:number;
}

export class UpdateWorkLogDto {
  @ApiProperty({ description: 'The work log ID' })
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'The updated check-in time', type: String, format: 'date-time' })
  @IsOptional()
  @IsDate()
  checkIn?: Date;

  @ApiProperty({ description: 'The updated check-out time', type: String, format: 'date-time', required: false })
  @IsOptional()
  @IsDate()
  checkOut?: Date;

  @ApiProperty({ description: 'The total hours worked', required: false })
  @IsOptional()
  hoursWorked?: number;
}
