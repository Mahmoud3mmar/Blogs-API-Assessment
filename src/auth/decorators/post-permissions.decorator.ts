import { RequirePermissions } from './permissions.decorator';
import { UserRole, Role } from '../../users/entities/user.entity';

// Specific decorators for post operations
export const CanCreatePost = () => RequirePermissions({ 
  action: 'create', 
  resource: 'post', 
  roles: [Role.USER, Role.ADMIN] 
});

export const CanReadPost = () => RequirePermissions({ action: 'read', resource: 'post' });

export const CanUpdateOwnPost = () => RequirePermissions({ 
  action: 'update', 
  resource: 'post', 
  roles: [Role.ADMIN] 
});

export const CanDeleteOwnPost = () => RequirePermissions({ 
  action: 'delete', 
  resource: 'post', 
  roles: [Role.ADMIN] 
});

export const CanManageAllPosts = () => RequirePermissions({ action: 'manage', resource: 'post', roles: [Role.ADMIN] }); 