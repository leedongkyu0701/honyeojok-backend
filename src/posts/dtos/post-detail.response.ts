import { PostType } from 'src/types/post';

export class PostDetailResponse {
  id: number;
  title: string;

  region?: string;

  createdAt: Date;

  nickName?: string;

  content: string;

  type: PostType;

  rating?: number;

  imageUrls: string[];

  likeCount: number;
  viewCount: number;

  likedByMe: boolean;
}
