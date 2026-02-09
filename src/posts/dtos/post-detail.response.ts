export class PostDetailResponse {
  id: number;
  title: string;
  region?: string;
  createdAt: Date;
  nickName: string;
  content: string;
  type: string;
  rating?: number;
  imageUrls?: string[];
  likeCount: number;
  likedByMe: boolean;
}
