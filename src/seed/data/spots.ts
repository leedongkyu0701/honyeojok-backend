import { ImageSource } from 'src/types/destination';
import imageMap from '../image-map.json';

interface SpotSeedData {
  name: string;
  slug: string;
  regionSlug: string;
  note: string;
  description: string;
  isRecommended: boolean;
  imageUrl: string;
  imageSource?: ImageSource;
  imageCredit?: string;
  address: string;
  externalUrl?: string;
  tagSlugs: string[];
}

export const spots: SpotSeedData[] = [
  {
    regionSlug: 'seoul',
    slug: 'gyeongbokgung-palace',
    name: '경복궁',
    note: '아침 방문 추천',
    description:
      '조선의 법궁으로 서울을 대표하는 역사 명소. 이른 시간에 방문하면 혼자 천천히 산책하며 궁궐의 분위기를 느끼기 좋다.',
    isRecommended: true,
    imageUrl: imageMap.spots['seoul']['gyeongbokgung-palace'],
    imageSource: ImageSource.UNSPLASH,
    address: '서울특별시 종로구 사직로 161',
    externalUrl:
      'https://korean.visitseoul.net/attractions/%EA%B2%BD%EB%B3%B5%EA%B6%81_/261',
    tagSlugs: ['culture', 'emotional'],
  },
  {
    regionSlug: 'seoul',
    slug: 'yeouido-hangang-park',
    name: '여의도 한강공원',
    note: '산책/피크닉/야경',
    description:
      '접근성 좋은 한강공원. 산책/따릉이/피크닉하기 좋고, 행사 시즌엔 볼거리도 많다.',
    isRecommended: true,
    imageUrl: imageMap.spots['seoul']['yeouido-hangang-park'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-임찬경',
    address: '서울특별시 영등포구 여의동로 330',
    externalUrl:
      'https://korean.visitseoul.net/yongsan-yeouido/%EC%97%AC%EC%9D%98%EB%8F%84-%ED%95%9C%EA%B0%95%EA%B3%B5%EC%9B%90%EC%86%8C%EB%85%80%EC%8B%9C%EB%8C%80%EC%88%B2_/12993',
    tagSlugs: ['healing', 'nightview', 'activity'],
  },
  {
    regionSlug: 'seoul',
    slug: 'bukchon-hanok-village',
    name: '북촌한옥마을',
    note: '아침 방문 추천 (조용할 때)',
    description:
      '한옥과 골목 풍경이 예쁜 산책 코스. 혼자 사진 찍고 천천히 걷기 좋다.',
    isRecommended: false,
    imageUrl: imageMap.spots['seoul']['seoul-bukchon-hanok-village'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이범수',
    address: '서울특별시 종로구 북촌로',
    externalUrl:
      'https://korean.visitseoul.net/attractions/%EB%B6%81%EC%B4%8C%ED%95%9C%EC%98%A5%EB%A7%88%EC%9D%84_/261',
    tagSlugs: ['culture', 'emotional'],
  },
  {
    regionSlug: 'seoul',
    slug: 'namsan-seoul-tower',
    name: '남산 서울타워',
    note: '야경·전망',
    description:
      '서울 전경을 한눈에 볼 수 있는 대표 전망 명소. 해 질 무렵부터 야경 시간대까지 혼자 천천히 올라가기 좋다.',
    isRecommended: true,
    imageUrl: imageMap.spots['seoul']['namsan-seoul-tower'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이범수',
    address: '서울특별시 용산구 남산공원길 105',
    externalUrl:
      'https://korean.visitseoul.net/attractions/%EB%82%A8%EC%82%B0-%EC%84%9C%EC%9A%B8%ED%83%80%EC%9B%8C_/261',
    tagSlugs: ['nightview', 'culture'],
  },
  {
    regionSlug: 'seoul',
    slug: 'seoul-forest',
    name: '서울숲',
    note: '성수랑 묶어서 하루 코스로 딱',
    description:
      '도심 속 큰 공원. 산책/휴식/사진 모두 좋고, 혼자 쉬기 편한 공간이 많다.',
    isRecommended: false,
    imageUrl: imageMap.spots['seoul']['seoul-forest'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-임태원',
    address: '서울특별시 성동구 뚝섬로 273',
    externalUrl:
      'https://korean.visitseoul.net/nature/%EC%84%9C%EC%9A%B8%EC%88%B2/KOP001838',
    tagSlugs: ['healing', 'nature', 'activity'],
  },
] as const;
