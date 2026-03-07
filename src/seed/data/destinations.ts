import { ProvinceGroup } from 'src/types/destination';
import { ImageSource } from 'src/types/util';
import imageMap from '../image-map.json';

interface DestinationSeedData {
  slug: string;
  province: ProvinceGroup;
  name: string;
  rank: number;
  score: number;

  latitude: number;
  longitude: number;

  summary: string;
  description: string;

  food: number;
  transport: number;
  safety: number;
  loneliness: number;

  imageUrl?: string;
  imageSource?: ImageSource;
  imageCredit?: string;

  tagSlugs?: string[];
}

export const destinations: DestinationSeedData[] = [
  {
    slug: 'mukho',
    province: ProvinceGroup.GANGWON,
    name: '묵호',
    rank: 1,
    score: 4.6,
    latitude: 37.54534,
    longitude: 129.11549,
    summary: '작은 항구 도시, 최근 유행하는 혼자여행지',
    description:
      '묵호는 최근 유행중인 작은 항구 도시로, 바닷바람 맞으며 산책하기 좋고 혼자 조용히 쉬기 좋은 분위기를 갖고 있어요.',
    food: 7,
    transport: 7,
    safety: 7,
    loneliness: 4,
    imageUrl: imageMap.destinations['mukho'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이범수',
    tagSlugs: ['healing', 'sea', 'walking', 'thinking'],
  },
  {
    slug: 'jeju',
    province: ProvinceGroup.JEJU,
    name: '제주',
    rank: 2,
    score: 4.7,
    latitude: 33.4996,
    longitude: 126.5312,
    summary: '혼자 여행하기 좋은 다양한 자연 경관과 액티비티',
    description:
      '제주는 자연과 액티비티, 혼밥/카페가 모두 풍부해서 혼자 여행 동선 짜기 쉬운 곳이에요. 특히 게스트 하우스 문화가 잘 되어 있어서, 혼여 하는 사람이 많고 외롭지 않게 즐길 수 있어요.',
    food: 8,
    transport: 5,
    safety: 7,
    loneliness: 2,
    imageUrl: imageMap.destinations['jeju'],
    imageSource: ImageSource.UNSPLASH,
    tagSlugs: ['nature', 'activity', 'cafe', 'healing', 'sea'],
  },
  {
    slug: 'seoul',
    province: ProvinceGroup.SEOUL_GYEONGGI,
    name: '서울',
    rank: 3,
    score: 4.5,
    latitude: 37.566,
    longitude: 126.9784,
    summary: '혼자여행 난이도 최하, 교통·콘텐츠·혼밥 인프라 최고',
    description:
      '서울은 교통과 콘텐츠가 밀집해 있어 짧게 당일치기나 혼자 도시 여행하기 좋은 선택지예요.',
    food: 8,
    transport: 9,
    safety: 9,
    loneliness: 2,
    imageUrl: imageMap.destinations['seoul'],
    imageSource: ImageSource.UNSPLASH,
    tagSlugs: ['culture', 'solo-drinking', 'shopping', 'nightview', 'oneday'],
  },
  {
    slug: 'busan',
    province: ProvinceGroup.GYEONGSANG,
    name: '부산',
    rank: 4,
    score: 4.6,
    latitude: 35.1795543,
    longitude: 129.0756416,
    summary: '바다와 도시 감성을 동시에 즐길 수 있는 혼자여행 도시',
    description:
      '부산은 바다 산책과 카페/야경 포인트가 많아서 혼자 감성 여행 코스 짜기 좋아요.',
    food: 8,
    transport: 9,
    safety: 9,
    loneliness: 3,
    imageUrl: imageMap.destinations['busan'],
    imageSource: ImageSource.UNSPLASH,
    tagSlugs: ['sea', 'nightview', 'cafe', 'emotional', 'walking'],
  },
  {
    slug: 'gangneung',
    province: ProvinceGroup.GANGWON,
    name: '강릉',
    rank: 5,
    score: 4.4,
    latitude: 37.75266,
    longitude: 128.87239,
    summary: '동해 바다를 즐기는 감성 혼자여행',
    description:
      '강릉은 바다/카페/산책 동선이 잘 맞아 혼자 천천히 보내기 좋은 여행지예요.',
    food: 6,
    transport: 6,
    safety: 7,
    loneliness: 4,
    imageUrl: imageMap.destinations['gangneung'],
    imageSource: ImageSource.UNSPLASH,
    tagSlugs: ['sea', 'cafe', 'emotional', 'stress-relief', 'healing'],
  },
  {
    slug: 'jeonju',
    province: ProvinceGroup.JEOLLA,
    name: '전주',
    rank: 6,
    score: 4.3,
    latitude: 35.82194,
    longitude: 127.14889,
    summary: '한옥마을 산책과 로컬 먹거리 중심의 혼자여행',
    description:
      '전주는 한옥마을 중심으로 산책하기 좋고 로컬 먹거리가 강해서 혼자 먹기 여행으로도 좋아요.',
    food: 9,
    transport: 5,
    safety: 7,
    loneliness: 4,
    imageUrl: imageMap.destinations['jeonju'],
    imageSource: ImageSource.UNSPLASH,
    tagSlugs: ['culture', 'walking', 'solo-eating', 'emotional'],
  },
] as const;
