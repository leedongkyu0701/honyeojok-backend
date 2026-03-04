export interface TripRouteItemSeedData {
  order: number;
  recommendedLevel?: number;

  spotSlug?: string;

  title: string;

  description?: string; // spot에서 가져오기
  address?: string; // spot에서 가져오기

  imageUrl?: string; // spot에서 가져오기
  imageCredit?: string; // spot에서 가져오기
  lat?: number; // spot에서 가져오기
  lng?: number; // spot에서 가져오기

  startTime?: string;
  endTime?: string;
  externalUrl?: string; // spot에서 가져오기
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
  honyeoTip?: string;
  days: number;
  honyeoCost?: number;

  bookmarkCount?: number;
  tagSlugs?: string[];

  daysPlan: TripRouteDaySeedData[];
}

import { seoulTripRoutes } from './seoul';
import { busanTripRoutes } from './busan';
import { mukhoTripRoutes } from './mukho';
import { jejuTripRoutes } from './jeju';
import { jeonjuTripRoutes } from './jeonju';
import { gangneungTripRoutes } from './gangneung';

export const tripRoutes: TripRouteSeedData[] = [
  ...seoulTripRoutes,
  ...busanTripRoutes,
  ...mukhoTripRoutes,
  ...jejuTripRoutes,
  ...jeonjuTripRoutes,
  ...gangneungTripRoutes,
];
