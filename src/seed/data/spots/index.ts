import { ImageSource } from 'src/types/util';
import { SpotCategory } from 'src/types/spot';

export interface SpotSeedData {
  name: string;
  slug: string;
  regionSlug: string; // destination.slug
  summary: string;
  description: string;

  isRecommended: boolean;

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

import { busanSpots } from './busan';
import { seoulSpots } from './seoul';
import { mukhoSpots } from './mukho';
import { jejuSpots } from './jeju';
import { jeonjuSpots } from './jeonju';
import { gangneungSpots } from './gangneung';

export const spots: SpotSeedData[] = [
  ...seoulSpots,
  ...busanSpots,
  ...mukhoSpots,
  ...jejuSpots,
  ...jeonjuSpots,
  ...gangneungSpots,
];
