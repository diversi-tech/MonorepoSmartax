// // src/auth/auth.module.ts

// import { Module } from '@nestjs/common';
// import { PassportModule } from '@nestjs/passport';
// import { ConfigModule } from '@nestjs/config';
// import { GoogleStrategy } from './google.strategy';
// import { AuthController } from '../controller/auth/auth.controller';
// import { GoogleAuthGuard } from './google-auth.guard';
// import { UserService } from '../services/user.service'; // Adjust the path based on your project structure
// import { TokenService } from '../services/jwt.service'; // Adjust the path based on your project structure

// @Module({
//   imports: [
//     PassportModule,
//     ConfigModule, // Make sure you've configured this in your AppModule
//   ],
//   providers: [
//     GoogleStrategy,
//     UserService, // Adjust the path based on your project structure
//     TokenService, // Adjust the path based on your project structure
//   ],
//   controllers: [AuthController],
// })
// export class AuthModule {}
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from '../services/user.service';
import { User, UserModel } from '../Models/user.model'; // או כל שם שנקבע במודל

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserModel }]),
    // יתכן שצריך להוסיף גם את ה-MongooseModule.forRoot() אם עדיין לא נטען
  ],
  providers: [UserService],
  exports: [UserService], // אם נדרש לייצא את UserService
})
export class AuthModule {}
