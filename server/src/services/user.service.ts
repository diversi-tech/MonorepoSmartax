import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User ,UserModel } from '../Models/user.model';
import { CreateUserDto, UpdateUserDto } from '../Models/dto/user.dto';
import { ValidationException } from '../common/exceptions/validation.exception';
import { TokenService } from './jwt.service';
import * as bcrypt from 'bcryptjs';
import { Client } from '../Models/client.model';
import { throwError } from 'rxjs';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtToken:TokenService
    
  ) {}
  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
    
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { userName, email, passwordHash, role } = createUserDto;

    if (!userName || !email || !passwordHash || !role) {
      throw new ValidationException('Missing required fields');
    }
    const favoritesClient: Client[]=[];
    const createdUser = new this.userModel({ userName, email, passwordHash, role,favoritesClient });
    
    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new ValidationException('User not found');
      }
      return user;
      
    } catch (error) {
      console.log(error);
      
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { userName, email, role,favoritesClient } = updateUserDto;
    if(updateUserDto.email == "a@a")
      throw new Error('אין הרשאה לשינוי מנהל המערכת');
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { userName, email, role, favoritesClient: favoritesClient },
      { new: true }
    ).select("passwordHash").exec();

    if (!updatedUser) {
      throw new ValidationException('User not found');
    }


    return updatedUser;
  }

  async deleteUser(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new ValidationException('User not found');
    }
    return deletedUser;
  }
}

