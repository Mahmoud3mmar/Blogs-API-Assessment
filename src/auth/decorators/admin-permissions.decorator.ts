import { RequirePermissions } from './permissions.decorator';
import { UserRole, Role } from '../../users/entities/user.entity';

// Specific decorators for admin operations
export const CanManageUsers = () => RequirePermissions({ action: 'read', resource: 'user', roles: [Role.ADMIN] });

export const CanManageAllPosts = () => RequirePermissions({ action: 'manage', resource: 'post', roles: [Role.ADMIN] });

export const IsAdmin = () => RequirePermissions({ action: 'admin', resource: 'system', roles: [Role.ADMIN] }); 