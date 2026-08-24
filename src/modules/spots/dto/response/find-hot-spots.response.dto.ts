import { SpotCardResponseDto } from './spot-card.response.dto';

export class FindHotSpotsResponseDto {
  food: SpotCardResponseDto[];
  cafe: SpotCardResponseDto[];
  drink: SpotCardResponseDto[];
  activity: SpotCardResponseDto[];
  nature: SpotCardResponseDto[];
  etc: SpotCardResponseDto[];
}
