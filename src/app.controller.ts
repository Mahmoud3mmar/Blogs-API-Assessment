import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('health')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: ' API information' })
  @ApiResponse({ status: 200, description: 'API is running' })
  getHello() {
    return {
      message: 'Blog API is running!',
      version: '1.0.0',
      documentation: '/swagger',
      endpoints: {
        auth: '/auth',
        posts: '/posts',
        admin: '/admin'
      },
    };
  }
} 
