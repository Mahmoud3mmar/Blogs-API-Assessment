import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../users/entities/user.entity';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const resourceType = this.reflector.getAllAndOverride<string>('checkOwnership', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!resourceType) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { user, params } = request;

    // Admins can access any resource
    if (user.role === UserRole.ADMIN) {
      return true;
    }

    // For posts, check if the user is the author
    if (resourceType === 'post') {
      const postId = parseInt(params.id);
      const post = request.post; // This will be set by the interceptor

      if (!post) {
        return true; // Let the service handle the not found case
      }

      if (post.authorId !== user.id) {
        throw new ForbiddenException('You can only access your own posts');
      }
    }

    return true;
  }
} 