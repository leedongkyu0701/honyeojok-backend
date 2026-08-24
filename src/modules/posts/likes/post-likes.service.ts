import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';
import { User } from 'src/modules/users/entities/user.entity';
import { Post } from '../entities/post.entity';
import { PostLike } from '../entities/post-like.entity';

@Injectable()
export class PostLikesService {
  constructor(private readonly dataSource: DataSource) {}

  async toggleLikePost(
    userId: number,
    postId: number,
  ): Promise<{ likeCount: number; liked: boolean }> {
    return this.dataSource.transaction(async (manager) => {
      const post = await manager.findOne(Post, {
        where: { id: postId, isDeleted: false },
        lock: { mode: 'pessimistic_write' },
      });
      if (!post) {
        throw BaseException.notFound(
          'Post not found',
          ErrorCode.RESOURCE_NOT_FOUND,
        );
      }

      const user = await manager.findOne(User, { where: { id: userId } });
      if (!user) {
        throw BaseException.notFound(
          'User not found',
          ErrorCode.RESOURCE_NOT_FOUND,
        );
      }

      const existingLike = await manager.exists(PostLike, {
        where: { postId, userId },
      });

      if (existingLike) {
        await manager.delete(PostLike, { postId, userId });
        await manager.decrement(Post, { id: postId }, 'likeCount', 1);
        const updatedPost = await manager.findOne(Post, {
          where: { id: postId, isDeleted: false },
        });
        return { likeCount: updatedPost!.likeCount, liked: false };
      }

      const like = manager.create(PostLike, { post, user });
      await manager.save(like);
      await manager.increment(Post, { id: postId }, 'likeCount', 1);
      const updatedPost = await manager.findOne(Post, {
        where: { id: postId, isDeleted: false },
      });
      return { likeCount: updatedPost!.likeCount, liked: true };
    });
  }
}
