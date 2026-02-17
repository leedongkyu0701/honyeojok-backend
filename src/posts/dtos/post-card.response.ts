import { PostType } from 'src/types/post';

export class PostCardResponse {
  id: number;
  title: string;

  // region은 없을 수 있으니 optional
  region?: string;

  createdAt: Date;

  // 작성자 탈퇴해서 userId null일 수 있으니 optional
  nickName?: string;

  likeCount: number;
  viewCount: number;

  thumbnailUrl?: string;

  type: PostType;
}
