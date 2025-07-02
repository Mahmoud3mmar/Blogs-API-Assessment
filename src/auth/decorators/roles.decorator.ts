import { SetMetadata } from '@nestjs/common';
import { UserRole, Role } from '../../users/entities/user.entity';

export const ROLES_KEY = 'roles';

/**
 * Roles decorator for role-based access control
 * @param roles - Array of roles that can access the endpoint
 * @returns Metadata decorator
 * 
 * @example
 * @Roles(Role.ADMIN)
 * @Roles(Role.USER, Role.ADMIN)
 */
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

/**
 * Admin-only decorator
 * @returns Metadata decorator for admin access
 */
export const AdminOnly = () => Roles(Role.ADMIN);

/**
 * User-only decorator
 * @returns Metadata decorator for user access
 */
export const UserOnly = () => Roles(Role.USER);

/**
 * Any authenticated user decorator
 * @returns Metadata decorator for any authenticated user
 */
export const AnyAuthenticated = () => Roles(Role.USER, Role.ADMIN); 