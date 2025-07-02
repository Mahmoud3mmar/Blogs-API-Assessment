import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
 
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

// Alias for AccessTokenGuard to match the desired usage pattern
export const AccessTokenGuard = JwtAuthGuard; 