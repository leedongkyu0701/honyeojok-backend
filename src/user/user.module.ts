import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Bookmark } from '../trip-routes/bookmark.entity';
import { Post } from 'src/posts/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Bookmark, Post])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
