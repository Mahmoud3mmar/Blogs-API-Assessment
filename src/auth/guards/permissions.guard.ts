import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../users/entities/user.entity';
import { Permission } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.getAllAndOverride<Permission[]>('permissions', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!permissions || permissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { user } = request;

    // Check if user has any of the required permissions
    for (const permission of permissions) {
      if (this.hasPermission(user, permission, request)) {
        return true;
      }
    }

    throw new ForbiddenException('Insufficient permissions');
  }

  private hasPermission(user: any, permission: Permission, request: any): boolean {
    // Check role-based access
    if (permission.roles && permission.roles.length > 0) {
      if (!permission.roles.includes(user.role)) {
        return false;
      }
    }

    // Check ownership if required
    if (permission.checkOwnership) {
      return this.checkOwnership(user, permission.resource, request);
    }

    return true;
  }

  private checkOwnership(user: any, resourceType: string, request: any): boolean {
    // Admins can access any resource
    if (user.role === UserRole.ADMIN) {
      return true;
    }

    // Check ownership based on resource type
    switch (resourceType) {
      case 'post':
        const post = request.post;
        if (!post) {
          return true; // Let the service handle the not found case
        }
        return post.authorId === user.id;
      
      case 'user':
        const targetUserId = parseInt(request.params.id);
        return targetUserId === user.id;
      
      default:
        return false;
    }
  }
} 