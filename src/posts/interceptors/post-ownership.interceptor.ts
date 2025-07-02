import { Injectable, NestInterceptor, ExecutionContext, CallHandler, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PostsService } from '../posts.service';

@Injectable()
export class PostOwnershipInterceptor implements NestInterceptor {
  constructor(private readonly postsService: PostsService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;

    // Only load post for routes that need ownership checking
    if (params.id) {
      try {
        const post = await this.postsService.findOne(parseInt(params.id));
        request.post = post;
      } catch (error) {
        if (error instanceof NotFoundException) {
          // Let the service handle the not found case
          request.post = null;
        } else {
          throw error;
        }
      }
    }

    return next.handle();
  }
} 