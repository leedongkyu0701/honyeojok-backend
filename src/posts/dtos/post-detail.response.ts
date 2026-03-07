import { PostType } from 'src/types/post';

export class PostDetailResponse {
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
