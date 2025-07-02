import { SetMetadata } from '@nestjs/common';

export const CHECK_OWNERSHIP_KEY = 'checkOwnership';
export const CheckOwnership = (resourceType: string) => SetMetadata(CHECK_OWNERSHIP_KEY, resourceType); 