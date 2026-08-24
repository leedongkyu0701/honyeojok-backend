import { PostType } from 'src/modules/posts/enums/post-type.enum';

export class PostCardResponseDto {
  id: number;
  title: string;

  region?: string;
  regionName?: string;

  createdAt: Date;

  nickName: string;

  likeCount: number;
  viewCount: number;

  thumbnailUrl?: string;

  type: PostType;
}
