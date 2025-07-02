import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { AccessTokenGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CanManageUsers } from '../auth/decorators/admin-permissions.decorator';
import { AdminOnly, Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/entities/user.entity';

@ApiTags('admin')
@Controller('admin')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(Role.ADMIN)
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users')
  @CanManageUsers()
  @ApiOperation({ summary: 'Get all users (Admin only)' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Get('dashboard')
  @AdminOnly()
  @ApiOperation({ summary: 'Admin dashboard (Admin only)' })
  @ApiResponse({ status: 200, description: 'Dashboard data retrieved' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  getDashboard() {
    return {
      message: 'Admin dashboard',
      stats: {
        totalUsers: 0, // You can implement actual stats here
        totalPosts: 0,
        recentActivity: []
      }
    };
  }
} 