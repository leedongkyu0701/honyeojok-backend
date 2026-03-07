import type { TagResponse } from 'src/types/tag';
import { SpotCategory } from 'src/types/spot';

export class SpotCardResponse {
  id: number;
  slug: string;
  name: string;

  summary: string;
  category: SpotCategory;
  imageUrl: string | null;

  lat: number | null;
  lng: number | null;

  tags: TagResponse[];

  destination: {
    id: number;
    slug: string;
    name: string;
  };
}
