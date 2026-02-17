export interface TripRouteItemSeedData {
  order: number;
  recommendedLevel?: number;

  spotSlug?: string;

  title: string;

  description: string;
  address: string;

  imageUrl?: string;
  imageCredit?: string;
  lat?: number;
  lng?: number;

  startTime?: string;
  endTime?: string;
  externalUrl?: string;
}

export interface TripRouteDaySeedData {
  dayNumber: number;

  title: string;
  note: string;

  items: TripRouteItemSeedData[];
}

export interface TripRouteSeedData {
  slug: string;
  destinationSlug: string;

  title: string;
  summary: string;
  days: number;
  honyeoCost?: number;

  bookmarkCount?: number;
  tagSlugs?: string[];

  daysPlan: TripRouteDaySeedData[];
}

import { seoulTripRoutes } from './seoul';
import { busanTripRoutes } from './busan';

export const tripRoutes: TripRouteSeedData[] = [
  ...seoulTripRoutes,
  ...busanTripRoutes,
];
