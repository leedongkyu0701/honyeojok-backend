import { SpotCategory } from 'src/types/spot';

export class SpotMapResponse {
  id: number;
  slug: string;
  name: string;

  summary: string;
  category: SpotCategory;

  lat: number | null;
  lng: number | null;
}
