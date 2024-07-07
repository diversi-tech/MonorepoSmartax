import { Body, Controller, Get, HttpException, Request, HttpStatus, Post, UseFilters } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpErrorFilter } from '../../common/filters/http-error.filter';
import { User } from 'server/src/Models/user.model';
import { hashPasswordService } from 'server/src/services/hash-password';
import { TokenService } from 'server/src/services/jwt.service';
import { UserService } from 'server/src/services/user.service';
import * as jwt from 'jsonwebtoken';


@ApiTags('auth')
@Controller('auth')
@UseFilters(HttpErrorFilter) 
export class AuthController {
    constructor(private readonly userService: UserService, private jwtToken: TokenService, private hashService: hashPasswordService) { }

    @Post('signin')
    async signin(@Body() loginDto: any) {
      const { email, passwordHash } = loginDto;
    
      if (!(email && passwordHash)) {
        throw new HttpException('Email and password are required', HttpStatus.BAD_REQUEST);
      }
    
      const user: User = await this.userService.findByEmail(email);
    
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
    
      const isPasswordValid = await this.hashService.comparePasswords(passwordHash, user.passwordHash);
    
      if (!isPasswordValid) {
        throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
      }
    
      const token = await this.jwtToken.createToken(user.email, user.role.level);
    
      return token;
    }

  @Post('signout')
  @ApiResponse({ status: 200, description: 'signout success' })
  async signout(@Body() loginDto: any) {

  }


  @Post('validate-token')
  @ApiOperation({ summary: 'validate token and policy' })
  @ApiResponse({ status: 200, description: 'the token is valid and policy is current' })
  @ApiResponse({ status: 401, description: 'the token is invalid' })
  @ApiResponse({ status: 403, description: 'the policy is not current' })
  async validateToken(@Body() body: { policy: number }, @Request() req) {
    const token = req.headers.authorization.split(' ')[1];
    const policy = body.policy;

    try {
      const tokenPolicy = await this.jwtToken.validateToken(token);
      
      if (tokenPolicy > policy) {
        throw new HttpException('Not an admin', HttpStatus.FORBIDDEN);
      }
      return { message: 'Token is valid and policy is valid' };
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}

