// import { ApiProperty } from '@nestjs/swagger';
// import { IsNotEmpty, IsString, IsOptional, IsDate, ValidateNested, IsArray } from 'class-validator';
// import { Type } from 'class-transformer';

// class TimeEntryDto {
//   @ApiProperty({ description: 'The check-in time', type: String, format: 'date-time' })
//   @IsNotEmpty()
//   @IsDate()
//   checkIn: Date;

//   @ApiProperty({ description: 'The check-out time', type: String, format: 'date-time', required: false })
//   @IsOptional()
//   @IsDate()
//   checkOut?: Date;

//   @ApiProperty({ description: 'The total hours worked', required: false })
//   @IsOptional()
//   hoursWorked?: number;
// }

// export class CreateWorkLogDto {
//   @ApiProperty({ description: 'The employee ID' })
//   @IsNotEmpty()
//   @IsString()
//   employeeId: string;

//   @ApiProperty({ description: 'The date of the work log', type: String, format: 'date-time' })
//   @IsNotEmpty()
//   @IsDate()
//   date: Date;

//   @ApiProperty({ description: 'The time entries', type: [TimeEntryDto] })
//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => TimeEntryDto)
//   timeEntries: TimeEntryDto[];

//   @ApiProperty({ description: 'The total hours worked', required: false })
//   @IsOptional()
//   allhoursWorked?: number;
// }

// export class UpdateWorkLogDto {
//   @ApiProperty({ description: 'The work log ID' })
//   @IsNotEmpty()
//   @IsString()
//   id: string;

//   @ApiProperty({ description: 'The updated time entries', type: [TimeEntryDto] })
//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => TimeEntryDto)
//   timeEntries?: TimeEntryDto[];

//   @ApiProperty({ description: 'The total hours worked', required: false })
//   @IsOptional()
//   hoursWorked?: number;
// }
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsDate, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class TimeEntryDto {
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
}
export class UpdateTimeEntryDto {
  @ApiProperty({ description: 'The check-out time', type: String, format: 'date-time', required: false })
  @IsOptional()
  @IsDate()
  checkOut?: Date;

  @ApiProperty({ description: 'The total hours worked', required: false })
  @IsOptional()
  hoursWorked?: number;
}

export class CreateWorkLogDto {
  @ApiProperty({ description: 'The employee ID' })
  @IsNotEmpty()
  @IsString()
  employeeId: string;

  @ApiProperty({ description: 'The date of the work log', type: String, format: 'date-time' })
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @ApiProperty({ description: 'The updated time entries', type: [UpdateTimeEntryDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateTimeEntryDto)
  timeEntries?: UpdateTimeEntryDto[];

  @ApiProperty({ description: 'The total hours worked', required: false })
  @IsOptional()
  allhoursWorked?: number;
}

export class UpdateWorkLogDto {
  @ApiProperty({ description: 'The work log ID' })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ description: 'The updated time entries', type: [TimeEntryDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimeEntryDto)
  timeEntries?: TimeEntryDto[];

  @ApiProperty({ description: 'The total hours worked', required: false })
  @IsOptional()
  hoursWorked?: number;
}





