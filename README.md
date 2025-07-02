# Blog API - NestJS Backend

A robust Blog API built with NestJS and TypeScript, featuring CRUD operations for blog posts, secure JWT authentication, and role-based access control. Deployed on Vercel with Neon PostgreSQL database.

## Features

- **Blog Post Management**: Full CRUD operations for blog posts
- **User Authentication**: JWT-based authentication system
- **Role-Based Access Control**: Admin and user roles with different permissions
- **Database Integration**: Neon PostgreSQL with TypeORM
- **API Documentation**: Swagger/OpenAPI documentation
- **Input Validation**: Comprehensive request validation
- **Pagination**: Support for paginated blog post listings
- **Cloud Deployment**: Deployed on Vercel for production
- **Modern Role Guards**: Refactored role-based access control with `@UseGuards(AccessTokenGuard, RolesGuard)` and `@Roles(Role.ADMIN)` pattern

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: Neon PostgreSQL (Serverless)
- **ORM**: TypeORM
- **Authentication**: JWT (JSON Web Tokens)
- **Documentation**: Swagger
- **Validation**: class-validator
- **Deployment**: Vercel

## Quick Start

### Live Demo
- **API Base URL**: `https://blogs-api-assessment.vercel.app`
- **Swagger Documentation**: `https://blogs-api-assessment.vercel.app/api`
- **Postman Collection**: [Download Blogs-API-Postman-Collection.json](./Blogs-API-Postman-Collection.json)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blogs-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   - Copy `.env.example` to `.env`
   - Update the database credentials and other settings:
   ```env
   # Neon Database Configuration
   DB_HOST=your-neon-host.neon.tech
   DB_PORT=5432
   DB_USERNAME=your-neon-username
   DB_PASSWORD=your-neon-password
   DB_DATABASE=your-neon-database
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRATION=1d
   
   # Application Configuration
   PORT=3000
   NODE_ENV=development
   ```

4. **Database Setup with Neon**
   - Sign up for a free Neon account at [neon.tech](https://neon.tech)
   - Create a new project
   - Copy the connection string from your Neon dashboard
   - Update your `.env` file with the Neon credentials
   - The application will automatically create tables on first run (synchronize: true)

5. **Start the application**
   ```bash
   # Development mode
   npm run start:dev
   
   # Production mode
   npm run build
   npm run start:prod
   ```

## API Endpoints

### Authentication

#### Register User
- **POST** `/auth/register`
- **Body**:
  ```json
  {
    "username": "john_doe",
    "password": "password123",
    "role": "user" // optional, defaults to "user"
  }
  ```

#### Login User
- **POST** `/auth/login`
- **Body**:
  ```json
  {
    "username": "john_doe",
    "password": "password123"
  }
  ```

### Blog Posts

#### Create Post (Authenticated)
- **POST** `/posts`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "title": "My Blog Post",
    "content": "This is the content of my blog post..."
  }
  ```

#### Get All Posts (Public)
- **GET** `/posts?page=1&limit=10`
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)

#### Get Single Post (Public)
- **GET** `/posts/:id`

#### Update Post (Authenticated - Own posts or Admin)
- **PATCH** `/posts/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "title": "Updated Title",
    "content": "Updated content..."
  }
  ```

#### Delete Post (Authenticated - Own posts or Admin)
- **DELETE** `/posts/:id`
- **Headers**: `Authorization: Bearer <token>`

### Admin Endpoints

#### Get All Users (Admin Only)
- **GET** `/admin/users`
- **Headers**: `Authorization: Bearer <token>`
- **Access**: Admin role required

#### Admin Dashboard (Admin Only)
- **GET** `/admin/dashboard`
- **Headers**: `Authorization: Bearer <token>`
- **Access**: Admin role required

## Example Usage

### Complete API Workflow Example

Here's a complete example of how to use the API from registration to creating and managing posts:

#### 1. Register a New User
```bash
curl -X POST https://blogs-api-assessment.vercel.app/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "password123",
    "role": "user"
  }'
```

**Response:**
```json
{
  "id": 1,
  "username": "john_doe",
  "role": "user",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### 2. Login to Get Access Token
```bash
curl -X POST https://blogs-api-assessment.vercel.app/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### 3. Create a Blog Post
```bash
curl -X POST https://blogs-api-assessment.vercel.app/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "title": "My First Blog Post",
    "content": "This is the content of my first blog post. I am excited to share my thoughts with the world!"
  }'
