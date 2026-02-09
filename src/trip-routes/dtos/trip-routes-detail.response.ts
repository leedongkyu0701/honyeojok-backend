import { TripRouteItemType } from 'src/types/trip-route';
import type { TagResponse } from 'src/types/tag';

export class TripRouteItemResponse {
  id: number;
  type: TripRouteItemType;
  order: number;
  recommendedLevel: number;

  title: string;
  description?: string;

  lat?: number;
  lng?: number;
  address?: string;

  startTime?: string;
  endTime?: string;

  externalUrl?: string;
}

export class TripRouteDayResponse {
  id: number;
  dayNumber: number;
  title?: string;
  note?: string;

  items: TripRouteItemResponse[];
}

export class TripRouteDetailResponse {
  id: number;
  slug: string;
  region: string;

  title: string;
  summary: string;
  days: number;

  bookmarkCount: number;
  bookmarkedByMe: boolean;

  tags: TagResponse[];
  daysPlan: TripRouteDayResponse[];
}
