import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Bookmark } from '../trip-routes/bookmark.entity';
import { PostLike } from '../posts/post_like.entity';
import { TripRoute } from 'src/trip-routes/trip-route.entity';
import { Post } from 'src/posts/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Bookmark, PostLike, TripRoute, Post]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