```

**Response:**
```json
{
  "id": 1,
  "title": "My First Blog Post",
  "content": "This is the content of my first blog post. I am excited to share my thoughts with the world!",
  "author": {
    "id": 1,
    "username": "john_doe"
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### 4. Get All Posts (Public)
```bash
curl -X GET "https://blogs-api-assessment.vercel.app/posts?page=1&limit=10"
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "My First Blog Post",
      "content": "This is the content of my first blog post. I am excited to share my thoughts with the world!",
      "author": {
        "id": 1,
        "username": "john_doe"
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

#### 5. Update Your Post
```bash
curl -X PATCH https://blogs-api-assessment.vercel.app/posts/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "title": "Updated Blog Post Title",
    "content": "This is the updated content of my blog post with new information."
  }'
```

**Response:**
```json
{
  "id": 1,
  "title": "Updated Blog Post Title",
  "content": "This is the updated content of my blog post with new information.",
  "author": {
    "id": 1,
    "username": "john_doe"
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Admin Workflow Example

#### 1. Register an Admin User
```bash
curl -X POST https://blogs-api-assessment.vercel.app/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin_user",
    "password": "admin123",
    "role": "admin"
  }'
```

#### 2. Login as Admin
```bash
curl -X POST https://blogs-api-assessment.vercel.app/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin_user",
    "password": "admin123"
  }'
```

#### 3. Access Admin Dashboard
```bash
curl -X GET https://blogs-api-assessment.vercel.app/admin/dashboard \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response:**
```json
{
  "message": "Admin dashboard",
  "stats": {
    "totalUsers": 2,
    "totalPosts": 1,
    "recentActivity": []
  }
}
```

#### 4. Get All Users (Admin Only)
```bash
curl -X GET https://blogs-api-assessment.vercel.app/admin/users \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response:**
```json
[
  {
    "id": 1,
    "username": "john_doe",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": 2,
    "username": "admin_user",
    "role": "admin",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### JavaScript/Node.js Example

```javascript
const axios = require('axios');

const API_BASE_URL = 'https://blogs-api-assessment.vercel.app';

// Register a new user
async function registerUser() {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      username: 'john_doe',
      password: 'password123',
      role: 'user'
    });
    console.log('User registered:', response.data);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error.response.data);
  }
}

// Login and get access token
async function loginUser() {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      username: 'john_doe',
      password: 'password123'
    });
    console.log('Login successful:', response.data);
    return response.data.access_token;
  } catch (error) {
    console.error('Login failed:', error.response.data);
  }
}

