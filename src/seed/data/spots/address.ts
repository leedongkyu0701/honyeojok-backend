import { busanAddresses } from './busan/address';
import { seoulAddresses } from './seoul/address';
import { mookhoAddresses } from './mookho/address';
import { jejuAddresses } from './jeju/address';
import { jeonjuAddresses } from './jeonju/address';
import { gangneungAddresses } from './gangneung/address';

export interface AddressSeedData {
  slug: string; // spot.slug
  address: string;
}

export const addresses: AddressSeedData[] = [
  ...busanAddresses,
  ...seoulAddresses,
  ...mookhoAddresses,
  ...jejuAddresses,
  ...jeonjuAddresses,
  ...gangneungAddresses,
];
