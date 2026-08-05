import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Bookmark } from 'src/modules/trip-routes/entities/bookmark.entity';
import { Post } from 'src/modules/posts/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Bookmark, Post])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
