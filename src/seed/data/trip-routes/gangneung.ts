import { TripRouteSeedData } from './index';

export const gangneungTripRoutes: TripRouteSeedData[] = [
  {
    slug: 'gangneung-classic-1n2d',
    destinationSlug: 'gangneung',
    title: '강릉 정석 1박2일 루트',
    summary:
      '경포·초당 라인에서 바다와 전시를 깔끔하게 묶고, 하루는 밤바다(안목/경포)로 확실히 마무리하는 구성이에요.',
    days: 2,
    honyeoCost: 170000,
    tagSlugs: ['sea', 'walking', 'culture', 'emotional', 'healing'],
    honyeoTip:
      '강릉은 “경포·초당”과 “정동진”을 하루씩 나누면 체력 소모가 덜해요. 밤바다는 안목이나 경포처럼 사람 흐름이 있는 해변으로 한 번만 넣고, 그날 숙소를 근처로 잡으면 이동이 깔끔해요.',
    daysPlan: [
      {
        dayNumber: 1,
        title: '경포·초당 라인 + 안목 밤바다',
        note: '첫날은 이동을 짧게 가져가고, 밤바다는 안목/경포로 한 번 확실히 넣는 날이에요. 전시는 실내라 컨디션 관리가 되고, 해변은 바람이 세질 수 있으니 겉옷만 챙기면 편해요.',
        items: [
          {
            order: 1,
            recommendedLevel: 5,
            spotSlug: 'gyeongpo-beach',
            title: '경포해수욕장',
            startTime: '10:00',
            endTime: '11:20',
          },
          {
            order: 2,
            recommendedLevel: 5,
            spotSlug: 'arte-museum-gangneung',
            title: '아르떼뮤지엄 강릉',
            startTime: '11:40',
            endTime: '13:00',
          },
          {
            order: 3,
            recommendedLevel: 4,
            title: '초당 점심',
            description:
              '초당 순두부 라인은 혼자 먹기 좋은 한 그릇 메뉴가 많아서 일정이 깔끔해요. 줄이 길어지면 무리해서 기다리기보다, 바로 옆 가게로 방향을 바꾸는 게 혼행에는 더 편해요.',
            address: '강원특별자치도 강릉시 초당동 일대',
            startTime: '13:10',
            endTime: '14:10',
          },
          {
            order: 4,
            recommendedLevel: 4,
            spotSlug: 'gangmun-beach',
            title: '강문해변',
            startTime: '14:30',
            endTime: '15:30',
          },
          {
            order: 5,
            recommendedLevel: 5,
            spotSlug: 'anmok-beach-coffee-street',
            title: '안목해변(커피거리)',
            startTime: '15:50',
            endTime: '17:10',
          },
          {
            order: 6,
            recommendedLevel: 4,
            spotSlug: 'gangneung-jungang-market',
            title: '강릉중앙시장',
            startTime: '17:40',
            endTime: '18:40',
          },
          {
            order: 7,
            recommendedLevel: 5,
            spotSlug: 'anmok-beach-coffee-street',
            title: '안목 밤바다 산책(야경)',
            startTime: '19:30',
            endTime: '20:10',
          },
          {
            order: 8,
            recommendedLevel: 3,
            spotSlug: 'budnamu-brewery',
            title: '버드나무 브루어리 혼술(선택)',
            startTime: '20:30',
            endTime: '21:40',
          },
        ],
      },
      {
        dayNumber: 2,
        title: '정동진 라인 + 하슬라 감성',
        note: '둘째 날은 이동이 길어지는 날이라, “전시/산책”을 묶고 중간에 텀을 조금 남겨두는 편이 좋아요. 정동진은 해질 무렵 체감 온도가 확 떨어질 수 있어요.',
        items: [
          {
            order: 1,
            recommendedLevel: 4,
            spotSlug: 'ojukheon',
            title: '오죽헌',
            startTime: '10:00',
            endTime: '11:00',
          },
          {
            order: 2,
            recommendedLevel: 3,
            title: '시내 점심',
            description:
              '둘째 날은 이동이 길어지니까 점심은 시내에서 간단히 정리하는 게 편해요. 너무 멀리 가기보다 동선 안에서 한 그릇으로 끝내면 오후 일정이 덜 피곤해요.',
            address: '강원특별자치도 강릉시 시내 일대',
            startTime: '11:20',
            endTime: '12:20',
          },
          {
            order: 3,
            recommendedLevel: 4,
            spotSlug: 'haslla-art-world',
            title: '하슬라아트월드',
            startTime: '14:10',
            endTime: '16:10',
          },
          {
            order: 4,
            recommendedLevel: 4,
            spotSlug: 'jeongdongjin-beach',
            title: '정동진해변',
            startTime: '16:30',
            endTime: '17:40',
          },
          {
            order: 5,
            recommendedLevel: 3,
            title: '강릉 시내 마무리(선택)',
            description:
              '돌아오는 길에 컨디션이 괜찮으면 시내에서 한 잔 정도로 마무리',
            address: '강원특별자치도 강릉시 시내 일대',
            startTime: '18:30',
            endTime: '19:30',
          },
        ],
      },
    ],
  },

  {
    slug: 'gangneung-onddaytrip',
    destinationSlug: 'gangneung',
    title: '강릉 당일치기 루트',
    summary:
      '도심은 짧게 걷고(시장·월화거리), 오후엔 바다로 넘어가 안목에서 커피+해변 산책으로 마무리하는 당일치기예요.',
    days: 1,
    honyeoCost: 90000,
    tagSlugs: ['walking', 'emotional', 'shopping', 'sea', 'oneday'],
    honyeoTip:
      '당일치기는 “도심(시장/월화거리) → 바다(강문/안목)” 딱 두 덩어리로 나누면 일정이 단단해져요. 안목은 카페 선택지가 많아서, 한 군데만 제대로 앉아 쉬는 방식이 혼자 여행에 잘 맞아요.',
    daysPlan: [
      {
        dayNumber: 1,
        title: '도심 골목 + 안목 커피거리',
        note: '당일치기는 이동을 줄이는 게 핵심이라 도심을 먼저 묶고 바다로 넘어가요. 시장은 가볍게, 카페는 한 군데만 길게 잡으면 하루가 덜 바빠 보여요.',
        items: [
          {
            order: 1,
            recommendedLevel: 4,
            spotSlug: 'gangneung-jungang-market',
            title: '강릉중앙시장',
            startTime: '10:30',
            endTime: '11:30',
          },
          {
            order: 2,
            recommendedLevel: 3,
            spotSlug: 'wolhwa-street',
            title: '강릉 월화거리',
            startTime: '11:40',
            endTime: '12:20',
          },
          {
            order: 3,
            recommendedLevel: 4,
            title: '시내 점심',
            description:
              '시내 혼자 먹기 편한 메뉴가 많아서 고르기 쉬워요. 피크 시간만 피하면 자리 잡는 스트레스가 확 줄어요.',
            address: '강원특별자치도 강릉시 성남동 일대',
            startTime: '12:40',
            endTime: '13:40',
          },
          {
            order: 4,
            recommendedLevel: 3,
            title: '간식 테이크아웃(선택)',
            description:
              '빵이나 간단한 디저트를 포장해두면 해변에서 쉬는 시간이 더 좋아져요. 순두부 젤라또를 추천해요!',
            address: '강원특별자치도 강릉시 금성로 일대',
            startTime: '13:50',
            endTime: '14:20',
          },
          {
            order: 5,
            recommendedLevel: 4,
            spotSlug: 'gangmun-beach',
            title: '강문해변',
            startTime: '15:00',
            endTime: '16:00',
          },
          {
            order: 6,
            recommendedLevel: 5,
            spotSlug: 'anmok-beach-coffee-street',
            title: '안목해변(커피거리) + 해변 산책',
            startTime: '16:10',
            endTime: '17:40',
          },
          {
            order: 7,
            recommendedLevel: 3,
            title: '저녁(선택)',
            description:
              '당일치기 마무리는 “바다 근처에서 짧게”가 제일 덜 피곤해요. 줄이 길면 과감히 포기하고 이동하는 쪽이 일정이 안 꼬여요.',
            address: '강원특별자치도 강릉시 안목/강문 일대',
            startTime: '18:00',
            endTime: '19:20',
          },
        ],
      },
    ],
  },
];
