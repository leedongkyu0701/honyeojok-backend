import { TripRouteCardResponseDto } from 'src/modules/trip-routes/dto/response/trip-route-card.response.dto';
import { SpotCardResponseDto } from 'src/modules/spots/dto/response/spot-card.response.dto';
import { ProvinceGroup } from 'src/modules/destinations/enums/province-group.enum';
import { ImageSource } from 'src/infrastructure/media/enums/image-source.enum';
import type { TagResponse } from 'src/modules/tags/types/tag-response.type';

export class DestinationDetailResponseDto {
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
  routes: TripRouteCardResponseDto[];
  spots: SpotCardResponseDto[];
}
