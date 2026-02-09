import { TagResponse } from 'src/types/tag';
export class SpotCardResponse {
  id: number;
  slug: string;
  name: string;

  // 카드용 한 줄 소개
  note: string | null;
  imageUrl: string | null;

  // 태그 뱃지용
  tags: TagResponse[];
  destination: {
    id: number;
    slug: string;
    name: string;
  };
}
