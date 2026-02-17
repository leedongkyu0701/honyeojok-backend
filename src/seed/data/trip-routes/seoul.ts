import type { TripRouteSeedData } from './index';

export const seoulTripRoutes: readonly TripRouteSeedData[] = [
  {
    destinationSlug: 'seoul',
    slug: 'seoul-2days-classic-solo',
    title: '서울 2일 혼자여행 정석 루트',
    summary: '경복궁·북촌 감성 + 한강·남산 야경으로 꽉 채운 2일 코스',
    days: 2,
    honyeoCost: 300000,
    bookmarkCount: 0,
    tagSlugs: ['culture', 'emotional', 'healing', 'nightview', 'activity'],
    daysPlan: [
      {
        dayNumber: 1,
        title: '궁궐 감성 + 골목 산책',
        note: '가능하면 오전 일찍 시작하면 사람 적고 사진 찍기 좋아요.',
        items: [
          {
            order: 1,
            recommendedLevel: 5,
            spotSlug: 'gyeongbokgung-palace',
            title: '경복궁',
            description:
              '이른 시간 방문 추천. 궁 안에서 천천히 산책하며 분위기 즐기기.',
            lat: 37.579617,
            lng: 126.977041,
            address: '서울특별시 종로구 사직로 161',
            startTime: '10:00',
            endTime: '12:00',
            externalUrl:
              'https://korean.visitseoul.net/attractions/%EA%B2%BD%EB%B3%B5%EA%B6%81_/261',
          },
          {
            order: 2,
            recommendedLevel: 4,
            title: '서촌/북촌 근처 카페',
            description:
              '경복궁 주변은 혼자 앉기 좋은 카페가 많아요. 창가 자리 추천.',
            lat: 37.5763,
            lng: 126.9719,
            address: '서울특별시 종로구 통인동/누상동 일대',
            startTime: '12:30',
            endTime: '13:30',
          },
          {
            order: 3,
            recommendedLevel: 4,
            spotSlug: 'bukchon-hanok-village',
            title: '북촌한옥마을',
            description:
              '한옥과 골목 풍경이 예쁜 산책 코스. 소음/사진 매너 지켜주세요.',
            lat: 37.582604,
            lng: 126.983998,
            address: '서울특별시 종로구 북촌로',
            startTime: '14:00',
            endTime: '16:00',
            externalUrl:
              'https://korean.visitseoul.net/attractions/%EB%B6%81%EC%B4%8C%ED%95%9C%EC%98%A5%EB%A7%88%EC%9D%84_/261',
          },
          {
            order: 4,
            recommendedLevel: 4,
            title: '종로 로컬 식사',
            description:
              '혼밥 가능한 국수/덮밥/백반 추천. 웨이팅 있으면 근처로 유연하게 이동.',
            lat: 37.5729,
            lng: 126.9831,
            address: '서울특별시 종로구 일대',
            startTime: '17:30',
            endTime: '18:30',
          },
        ],
      },
      {
        dayNumber: 2,
        title: '공원 힐링 + 야경 마무리',
        note: '야경은 해 질 무렵부터가 베스트. 바람 대비 겉옷 챙기기.',
        items: [
          {
            order: 1,
            recommendedLevel: 4,
            spotSlug: 'seoul-forest',
            title: '서울숲',
            description:
              '도심 속 큰 공원. 산책/휴식하기 좋고 혼자 쉬기 편한 공간이 많아요.',
            lat: 37.544581,
            lng: 127.037791,
            address: '서울특별시 성동구 뚝섬로 273',
            startTime: '10:30',
            endTime: '12:00',
            externalUrl:
              'https://korean.visitseoul.net/nature/%EC%84%9C%EC%9A%B8%EC%88%B2/KOP001838',
          },
          {
            order: 2,
            recommendedLevel: 4,
            title: '성수 카페 한 곳',
            description:
              '성수는 혼자 카페하기 좋은 동네. 피크 타임(오후)은 붐빌 수 있어요.',
            lat: 37.5446,
            lng: 127.0557,
            address: '서울특별시 성동구 성수동 일대(예시)',
            startTime: '12:10',
            endTime: '13:20',
            externalUrl:
              'https://korean.visitseoul.net/realtime-seoul/view/%EC%84%B1%EC%88%98%EC%B9%B4%ED%8E%98%EA%B1%B0%EB%A6%AC?areaId=A24',
          },
          {
            order: 3,
            recommendedLevel: 5,
            spotSlug: 'yeouido-hangang-park',
            title: '여의도 한강공원',
            description:
              '산책/따릉이/피크닉 모두 OK. 노을 시간대에 가면 만족도 높아요.',
            lat: 37.5284,
            lng: 126.9326,
            address: '서울특별시 영등포구 여의동로 330',
            startTime: '16:00',
            endTime: '18:00',
            externalUrl:
              'https://korean.visitseoul.net/yongsan-yeouido/%EC%97%AC%EC%9D%98%EB%8F%84-%ED%95%9C%EA%B0%95%EA%B3%B5%EC%9B%90%EC%86%8C%EB%85%80%EC%8B%9C%EB%8C%80%EC%88%B2_/12993',
          },
          {
            order: 4,
            recommendedLevel: 5,
            spotSlug: 'namsan-seoul-tower',
            title: '남산 서울타워',
            description:
              '서울 야경 대표. 해 질 무렵부터 올라가면 분위기 최고예요.',
            lat: 37.551169,
            lng: 126.988227,
            address: '서울특별시 용산구 남산공원길 105',
            startTime: '18:30',
            endTime: '20:30',
            externalUrl:
              'https://korean.visitseoul.net/attractions/%EB%82%A8%EC%82%B0-%EC%84%9C%EC%9A%B8%ED%83%80%EC%9B%8C_/261',
          },
        ],
      },
    ],
  },
];
