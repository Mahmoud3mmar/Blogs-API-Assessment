import { SetMetadata } from '@nestjs/common';
import { UserRole, Role } from '../../users/entities/user.entity';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

/**
 * Example decorators showing different role-based access patterns
 * These can be used as templates for your own custom role decorators
 */

// Basic role checks
export const RequireAdmin = () => Roles(Role.ADMIN);
export const RequireUser = () => Roles(Role.USER);
export const RequireAnyRole = () => Roles(Role.USER, Role.ADMIN);

// Specific role combinations
export const RequireAdminOrUser = () => Roles(Role.ADMIN, Role.USER);
export const RequireAdminOnly = () => Roles(Role.ADMIN);

// Custom role decorators for specific business logic
export const CanManagePosts = () => Roles(Role.ADMIN, Role.USER);
export const CanManageUsers = () => Roles(Role.ADMIN);
export const CanViewAnalytics = () => Roles(Role.ADMIN);
export const CanModerateContent = () => Roles(Role.ADMIN);

// Role decorators for different user levels
export const RequirePremiumUser = () => Roles(Role.ADMIN); // Assuming premium = admin for now
export const RequireBasicUser = () => Roles(Role.USER, Role.ADMIN); 