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

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, PostImage, Comment, User, PostLike]),
    R2Module,
  ],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
