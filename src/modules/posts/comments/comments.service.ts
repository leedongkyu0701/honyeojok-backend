import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';
import { User } from 'src/modules/users/entities/user.entity';
import { CreateCommentRequestDto } from '../dto/request/create-comment.request.dto';
import { CommentResponseDto } from '../dto/response/comment.response.dto';
import { Comment } from '../entities/comment.entity';
import { Post } from '../entities/post.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createComment(
    userId: number,
    postId: number,
    createCommentDto: CreateCommentRequestDto,
  ): Promise<CommentResponseDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw BaseException.notFound(
        'User not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }

    const post = await this.postRepository.findOne({
      where: { id: postId, isDeleted: false },
    });
    if (!post) {
      throw BaseException.notFound(
        'Post not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }

    const content = createCommentDto.content.trim();
    if (content.length === 0) {
      throw BaseException.badRequest(
        'Comment content cannot be empty',
        ErrorCode.BAD_REQUEST,
      );
    }

    const parentId = createCommentDto.parentId ?? null;
    if (parentId !== null) {
      const parent = await this.commentRepository.findOne({
        where: { id: parentId, postId },
        select: ['id', 'postId', 'parentId', 'isDeleted'],
      });

      if (!parent) {
        throw BaseException.notFound(
          'Parent comment not found in this post',
          ErrorCode.RESOURCE_NOT_FOUND,
        );
      }

      if (parent.isDeleted) {
        throw BaseException.badRequest(
          'Cannot reply to a deleted comment',
          ErrorCode.BAD_REQUEST,
        );
      }

      if (parent.parentId !== null) {
        throw BaseException.badRequest(
          '최상위 댓글의 답글을 눌러 답글을 달아주세요',
          ErrorCode.BAD_REQUEST,
        );
      }
    }

    const comment = this.commentRepository.create({
      content,
      parentId,
      userId,
      postId,
      isDeleted: false,
    });
    await this.commentRepository.save(comment);

    return {
      id: comment.id,
      content: comment.content,
      isDeleted: comment.isDeleted,
      createdAt: comment.createdAt,
      parentId: comment.parentId,
      postId: comment.postId,
      userId: comment.userId,
      user: {
        id: user.id,
        nickName: user.nickName ?? '탈퇴한 혼여족',
      },
      children: [],
    };
  }

  async getCommentsByPost(postId: number): Promise<CommentResponseDto[]> {
    const post = await this.postRepository.findOne({
      where: { id: postId, isDeleted: false },
    });
    if (!post) {
      throw BaseException.notFound(
        'Post not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }

    const rows = await this.commentRepository.find({
      where: { postId },
      order: { createdAt: 'ASC' },
      relations: { user: true },
      select: {
        id: true,
        content: true,
        isDeleted: true,
        createdAt: true,
        parentId: true,
        userId: true,
        user: { id: true, nickName: true },
      },
    });

    const byId = new Map<number, CommentResponseDto>();
    for (const comment of rows) {
      byId.set(comment.id, {
        id: comment.id,
        content: comment.isDeleted ? '삭제된 댓글입니다.' : comment.content,
        isDeleted: comment.isDeleted,
        createdAt: comment.createdAt,
        parentId: comment.parentId ?? null,
        postId,
        userId: comment.userId ?? null,
        user: {
          id: comment.user?.id ?? comment.userId,
          nickName: comment.user?.nickName ?? '탈퇴한 혼여족',
        },
        children: [],
      });
    }

    const roots: CommentResponseDto[] = [];
    for (const item of byId.values()) {
      if (item.parentId !== null) {
        const parent = byId.get(item.parentId);
        if (parent) parent.children.push(item);
      } else {
        roots.push(item);
      }
    }

    return roots;
  }

  async deleteComment(
    userId: number,
    commentId: number,
  ): Promise<{ ok: true }> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    });

    if (!comment) {
      throw BaseException.notFound(
        'Comment not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }

    if (comment.userId !== userId) {
      throw BaseException.forbidden(
        'You are not the author of this comment',
        ErrorCode.AUTH_FORBIDDEN,
      );
    }

    await this.commentRepository.update(commentId, {
      isDeleted: true,
      content: '',
    });

    return { ok: true };
  }
}
