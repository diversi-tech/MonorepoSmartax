import { IsNotEmpty, IsString, IsDateString, IsOptional, IsPhoneNumber, Length, ValidateNested, IsBoolean, IsNumber, MaxLength, IsArray, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTagDto } from './tag.dto';
import { UpdateTagDto } from './tag.dto';
import { Type } from 'class-transformer';
import { ObjectId } from 'mongoose';
import { SensitiveData } from '../sensitiveData.model';
import { User } from '../user.model';
import { ReportType } from '../client.model';
import { ClientType } from '../clientType.model';

export class CreateClientDto {
    @ApiProperty({ example: 'ACME Corporation' })
    @IsOptional()
    @IsString()
    companyName: string;

    @ApiProperty({ example: 'John' })
    @IsOptional()
    @IsString()
    firstName: string;

    @ApiProperty({ example: 'Doe' })
    @IsOptional()
    @IsString()
    lastName: string;

    @ApiProperty({ example: 'Jane Smith' })
    @IsOptional()
    @IsString()
    contactPersonName: string;

    @ApiProperty({uniqueItems:true, example: '123456' })
    @IsOptional()
    @IsString()
    tz: string;

    @ApiProperty({ example: 'Mary Doe' })
    @IsString()
    spouseName: string;

    @ApiProperty({ example: '456789' })
    @IsString()
    spouseTZ: string;

    @ApiProperty({ type: String ,example: '555-555-5555'})
    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber('IL', { message: 'phone must be a valid Israeli phone number' })
    @Length(10, 10, { message: 'phone must be exactly 10 digits' })
    phone: string;

    @ApiProperty({ example: '555-555-5555' })
    @IsString()
    whatsapp: string;

    @ApiProperty({ example: 'john.doe@example.com' })
    @IsString()
    email: string;

    @ApiProperty({ example: false })
    @IsBoolean()
    isPreferWhatsapp: boolean;

    @ApiProperty({ example: '123 Main Street, City, Country' })
    @IsString()
    address: string;

    @ApiProperty({ example: [] })
    encryptedPasswords: SensitiveData[];

    @ApiProperty({ example: 'No special comments' })
    @IsString()
    @MaxLength(300)
    comments: string;

    @ApiProperty({ example: '<user_id>'})
    lastUserUpdate: User;

    @ApiProperty({ example: ['<user_id_1>', '<user_id_2>'] })
    assignTo: User[];

    @ApiProperty({ example: 1001 })
    @IsOptional()
    @IsNumber()
    clientId?: string;

    @ApiProperty({ example: '1969-01-01' })
    @IsDateString()
    dateOfBirth: Date;

    @ApiProperty({})
    @IsOptional()
    payment: string;

    @ApiProperty({ example: true })
    @IsBoolean()
    isEmploysWorkers: boolean;

    @ApiProperty({ example: false })
    @IsBoolean()
    isWorkData: boolean;

    @ApiProperty({ example: '789012' })
    @IsString()
    incomeTaxFileNumber: string;

    @ApiProperty({ example: '901234' })
    @IsString()
    incomeTaxDeductions_registerID: string;

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
    joinDate: Date;

    @ApiProperty({ example: false })
    @IsBoolean()
    isAccounter: boolean;

    @ApiProperty({ example: true })
    @IsBoolean()
    isOpenAccountWithUs: boolean;

    @ApiProperty({ type: CreateTagDto, example: {text:"aaaa",color:"red"},required: true  })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreateTagDto)
    tag: CreateTagDto;

    @ApiProperty()
    @IsOptional()
    clientTypes: ClientType[];
    
    @ApiProperty({ description: 'Array of User id' })
    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    clientFields: string[]
}

export class UpdateClientDto {
    @ApiProperty({ example: '123456789', required: false })
    @IsOptional()
    @IsString()
    _id?: string;

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

    @ApiProperty({uniqueItems:true, example: '123456' })
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

    @ApiProperty({ example: '555-555-5555' })
    @IsOptional()
    @IsString()
    whatsapp: string;

    @ApiProperty({ example: 'john.doe@example.com' })
    @IsOptional()
    @IsString()
    email?: string;

    @ApiProperty({ example: false })
    @IsOptional()
    @IsBoolean()
    isPreferWhatsapp: boolean;

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
    clientId?: string;

    @ApiProperty({ example: '1969-01-01' })
    @IsOptional()
    @IsDateString()
    dateOfBirth: Date;

    @ApiProperty({})
    @IsOptional()
    payment: string;

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

    @ApiProperty({ example: '901234' })
    @IsString()
    incomeTaxDeductions_registerID: string;

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
    joinDate?: Date;

    @ApiProperty({ example: false })
    @IsOptional()
    @IsBoolean()
    isAccounter?: boolean;

    @ApiProperty({ example: true })
    @IsOptional()
    @IsBoolean()
    isOpenAccountWithUs?: boolean;

    @ApiProperty({ type: UpdateTagDto, example: {text:"aaaa",color:"red"},required: true  })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => UpdateTagDto)
    tag: UpdateTagDto;

    @IsOptional()
    @ApiProperty()
    clientTypes: ClientType[];
    
    @ApiProperty({ description: 'Array of User id' })
    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    // @IsString({ each: true })
    clientFields: string[]

}
