import { ImageSource } from 'src/types/util';
import { SpotCategory } from 'src/types/spot';

export interface SpotSeedData {
  name: string;
  slug: string;
  regionSlug: string; // destination.slug
  summary: string;
  description: string;

  isRecommended: boolean;

  // 엔티티 nullable/optional
  category?: SpotCategory;
  honyeoTip?: string;

  imageUrl?: string;
  imageSource?: ImageSource;
  imageCredit?: string;

  address?: string;
  lat?: number;
  lng?: number;
  externalUrl?: string;

  tagSlugs?: string[];
}

import { seoulSpots } from './seoul';
import { busanSpots } from './busan';
import { mookhoSpots } from './mookho';

export const spots: SpotSeedData[] = [
  ...seoulSpots,
  ...busanSpots,
  ...mookhoSpots,
  // ...jejuSpots,
];
