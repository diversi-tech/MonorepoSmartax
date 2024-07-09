import { Body, Controller, Get, HttpException, Request, HttpStatus, Post, UseFilters, Res, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpErrorFilter } from 'server/src/common/filters/http-error.filter';
import { User } from 'server/src/Models/user.model';
import { hashPasswordService } from 'server/src/services/hash-password';
import { TokenService } from 'server/src/services/jwt.service';
import { UserService } from 'server/src/services/user.service';
import { RoleService } from 'server/src/services/role.service';
import { GmailService } from 'server/src/services/GmailService';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import { Response } from 'express';
import { Token } from 'server/src/Models/token';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';



@ApiTags('auth')
@Controller('auth')
@UseFilters(HttpErrorFilter)
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly gmailService: GmailService,
    private readonly userService: UserService,
    private jwtToken: TokenService,
    private hashService: hashPasswordService,
    private roleService: RoleService,
    @InjectModel(Token.name) private tokenModel: Model<Token>

  ) {}
  @Post('signin')
  @ApiResponse({ status: 200, description: 'Signin success' })
  @ApiResponse({ status: 400, description: 'Email and password are required' })
  @ApiResponse({ status: 404, description: 'User not found' })
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

    const payload = {email: user.email, role: user.role, _id: user._id};
    const token = await this.jwtToken.createToken(payload);

    return token;
  }

  @Post('signout')
  @ApiResponse({ status: 200, description: 'signout success' })
  async signout(@Request() req) {

  }


  @Get('current-role')
  @ApiResponse({ status: 200, description: 'the role level' })
  @ApiResponse({ status: 401, description: 'the token is invalid' })
  async currentRole(@Request() req) {
    const token = req.headers.authorization.split(' ')[1];
    const role = await this.jwtToken.validatePolicy(token);
    const response = this.roleService.getRole(role);

    return response
  }

  @Post('validate-token')
  @ApiOperation({ summary: 'validate token and policy' })
  @ApiResponse({ status: 200, description: 'the token is valid and policy is current' })
  @ApiResponse({ status: 401, description: 'the token is invalid' })
  @ApiResponse({ status: 403, description: 'the policy is not current' })
  async validatePolicy(@Body() body: { policy: number }, @Request() req) {
    const token = req.headers.authorization.split(' ')[1];
    const policy = body.policy;

    try {
      const tokenPolicy = await this.jwtToken.validatePolicy(token);

      if (tokenPolicy > policy) {
        throw new HttpException('Not an admin', HttpStatus.FORBIDDEN);
      }
      return { message: 'Token is valid and policy is valid' };
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
  @Post('save-refresh-token')
  @ApiOperation({ summary: 'Save the refresh token' })
  @ApiBody({ schema: { type: 'object', properties: { refreshToken: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'Refresh token saved' })
  async saveRefreshToken(@Body() body: { refreshToken: string }) {
    const { refreshToken } = body;
    const newToken = new this.tokenModel({ refreshToken });
    await newToken.save();
    return { message: 'Refresh token saved' };
  }
  @Post('search-emails')
  @ApiOperation({ summary: 'Search for emails sent from one address to another' })
  @ApiBody({ schema: { type: 'object', properties: { fromEmail: { type: 'string' }, toEmail: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'Emails found' })
  @ApiResponse({ status: 404, description: 'No emails found' })
  async searchEmails(@Body() body: { fromEmail: string, toEmail: string }) {
    const { fromEmail, toEmail } = body;

    const refreshTokenDocument = await this.tokenModel.findOne().exec();
    if (!refreshTokenDocument) {
      throw new HttpException('No refresh token found', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    this.gmailService.setCredentials({ refresh_token: refreshTokenDocument.refreshToken });
    const emails = await this.gmailService.searchEmails(fromEmail, toEmail);
    if (emails.length === 0) {
      throw new HttpException('No emails found', HttpStatus.NOT_FOUND);
    }
    return emails;
  }
  

  @Get('google')
  async googleAuth(@Res() res: Response) {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/gmail.readonly&access_type=offline&include_granted_scopes=true&response_type=code&redirect_uri=${this.configService.get('GOOGLE_REDIRECT_URI')}&client_id=${this.configService.get('GOOGLE_CLIENT_ID')}`;
    res.redirect(googleAuthUrl);
  }


  @Get('google/callback')
async googleCallback(@Query('code') code: string, @Res() res: Response) {
  const oauth2Client = new google.auth.OAuth2(
    this.configService.get('GOOGLE_CLIENT_ID'),
    this.configService.get('GOOGLE_CLIENT_SECRET'),
    this.configService.get('GOOGLE_REDIRECT_URI'),
  );

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const tokenDocument = new this.tokenModel({ refreshToken: tokens.refresh_token });
    await tokenDocument.save();

    console.log('Access Token:', tokens.access_token);
    console.log('Refresh Token:', tokens.refresh_token);

    res.redirect('http://localhost:4200');
  } catch (error) {
    console.error('Error fetching token:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
}

  
  @Get('test-gmail')
  async testGmail() {
    try {
      const refreshTokenDocument = await this.tokenModel.findOne().exec();
      if (!refreshTokenDocument) {
        throw new Error('No refresh token found');
      }
  
      this.gmailService.setCredentials({ refresh_token: refreshTokenDocument.refreshToken });
      const emails = await this.gmailService.searchEmails( 'smarttax580@gmail.com' ,refreshTokenDocument.refreshToken);
      return emails;
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  

}


