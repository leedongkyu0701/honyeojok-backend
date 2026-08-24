import { SpotCategory } from 'src/modules/spots/enums/spot-category.enum';

export class SpotMapResponseDto {
  id: number;
  slug: string;
  name: string;

  summary: string;
  category: SpotCategory;
  imageUrl: string | null;

  lat: number | null;
  lng: number | null;
  minDistance: number;
}
