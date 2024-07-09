// src/auth/strategies/google.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../services/user.service'; // Adjust the path based on your project structure
import { TokenService } from '../services/jwt.service'; // Adjust the path based on your project structure
import { User } from '../Models/user.model'; // Adjust the path based on your project structure

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {
    super({
        clientID: configService.get('GOOGLE_CLIENT_ID'),
        clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
        callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
        scope: ['email', 'profile'],
      });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, emails, displayName } = profile;
    const user = await this.userService.findOrCreateByGoogleId(id, emails[0].value, displayName);
    
    // Optionally, you can save tokens or additional data here if needed

    const token = await this.tokenService.createToken({
      email: user.email,
      role: user.role,
      _id: user._id,
    });

    return done(null, { token });
  }
}
