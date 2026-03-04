import { ImageSource } from 'src/types/util';
import type { TagResponse } from 'src/types/tag';
import { SpotCategory } from 'src/types/spot';

export class SpotDetailResponse {
  id: number;
  slug: string;
  name: string;

  category: SpotCategory;

  description: string;
  summary: string;
  honyeoTip: string | null;

  imageUrl: string | null;
  imageSource: ImageSource | null;
  imageCredit: string | null;

  address: string | null;
  lat: number | null;
  lng: number | null;
  externalUrl: string | null;

  tags: TagResponse[];

  destination: {
    id: number;
    slug: string;
    name: string;
  };
}
