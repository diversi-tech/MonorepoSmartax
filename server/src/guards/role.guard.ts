import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { TokenService } from '../services/jwt.service';

export const RoleGuard = (requiredLevel: number) => {
  @Injectable()
  class RoleGuardClass implements CanActivate {
    constructor(private tokenService: TokenService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization!.split(' ')[1]; // Assuming token is present in the 'Authorization' header

      try {
        const roleLevel = await this.tokenService.getRoleFromToken(token);
        if (roleLevel.level <= requiredLevel) {
          return true;
        } else {
          throw new HttpException('Forbidden - Insufficient Role Level', HttpStatus.FORBIDDEN);
        }
      } catch (error) {
      console.log("error in roleGuard:\n"+error);

        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
    }
  }

  return RoleGuardClass;
};