import type { TagResponse } from 'src/types/tag';

export class TripRouteItemResponse {
  id: number;

  order: number;
  recommendedLevel: number;

  title: string;
  description: string;

  imageUrl: string | null;
  imageCredit: string | null;

  lat: number | null;
  lng: number | null;

  address: string | null;

  startTime: string | null;
  endTime: string | null;

  externalUrl: string | null;

  // ✅ spot 연결된 경우에만 내려줌 (프론트에서 spot 상세로 이동)
  spot?: {
    id: number;
    slug: string;
  };
}

export class TripRouteDayResponse {
  id: number;
  dayNumber: number;
  title: string;
  note: string;

  items: TripRouteItemResponse[];
}

export class TripRouteDetailResponse {
  id: number;
  slug: string;

  title: string;
  summary: string;
  days: number;
  honyeoTip: string | null;
  honyeoCost: number | null;

  bookmarkCount: number;
  bookmarkedByMe: boolean;

  tags: TagResponse[];
  daysPlan: TripRouteDayResponse[];
}
