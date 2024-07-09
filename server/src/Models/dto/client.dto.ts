import { IsNotEmpty, IsString, IsDateString, IsOptional, IsPhoneNumber, ValidateNested, IsBoolean, IsNumber, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SensitiveData } from '../sensitiveData';
import { User } from '../user.model';
import { ReportType } from '../client.model';

export class CreateClientDto {
    @ApiProperty({ example: 'ACME Corporation' })
    @IsString()
    companyName: string;

    @ApiProperty({ example: 'John' })
    @IsString()
    firstName: string;

    @ApiProperty({ example: 'Doe' })
    @IsString()
    lastName: string;

    @ApiProperty({ example: 'Jane Smith' })
    @IsString()
    contactPersonName: string;

    @ApiProperty({ example: '123456' })
    @IsString()
    tz: string;

    @ApiProperty({ example: 'Mary Doe' })
    @IsString()
    spouseName: string;

    @ApiProperty({ example: '456789' })
    @IsString()
    spouseTZ: string;

    @ApiProperty({ example: '555-555-5555' })
    @IsString()
    phone: string;

    @ApiProperty({ example: 'john.doe@example.com' })
    @IsString()
    email: string;

    @ApiProperty({ example: '123 Main Street, City, Country' })
    @IsString()
    address: string;

    @ApiProperty({ example: [] })
    encryptedPasswords: SensitiveData[];

    @ApiProperty({ example: 'No special comments' })
    @IsString()
    @MaxLength(300)
    comments: string;

    @ApiProperty({ example: '<user_id>' })
    lastUserUpdate: User;

    @ApiProperty({ example: ['<user_id_1>', '<user_id_2>'] })
    assignTo: User[];

    @ApiProperty({ example: 1001 })
    @IsNumber()
    _id: number;

    @ApiProperty({ example: true })
    @IsBoolean()
    isEmploysWorkers: boolean;

    @ApiProperty({ example: false })
    @IsBoolean()
    isWorkData: boolean;

    @ApiProperty({ example: '789012' })
    @IsString()
    incomeTaxFileNumber: string;

    @ApiProperty({ example: '345678' })
    @IsString()
    VATFileNumber: string;

    @ApiProperty({ example: ReportType.NotReporting })
    reports: ReportType;

    @ApiProperty({ example: false })
    @IsBoolean()
    isStatisticsData: boolean;

    @ApiProperty({ example: 'Alice Johnson' })
    @IsString()
    referrerName: string;

    @ApiProperty({ example: '2022-01-01' })
    @IsDateString()
    entryDate: Date;

    @ApiProperty({ example: false })
    @IsBoolean()
    isAccountant: boolean;

    @ApiProperty({ example: true })
    @IsBoolean()
    isOpenAccountWithUs: boolean;
}

export class UpdateClientDto {
    @ApiProperty({ example: 'ACME Corporation' })
    @IsString()
    @IsOptional()
    companyName?: string;

    @ApiProperty({ example: 'John' })
    @IsOptional()
    @IsString()
    firstName?: string;

    @ApiProperty({ example: 'Doe' })
    @IsOptional()
    @IsString()
    lastName?: string;

    @ApiProperty({ example: 'Jane Smith' })
    @IsOptional()
    @IsString()
    contactPersonName?: string;

    @ApiProperty({ example: '123456' })
    @IsOptional()
    @IsString()
    tz?: string;

    @ApiProperty({ example: 'Mary Doe' })
    @IsOptional()
    @IsString()
    spouseName?: string;

    @ApiProperty({ example: '456789' })
    @IsOptional()
    @IsString()
    spouseTZ?: string;

    @ApiProperty({ example: '555-555-5555' })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty({ example: 'john.doe@example.com' })
    @IsOptional()
    @IsString()
    email?: string;

    @ApiProperty({ example: '123 Main Street, City, Country' })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiProperty({ example: [] })
    @IsOptional()
    encryptedPasswords?: SensitiveData[];

    @ApiProperty({ example: 'No special comments' })
    @IsOptional()
    @MaxLength(300)
    @IsString()
    comments?: string;

    @ApiProperty({ example: '<user_id>' })
    @IsOptional()
    lastUserUpdate?: User;

    @ApiProperty({ example: ['<user_id_1>', '<user_id_2>'] })
    @IsOptional()
    assignTo?: User[];

    @ApiProperty({ example: 1001 })
    @IsOptional()
    @IsNumber()
    _id?: number;

    @ApiProperty({ example: true })
    @IsOptional()
    @IsBoolean()
    isEmploysWorkers?: boolean;

    @ApiProperty({ example: false })
    @IsOptional()
    @IsBoolean()
    isWorkData?: boolean;

    @ApiProperty({ example: '789012' })
    @IsOptional()
    @IsString()
    incomeTaxFileNumber?: string;

    @ApiProperty({ example: '345678' })
    @IsOptional()
    @IsString()
    VATFileNumber?: string;

    @ApiProperty({ example: ReportType.NotReporting })
    @IsOptional()
    reports?: ReportType;

    @ApiProperty({ example: false })
    @IsOptional()
    @IsBoolean()
    isStatisticsData?: boolean;

    @ApiProperty({ example: 'Alice Johnson' })
    @IsOptional()
    @IsString()
    referrerName?: string;

    @ApiProperty({ example: '2022-01-01' })
    @IsOptional()
    @IsDateString()
    entryDate?: Date;

    @ApiProperty({ example: false })
    @IsOptional()
    @IsBoolean()
    isAccountant?: boolean;

    @ApiProperty({ example: true })
    @IsOptional()
    @IsBoolean()
    isOpenAccountWithUs?: boolean;
}

