export class DestinationMapResponseDto {
  id: number;
  slug: string;
  name: string;
  summary: string;

  latitude: number;
  longitude: number;

  score: number;

  tagSlugs: string[];
}
