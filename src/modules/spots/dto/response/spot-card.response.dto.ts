import type { TagResponse } from 'src/modules/tags/types/tag-response.type';
import { SpotCategory } from 'src/modules/spots/enums/spot-category.enum';

export class SpotCardResponseDto {
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
