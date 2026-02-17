import { SpotCardResponse } from './spot-card.response';

export class FindHotSpotsResponse {
  food: SpotCardResponse[];
  cafe: SpotCardResponse[];
  drink: SpotCardResponse[];
  activity: SpotCardResponse[];
  nature: SpotCardResponse[];
  etc: SpotCardResponse[];
}
