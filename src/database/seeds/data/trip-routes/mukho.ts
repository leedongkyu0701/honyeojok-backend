import { TripRouteSeedData } from './index';
export const mukhoTripRoutes: TripRouteSeedData[] = [
  {
    slug: 'mukho-sea-walking-1n2d',
    destinationSlug: 'mukho',
    title: '묵호 1박 2일 바다·골목 산책 루트',
    summary:
      '항구 골목에서 시작해 해변과 전망대로 이어가고, 둘째 날은 대표 해안 스팟으로 가볍게 정리해요.',
    honyeoTip:
      '최근 가장 핫한 묵호에요. 여러 소품샵이나 카페가 생기면서 골목 산책이 더 재밌어졌어요. 바다 스팟은 일찍 방문해야 사람이 없이 즐길 수 있어요.',
    days: 2,
    honyeoCost: 170000,
    tagSlugs: ['sea', 'walking', 'healing', 'emotional', 'nightview'],
    daysPlan: [
      {
        dayNumber: 1,
        title: '항구 골목 산책 + 해질 무렵 전망 + 1일차만 혼술',
        note: '첫날은 묵호항 권역에서 골목과 전망을 한 덩어리로 묶으면 이동이 편해요. 점심은 항구 주변에서 빠르게 해결하고, 노을 시간대는 바람이 세게 불 수 있으니 겉옷을 챙겨요. 술은 오늘만 가볍게 1~2잔으로 끝내고 숙소까지 동선을 미리 정해두면 마음이 편해요.',
        items: [
          {
            order: 1,
            recommendedLevel: 5,
            spotSlug: 'mukho-lighthouse-park',
            title: '묵호등대공원',
            startTime: '10:30',
            endTime: '11:40',
          },
          {
            order: 2,
            recommendedLevel: 5,
            spotSlug: 'mukho-nongoldamgil',
            title: '논골담길(묵호)',
            startTime: '11:50',
            endTime: '13:05',
          },
          {
            order: 3,
            recommendedLevel: 4,
            title: '묵호 혼밥(항구·시장 권역, 물회/회덮밥 등)',
            description:
              '추천 권역은 묵호항 수산시장·어시장 골목 쪽이에요. 논골담길을 내려오면 바로 항구로 이어져서 이동 시간을 거의 쓰지 않아도 돼요. 점심 12~13시는 붐비니 11시대에 당겨 먹거나 13시 30분 이후로 미루는 게 편해요.',
            startTime: '13:15',
            endTime: '14:15',
          },
          {
            order: 4,
            recommendedLevel: 4,
            spotSlug: 'mukho-fish-market',
            title: '묵호항 수산시장(묵호어시장)',
            startTime: '14:20',
            endTime: '15:20',
          },
          {
            order: 5,
            recommendedLevel: 3,
            title: '묵호 카페 타임(항구·역 주변 감성 카페 권역)',
            description:
              '추천 권역은 묵호항·묵호역 사이 카페거리 쪽이에요. 시장 구경을 마친 뒤 10~20분 안에 옮길 수 있어서 동선이 단순해요. 카페 피크는 14~16시라 자리 여유가 필요하면 16시 이후로 살짝 늦추는 게 편해요.',
            startTime: '15:35',
            endTime: '16:35',
          },
          {
            order: 6,
            recommendedLevel: 5,
            spotSlug: 'eodal-beach',
            title: '어달해변',
            startTime: '16:55',
            endTime: '18:05',
          },
          {
            order: 7,
            recommendedLevel: 4,
            title: '묵호 혼술(논골담길 언덕/항구 인근, 1~2잔)',
            description:
              '추천 권역은 논골담길 언덕 쪽이나 항구 인근 바 권역이에요. 어달해변에서 숙소로 돌아오는 길에 한 번만 들르면 이동이 늘지 않아요. 저녁 20~22시는 붐비니 19시대 초반에 들어가고, 오늘은 1~2잔만 마시고 일찍 마무리하는 게 안전해요.',
            startTime: '19:10',
            endTime: '20:20',
          },
        ],
      },
      {
        dayNumber: 2,
        title: '해안 대표 스팟 + 가벼운 산책으로 일찍 마무리',
        note: '둘째 날은 바다 스팟을 두 개 정도로만 압축하면 체력 부담이 적어요. 점심은 해변 근처에서 짧게 끊고, 산책은 40~60분 정도로 마무리하는 게 좋아요. 16~17시대에 끝내면 이동이나 귀가가 훨씬 여유로워요.',
        items: [
          {
            order: 1,
            recommendedLevel: 5,
            spotSlug: 'chuam-candle-rock',
            title: '추암 촛대바위',
            startTime: '10:30',
            endTime: '12:00',
          },
          {
            order: 2,
            recommendedLevel: 3,
            title: '묵호 혼밥(추암/해안 권역, 국수·백반 등 가벼운 점심)',
            description:
              '추천 권역은 추암 해안 주변이나 이동 동선상 들르기 쉬운 해안 도로 쪽이에요. 촛대바위를 본 다음 바로 식사로 이어가면 이동이 단순해서 혼자 일정이 덜 흔들려요. 점심 12~13시는 붐비니 11시대에 당겨 먹거나 13시 30분 이후가 더 편해요.',
            startTime: '12:10',
            endTime: '13:10',
          },
          {
            order: 3,
            recommendedLevel: 4,
            spotSlug: 'dodokkaebi-gol-skyvalley',
            title: '도째비골 스카이밸리',
            startTime: '14:00',
            endTime: '15:10',
          },
          {
            order: 4,
            recommendedLevel: 4,
            spotSlug: 'haerang-observatory',
            title: '해랑전망대',
            startTime: '15:20',
            endTime: '16:00',
          },
          {
            order: 5,
            recommendedLevel: 3,
            title: '묵호 카페 타임(스카이밸리 인근 해안 카페 권역)',
            description:
              '추천 권역은 도째비골 스카이밸리·해랑전망대 인근 해안 카페 쪽이에요. 바로 직전 전망대에서 10~20분 내로 붙일 수 있어 마무리 동선이 깔끔해요. 카페 피크는 14~16시라 자리가 걱정되면 16시대에 짧게 들러 테이크아웃으로 정리하는 것도 좋아요.',
            startTime: '16:10',
            endTime: '17:00',
          },
        ],
      },
    ],
  },
];
