import { ProvinceGroup } from 'src/types/destination';
export class DestinationCardResponse {
  id: number;
  slug: string;
  name: string;
  score: number;
  imageUrl: string;
  province: ProvinceGroup;
  summary: string;
}
