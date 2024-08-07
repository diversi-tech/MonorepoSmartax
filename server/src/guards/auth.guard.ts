import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { TokenService } from "../services/jwt.service"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization!.split(' ')[1]; // Assuming token is present in the 'Authorization' header

    try {
      await this.tokenService.validateToken(token);
      return true;
    } catch (error) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

}