import { TripRoutesCardResponse } from 'src/trip-routes/dtos/trip-routes-card.response';
import { SpotCardResponse } from 'src/spots/dtos/spot-card.response';
import { ProvinceGroup } from 'src/types/destination';
import { ImageSource } from 'src/types/util';
import type { TagResponse } from 'src/types/tag';

export class DestinationDetailResponse {
  id: number;
  slug: string;
  name: string;
  province: ProvinceGroup;

  score: number;

  imageUrl: string | null;
  imageSource: ImageSource | null;
  imageCredit: string | null;

  summary: string;
  description: string;

  difficulty: {
    food: number;
    transport: number;
    safety: number;
    loneliness: number;
  };

  tags: TagResponse[];
  routes: TripRoutesCardResponse[];
  spots: SpotCardResponse[];
}
