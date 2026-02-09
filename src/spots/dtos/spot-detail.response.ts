import { ImageSource } from 'src/types/destination';
import type { TagResponse } from 'src/types/tag';

export class SpotDetailResponse {
  id: number;
  slug: string;
  name: string;

  note: string | null;
  description: string;

  imageUrl: string | null;
  imageSource: ImageSource | null;
  imageCredit: string | null;
  address: string | null;

  externalUrl: string | null;

  tags: TagResponse[];
  isRecommended: boolean;

  // 소속 여행지 정보 (최소)
  destination: {
    id: number;
    slug: string;
    name: string;
  };
}
