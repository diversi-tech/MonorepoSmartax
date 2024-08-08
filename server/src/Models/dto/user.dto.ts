// import { ApiProperty } from '@nestjs/swagger';
// import { IsNotEmpty, IsString, IsEmail, IsOptional, MinLength, MaxLength, Matches } from 'class-validator';
// import { Role } from '../../Models/role.modle';
// import { Client } from '../client.model';

// export class CreateUserDto {
//     @ApiProperty({ description: 'The user name' })
//     @IsNotEmpty()
//     @IsString()
//     userName: string;

//     @ApiProperty({ description: 'The user email' })
//     @IsNotEmpty()
//     @IsEmail()
//     email: string;

//     @ApiProperty({ description: 'The hashed password' })
//     @IsNotEmpty()
//     @IsString()
//     @MinLength(8)
//     @MaxLength(20)
//     @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
//         message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
//     })
//     passwordHash: string;

//     @ApiProperty({ description: 'The role of the user', required: false })
//     @IsOptional()
//     role?: Role;
//     @ApiProperty({ description: 'The favorites clients' })
//     favoritesClient: Client[]
// }

// export class UpdateUserDto {

//     @ApiProperty({ description: 'The user ID' })
//     @IsNotEmpty()
//     @IsString()
//     id: string;

//     @ApiProperty({ description: 'The user name', required: false })
//     @IsOptional()
//     @IsString()
//     userName?: string;

//     @ApiProperty({ description: 'The user email', required: false })
//     @IsOptional()
//     @IsEmail()
//     email?: string;

//     @ApiProperty({ description: 'The hashed password', required: false })
//     @IsOptional()
//     @IsString()
//     passwordHash?: string;

//     @ApiProperty({ description: 'The role of the user', required: false })
//     @IsOptional()
//     role?: Role;

//     @ApiProperty({ description: 'The favorites clients', required: false })
//     @IsOptional()
//     favoritesClient: Client[]
// }

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsOptional, MinLength, MaxLength, Matches, IsArray, ValidateNested } from 'class-validator';
import { Role } from '../../Models/role.modle';
import { Client } from '../client.model';
import { Type } from 'class-transformer';

export class CreateUserDto {
    @ApiProperty({ description: 'The user name' })
    @IsNotEmpty()
    @IsString()
    userName: string;

    @ApiProperty({ description: 'The user email address' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'The hashed password' })
    @IsNotEmpty()
    @IsString()
    // @MinLength(8)
    // @MaxLength(20)
    // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    //     message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    // })
    passwordHash: string;

    @ApiProperty({ description: 'The role of the user', required: false })
    @IsOptional()
    role?: Role;

    @ApiProperty({ description: 'The list of favorite clients', required: false })
    @IsOptional()
    @IsArray()
    favoritesClient?: Client[];
}

export class UpdateUserDto {
    @ApiProperty({ description: 'The user ID' })
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({ description: 'The user name', required: false })
    @IsOptional()
    @IsString()
    userName?: string;

    @ApiProperty({ description: 'The user email address', required: false })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({ description: 'The hashed password', required: false })
    @IsOptional()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    })
    passwordHash?: string;

    @ApiProperty({ description: 'The role of the user', required: false })
    @IsOptional()
    @ValidateNested()
    @Type(() => Role) // מתאר את סוג האובייקט של role
    role?: Role;

    @ApiProperty({ description: 'The list of favorite clients', required: false })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Client) // מתאר את סוג האובייקט של favoritesClient
    favoritesClient?: Client[];
}

