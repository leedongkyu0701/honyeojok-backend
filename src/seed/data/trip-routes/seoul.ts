import { TripRouteSeedData } from './index';
export const seoulTripRoutes: TripRouteSeedData[] = [
  // 1) 1박 2일 - 정석(궁/북촌/도심 + DDP + 한강 야경)
  {
    slug: 'seoul-classic-1n2d',
    destinationSlug: 'seoul',
    title: '서울 1박 2일 정석 루트(궁·북촌·도심 + 한강 야경)',
    summary:
      '경복궁·북촌·인사동을 낮에 묶고, 밤은 한강 야경으로 정리해요. 둘째 날은 DDP와 청계천으로 가볍게 마무리해요.',
    honyeoTip:
      '서울여행을 처음 하는 혼여족에게 추천해요. 서울은 혼술/혼여 하기 너무 좋은곳이라 사람들 눈치를 많이 안봐도 되는게 장점이에요.',
    days: 2,
    honyeoCost: 220000,
    tagSlugs: ['culture', 'walking', 'nightview', 'healing', 'emotional'],
    daysPlan: [
      {
        dayNumber: 1,
        title: '궁·한옥골목·인사동 + 저녁 한강 야경',
        note: '첫날은 도심(경복궁-북촌-인사동)을 한 덩어리로 묶으면 이동이 편해요. 점심은 피크를 피해서 조금 일찍 먹고, 사람 많은 골목은 한 번에 길게 걷기보다 카페로 숨을 고르면 리듬이 안정돼요. 야경은 한강에서 오래 머물기보단 60~90분만 보고 숙소로 돌아오면 체력 소모가 덜해요.',
        items: [
          {
            order: 1,
            recommendedLevel: 5,
            spotSlug: 'gyeongbokgung-palace',
            title: '경복궁',
            startTime: '10:00',
            endTime: '12:00',
          },
          {
            order: 2,
            recommendedLevel: 4,
            spotSlug: 'bukchon-hanok-village',
            title: '북촌한옥마을',
            startTime: '12:15',
            endTime: '13:35',
          },
          {
            order: 3,
            recommendedLevel: 4,
            title: '도심 혼밥(안국/인사동 권역, 칼국수·우동 등)',
            description:
              '추천 권역은 안국·인사동 큰길 쪽이에요. 북촌에서 내려오면 바로 연결돼서 이동 시간이 거의 들지 않아요. 점심 12~13시는 붐비니 11시대에 당겨 먹거나 13시 30분 이후로 미루는 게 편해요.',
            startTime: '13:45',
            endTime: '14:45',
          },
          {
            order: 4,
            recommendedLevel: 4,
            spotSlug: 'ssamziegil-insadong',
            title: '쌈지길(인사동)',
            startTime: '15:00',
            endTime: '16:10',
          },
          {
            order: 5,
            recommendedLevel: 3,
            title: '도심 카페 타임(삼청/광화문 권역)',
            description:
              '추천 권역은 삼청동·광화문 쪽 대형 카페 라인이에요. 인사동에서 이동이 무리 없고, 잠깐 앉아서 발을 쉬기 좋아요. 14~16시는 카페가 가장 붐비니 16시 이후로 잡으면 자리 스트레스가 줄어요.',
            startTime: '16:25',
            endTime: '17:25',
          },
          {
            order: 6,
            recommendedLevel: 5,
            spotSlug: 'banpo-hangang-park',
            title: '반포한강공원',
            startTime: '18:20',
            endTime: '19:40',
          },
          {
            order: 7,
            recommendedLevel: 3,
            title: '한강 저녁(반포·서초 권역, 포장/테이크아웃도 선택)',
            description:
              '추천 권역은 반포한강공원 주변 편의시설 라인이에요. 바로 직전 한강 산책 동선 안에서 해결할 수 있어 이동이 단순해요. 저녁 19~20시는 붐비니 18시대에 미리 사두고, 간단히 포장해서 숙소에서 조용히 먹는 선택도 한 번 섞어두면 편해요.',
            startTime: '19:50',
            endTime: '20:40',
          },
        ],
      },
      {
        dayNumber: 2,
        title: 'DDP 전시 + 청계천 산책으로 가볍게 마무리',
        note: '둘째 날은 실내 전시와 산책을 붙이면 날씨 영향이 적어요. 점심은 동선 중간에서 짧게 끊고, 마지막은 물길 산책으로 정리하면 혼자 여행 특유의 여운이 남아요. 16~17시대에 끝내면 귀가나 다음 일정으로 넘어가기도 편해요.',
        items: [
          {
            order: 1,
            recommendedLevel: 4,
            spotSlug: 'ddp',
            title: '동대문디자인플라자(DDP)',
            startTime: '10:30',
            endTime: '12:10',
          },
          {
            order: 2,
            recommendedLevel: 4,
            spotSlug: 'gwangjang-market',
            title: '광장시장',
            startTime: '12:20',
            endTime: '13:30',
          },
          {
            order: 3,
            recommendedLevel: 3,
            title: '도심 카페 타임(종로/광화문 권역)',
            description:
              '추천 권역은 종로·광화문 대로변 카페 권역이에요. 시장에서 도보/지하철로 금방 옮길 수 있어 동선이 깔끔해요. 14~16시는 붐비니 13시대 초반에 들어가거나 16시 이후로 늦추면 편해요.',
            startTime: '13:50',
            endTime: '14:50',
          },
          {
            order: 4,
            recommendedLevel: 5,
            spotSlug: 'cheonggyecheon-stream',
            title: '청계천',
            startTime: '15:10',
            endTime: '16:40',
          },
        ],
      },
    ],
  },

  {
    slug: 'seoul-seongsu-hangang-oneday',
    destinationSlug: 'seoul',
    title: '서울 당일치기 힐링 루트(성수·서울숲 + 노들섬 산책)',
    honyeoTip:
      '서울숲은 혼자 걷기 좋은 곳이에요. 성수는 카페가 많아서 쉬기 좋고, 노들섬은 한강 바람을 느끼며 힐링할 수 있어요.',
    summary:
      '서울숲에서 천천히 걷고 성수에서 커피로 쉬었다가, 노들섬에서 한강 바람으로 마무리해요.',
    days: 1,
    honyeoCost: 90000,
    tagSlugs: ['healing', 'walking', 'cafe', 'emotional', 'nightview'],
    daysPlan: [
      {
        dayNumber: 1,
        title: '서울숲 산책 + 성수 커피 + 노들섬 한강 마무리',
        note: '당일치기는 권역을 넓히지 않는 게 제일 중요해요. 성수-한강(노들섬) 두 구역만 잡고, 중간중간 60~90분 단위로 쉬는 시간을 넣으면 혼자 일정이 덜 빡빡해요. 점심과 카페는 피크를 피해서 자리 스트레스를 줄이는 쪽이 편해요.',
        items: [
          {
            order: 1,
            recommendedLevel: 5,
            spotSlug: 'seoul-forest',
            title: '서울숲',
            startTime: '10:30',
            endTime: '12:10',
          },
          {
            order: 2,
            recommendedLevel: 4,
            title: '성수 혼밥(서울숲/성수 카페거리 권역, 쌀국수·라멘 등)',
            description:
              '추천 권역은 서울숲 주변과 성수 카페거리 안쪽이에요. 서울숲에서 나와 바로 붙일 수 있어 이동이 짧고, 혼자 식사 흐름이 끊기지 않아요. 점심 12~13시는 대기가 길어지니 11시대에 당겨 먹거나 13시 30분 이후가 편해요.',
            startTime: '12:20',
            endTime: '13:20',
          },
          {
            order: 3,
            recommendedLevel: 4,
            title: '성수 카페 타임(서울숲/성수 권역)',
            description:
              '추천 권역은 성수 카페거리 메인 라인이에요. 식사 후 10~20분만 걸어도 카페 선택지가 많아서 계획이 흔들려도 대체가 쉬워요. 14~16시는 붐비니 13시대에 먼저 들어가거나 16시 이후로 잡으면 자리 잡기 수월해요.',
            startTime: '13:30',
            endTime: '14:40',
          },
          {
            order: 4,
            recommendedLevel: 4,
            spotSlug: 'nodeul-island',
            title: '노들섬',
            startTime: '16:10',
            endTime: '18:00',
          },
          {
            order: 5,
            recommendedLevel: 3,
            title: '한강 저녁(용산/노들섬 인근 권역, 포장/테이크아웃도 선택)',
            description:
              '추천 권역은 노들섬 주변(용산·이촌 이동 가능한 라인)이에요. 노들섬 산책 직후 바로 이어갈 수 있어 동선이 단순해요. 저녁 19~20시는 붐비니 18시대에 미리 먹거나, 간단히 포장해서 숙소에서 조용히 먹는 선택을 섞어두면 더 편해요.',
            startTime: '18:10',
            endTime: '19:00',
          },
        ],
      },
    ],
  },
  {
    slug: 'seoul-hongdae-mangwon-haneul-1n2d',
    destinationSlug: 'seoul',
    title: '서울 1박 2일 서북권 루트(연남·망원·하늘공원)',
    summary:
      '연남·홍대에서 걷고 먹고 쉬고, 밤은 망원·한강으로. 둘째 날은 하늘공원 노을로 크게 마무리해요.',
    honyeoTip:
      '서울의 서북권은 연남·홍대·망원·하늘공원 등 다양한 테마가 있는 곳이에요. 혼술을 하고 싶다면 근처의 혼술바를 지도에서 찾아보는 것도 추천해요.',
    days: 2,
    honyeoCost: 200000,
    tagSlugs: ['walking', 'healing', 'nightview', 'culture', 'solo-eating'],
    daysPlan: [
      {
        dayNumber: 1,
        title: '연남·홍대 산책 + 망원시장 + 망원한강 야경',
        note: '첫날은 연남-홍대-망원으로 권역을 넓히지 않는 게 포인트예요. 걷기 → 먹기 → 카페 → 한강 순으로 리듬을 만들면 혼자 일정이 안정돼요. 주말 저녁 한강은 붐비니 너무 늦지 않게 이동하는 게 좋아요.',
        items: [
          {
            order: 1,
            recommendedLevel: 5,
            spotSlug: 'gyeongui-line-forest-park',
            title: '경의선숲길(연트럴파크)',
            startTime: '10:30',
            endTime: '12:00',
          },
          {
            order: 2,
            recommendedLevel: 4,
            title: '연남·홍대 혼밥(라멘/우동 등)',
            description:
              '추천 권역은 홍대입구역~연남 메인 라인이에요. 숲길 산책 직후 바로 붙일 수 있어 이동이 짧아요. 점심 12~13시는 대기가 길어지니 11시대에 당겨 먹거나 13시 30분 이후가 편해요.',
            startTime: '12:10',
            endTime: '13:10',
          },
          {
            order: 3,
            recommendedLevel: 4,
            title: '연남 카페 타임(베이커리/감성 카페 권역)',
            description:
              '추천 권역은 연남 메인 골목 카페 라인이에요. 식사 후 5~10분 안에 선택지가 많아 일정이 유연해요. 14~16시는 붐비니 13시대 초반에 들어가거나 16시 이후가 수월해요.',
            startTime: '13:20',
            endTime: '14:30',
          },
          {
            order: 4,
            recommendedLevel: 4,
            spotSlug: 'mangwon-market',
            title: '망원시장',
            startTime: '15:00',
            endTime: '16:00',
          },
          {
            order: 5,
            recommendedLevel: 3,
            title: '망원·합정 혼술(와인/크래프트 맥주 1~2잔)',
            description:
              '추천 권역은 망원·합정 골목 바 라인이에요. 시장에서 숙소 방향으로 이동하며 자연스럽게 붙일 수 있어요. 20~22시는 붐비니 18~19시대에 가볍게 1~2잔만 즐기고 정리하는 게 좋아요.',
            startTime: '18:30',
            endTime: '19:40',
          },
        ],
      },
      {
        dayNumber: 2,
        title: '이태원·한강 문화섬 + 하늘공원 노을',
        note: '둘째 날은 이동 동선을 단순하게 가져가요. 오전은 이태원·한강 쪽으로 가볍게 걷고, 오후엔 하늘공원으로 크게 마무리해요. 노을 시간대는 바람이 강하니 겉옷을 챙기면 오래 머물기 좋아요.',
        items: [
          {
            order: 1,
            recommendedLevel: 4,
            spotSlug: 'southside-parlor',
            title: '이태원 브런치·카페 타임(녹사평 권역)',
            startTime: '11:00',
            endTime: '12:00',
          },
          {
            order: 2,
            recommendedLevel: 5,
            spotSlug: 'nodeul-island',
            title: '노들섬',
            startTime: '13:00',
            endTime: '14:30',
          },
          {
            order: 3,
            recommendedLevel: 4,
            title: '도심 혼밥(합정·상암 이동 동선 중간)',
            description:
              '추천 권역은 합정·상암 라인이에요. 노들섬에서 이동 후 하늘공원 가기 전 중간 지점이라 동선이 끊기지 않아요. 13~14시는 붐비니 14시대에 늦은 점심으로 잡으면 편해요.',
            startTime: '14:40',
            endTime: '15:40',
          },
          {
            order: 4,
            recommendedLevel: 5,
            spotSlug: 'haneul-park',
            title: '하늘공원',
            startTime: '16:30',
            endTime: '18:30',
          },
        ],
      },
    ],
  },
];
