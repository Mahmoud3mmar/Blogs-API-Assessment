import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../users/entities/user.entity';

export interface Permission {
  action: string;
  resource: string;
  roles?: UserRole[];
  checkOwnership?: boolean;
}

export const PERMISSIONS_KEY = 'permissions';
export const RequirePermissions = (...permissions: Permission[]) => SetMetadata(PERMISSIONS_KEY, permissions); 