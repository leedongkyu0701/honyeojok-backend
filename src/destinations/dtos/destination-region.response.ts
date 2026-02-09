import { TripRoutesCardResponse } from 'src/trip-routes/dtos/trip-routes-card.response';
import { SpotCardResponse } from 'src/spots/dtos/spot-card.response';
import { ProvinceGroup } from 'src/types/destination';
import { ImageSource } from 'src/types/destination';

export class DestinationByRegionResponse {
  id: number;
  slug: string;
  name: string;

  score: number;
  province: ProvinceGroup;

  imageUrl: string;
  imageSource?: ImageSource;
  imageCredit?: string;

  difficulty: {
    food: number;
    transport: number;
    safety: number;
    loneliness: number;
  };
  summary: string;

  routes: TripRoutesCardResponse[];
  spots: SpotCardResponse[];
}
