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

import { busanSpots } from './busan/busan';
import { seoulSpots } from './seoul/seoul';
import { mookhoSpots } from './mookho/mookho';
import { jejuSpots } from './jeju/jeju';
import { jeonjuSpots } from './jeonju/jeonju';
import { gangneungSpots } from './gangneung/gangneung';

export const spots: SpotSeedData[] = [
  ...seoulSpots,
  ...busanSpots,
  ...mookhoSpots,
  ...jejuSpots,
  ...jeonjuSpots,
  ...gangneungSpots,
];
