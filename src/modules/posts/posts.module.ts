import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostImage } from './entities/post-image.entity';
import { Comment } from './entities/comment.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { R2Module } from 'src/infrastructure/storage/r2/r2.module';
import { PostLike } from './entities/post-like.entity';
import { PostsQueryService } from './posts-query.service';
import { CommentsService } from './comments/comments.service';
import { PostLikesService } from './likes/post-likes.service';
import { PostMediaService } from './post-media.service';
import { UserPostsController } from './user-posts.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, PostImage, Comment, User, PostLike]),
    R2Module,
  ],
  providers: [
    PostsService,
    PostsQueryService,
    CommentsService,
    PostLikesService,
    PostMediaService,
  ],
  controllers: [PostsController, UserPostsController],
})
export class PostsModule {}
