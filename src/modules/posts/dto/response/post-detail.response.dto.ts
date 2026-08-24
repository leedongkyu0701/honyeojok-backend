import { PostType } from 'src/modules/posts/enums/post-type.enum';

export class PostDetailResponseDto {
  id: number;
  title: string;

  region?: string;
  regionName?: string;

  createdAt: Date;

  nickName: string;

  content: string;

  type: PostType;

  rating?: number;

  images: { url: string; caption: string | null }[];

  likeCount: number;
  viewCount: number;

  likedByMe: boolean;
}
