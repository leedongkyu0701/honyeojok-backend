import { PostType } from 'src/types/post';

export class PostCardResponse {
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
