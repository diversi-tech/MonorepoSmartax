import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, UserModel } from '../Models/user.model';
import { CreateUserDto, UpdateUserDto } from '../Models/dto/user.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { Role } from '../Models/role.modle';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) { }

  async createToken(payload: { email: string, role: Role, _id: unknown }): Promise<any> {
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '12h', privateKey: process.env.PRIVATEKEY })
    };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    return null; // Implement user validation logic here if needed
  }

  decodeToken(token: string): any {

    try {
      const decoded = jwt.verify(token, process.env.PRIVATEKEY);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async getRoleFromToken(token: string) {
    try {
      const decode = this.decodeToken(token);

      return decode.role;
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }

  async validateToken(token: string) {
    try {
      const decode = this.decodeToken(token);

      return true;
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }

  async FindEmail(token: string) {
    try {
      const decode = this.decodeToken(token);

      const email = decode.email
      return email
    }
    catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

  }
}

export { JwtService };
