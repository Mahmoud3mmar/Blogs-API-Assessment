import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('health')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Health check and API information' })
  @ApiResponse({ status: 200, description: 'API is running' })
  getHello() {
    return {
      message: 'Blog API is running!',
      version: '1.0.0',
      documentation: '/api',
      endpoints: {
        auth: '/auth',
        posts: '/posts',
        admin: '/admin'
      },
      status: 'healthy'
    };
  }

  @Get('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ status: 200, description: 'Service is healthy' })
  healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'Blog API'
    };
  }
} 