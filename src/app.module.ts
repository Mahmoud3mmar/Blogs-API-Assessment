import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { User } from './users/entities/user.entity';
import { Post } from './posts/entities/post.entity';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        // Check if database environment variables are set
        const dbHost = configService.get('DB_HOST');
        const dbUsername = configService.get('DB_USERNAME');
        const dbPassword = configService.get('DB_PASSWORD');
        const dbDatabase = configService.get('DB_DATABASE');
        
        // If database credentials are not set, return a minimal config
        if (!dbHost || !dbUsername || !dbPassword || !dbDatabase) {
          console.warn('Database environment variables not set. Running without database connection.');
          return {
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'dummy',
            password: 'dummy',
            database: 'dummy',
            entities: [],
            synchronize: false,
            logging: false,
            autoLoadEntities: false,
          };
        }
        
        return {
          type: 'postgres',
          host: dbHost,
          port: +configService.get<number>('DB_PORT') || 5432,
          username: dbUsername,
          password: dbPassword,
          database: dbDatabase,
          entities: [User, Post],
          synchronize: true, // Set to false in production
          logging: false,
          ssl: configService.get('DB_SSL') === 'true' ? {
            rejectUnauthorized: false,
          } : false,
        };
      },
      inject: [ConfigService],
    }),
    // Conditionally load modules based on database availability
    ...(process.env.DB_HOST ? [AuthModule, PostsModule, UsersModule, AdminModule] : []),
  ],
  controllers: [AppController],
})
export class AppModule {} 
