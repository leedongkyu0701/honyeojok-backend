import { ImageSource } from 'src/types/util';
import { SpotCategory } from 'src/types/spot';
import imageMap from '../../image-map.json';
import type { SpotSeedData } from './index';

export const jeonjuSpots: SpotSeedData[] = [
  // 1) NATURE / ACTIVITY / ETC

  {
    regionSlug: 'jeonju',
    slug: 'jeonju-hanok-village',
    name: '전주한옥마을',
    summary: '전주 감성의 중심, 혼자 걸어도 하루가 꽉 차는 골목',
    description:
      '한옥 지붕이 이어지는 골목이 촘촘해서 혼자 천천히 걷기 좋아요. 카페·디저트·소품샵·사진 스팟이 자연스럽게 이어져 “발길 닿는 대로” 코스가 됩니다. 낮에는 활기 있고, 밤에는 조명으로 분위기가 바뀌어 같은 동선도 다르게 느껴져요. 한옥마을 중심에서 경기전·전동성당·자만벽화마을까지 도보로 연결됩니다.',
    honyeoTip:
      '오전 9~10시대가 가장 한적해요. “한옥마을 산책 → 경기전/성당 → 카페 → 야경”으로 짜면 동선이 깔끔합니다.',
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['jeonju']['jeonju-hanok-village'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-최용',
    address: '전라북도 전주시 완산구 기린대로 99',
    externalUrl:
      'https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=81f9d17b-4e01-49c9-8df6-6239d0e00b8c',
    tagSlugs: ['culture', 'walking', 'emotional', 'oneday'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'gyeonggijeon',
    name: '경기전',
    summary: '대나무길 한 컷, 고즈넉한 공기 속 혼자 걷는 역사 산책',
    description:
      '한옥마을 안쪽에 있어 도보 동선이 정말 좋아요. 담장길과 대나무 숲길이 사진이 잘 나와 “혼자 찍기”에도 부담이 적습니다. 관람 동선이 단순해서 천천히 둘러보며 생각 정리하기 좋고, 비 온 뒤엔 돌길/담장 분위기가 더 살아납니다.',
    honyeoTip:
      '한옥마을에서 오전 산책 후 경기전 들렀다가, 근처 카페(한옥카페/베이커리)로 쉬어가면 좋아요.',
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['jeonju']['gyeonggijeon'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-IR스튜디오',
    address: '전라북도 전주시 완산구 태조로 44',
    externalUrl:
      'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=fdc7d45a-4f9e-4d47-a492-1885b7d591c9',
    tagSlugs: ['culture', 'walking', 'healing', 'emotional'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'jaman-mural-village',
    name: '자만벽화마을',
    summary: '언덕 골목 감성, 혼자 천천히 올라가는 포토 산책',
    description:
      '한옥마을 맞은편 언덕 위 골목이라 “걷는 재미”가 있어요. 벽화·간판·계단 포인트가 많아 혼자도 사진 찍기 좋고, 조용한 골목 구간이 많아 혼자 여행 특유의 리듬이 잘 맞습니다. 오목대/한벽굴 라인과 연결하면 코스가 자연스럽게 이어져요.',
    honyeoTip:
      '해 질 무렵에 올라가면 노을+골목 조명이 예뻐요. 편한 신발 필수(언덕/계단 많음).',
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['jeonju']['jaman-mural-village'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-김지호',
    address: '전라북도 전주시 완산구 자만동 1-9',
    externalUrl:
      'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=1b9a3cf4-33d8-43f7-8d1a-8f3bb6406a44',
    tagSlugs: ['emotional', 'walking', 'hidden', 'oneday'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'omokdae',
    name: '오목대',
    summary: '한옥마을 지붕 라인 한눈에, 혼자 노을 멍 때리기',
    description:
      '짧게 올라가면 전망이 확 트여서 “기분 전환”이 바로 됩니다. 한옥마을 지붕이 겹쳐 보이는 뷰가 예뻐 사진 포인트로도 인기예요. 사람이 몰리는 시간대만 피하면 혼자 앉아 쉬기 좋은 편이고, 근처 자만벽화마을·한벽굴과 연결해서 걷기 좋습니다.',
    honyeoTip:
      '일몰 30~40분 전에 도착하면 빛이 제일 예뻐요. 바람이 불 수 있으니 얇은 겉옷 챙기면 좋아요.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeonju']['omokdae'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-디엔에이스튜디오',
    address: '전라북도 전주시 완산구 기린대로 55',
    externalUrl:
      'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=da4f6fe8-37b9-4b6b-9c21-6f51fbc3e8d1',
    tagSlugs: ['nightview', 'walking', 'healing', 'thinking'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'gaekridan-gil',
    name: '객리단길',
    summary: '전주 핫플 밀집, 혼자도 자연스러운 카페·바 거리',
    description:
      '객사 인근 골목에 카페·편집샵·소규모 바가 모여 있어요. 혼자 걸으며 구경하기 좋은 스케일이라 “가벼운 밤 산책” 코스로도 인기. 사진 찍기 좋은 간판/골목 감성이 많고, 맛집 회전도 빨라 혼밥 동선도 만들기 쉬워요. 주말 저녁은 붐빌 수 있지만 평일엔 혼자 여행자에게 딱 좋은 분위기입니다.',
    honyeoTip:
      '혼자라면 평일 3~6시쯤 “카페 1 + 소품샵 1 + 저녁 혼밥”으로 끊어가면 만족도가 높아요.',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['jeonju']['gaekridan-gil'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사',
    address: '전라북도 전주시 완산구 전라중앙로 20 일대',
    externalUrl:
      'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=8dfe5b95-c9c1-4c8b-8e61-15bdfd2b9c5a',
    tagSlugs: ['cafe', 'emotional', 'shopping', 'solo-drinking'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'jeondong-cathedral',
    name: '전동성당',
    summary: '벽돌 성당 한 컷, 한옥마을 옆에서 만나는 영화 같은 풍경',
    description:
      '한옥마을 바로 옆이라 “잠깐 들르기”가 가능한 대표 포토 스팟이에요. 벽돌 외관과 광장 구도가 예뻐 혼자 찍어도 결과물이 잘 나오는 편. 낮에는 밝고, 해 질 무렵엔 분위기가 차분해져 산책 코스로 좋아요. 경기전·풍남문·남부시장까지 도보로 이어집니다.',
    honyeoTip:
      '사람 많은 시간대엔 광장 바깥쪽에서 구도 잡으면 덜 부담돼요. 성당-풍남문-남부시장 라인으로 이어가면 동선이 깔끔합니다.',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['jeonju']['jeondong-cathedral'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-김찬영',
    address: '전라북도 전주시 완산구 태조로 51',
    externalUrl:
      'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=1f13d1f9-3a23-42f6-aabc-9a93e64f47c6',
    tagSlugs: ['culture', 'emotional', 'walking', 'oneday'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'pungnammun-gate',
    name: '전주 풍남문',
    summary: '도심 한복판 성문, 야경 산책에 포인트가 되는 곳',
    description:
      '전주 시내 중심 동선에서 “지나가다 들르기” 좋은 랜드마크예요. 성문 주변이 비교적 개방적이라 혼자 사진 찍고 잠깐 쉬기에도 무난합니다. 남부시장·한옥마을과 붙어 있어 낮/밤 산책 코스에 자연스럽게 들어가요. 근처에 간식/카페/시장 먹거리가 많아 동선 설계가 쉬운 편입니다.',
    honyeoTip:
      '해 질 무렵에 성문 주변 조명 들어올 때가 예뻐요. “풍남문 → 남부시장 야시장(시즌) → 객리단길”로 저녁 코스 추천.',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['jeonju']['pungnammun-gate'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-황성훈',
    address: '전라북도 전주시 완산구 풍남문3길 1',
    externalUrl:
      'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=cc64522e-4796-44b0-91b2-2816ab8c99bc',
    tagSlugs: ['walking', 'nightview', 'oneday', 'culture'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'hanbyeokdang-pavilion',
    name: '한벽당',
    summary: '전주 8경 감성, 강바람 맞으며 혼자 쉬기 좋은 정자',
    description:
      '전주천을 내려다보는 정자 뷰가 좋아 “멍 때리기”에 잘 맞아요. 자만벽화마을/한벽굴 라인과 연결하면 산책 코스가 자연스럽고, 사람이 몰리는 타이밍만 피하면 혼자 앉아 쉬기에도 충분히 여유가 있습니다. 노을 시간대엔 빛이 예뻐 사진도 잘 나와요.',
    honyeoTip:
      '간단 간식/물 챙겨 가서 10~20분만 앉아도 컨디션이 확 올라가요. 바람 대비 겉옷 추천.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeonju']['hanbyeokdang-pavilion'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이범수',
    address: '전라북도 전주시 완산구 기린대로 2',
    externalUrl:
      'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=96d9a09f-44f5-419c-ad0d-f547adc21cb3',
    tagSlugs: ['healing', 'walking', 'thinking', 'nightview'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'jeonjucheon-river',
    name: '전주천',
    summary: '물길 따라 걷는 힐링, 혼자 걷기 딱 좋은 전주 산책길',
    description:
      '산책로/자전거길이 잘 되어 있어 혼자 걷거나 달리기 좋아요. 계절마다 벚꽃·억새·물빛 분위기가 달라 “같은 길도 다른 느낌”이 납니다. 한옥마을 근처 구간은 관광 동선과 연결돼 코스 짜기 쉽고, 중간중간 벤치가 있어 혼자 쉬며 머물기에도 편합니다.',
    honyeoTip:
      '해 질 무렵에 걸으면 빛이 예쁘고 사람도 덜 붐벼요. “한옥마을 → 한벽굴 → 전주천 산책” 코스가 특히 자연스럽습니다.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeonju']['jeonjucheon-river'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이범수',
    address: '전라북도 전주시 일대(전주천 산책로)',
    externalUrl:
      'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=cd882adb-b02d-48bd-967f-364b80236822',
    tagSlugs: ['walking', 'healing', 'nature', 'stress-relief'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'jeonju-nambu-market',
    name: '전주 남부시장',
    summary: '시장 먹거리 투어, 혼자도 부담 없이 즐기는 전주 로컬 코스',
    description:
      '먹거리·반찬·간식 라인이 많아 혼자 한 바퀴 돌기 좋아요. 가격대 선택지가 넓어서 혼자 여행 예산에 맞춰 조절하기 쉽고, 한옥마을/풍남문과 가까워 “산책 + 시장 간식” 동선이 깔끔합니다. 시간대/요일에 따라 야시장 분위기도 즐길 수 있어요.',
    honyeoTip:
      '혼자라면 “한두 가지 간식만” 가볍게 잡고, 카페로 마무리하면 과식 없이 딱 좋아요. 붐비는 시간엔 현금/간편결제 준비해두면 편합니다.',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['jeonju']['jeonju-nambu-market'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-니오타니스튜디오',
    address: '전라북도 전주시 완산구 풍남문1길 19-3',
    externalUrl:
      'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=89fb2c76-9eee-438a-a611-604625c0db82',
    tagSlugs: ['solo-eating', 'walking', 'shopping', 'oneday'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'jeonju-film-street',
    name: '전주 영화의 거리(객사길 일대)',
    summary: '감성 간판과 골목 불빛, 혼자 저녁 산책하기 좋은 번화가',
    description:
      '객사길과 이어지는 번화가 구역이라 혼자 걷기에도 안전한 편이에요. 카페/맛집/영화관이 가까이 있어 “혼자 시간 보내기” 동선이 탄탄합니다. 전주국제영화제 시즌엔 분위기가 더 살아나 구경하는 재미가 있고, 저녁에 간판 불빛이 예뻐 사진도 잘 나옵니다.',
    honyeoTip:
      '혼자라면 “카페 1 → 영화 1편 → 가벼운 저녁”으로 코스 짜기 좋아요. 주말 밤은 붐비니 평일 추천.',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['jeonju']['jeonju-film-street'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-조영권',
    address: '전북 전주시 완산구 전주객사3길 22',
    externalUrl:
      'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=66e59fac-ef46-42b9-9a7d-1427c4f2074e',
    tagSlugs: ['culture', 'walking', 'nightview', 'oneday'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'korean-traditional-culture-center',
    name: '한국전통문화전당',
    summary: '전통+전시+체험, 혼자 가도 채워지는 문화 시간',
    description:
      '전통문화 관련 전시/체험/프로그램이 있어 혼자 방문해도 볼거리가 있어요. 실내 동선이라 날씨 영향이 적고, 한옥마을/구도심 코스에 붙이기 좋습니다. 전통 공예/한지/한복 관련 콘텐츠를 “가볍게 찍먹”하기에도 괜찮고, 관람 후 근처 카페/시장으로 이어가기 쉬운 위치입니다.',
    honyeoTip:
      '혼자라면 “전시 1개 + 주변 산책”으로 짧게 끊어도 만족도가 높아요. 프로그램 운영 여부는 방문 전 공지 확인 추천.',
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['jeonju']['korean-traditional-culture-center'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사',
    address: '전라북도 전주시 완산구 현무1길 20',
    externalUrl:
      'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=bc6e8832-ab74-46c5-9c06-7e73f69222cf',
    tagSlugs: ['culture', 'thinking', 'oneday', 'emotional'],
  },

  // 2) FOOD

  {
    regionSlug: 'jeonju',
    slug: 'veteran-kalguksu',
    name: '베테랑칼국수',
    summary: '회전 빠른 칼국수, 혼자 한 끼 해결하기 딱',
    description:
      '한옥마을 근처에서 “혼밥 난이도 낮은” 대표 칼국수집이에요. 주문-서빙-식사 흐름이 빠르고 메뉴가 단순해서 혼자 들어가도 부담이 적습니다. 피크 시간엔 대기가 생기지만 회전이 빨라 기다림이 짧은 편이고, 식사 후 한옥마을 산책 코스로 바로 이어가기 좋아요.',
    honyeoTip:
      '혼자라면 점심 피크(12~1시)만 피하면 훨씬 편해요. “한옥마을 산책 → 칼국수 → 카페”로 이어가면 안정적인 코스입니다.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '전라북도 전주시 완산구 경기전길 135',
    externalUrl: 'https://place.map.kakao.com/15482458',
    tagSlugs: ['solo-eating', 'culture', 'oneday'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'hyundaiok',
    name: '현대옥 전주본점',
    summary: '콩나물국밥 한 그릇, 혼자 먹기 가장 쉬운 전주 아침',
    description:
      '콩나물국밥은 혼자 먹기 좋은 메뉴라 혼여와 궁합이 좋아요. 매장 회전이 빠르고 혼자 방문 후기/수요가 많아 혼밥이 자연스럽습니다. 아침 시간대에 특히 잘 맞고, 한옥마을·시장 동선과 연결하기도 쉬워요. 짧게 먹고 이동하기 좋은 “원샷 한 끼” 타입입니다.',
    honyeoTip:
      '혼자라면 아침 8~10시대가 가장 편해요. 일정 시작 전에 한 그릇 먹고, 바로 한옥마을 산책으로 이어가면 동선이 깔끔합니다.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '전라북도 전주시 완산구 풍남문2길 63',
    externalUrl: 'https://place.map.kakao.com/8153907',
    tagSlugs: ['solo-eating', 'culture', 'oneday'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'gyodong-tteokgalbi',
    name: '교동떡갈비',
    summary: '한옥마을 근처 든든한 한 끼, 1인도 가능한 떡갈비',
    description:
      '한옥마을 근처라 이동이 편하고, 관광 동선에 넣기 쉬운 식당이에요. 1인 메뉴 선택이 가능해 혼자도 부담이 적고, 밥+반찬 구성이라 “든든하게 먹고 걷기” 코스에 잘 맞습니다. 피크 시간엔 붐빌 수 있어 시간대를 조금 비워두는 게 좋아요.',
    honyeoTip:
      '혼자라면 11시대/3시대가 비교적 편해요. 식사 후 경기전·전동성당 쪽으로 걸어서 소화 코스 추천.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '전라북도 전주시 완산구 은행로 57',
    externalUrl: 'https://place.map.kakao.com/12307116',
    tagSlugs: ['solo-eating', 'oneday', 'walking'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'geumam-myeonok',
    name: '금암면옥',
    summary: '객리단길 근처 든든한 한 끼, 혼자도 무난한 분위기',
    description:
      '객리단길(객사) 근처라 동선이 좋아요. 식사 후 영화의 거리/객리단길 산책으로 바로 이어갈 수 있어요.',
    honyeoTip:
      '혼자라면 이른 오전 타이밍이 가장 편해요. 주변이 번화가라 식사 후 산책 코스로 이어가기 좋아요.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '전북특별자치도 전주시 완산구 전주객사4길 47',
    externalUrl: 'https://place.map.kakao.com/27108024',
    tagSlugs: ['solo-eating', 'walking', 'oneday'],
  },

  // 3) CAFE

  {
    regionSlug: 'jeonju',
    slug: 'peace-and-peace',
    name: '평화와 평화',
    summary: '넓고 쾌적한 감성 카페, 혼자 오래 앉아도 어색하지 않게',
    description:
      '좌석이 많아 혼자도 자리 잡기 비교적 편한 타입의 카페예요. 내부가 넓어 시선 스트레스가 덜하고, 천천히 대화 소음도 안정적인 편. 객사/구도심 동선과 가까워 산책 후 쉬어가기 좋고, 혼자 와서 커피 마시며 쉬는 손님이 많다는 후기가 꾸준합니다.',
    honyeoTip:
      '혼자라면 2~5시 사이가 가장 쾌적해요. 커피 한 잔 후 영화의 거리 산책으로 이어가면 동선이 좋아요.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '전라북도 전주시 완산구 전라감영4길 16-7 3층',
    externalUrl: 'https://place.map.kakao.com/1851904708',
    tagSlugs: ['cafe', 'thinking', 'stress-relief', 'oneday'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'haengwon-hanok-cafe',
    name: '한옥카페 행원',
    summary: '마당 뷰 한옥카페, 혼자 조용히 쉬기 좋은 공간감',
    description:
      '한옥 구조라 창밖 풍경이 예쁘고, 마당이 보여서 분위기가 좋아요. 신발을 벗고 들어가는 좌석도 있어 “느리게 쉬는” 느낌이 잘 맞습니다. 한옥마을 근처 동선이라 산책 중 쉬어가기 좋고, 혼자 가도 공간 자체가 콘텐츠라 어색함이 덜한 편입니다.',
    honyeoTip:
      '혼자라면 창가/마당 보이는 자리로 가면 만족도가 확 올라가요. 주말엔 붐비니 평일 추천.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '전라북도 전주시 완산구 풍남문3길 12',
    externalUrl: 'https://place.map.kakao.com/8678642',
    tagSlugs: ['cafe', 'emotional', 'walking', 'healing'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'chagyeong-hanok-cafe',
    name: '한옥카페 차경',
    summary: '한옥 감성+디저트, 혼자도 안정적인 좌석 구성',
    description:
      '한옥 분위기 그대로라 사진이 잘 나오고, 내부 좌석도 비교적 다양한 편이에요. 음료/디저트로 쉬어가기 좋아 혼자 일정의 “중간 쉼표”로 잘 맞습니다. 경기전/한옥마을 동선에 붙이기 좋아 도보 이동이 편하고, 조용한 시간대엔 혼자 노트/사진 정리하기에도 괜찮아요.',
    honyeoTip:
      '혼자라면 오픈 직후 또는 저녁 전(4~6시) 방문이 좋아요. 한옥마을 산책 후 바로 붙이기 좋은 위치입니다.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '전라북도 전주시 완산구 경기전길 61',
    externalUrl: 'https://place.map.kakao.com/902174089',
    tagSlugs: ['cafe', 'emotional', 'culture', 'oneday'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'jeonju-view-cafe',
    name: '전망대카페',
    summary: '한옥마을 뷰로 쉬어가기, 혼자도 사진이 되는 카페',
    description:
      '전주 한옥마을 일대에서 “뷰가 좋다”는 후기가 많은 카페 타입이에요. 혼자 앉아 창밖 풍경 보며 쉬기 좋고, 사진도 안정적으로 나옵니다. 산책 중간에 붙이기 좋은 위치라 동선이 깔끔하고, 카페에서 쉬었다가 다시 골목 산책으로 이어가기 편해요.',
    honyeoTip:
      '혼자라면 자리 잡기 쉬운 평일 낮 추천. 음료 한 잔만 하고 “오목대/자만마을”로 이어가면 코스가 자연스러워요.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '전북특별자치도 전주시 완산구 어진길 15 3-7층',
    externalUrl: 'https://place.map.kakao.com/1595025887',
    tagSlugs: ['cafe', 'nightview', 'emotional', 'walking'],
  },

  // 4) DRINK (혼술/바)

  // NEW
  {
    regionSlug: 'jeonju',
    slug: 'deokgil-sanghoe',
    name: '덕길상회',
    summary: '레트로 감성에 위스키 한 잔, 혼자 와도 자연스러운 밤',
    description:
      '웨리단길 쪽에서 위스키/하이볼로 유명한 감성 술집이라는 리뷰가 많아요. 소품과 분위기가 확실해서 혼자 와도 “구경하다가 마시는” 흐름이 자연스럽고, 2차로 가볍게 한두 잔 하기 좋다는 후기가 보입니다. 한옥마을에서 도보권이라 밤 산책 동선에 붙이기 쉬워요.',
    honyeoTip:
      '혼술은 오픈 직후(초저녁)나 평일이 가장 편해요. 혼자라면 한 잔 + 가벼운 스낵 정도로 잡고, 주변 골목 산책으로 마무리하면 딱 좋습니다.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '전라북도 전주시 완산구 전라감영4길 16-4 1층',
    externalUrl: 'https://place.map.kakao.com/2038831371',
    tagSlugs: ['solo-drinking', 'emotional', 'thinking', 'nightview'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'blending-bar-jeonju',
    name: '블렌딩바 전주',
    summary: '낯선 밤도 편해지는 커뮤니티바, 혼술 입문에 좋은 곳',
    description:
      '전주에서 “혼술바”로 알려진 곳이라 1인 방문 후기와 혼자 와도 어색하지 않다는 평가가 많아요. 공간 톤이 차분하고 바 중심이라 혼자 앉아 마시기 좋은 구조라는 반응이 보이며, 대화/분위기 모두 부담이 덜한 편이라는 리뷰가 있습니다. 웨리단길 동선에 있어 2차로 붙이기도 좋아요.',
    honyeoTip:
      '혼자라면 바 자리로 앉는 게 가장 편해요. 첫 주문은 “달달/상큼/드라이” 취향만 말하면 추천받기 쉬워요.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '전라북도 전주시 완산구 전라감영4길 13-19',
    externalUrl: 'https://place.map.kakao.com/1660338397',
    tagSlugs: ['solo-drinking', 'emotional', 'stress-relief', 'thinking'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'blending-bar-music',
    name: '블렌딩바 뮤직',
    summary: '신청곡 틀어주는 뮤직바, 혼자 앉아도 심심하지 않게',
    description:
      '신청곡을 받아주는 콘셉트로 “혼자 가도 할 게 있다”는 후기가 있는 뮤직바 타입이에요. 바 형태라 1인 방문도 무난하고, 음악 때문에 분위기 전환이 잘 된다는 리뷰가 보입니다. 웨리단길 라인이라 덕길상회/블렌딩바와 묶어서 밤 동선 만들기 좋아요.',
    honyeoTip:
      '혼자라면 조용한 초저녁에 들어가서 신청곡 1~2개만 던져도 분위기가 살아나요. 귀가 동선(택시/버스) 먼저 체크해두면 마음이 편합니다.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '전라북도 전주시 완산구 전라감영4길 16-3',
    externalUrl: 'https://place.map.kakao.com/1784628761',
    tagSlugs: ['solo-drinking', 'emotional', 'nightview', 'stress-relief'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'chorochoro',
    name: '초로초로',
    summary: '일본 감성 이자카야, 바자리에서 조용히 한 잔',
    description:
      '객리단길 쪽 분위기 좋은 이자카야로, 일본 감성/음악/조도 덕분에 대화하기 편하다는 리뷰가 보입니다. 바테이블이 있어 혼자 앉아도 덜 어색하고, 맥주/사케에 간단 안주를 곁들이기 좋다는 후기가 많아요. 객사/영화의 거리 동선에 붙이기 좋아 저녁 코스로 깔끔합니다.',
    honyeoTip:
      '혼자라면 바자리 요청이 제일 편해요. 피크(8~10시)를 피하면 훨씬 조용해서 혼술 만족도가 올라갑니다.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '전라북도 전주시 완산구 전주객사2길 75 1층',
    externalUrl: 'https://place.map.kakao.com/1746531640',
    tagSlugs: ['solo-drinking', 'emotional', 'oneday', 'stress-relief'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'so-eum',
    name: '소음',
    summary: '안주 맛으로 유명한 요리주점, 혼자도 가능한 바자리 무드',
    description:
      '객사 쪽 요리주점으로 안주 만족도가 높다는 리뷰가 많고, 깔끔한 분위기라는 평가가 보입니다. 바자리/예약 가능 등 운영 편의가 언급되며, 1~2인 방문도 흔한 편이라 혼자 가도 크게 부담이 덜한 타입이에요. 번화가라 늦은 시간에도 동선이 비교적 안정적입니다.',
    honyeoTip:
      '혼자라면 “안주 1 + 술 1~2잔”으로 딱 끊는 게 좋아요. 주말엔 붐빌 수 있으니 평일/이른 시간 방문 추천.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '전라북도 전주시 완산구 전주객사3길 12-29 2층',
    externalUrl:
      'https://m.map.kakao.com/actions/searchView?q=%EC%86%8C%EC%9D%8C&wxEnc=MLOSLOHR&wyEnc=NSRRUOHR&lvl=2',
    tagSlugs: ['solo-drinking', 'stress-relief', 'oneday', 'emotional'],
  },
];
