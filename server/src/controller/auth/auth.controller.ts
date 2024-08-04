import { Body, Controller, Get, HttpException, Request, HttpStatus, Post, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpErrorFilter } from 'server/src/common/filters/http-error.filter';
import { User } from 'server/src/Models/user.model';
import { hashPasswordService } from 'server/src/services/hash-password';
import { TokenService } from 'server/src/services/jwt.service';
import { UserService } from 'server/src/services/user.service';
import { RoleService } from 'server/src/services/role.service';
import { Role } from 'server/src/Models/role.modle';
import { AuthGuard } from 'server/src/guards/auth.guard';
import { RoleGuard } from 'server/src/guards/role.guard';


@ApiTags('auth')
@Controller('auth')
@UseFilters(HttpErrorFilter)
export class AuthController {
  constructor(private readonly userService: UserService, private jwtToken: TokenService, private hashService: hashPasswordService, private roleService: RoleService) { }

  @Post('signin')
  @ApiResponse({ status: 200, description: 'Signin success' })
  @ApiResponse({ status: 400, description: 'Email and password are required' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async signin(@Body() loginDto: any) {
    debugger
    try {

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

      const payload = { email: user.email, role: user.role, _id: user._id };
      const token = await this.jwtToken.createToken(payload);

      return token;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status?error.status:500);

    }
  }

  @Post('signout')
  @ApiResponse({ status: 200, description: 'signout success' })
  async signout(@Request() req) {
    return new HttpException('signout success', HttpStatus.OK);
  }


  @Get('current-role')
  @ApiResponse({ status: 200, description: 'the role level' })
  @ApiResponse({ status: 401, description: 'the token is invalid' })
  async currentRole(@Request() req) {
    const token = req.headers.authorization.split(' ')[1];
    console.log("auth controller token:\n" + token);
    const role = await this.jwtToken.getRoleFromToken(token);
    const response = this.roleService.getRole(role);

    return response
  }

  @Post('validate-token')
  @ApiOperation({ summary: 'validate token and policy' })
  @ApiResponse({ status: 200, description: 'the token is valid and policy is current' })
  @ApiResponse({ status: 401, description: 'the token is invalid' })
  @ApiResponse({ status: 403, description: 'the policy is not current' })
  @UseGuards(AuthGuard)
  async validateRole(@Body() body: { role: number }, @Request() req) {
    // const token = req.headers.authorization.split(' ')[1];
    // const policy = body.policy;

    try {
      RoleGuard(body.role)
      //   const tokenPolicy = await this.jwtToken.getRoleFromToken(token);

      //   if (tokenPolicy.level > policy.level) {
      //     throw new HttpException('Not an admin', HttpStatus.FORBIDDEN);
      //   }
      return { message: 'Token is valid and policy is valid' };
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}

