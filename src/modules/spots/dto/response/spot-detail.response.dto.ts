import { ImageSource } from 'src/infrastructure/media/enums/image-source.enum';
import type { TagResponse } from 'src/modules/tags/types/tag-response.type';
import { SpotCategory } from 'src/modules/spots/enums/spot-category.enum';

export class SpotDetailResponseDto {
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
