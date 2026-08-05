import { TripRouteSeedData } from './index';

export const jeonjuTripRoutes: TripRouteSeedData[] = [
  {
    slug: 'jeonju-classic-1n2d-v2',
    destinationSlug: 'jeonju',
    title: '전주 1박 2일 정석 루트 (핫스팟+동선 최적화)',
    summary:
      '한옥마을 핵심을 낮에 탄탄히 걷고, 저녁은 남부시장/객리단길로 마무리하는 가장 무난한 코스예요.',
    honyeoTip:
      '한옥마을은 낮에 걷는 게 사진도 잘 나오고, 동선도 편해요. 저녁은 남부시장/객리단길로 가면 혼자 먹기도 편하고, 선택지도 다양해요.',
    days: 2,
    honyeoCost: 180000,
    tagSlugs: ['culture', 'walking', 'emotional', 'nightview', 'solo-eating'],
    daysPlan: [
      {
        dayNumber: 1,
        title: '한옥마을 핵심 + 언덕 포인트 + 저녁 먹거리',
        note: '1일차는 “한옥마을 안쪽(경기전/성당) → 언덕(자만/오목대) → 아래(시장/객사)” 흐름으로. 점심 피크는 비켜가고, 해 질 무렵 오목대만 타이밍 맞추면 하루가 되게 단단해요.',
        items: [
          {
            order: 1,
            recommendedLevel: 5,
            spotSlug: 'jeondong-cathedral',
            title: '전동성당 가볍게 보기',
            startTime: '10:10',
            endTime: '10:45',
          },
          {
            order: 2,
            recommendedLevel: 5,
            spotSlug: 'gyeonggijeon',
            title: '경기전 산책(대나무길 포함)',
            startTime: '10:55',
            endTime: '12:05',
          },
          {
            order: 3,
            recommendedLevel: 4,
            title: '전주 혼밥 점심(콩나물국밥/칼국수 중 선택)',
            description:
              '한옥마을 안쪽(태조로/경기전길)에서 먹고 바로 골목 산책으로 이어가는 게 제일 편해요. 12~13시는 줄이 확 길어지니 11시대에 먼저 먹거나 14시 이후로 밀면 덜 스트레스예요. 혼자면 메뉴 단순한 집을 고르면 주문이 빨라요.',
            startTime: '12:10',
            endTime: '13:05',
          },
          {
            order: 4,
            recommendedLevel: 5,
            spotSlug: 'jeonju-hanok-village',
            title: '전주한옥마을 골목 깊게 걷기(사진 스팟 위주)',
            startTime: '13:15',
            endTime: '14:45',
          },
          {
            order: 5,
            recommendedLevel: 4,
            title: '한옥 감성 한 번 쉬기(한옥카페/전망 포인트)',
            description:
              '한옥마을은 걷는 시간이 길어서 중간에 40~60분은 꼭 끊어주는 게 좋아요. 사람 많은 중심부보다 한옥마을 가장자리나 경기전길 라인 카페가 혼자 앉기 편한 편이에요.',
            startTime: '14:55',
            endTime: '15:55',
          },
          {
            order: 6,
            recommendedLevel: 4,
            spotSlug: 'jaman-mural-village',
            title: '자만벽화마을(언덕 골목 포토 산책)',
            startTime: '16:10',
            endTime: '17:00',
          },
          {
            order: 7,
            recommendedLevel: 5,
            spotSlug: 'omokdae',
            title: '오목대 노을 타이밍 맞추기',
            startTime: '17:10',
            endTime: '18:00',
          },
          {
            order: 8,
            recommendedLevel: 4,
            title: '저녁(남부시장/풍남문 인근 또는 객리단길)',
            description:
              '금·토라면 남부시장 야시장으로 내려가고, 그 외 요일은 객리단길/객사길로 저녁을 빼면 동선이 단순해요. 혼자라면 “가게에서 한 끼 → 간식은 포장” 조합이 과식도 덜하고 이동도 편해요.',
            startTime: '18:20',
            endTime: '19:50',
          },
        ],
      },
      {
        dayNumber: 2,
        title: '구도심(전라감영/객사) + 강변 산책으로 정리',
        note: '2일차는 “실내/전시 → 번화가 → 강변” 순서로 가면 날씨 변수에도 덜 흔들려요. 강변은 40~60분만 잡아도 충분히 기분 전환이 되고, 카페는 1번만 넣고 깔끔하게 마무리하는 편이 좋아요.',
        items: [
          {
            order: 1,
            recommendedLevel: 4,
            spotSlug: 'korean-traditional-culture-center',
            title: '한국전통문화전당(전시/체험 중 가볍게)',
            startTime: '10:30',
            endTime: '11:40',
          },
          {
            order: 2,
            recommendedLevel: 4,
            title: '구도심 산책(전라감영길/객사길 라인)',
            description:
              '전라감영길~객사길 쪽은 카페/소품샵/식당이 촘촘해서 혼자 걸어도 지루하지 않아요. 11시대에 먼저 훑고 점심은 12시 전에 끊으면 대기 스트레스가 확 줄어요.',
            startTime: '11:50',
            endTime: '12:40',
          },
          {
            order: 3,
            recommendedLevel: 3,
            title: '혼밥 점심(객사/영화의 거리 인접 권역)',
            description:
              '번화가 중심이라 혼자 식사하는 손님이 섞여 있는 편이라 부담이 덜해요. 12~13시 피크만 비켜가면 자리 잡기가 훨씬 편해요.',
            startTime: '12:40',
            endTime: '13:30',
          },
          {
            order: 4,
            recommendedLevel: 4,
            spotSlug: 'jeonju-film-street',
            title: '전주 영화의 거리(객사길 일대) 천천히 걷기',
            startTime: '13:40',
            endTime: '14:30',
          },
          {
            order: 5,
            recommendedLevel: 4,
            spotSlug: 'jeonjucheon-river',
            title: '전주천 산책(강변 리듬 정리)',
            startTime: '14:50',
            endTime: '15:50',
          },
          {
            order: 6,
            recommendedLevel: 3,
            spotSlug: 'hanbyeokdang-pavilion',
            title: '한벽당 잠깐 올라 바람 쐬기',
            startTime: '16:05',
            endTime: '16:35',
          },
          {
            order: 7,
            recommendedLevel: 3,
            title: '카페 1번만 더(구도심/객리단길 중 선택)',
            description:
              '마지막은 오래 늘어지기보다 40~60분 정도로 끊어두면 귀가 동선이 편해요. 창가 자리에서 일정 정리하고 바로 이동하는 느낌이 혼자 여행에 잘 맞아요.',
            startTime: '16:45',
            endTime: '17:40',
          },
        ],
      },
    ],
  },

  {
    slug: 'jeonju-night-food-1n2d-v2',
    destinationSlug: 'jeonju',
    title: '전주 1박 2일 맛·밤테마 루트 (야시장/막걸리 골목)',
    summary:
      '낮은 한옥 감성으로 가볍게 채우고, 밤은 야시장이나 막걸리골목으로 전주다운 여운을 남기는 코스예요.',
    honyeoTip:
      '낮에 욕심내기보다 핵심만 챙기고, 대신 밤을 “야시장 or 막걸리골목”으로 확실히 찍는 루트예요. 전주 혼술바도 여러개 있으니 지도에서 참고해주세요!',
    days: 2,
    honyeoCost: 190000,
    tagSlugs: ['walking', 'healing', 'thinking', 'nightview', 'solo-drinking'],
    daysPlan: [
      {
        dayNumber: 1,
        title: '한옥마을은 압축, 밤은 전주답게',
        note: '낮에 욕심내기보다 핵심만 챙기고, 대신 밤을 “야시장 or 막걸리골목”으로 확실히 찍는 루트예요. 혼자라면 술은 1~2잔 선에서 끊고, 늦기 전에 숙소로 돌아오는 동선을 먼저 정해두면 마음이 편해요.',
        items: [
          {
            order: 1,
            recommendedLevel: 5,
            spotSlug: 'jeonju-hanok-village',
            title: '전주한옥마을 아침 산책(사람 적을 때)',
            startTime: '10:00',
            endTime: '11:20',
          },
          {
            order: 2,
            recommendedLevel: 4,
            spotSlug: 'gyeonggijeon',
            title: '경기전만 확실히(사진 포인트 위주)',
            startTime: '11:30',
            endTime: '12:30',
          },
          {
            order: 3,
            recommendedLevel: 4,
            title: '혼밥 점심(한옥마을 권역, 메뉴 단순한 곳)',
            description:
              '혼자면 주문이 복잡한 곳보다 메뉴가 단출한 집이 훨씬 편해요. 12~13시 피크만 피하면 대기 스트레스가 확 줄고, 식사 후 바로 골목을 더 걸을 여유가 생겨요.',
            startTime: '12:35',
            endTime: '13:25',
          },
          {
            order: 4,
            recommendedLevel: 4,
            spotSlug: 'jeondong-cathedral',
            title: '전동성당 + 풍남문 라인 짧게 산책',
            startTime: '13:35',
            endTime: '14:20',
          },
          {
            order: 5,
            recommendedLevel: 3,
            title: '낮 카페 1번(한옥카페/구도심 카페 중 선택)',
            description:
              '이 루트는 밤이 메인이어서 낮 카페는 50분 정도로만 끊는 게 좋아요. 창가 자리에서 일정 정리하고 바로 이동하는 느낌으로 가면 리듬이 살아 있어요.',
            startTime: '14:30',
            endTime: '15:20',
          },
          {
            order: 6,
            recommendedLevel: 4,
            spotSlug: 'jeonju-nambu-market',
            title: '남부시장 먹거리(금·토면 야시장 우선)',
            startTime: '17:10',
            endTime: '18:30',
          },
          {
            order: 7,
            recommendedLevel: 4,
            title: '전주 막걸리골목(삼천동/도심권 중 선택, 1~2잔)',
            description:
              '전주에서 “밤을 전주답게” 마무리하고 싶으면 막걸리골목이 좋아요. 혼자면 오래 늘어지기보다 1~2잔 + 안주 조금으로만 끊고, 숙소/귀가 동선을 미리 정해두는 게 안전해요.',
            startTime: '19:10',
            endTime: '20:30',
          },
        ],
      },
      {
        dayNumber: 2,
        title: '번화가+산책으로 가볍게 정리',
        note: '2일차는 카페와 쇼핑, 산책으로 가볍게 정리하는 날이에요. 어제 밤을 길게 썼다면 오늘은 이동을 줄이고, 16~17시대에 마무리하면 귀가가 편해요.',
        items: [
          {
            order: 1,
            recommendedLevel: 4,
            spotSlug: 'korean-traditional-culture-center',
            title: '한국전통문화전당(전시 위주로 짧게)',
            startTime: '10:30',
            endTime: '11:30',
          },
          {
            order: 2,
            recommendedLevel: 4,
            spotSlug: 'jeonju-film-street',
            title: '영화의 거리(객사길) 산책 + 구도심 분위기',
            startTime: '11:45',
            endTime: '12:40',
          },
          {
            order: 3,
            recommendedLevel: 3,
            title: '혼밥 점심(객리단길/객사길 인접 권역)',
            description:
              '혼자 앉기 편한 가게가 많은 구역이라 마음이 덜 조급해요. 12~13시만 비켜가면 대기 확률이 내려가요.',
            startTime: '13:10',
            endTime: '14:00',
          },
          {
            order: 4,
            recommendedLevel: 4,
            spotSlug: 'gaekridan-gil',
            title: '객리단길(카페·소품샵 한 바퀴)',
            startTime: '14:10',
            endTime: '15:40',
          },
          {
            order: 5,
            recommendedLevel: 3,
            spotSlug: 'jeonjucheon-river',
            title: '전주천 40~60분만 걷고 마무리',
            startTime: '15:55',
            endTime: '16:55',
          },
        ],
      },
    ],
  },
];
