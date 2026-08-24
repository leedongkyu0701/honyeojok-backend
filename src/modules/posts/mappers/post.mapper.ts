import { PostCardResponseDto } from '../dto/response/post-card.response.dto';
import { PostDetailResponseDto } from '../dto/response/post-detail.response.dto';
import { Post } from '../entities/post.entity';

export class PostMapper {
  static toCard(
    post: Post,
    nickName?: string | null,
    includeRegionName = true,
  ): PostCardResponseDto {
    const card: PostCardResponseDto = {
      id: post.id,
      title: post.title,
      region: post.region,
      createdAt: post.createdAt,
      nickName: nickName ?? post.user?.nickName ?? '탈퇴한 혼여족',
      likeCount: post.likeCount,
      viewCount: post.viewCount,
      thumbnailUrl: post.thumbnailUrl,
      type: post.type,
    };

    if (includeRegionName && post.destination) {
      card.regionName = post.destination.name;
    }

    return card;
  }

  static toDetail(post: Post, likedByMe: boolean): PostDetailResponseDto {
    return {
      id: post.id,
      title: post.title,
      region: post.region,
      regionName: post.destination?.name ?? undefined,
      createdAt: post.createdAt,
      nickName: post.user?.nickName ?? '탈퇴한 혼여족',
      content: post.content,
      type: post.type,
      rating: post.rating,
      likeCount: post.likeCount,
      likedByMe,
      images:
        post.images
          ?.slice()
          .sort((a, b) => a.imgOrder - b.imgOrder)
          .map((image) => ({
            url: image.imageUrl,
            caption: image.caption ?? null,
          })) ?? [],
      viewCount: post.viewCount,
    };
  }
}
