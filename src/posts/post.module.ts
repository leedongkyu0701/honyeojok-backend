import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostImage } from './post-image.entity';
import { Comment } from './comment.entity';
import { User } from '../user/user.entity';
import { R2Module } from 'src/common/r2/r2.module';
import { PostLike } from './post_like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, PostImage, Comment, User, PostLike]),
    R2Module,
  ],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
