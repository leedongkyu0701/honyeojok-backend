import { ImageSource } from 'src/types/util';
import { SpotCategory } from 'src/types/spot';
import imageMap from '../../image-map.json';
import type { SpotSeedData } from './index';

export const jejuSpots: SpotSeedData[] = [
  // 1) NATURE / ACTIVITY / ETC

  {
    regionSlug: 'jeju',
    slug: 'seongsan-ilchulbong',
    name: '성산일출봉',
    summary: '제주 동쪽 대표 일출 명소, 혼자 등반+바다 전망 코스로 최고',
    description:
      '정상까지 계단 동선이 단순해 혼자 등반하기 좋고 짧은 시간 대비 뷰 만족도가 높으며 바다와 성산 마을 풍경이 한 프레임에 담겨 사진이 잘 나오고 해 뜰 무렵엔 사람은 많아도 흐름이 자연스러워 혼행 난이도가 낮아요.',
    honyeoTip:
      '일출 코스라면 방풍 겉옷과 장갑까지 챙기고 내려와서는 성산항/섭지코지 방향으로 이어서 “동쪽 반나절 코스”로 끊으면 이동이 깔끔해요.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['seongsan-ilchulbong'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-황성훈',
    address: '제주특별자치도 서귀포시 성산읍 일출로 284-12',
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=2c7347c4-c36e-4575-8096-04a4df7c0953',
    tagSlugs: ['sea', 'walking', 'thinking', 'oneday'],
  },
  {
    regionSlug: 'jeju',
    slug: 'seopjikoji',
    name: '섭지코지',
    summary: '해안 절경 산책로, 혼자 걷기 좋은 바다 감성 코스',
    description:
      '등대 언덕과 해안길이 자연스럽게 이어져 혼자 걷기 편하고 파도·현무암·초지 풍경이 계속 바뀌어 지루할 틈이 없으며 사진 포인트가 많아 혼자 셀프 촬영도 쉬운 편이고 성산/섭지 라인 카페·식당과 묶기 좋아요.',
    honyeoTip:
      '바람이 센 날이 잦으니 후드나 바람막이는 필수고 혼자라면 해 질 무렵보다 “해지기 1시간 전”에 들어가서 여유 있게 걷는 게 덜 붐비고 좋아요.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['seopjikoji'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-박자양',
    address: '제주특별자치도 서귀포시 성산읍 섭지코지로 107',
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=c2125cd6-ed53-430f-b6be-4f04a8b4a032',
    tagSlugs: ['sea', 'walking', 'emotional', 'healing'],
  },

  {
    regionSlug: 'jeju',
    slug: 'hamdeok-beach',
    name: '함덕해수욕장',
    summary: '에메랄드빛 바다 산책, 혼자 걷고 카페 들르기 좋은 대표 해변',
    description:
      '물빛이 예쁜 구간이 길게 펼쳐져 혼자 바다멍하기 좋고 산책로와 편의시설이 잘 붙어 있어 초행도 동선이 쉽고 사진이 잘 나오는 포인트가 많아 20~30대 혼행·감성 사진 코스로 꾸준히 인기이며 주변 카페거리까지 연결이 자연스러워요.',
    honyeoTip:
      '사람이 많으면 해변 중앙보다 서우봉 방향으로 걸으면 훨씬 여유롭고 “바다 산책 → 카페 → 노을”로 마무리하면 혼자 하루가 꽉 차요.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['hamdeok-beach'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이범수',
    address: '제주특별자치도 제주시 조천읍 조함해안로 519-10',
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=699e7a37-b06a-448e-a7bb-ccdd7517f87a',
    tagSlugs: ['sea', 'walking', 'healing', 'cafe'],
  },

  {
    regionSlug: 'jeju',
    slug: 'hyeopjae-beach',
    name: '협재해수욕장',
    summary: '얕은 수심+석양 맛집, 혼자 바다멍하기 좋은 서쪽 대표 해변',
    description:
      '얕고 맑은 바다색 덕분에 낮에도 사진이 잘 나오고 해 질 무렵엔 노을 분위기가 좋아 혼자 앉아 멍 때리기 좋으며 해변 동선이 단순해 걷기 편하고 주변 카페·간단 식사 선택지가 많아 서쪽 반나절 코스로 쓰기 좋아요.',
    honyeoTip:
      '노을 시간대는 붐비니 “노을 40분 전 도착 → 해변 끝까지 한 번 걷기 → 되돌아오며 사진” 루틴이 혼자 일정 짜기 제일 편해요.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['hyeopjae-beach'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-천건엽',
    address: '제주특별자치도 제주시 한림읍 한림로 329-10',
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=52e504c8-1706-46ca-bd4b-04eb9120e91a',
    tagSlugs: ['sea', 'walking', 'healing', 'nightview'],
  },

  {
    regionSlug: 'jeju',
    slug: 'saryeoni-forest-path',
    name: '사려니숲길',
    summary: '울창한 숲길 힐링, 혼자 걸으며 리프레시/생각정리에 딱',
    description:
      '완만한 숲길이 길게 이어져 혼자 걷기 부담이 적고 피톤치드 느낌이 강해 “머리 비우기”에 좋으며 비 온 다음날 공기와 빛이 특히 예뻐 사진도 잘 나오고 조용히 걷다가 쉬기 좋은 포인트가 많아요.',
    honyeoTip:
      '혼자라면 이어폰 볼륨 낮추고 천천히 걷는 게 안전하고 미끄럼 대비 운동화가 필수이며 “숲길 → 근처 카페”로 마무리하면 감정 회복 코스로 딱이에요.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['saryeoni-forest-path'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이명일',
    address: '제주특별자치도 서귀포시 표선면 가시리 붉은오름 입구',
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=716dcc75-7ea7-45c8-b20c-67594101a86e',
    tagSlugs: ['nature', 'walking', 'healing', 'thinking'],
  },

  {
    regionSlug: 'jeju',
    slug: 'bijarim-forest',
    name: '비자림',
    summary: '비자나무 숲 산책, 혼자 천천히 걷기 좋은 “초록 힐링” 코스',
    description:
      '숲길이 비교적 평탄하고 안내 동선이 잘 잡혀 있어 혼자도 걷기 편하며 비자나무 숲 특유의 초록 톤이 사진에 예쁘게 담기고 짧게 걸어도 만족감이 큰 편이라 동쪽 루트 중간에 끼우기 좋아요.',
    honyeoTip:
      '입구 쪽이 붐비면 안쪽으로 조금만 들어가도 조용해지고 혼자라면 “천천히 걷기 + 벤치 휴식”을 60~90분으로 잡으면 딱 좋아요.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['bijarim-forest'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이정수',
    address: '제주특별자치도 제주시 구좌읍 비자숲길 55',
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=33c37895-6fb2-498a-96e0-2204fab24533',
    tagSlugs: ['nature', 'walking', 'healing', 'stress-relief'],
  },

  {
    regionSlug: 'jeju',
    slug: 'manjanggul-cave',
    name: '만장굴',
    summary: '용암동굴 자연유산, 혼자도 쉽게 즐기는 “시원한” 원데이 코스',
    description:
      '동굴 내부가 사계절 비교적 서늘해 날씨와 상관없이 즐기기 좋고 관람 동선이 일방향에 가까워 혼자도 흐름이 편하며 용암지형이 독특해 사진·체험 요소가 분명하고 동쪽 루트(성산/우도/비자림)와 묶기 좋아요.',
    honyeoTip:
      '바닥이 젖어 미끄러운 구간이 있으니 미끄럼 덜한 운동화가 필수고 겉옷을 하나 챙기면 체감온도가 확 편해져요.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['manjanggul-cave'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이범수',
    address: '제주특별자치도 제주시 구좌읍 만장굴길 182',
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=048a397c-65cd-4d37-bb8c-e4a2cae4e949',
    tagSlugs: ['nature', 'culture', 'oneday', 'hidden'],
  },

  {
    regionSlug: 'jeju',
    slug: 'yongnuni-oreum',
    name: '용눈이오름',
    summary: '부드러운 능선 뷰 맛집, 혼자 트레킹+사진 남기기 좋은 오름',
    description:
      '완만한 능선 라인이 예뻐 혼자 사진 찍기 좋고 정상까지 동선이 직관적이라 초행도 부담이 적으며 바람·하늘·초지 조합이 감성 샷으로 잘 나와 20~30대에게 꾸준히 인기이고 동쪽 드라이브 루트에 자연스럽게 붙어요.',
    honyeoTip:
      '바람이 강한 날이 많아 모자 끈이나 방풍 겉옷이 있으면 훨씬 편하고 혼자라면 “한 바퀴 천천히 + 중간 휴식”으로 60분 정도 잡는 게 무리 없어요.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['yongnuni-oreum'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-우창민',
    address: '제주특별자치도 제주시 구좌읍 종달리 28',
    externalUrl:
      'https://english.visitkorea.or.kr/svc/contents/contentsView.do?vcontsId=90617',
    tagSlugs: ['mountain', 'walking', 'emotional', 'oneday'],
  },

  {
    regionSlug: 'jeju',
    slug: 'camellia-hill',
    name: '카멜리아힐',
    summary: '사계절 정원 산책+감성 사진, 혼자 가도 즐길 거리 많은 수목원',
    description:
      '정원 동선이 잘 정리되어 혼자 천천히 보기 좋고 계절별 포토존이 다양해 사진 찍는 재미가 확실하며 내부에 쉬어갈 공간이 있어 혼자 체류 시간도 자연스럽게 길어지고 서쪽 드라이브 루트에 넣기 쉬운 편이에요.',
    honyeoTip:
      '혼자라면 평일 오전이 가장 쾌적하고 동백 시즌엔 붐비니 “오픈 시간대 입장 → 한 바퀴 빠르게 → 조용한 구간에서 오래 머무르기”가 효율 좋아요.',
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['camellia-hill'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이범수',
    address: '제주특별자치도 서귀포시 안덕면 병악로 166',
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=173bc002-7eb9-4c60-bea4-cc89e7a96c86',
    tagSlugs: ['healing', 'emotional', 'walking', 'oneday'],
  },

  {
    regionSlug: 'jeju',
    slug: 'handam-coastal-walk',
    name: '한담해안산책로',
    summary: '애월 바다 옆 산책로, 혼자 걷고 카페 들르기 좋은 20~30 핫코스',
    description:
      '바다 바로 옆으로 이어지는 짧고 예쁜 산책로라 혼자 걷기 부담이 적고 파도·현무암·해안선이 계속 보여 사진이 잘 나오며 주변에 카페와 맛집이 밀집해 “걷고 쉬고 먹는” 루틴이 자연스럽게 만들어져요.',
    honyeoTip:
      '혼자라면 일몰 정각보다 “일몰 1시간 전”에 걷기 시작해서 카페로 마무리하면 붐빔이 덜하고 감성 타임이 길어져요.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['handam-coastal-walk'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-김계호',
    address: '제주특별자치도 제주시 애월읍 곽지리',
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=630a663c-738b-430f-b60f-0c23a766b1df',
    tagSlugs: ['sea', 'walking', 'emotional', 'healing'],
  },

  {
    regionSlug: 'jeju',
    slug: 'dongmun-traditional-market',
    name: '동문재래시장',
    summary: '제주 원도심 쇼핑+간식, 혼자 구경하며 먹기 좋은 시장',
    description:
      '원도심 한가운데라 접근성이 좋고 간식·기념품·회/과일 같은 선택지가 많아 혼자 “조금씩 먹고 구경하는” 흐름이 자연스럽며 밤에는 야시장 분위기로 사진도 잘 나오고 근처 산지천/관덕정 라인과 묶기 좋아요.',
    honyeoTip:
      '혼자라면 저녁은 붐비니 평일 늦은 오후가 가장 무난하고 먹거리는 한두 개만 정해서 줄 스트레스 줄이면 만족도가 올라가요.',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['dongmun-traditional-market'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-김지호',
    address: '제주특별자치도 제주시 관덕로14길 20',
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=4d1ef8c2-ce76-450a-87b0-b9b0e917d95c',
    tagSlugs: ['shopping', 'culture', 'solo-eating', 'oneday'],
  },

  {
    regionSlug: 'jeju',
    slug: 'udo-seobinbaeksa',
    name: '우도 산호해변(서빈백사)',
    summary: '산호모래 해변 감성 끝판왕, 혼자 우도 원데이 코스로 강추',
    description:
      '모래색과 물빛이 독특해 사진이 정말 잘 나오고 해변 동선이 단순해 혼자 걷기 편하며 주변에 간단한 카페·간식 포인트도 있어 혼자 하루를 보내기 충분하고 성산항에서 연결되는 원데이 루트로 만들기 좋아요.',
    honyeoTip:
      '우도는 이동 시간이 있으니 당일치기라면 “아침 첫 배 → 서빈백사/동쪽 해안 → 오후 복귀”처럼 큰 흐름만 잡아두면 혼자도 헤매지 않아요.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['udo-seobinbaeksa'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이범수',
    address: '제주특별자치도 제주시 우도면 우도해안길 252',
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=42f2eea2-1ca6-42a8-a818-47b4091415d6',
    tagSlugs: ['sea', 'emotional', 'walking', 'oneday'],
  },

  {
    regionSlug: 'jeju',
    slug: 'yongduam-rock',
    name: '용두암',
    summary:
      '공항 근처 바다 절벽 포토스팟, 혼자 잠깐 들르기 좋은 제주 시그니처',
    description:
      '공항과 가까워 도착/출발일에 짧게 끼우기 좋고 해안 산책 동선이 단순해 혼자도 부담이 적으며 바위와 파도 조합이 사진에 잘 담기고 주변에 카페·해안도로 드라이브 코스가 붙어 일정 확장이 쉬워요.',
    honyeoTip:
      '혼자라면 바람이 센 날 난간 주변에서 무리하지 말고 해안 산책로 위주로 움직이면 안전하고 “용두암 → 용연/산지천 → 원도심”으로 이어가면 동선이 깔끔해요.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['yongduam-rock'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이범수',
    address: '제주특별자치도 제주시 용두암길 15',
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=dd531c2d-4d4a-4fc5-8fae-7ac2f7e8b8a6',
    tagSlugs: ['sea', 'walking', 'emotional', 'oneday'],
  },

  {
    regionSlug: 'jeju',
    slug: 'iho-taewoo-beach',
    name: '이호테우해변',
    summary:
      '말등대와 노을이 예쁜 해변, 혼자 산책+사진 남기기 좋은 공항 근처 코스',
    description:
      '말 모양 등대가 포인트라 사진이 잘 나오고 해변이 길게 트여 있어 혼자 걷기 좋으며 노을 시간대 분위기가 특히 좋아 20~30대 감성 코스로 자주 언급되고 공항 근처라 일정 전후로 붙이기 쉬워요.',
    honyeoTip:
      '혼자라면 해 지기 전후로 바람이 차가워지니 겉옷을 챙기고 “해변 산책 → 근처 카페”로 마무리하면 혼자 일정이 자연스럽게 정리돼요.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['iho-taewoo-beach'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이범수',
    address: '제주특별자치도 제주시 이호일동 1665-13',
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=aa8b8c8e-3f8c-4a1a-b72a-97c3d02f2c2e',
    tagSlugs: ['sea', 'nightview', 'walking', 'healing'],
  },

  {
    regionSlug: 'jeju',
    slug: 'yongmeori-coast',
    name: '용머리해안',
    summary:
      '파도와 현무암 절벽이 만드는 제주 감성, 혼자도 사진 찍기 좋은 해안 코스',
    description:
      '해안 절벽과 바위 지형이 독특해 풍경 자체가 콘텐츠이고 걷는 구간마다 포토스팟이 있어 혼자 촬영도 만족도가 높으며 산방산 라인과 함께 묶으면 이동이 짧아 “남서쪽 반나절” 코스로 만들기 좋아요.',
    honyeoTip:
      '혼자라면 바람·파도 상황에 따라 통제가 있을 수 있어 당일 운영 여부를 먼저 확인하고 미끄럼 방지 신발로 안전하게 즐기는 게 좋아요.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['yongmeori-coast'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-천건엽',
    address: '제주특별자치도 서귀포시 안덕면 사계리 112-2',
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=1d0d6e5a-54e0-4b5f-9c75-2f0a6f6a2b18',
    tagSlugs: ['sea', 'walking', 'emotional', 'hidden'],
  },

  {
    regionSlug: 'jeju',
    slug: 'cheonjiyeon-waterfall',
    name: '천지연폭포',
    summary: '서귀포 도심 속 폭포 산책, 혼자 저녁 산책 코스로도 인기',
    description:
      '입구부터 폭포까지 산책 동선이 잘 정리되어 혼자 걷기 편하고 조명 켜지는 시간대엔 분위기가 좋아 사진도 잘 나오며 서귀포 올레시장·이중섭거리와 가까워 “남부 도심 코스”로 묶기 좋아요.',
    honyeoTip:
      '혼자라면 해 질 무렵 방문해서 폭포 보고 시장 쪽으로 이동하면 동선이 자연스럽고 바닥이 젖을 수 있어 미끄럼 주의가 필요해요.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['cheonjiyeon-waterfall'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-황성훈',
    address: '제주특별자치도 서귀포시 천지동 667-7',
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=468c0b93-3e1a-4cfa-9d8e-7f10c8b0a5b4',
    tagSlugs: ['nature', 'walking', 'healing', 'oneday'],
  },

  {
    regionSlug: 'jeju',
    slug: 'soesokkak-estuary',
    name: '쇠소깍',
    summary:
      '에메랄드 물빛 계곡 바다 만나는 곳, 혼자 산책+사진에 강한 자연 스팟',
    description:
      '물빛이 예쁜 포인트가 뚜렷해 사진이 잘 나오고 주변 산책 구간이 있어 혼자 잠깐 들러도 만족도가 높으며 남부 동선(서귀포/표선)과 연결이 좋아 원데이 코스에 넣기 편해요.',
    honyeoTip:
      '혼자라면 체험(테우/카약 등)은 당일 운영에 따라 달라질 수 있어 산책 중심으로 계획을 잡고 미끄러운 구간은 천천히 이동하면 좋아요.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['soesokkak-estuary'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-황성훈',
    address: '제주특별자치도 서귀포시 쇠소깍로 104',
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=8a71b7b2-3bfb-4f8d-a7dd-0d1b23a0b44b',
    tagSlugs: ['sea', 'nature', 'walking', 'oneday'],
  },

  {
    regionSlug: 'jeju',
    slug: 'lee-jungseop-street',
    name: '이중섭거리',
    summary:
      '작은 갤러리와 감성 골목이 이어지는 서귀포 산책길, 혼자 걷기 좋은 문화 코스',
    description:
      '골목 자체가 아기자기해 혼자 천천히 걸으며 사진 찍기 좋고 카페·소품샵·전시가 가까이 모여 있어 혼자 시간을 보내기 편하며 올레시장·천지연폭포와도 동선이 좋아 서귀포 당일 코스에 넣기 쉬워요.',
    honyeoTip:
      '혼자라면 낮엔 골목+카페로 가볍게 즐기고 저녁엔 시장으로 이어서 식사까지 해결하면 이동이 최소화돼요.',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['lee-jungseop-street'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이정수',
    address: '제주특별자치도 서귀포시 이중섭로 11',
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=bd2c8d2a-2d7e-4c3f-8d14-7d5a0c8b0c2a',
    tagSlugs: ['culture', 'walking', 'emotional', 'oneday'],
  },

  // 2) FOOD

  {
    regionSlug: 'jeju',
    slug: 'ujin-haejangguk',
    name: '우진해장국',
    summary: '제주 고사리 해장국 원탑급, 혼자도 많이 먹는 “혼밥 최강” 맛집',
    description:
      '대표 메뉴가 명확하고 회전이 빨라 혼자 들어가도 어색함이 적으며 혼밥 방문 후기가 많아 심리적 부담이 낮고 공항/원도심 일정에 넣기 좋아 여행 첫 끼나 마지막 끼로 자주 선택돼요.',
    honyeoTip:
      '혼자라면 오픈 직후나 애매한 시간(10~11시대, 3~5시대)을 노리면 대기 스트레스가 확 줄고 식사 후에는 동문시장/산지천 라인으로 산책 연결이 좋아요.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '제주특별자치도 제주시 서사로 11',
    externalUrl: 'https://place.map.kakao.com/11547525',
    tagSlugs: ['solo-eating', 'culture'],
  },

  {
    regionSlug: 'jeju',
    slug: 'jeju-kimmanbok',
    name: '제주김만복(만복이네김밥집)',
    summary: '전복내장 김밥으로 유명, 혼자 픽업/혼밥 난이도 최저',
    description:
      '포장 중심이라 혼자 여행 중 끼니 해결이 쉬운 편이고 이동 중에도 먹기 좋아 일정이 빡빡한 날에 특히 유용하며 메뉴 선택이 단순해 주문 스트레스가 적고 제주 도착/출발일에 끼워 넣기 좋다는 후기가 많아요.',
    honyeoTip:
      '혼자라면 공항 도착 직후나 출발 전에 픽업해서 숙소/해변에서 먹는 식으로 쓰면 효율이 좋고 외부 링크는 카카오 플레이스 URL 확인 필요라 비워두었어요.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '제주특별자치도 제주시 오라로 41',
    externalUrl: 'https://place.map.kakao.com/1046180098',
    tagSlugs: ['solo-eating', 'oneday'],
  },

  // 신규 장소
  {
    regionSlug: 'jeju',
    slug: 'olle-guksu',
    name: '올래국수',
    summary: '고기국수로 유명한 제주 혼밥 성지, 회전 빠르고 1인 방문 많음',
    description:
      '메뉴가 단순하고 회전이 빨라 혼자 들어가도 편한 편이며 고기국수 한 그릇으로 든든하게 해결돼 이동 많은 날에 특히 좋고 혼밥 후기와 대기 팁이 많아 초행도 계획 세우기 쉬워요.',
    honyeoTip:
      '혼자라면 피크(점심/저녁)를 피해서 오전 늦게나 오후 중간 타이밍을 노리면 훨씬 편하고 식사 후에는 이호테우/해안도로로 가볍게 이동하기 좋아요.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '제주특별자치도 제주시 월성로 39 1층',
    externalUrl: 'https://place.map.kakao.com/559359242',
    tagSlugs: ['solo-eating', 'stress-relief', 'oneday'],
  },

  {
    regionSlug: 'jeju',
    slug: 'jamae-guksu-jeju',
    name: '자매국수(제주점)',
    summary: '국수 메뉴로 깔끔하게 한 끼, 혼자도 부담 적은 제주 국수집',
    description:
      '국수류 중심이라 혼자 주문이 쉽고 한 그릇 식사로 끝내기 좋아 일정 중간에 끼우기 편하며 대기 시스템이 비교적 명확해 혼자 기다려도 부담이 덜하고 혼밥 후기 기반으로 무난하게 선택되는 곳이에요.',
    honyeoTip:
      '혼자라면 브레이크타임 여부를 먼저 확인하고 대기가 길면 포장 옵션이 있는지 체크하면 일정이 덜 꼬여요.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '제주특별자치도 제주시 항골남길 46',
    externalUrl: 'https://place.map.kakao.com/21455793',
    tagSlugs: ['solo-eating', 'oneday', 'stress-relief'],
  },

  {
    regionSlug: 'jeju',
    slug: 'matna-restaurant-seongsan',
    name: '맛나식당(성산)',
    summary:
      '성산 동쪽 맛집으로 유명한 한 끼, 1인 주문도 가능한 편이라 혼밥 코스로 인기',
    description:
      '대표 메뉴가 확실해 혼자 주문이 비교적 쉽고 성산일출봉/섭지코지 동선 사이에 넣기 좋아 이동 스트레스가 적으며 후기에서 “혼자도 많이 간다”는 언급이 꾸준히 보이고 식사 후 바로 바다 코스로 이어가기 좋아요.',
    honyeoTip:
      '혼자라면 오픈 직후에 가서 대기를 최소화하고 식사 후 성산항/섭지 방향으로 산책 루트를 붙이면 하루가 자연스럽게 완성돼요.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '제주특별자치도 서귀포시 성산읍 동류암로 41',
    externalUrl: 'https://place.map.kakao.com/8970084',
    tagSlugs: ['solo-eating', 'oneday', 'sea'],
  },

  {
    regionSlug: 'jeju',
    slug: 'ozo-haenyeo-house',
    name: '오조해녀의집',
    summary:
      '바다 앞 해녀식 한 끼, 혼자도 편한 메뉴 구성으로 동쪽 코스에 잘 붙는 곳',
    description:
      '해산물 메뉴가 단품으로 구성돼 혼자 주문이 비교적 수월하고 바다 앞 위치라 식사 자체가 여행 콘텐츠가 되며 성산/우도 라인과 가까워 동쪽 루트에서 이동이 편하고 후기 기반으로 재방문 언급도 많은 편이에요.',
    honyeoTip:
      '혼자라면 무리한 다양 주문보단 단품 1개로 깔끔하게 즐기고 식사 후 바로 해안 산책으로 연결하면 만족도가 높아요.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '제주특별자치도 서귀포시 성산읍 한도로 141-13',
    externalUrl: 'https://place.map.kakao.com/8016700',
    tagSlugs: ['solo-eating', 'sea', 'oneday'],
  },

  // 3) CAFE

  {
    regionSlug: 'jeju',
    slug: 'jeju-glass-house',
    name: '제주 글라스하우스',
    summary: '안도 다다오 건축+오션뷰, 혼자 앉아 멍 때리기 좋은 감성 스팟',
    description:
      '통유리 너머 바다 뷰가 강해서 혼자 가도 시선이 자연스럽게 바깥으로 향하고 좌석에 앉아 멍 때리기 좋은 분위기이며 건축 자체가 포토스팟이라 사진이 잘 나오고 섭지코지/성산 코스 중간 휴식 포인트로 쓰기 좋아요.',
    honyeoTip:
      '혼자라면 노을 시간대가 베스트라 조금 일찍 도착해 좌석을 확보하고 “섭지코지 산책 → 글라스하우스”로 마무리하면 동선이 완벽해요.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['jeju-glass-house'],
    imageSource: ImageSource.ETC,
    address: '제주특별자치도 서귀포시 성산읍 섭지코지로 107',
    externalUrl:
      'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=cb03367a-0231-4384-b990-4e4b51f9a0a7',
    tagSlugs: ['cafe', 'emotional', 'sea', 'oneday'],
  },

  {
    regionSlug: 'jeju',
    slug: 'cafe-delmoondo',
    name: '카페 델문도',
    summary: '함덕 오션뷰 대형 카페, 혼자 바다 보며 쉬기 좋은 안정적인 선택',
    description:
      '바다 바로 앞이라 뷰가 확실하고 좌석 규모가 커서 혼자 가도 자리 찾기 비교적 수월하며 커피 한 잔 하며 바다멍하기 좋고 함덕 해변 산책과 붙이기 쉬워 “해변 → 카페” 루틴 만들기 좋아요.',
    honyeoTip:
      '혼자라면 창가 뷰 자리는 경쟁이 있으니 오픈 직후나 평일 낮을 노리기.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '제주특별자치도 제주시 조천읍 조함해안로 519-10 인근',
    externalUrl: 'https://www.delmoondo.com',
    tagSlugs: ['cafe', 'sea', 'healing', 'emotional'],
  },

  {
    regionSlug: 'jeju',
    slug: 'cafe-bomnal-aewol',
    name: '카페 봄날(애월)',
    summary: '애월 감성 오션뷰 카페, 혼자도 사진 찍고 쉬기 좋은 대표 핫플',
    description:
      '바다 보이는 감성 좌석과 외관 포토스팟이 강해 혼자 방문해도 사진 남기기 좋고 애월 해안 산책 코스와 붙이기 쉬우며 20~30대 후기에서 “혼자 가도 괜찮다”는 언급이 많지만 주말은 좌석 경쟁이 있는 편이에요.',
    honyeoTip:
      '혼자라면 오픈 시간대에 먼저 들러서 사진과 커피를 해결하고 한담해안산책로로 이어가면 붐빔을 피하면서도 코스 만족도가 높아요.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '제주특별자치도 제주시 애월읍 애월로1길 25',
    externalUrl: 'https://place.map.kakao.com/693062983',
    tagSlugs: ['cafe', 'emotional', 'sea', 'oneday'],
  },

  {
    regionSlug: 'jeju',
    slug: 'monsant-aewol',
    name: '몽상드애월',
    summary: '애월 오션뷰 감성 카페, 혼자도 ‘바다멍’하기 좋은 포토스팟',
    description:
      '오션뷰와 공간 분위기가 강해서 혼자 가도 할 일이 확실하고 사진이 잘 나오며 애월 라인 드라이브 코스에 자연스럽게 붙고 바 좌석·창가 자리 선호가 많아 혼자 앉기에도 비교적 어색하지 않은 편이지만 피크엔 대기 가능성이 있어요.',
    honyeoTip:
      '혼자라면 평일 낮에 가서 짧게 머물고 한담해안산책로로 이어가는 흐름이 가장 효율적! ',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '제주특별자치도 제주시 애월읍 애월로1길 25-4',
    tagSlugs: ['cafe', 'emotional', 'sea', 'thinking'],
  },

  {
    regionSlug: 'jeju',
    slug: 'naeum-coffee-bar',
    name: '내음커피바',
    summary: '커피와 위스키를 함께 즐기는 커피바, 혼자 앉기 좋은 바테이블',
    description:
      '낮엔 커피로 가볍게 시작하고 밤엔 위스키로 분위기를 바꿀 수 있어 혼자 일정 마무리에 잘 맞고 바테이블 중심이라 혼자 앉아도 어색하지 않으며 조용히 머물기 좋은 타입이라 혼술 입문에도 무난해요.',
    honyeoTip:
      '혼자라면 바테이블이 주문·동선·시선 흐름 모두 편하니 바 좌석을 선호하는 편이 좋아요',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '제주특별자치도 제주시 산지로 17',
    externalUrl: 'https://place.map.kakao.com/768821365',
    tagSlugs: ['solo-drinking', 'emotional', 'thinking'],
  },

  // 4) DRINK

  {
    regionSlug: 'jeju',
    slug: 'zencantos-winebar',
    name: '젠칸투스',
    summary: 'LP 감성 와인바, 혼자 음악 들으며 한 잔 하기 좋은 곳',
    description:
      'LP 음악과 조용한 조도가 분위기를 만들어 혼자 가도 어색함이 덜하고 와인 한 잔으로 천천히 시간을 보내기 좋으며 감성 수요가 꾸준해 후기 기반 검증이 비교적 잘 되어 있고 혼자 앉기 좋은 자리가 있다는 언급이 많아요.',
    honyeoTip:
      '혼자라면 오픈 직후가 가장 편하고 너무 늦은 시간은 만석 가능성이 있어 일찍 들어가 1~2잔으로 깔끔하게 마무리하는 게 좋아요.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '제주특별자치도 제주시 연삼로 145',
    externalUrl: 'https://place.map.kakao.com/328342741',
    tagSlugs: ['solo-drinking', 'emotional', 'nightview'],
  },

  {
    regionSlug: 'jeju',
    slug: 'gwangan-solo-bar',
    name: '광장(제주 혼술바)',
    summary: '혼술 컨셉 칵테일바, 혼자 앉아 한 잔하기 좋은 분위기',
    description:
      '혼자 오는 손님을 전제로 한 분위기라 혼술 난이도가 낮고 칵테일/하이볼로 가볍게 즐기기 좋으며 대화 강요가 적다는 후기가 있어 혼자 조용히 마시기 좋은 편이고 주말엔 만석이 빨라질 수 있어요.',
    honyeoTip:
      '혼자라면 평일 밤이나 오픈 직후가 가장 안정적이고 귀가 동선을 먼저 정해두면 마음이 훨씬 편해요.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '제주특별자치도 제주시 북성로 9 1층',
    externalUrl: 'https://place.map.kakao.com/5544310',
    tagSlugs: ['solo-drinking', 'emotional', 'nightview'],
  },

  {
    regionSlug: 'jeju',
    slug: 'magpie-brewing-taproom',
    name: '맥파이 브루어리(탭룸/양조장)',
    summary: '제주 수제맥주 대표 브랜드, 혼자 한 잔하기 좋은 캐주얼 탭룸',
    description:
      '수제맥주 중심이라 혼자 한 잔씩 마시기 좋고 캐주얼한 분위기라 혼술 진입 장벽이 낮으며 낮에도 들르기 쉬워 “관광 코스 → 맥주 한 잔”으로 일정 마무리하기 좋고 제주 로컬 감성 경험으로도 만족도가 높아요.',
    honyeoTip: '혼자라면 테이블보다 바/스탠딩 쪽이 편해요!',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '제주특별자치도 제주시 동회천1길 23',
    externalUrl: 'https://place.map.kakao.com/602353817',
    tagSlugs: ['solo-drinking', 'stress-relief', 'oneday'],
  },

  {
    regionSlug: 'jeju',
    slug: 'the-booze-jeju',
    name: '더 부즈 제주(The Booze Jeju)',
    summary: '위스키 중심 바, 혼자 조용히 마시기 좋은 ‘바 좌석’ 분위기',
    description:
      '바 중심의 조용한 톤이라 혼자 마시기 좋고 위스키/하이볼로 깔끔하게 즐기기 쉬우며 “비밀아지트 같은 분위기”라는 후기가 있어 혼자 감성 있게 마무리하기 좋은 타입이고 신제주 쪽 일정과 묶기 편해요.',
    honyeoTip:
      '혼자라면 1~2잔으로 가볍게 즐기고 귀가 동선과 시간을 미리 정해두면 마음이 훨씬 편해요.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '제주특별자치도 제주시 노형11길 5-4',
    externalUrl: 'https://place.map.kakao.com/857455861',
    tagSlugs: ['solo-drinking', 'thinking', 'nightview'],
  },
];