// Create a blog post
async function createPost(token) {
  try {
    const response = await axios.post(`${API_BASE_URL}/posts`, {
      title: 'My First Blog Post',
      content: 'This is the content of my first blog post.'
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('Post created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Post creation failed:', error.response.data);
  }
}

// Get all posts
async function getAllPosts() {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts?page=1&limit=10`);
    console.log('All posts:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to get posts:', error.response.data);
  }
}

// Main workflow
async function main() {
  await registerUser();
  const token = await loginUser();
  if (token) {
    await createPost(token);
    await getAllPosts();
  }
}

main();
```

### Python Example

```python
import requests
import json

API_BASE_URL = 'https://blogs-api-assessment.vercel.app'

def register_user():
    """Register a new user"""
    data = {
        'username': 'john_doe',
        'password': 'password123',
        'role': 'user'
    }
    response = requests.post(f'{API_BASE_URL}/auth/register', json=data)
    if response.status_code == 201:
        print('User registered:', response.json())
        return response.json()
    else:
        print('Registration failed:', response.json())

def login_user():
    """Login and get access token"""
    data = {
        'username': 'john_doe',
        'password': 'password123'
    }
    response = requests.post(f'{API_BASE_URL}/auth/login', json=data)
    if response.status_code == 200:
        print('Login successful:', response.json())
        return response.json()['access_token']
    else:
        print('Login failed:', response.json())

def create_post(token):
    """Create a blog post"""
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
    data = {
        'title': 'My First Blog Post',
        'content': 'This is the content of my first blog post.'
    }
    response = requests.post(f'{API_BASE_URL}/posts', json=data, headers=headers)
    if response.status_code == 201:
        print('Post created:', response.json())
        return response.json()
    else:
        print('Post creation failed:', response.json())

def get_all_posts():
    """Get all posts"""
    response = requests.get(f'{API_BASE_URL}/posts?page=1&limit=10')
    if response.status_code == 200:
        print('All posts:', response.json())
        return response.json()
    else:
        print('Failed to get posts:', response.json())

# Main workflow
if __name__ == '__main__':
    register_user()
    token = login_user()
    if token:
        create_post(token)
        get_all_posts()
```

## Role-Based Access Control

The application uses a modern role-based access control system with the following pattern:

```typescript
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(Role.ADMIN)
```

### User Roles

- **User**: Can create, read, update, and delete their own posts
- **Admin**: Can manage all posts and access admin endpoints

### Role Guard Usage Examples

```typescript
// Controller-level protection
@Controller('admin')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminController {
  // All methods require ADMIN role
}

// Method-level protection
@Controller('posts')
@UseGuards(AccessTokenGuard, RolesGuard)
export class PostsController {
  @Post()
  @Roles(Role.USER, Role.ADMIN) // Multiple roles allowed
  createPost() { }

  @Delete(':id')
  @Roles(Role.ADMIN) // Admin only
  deletePost() { }
}
```

## Authentication Flow

1. Register a new user or login with existing credentials
2. Receive JWT token in response
3. Include token in Authorization header for protected endpoints:
   ```
   Authorization: Bearer <your-jwt-token>
   ```

## API Documentation

Once the application is running, visit:
- **Local**: `http://localhost:3000/api`
- **Production**: `https://blogs-api-assessment.vercel.app/api`

## Database Schema

### Users Table
- `id`: Primary key
- `username`: Unique username
- `password`: Hashed password
- `role`: User role (user/admin)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### Posts Table
- `id`: Primary key
- `title`: Post title
- `content`: Post content
- `authorId`: Foreign key to users table
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## Deployment

### Vercel Deployment

This project is configured for deployment on Vercel:

1. **Connect to Vercel**:
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Vercel will automatically detect the NestJS project

2. **Environment Variables**:
   - Set up environment variables in Vercel dashboard
   - Include all database and JWT configuration

3. **Build Configuration**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Deployment**:
   - Vercel will automatically deploy on every push to main branch
   - Preview deployments for pull requests

### Neon Database Integration

- **Serverless PostgreSQL**: Neon provides a serverless PostgreSQL database
- **Automatic Scaling**: Database scales automatically based on usage
- **Connection Pooling**: Built-in connection pooling for optimal performance
- **Branching**: Create database branches for development and testing

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Role-based access control with modern guard patterns
- Input validation and sanitization
- CORS enabled
- Environment-based configuration
- Secure database connections with Neon

## Development

### Available Scripts

```bash
# Development
npm run start:dev    # Start with hot reload
npm run start:debug  # Start in debug mode

# Building
npm run build        # Build the project

# Testing
npm run test         # Run unit tests
npm run test:e2e     # Run end-to-end tests
npm run test:cov     # Run tests with coverage

# Linting
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

### Project Structure

```
src/
├── admin/              # Admin-specific functionality
│   ├── admin.controller.ts
│   └── admin.module.ts
├── auth/               # Authentication module
│   ├── decorators/
│   │   ├── roles.decorator.ts
│   │   ├── permissions.decorator.ts
│   │   └── admin-permissions.decorator.ts
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   ├── roles.guard.ts
│   │   └── permissions.guard.ts
│   ├── strategies/
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   └── auth.service.ts
├── posts/              # Blog posts module
│   ├── dto/
│   ├── entities/
│   ├── interceptors/
│   ├── posts.controller.ts
│   ├── posts.module.ts
│   └── posts.service.ts
├── users/              # Users module
│   ├── dto/
│   ├── entities/
│   ├── users.module.ts
│   └── users.service.ts
├── app.module.ts       # Main application module
└── main.ts            # Application entry point
```

## Testing with Postman

A comprehensive Postman collection is included in the project:
- **File**: `Blogs-API-Postman-Collection.json`
- **Features**: 
  - All API endpoints with proper authentication
  - Sample request bodies and expected responses
  - Automatic token management
  - Role-based testing scenarios

## Production Considerations

1. **Database**: Neon handles scaling and maintenance automatically
2. **Environment Variables**: Use secure values for JWT_SECRET in production
3. **HTTPS**: Vercel provides automatic HTTPS
4. **Rate Limiting**: Consider adding rate limiting middleware
5. **Logging**: Implement proper logging strategy
6. **Health Checks**: Add health check endpoints
7. **Database Connection**: Neon provides optimized connection pooling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License. 