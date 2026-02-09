export class PostCardResponse {
  id: number;
  title: string;
  region?: string;
  createdAt: Date;
  nickName: string;
  likeCount: number;
  thumbnailUrl?: string;
  type: string;
}
