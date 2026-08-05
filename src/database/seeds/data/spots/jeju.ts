import { ImageSource } from 'src/infrastructure/media/enums/image-source.enum';
import { SpotCategory } from 'src/modules/spots/enums/spot-category.enum';
import imageMap from '../../image-map.json';
import type { SpotSeedData } from './index';

export const jejuSpots: SpotSeedData[] = [
  // 1) NATURE / ACTIVITY / ETC

  {
    regionSlug: 'jeju',
    slug: 'seongsan-ilchulbong',
    name: '성산일출봉',
    summary: '제주 동쪽 대표 일출 명소, 혼자 등반+바다 전망 코스로 최고',
    description: `정상까지 이어지는 계단과 나무데크가 잘 정비되어 있어 길을 헤맬 일이 거의 없어요. 주차장에서 출발해 20~30분 정도 천천히 올라가면 웅장한 분화구와 푸른 바다가 한눈에 들어옵니다.

오르는 동안 뒤를 돌아보면 성산 마을과 해안선이 한 프레임에 담겨 사진 찍는 재미가 쏠쏠해요. 해 뜰 무렵엔 사람이 많지만 일방향 동선이라 혼자 움직여도 흐름이 끊기지 않습니다.

날씨가 좋을 때는 화산지형과 초록빛 풀밭이 대비되어 자연이 만들어낸 경이로움을 느낄 수 있습니다.`,
    honyeoTip: `• 일출을 노린다면 해 뜨기 30분쯤 전에 도착해 여유 있게 올라가야 포토스팟에서 기다리는 시간을 줄일 수 있어요.
• 바람이 매서운 날이 많으니 가벼운 겉옷과 장갑을 꼭 챙기세요.
• 내려온 뒤에는 성산항이나 섭지코지로 이동해 동쪽 코스를 이어가면 하루 일정이 자연스럽게 이어집니다.`,
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['seongsan-ilchulbong'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-황성훈',
    address: '제주특별자치도 서귀포시 성산읍 일출로 284-12',
    lat: 33.462233758483,
    lng: 126.936800689963,
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=2c7347c4-c36e-4575-8096-04a4df7c0953',
    tagSlugs: ['sea', 'walking', 'thinking', 'oneday'],
  },
  {
    regionSlug: 'jeju',
    slug: 'seopjikoji',
    name: '섭지코지',
    summary: '해안 절경 산책로, 혼자 걷기 좋은 바다 감성 코스',
    description: `완만한 해안길과 언덕길이 자연스럽게 이어져 동선을 고민할 필요가 없고, 등대와 초원, 현무암 해안이 연달아 나타나 걸음마다 풍경이 바뀝니다.

파도가 부서지는 소리를 들으며 천천히 걷다 보면 사진 찍기 좋은 포인트가 많아 혼자서도 삼각대를 세워 촬영하기 수월해요. 주변에는 카페와 식당들이 가까워 산책 후 잠시 쉬어 가기에도 좋습니다.

성산일출봉과 묶어 하루 코스로 엮기에 동선이 매우 효율적이며, 바람이 강한 날이 잦으므로 후드가 있는 겉옷을 챙기면 더 편안합니다.`,
    honyeoTip: `• 노을을 보고 싶다면 해 지기 한 시간 전부터 천천히 걸으며 전망대를 향해 올라가세요.
• 사람 많은 시간을 피하려면 평일 오후나 오전에 방문하는 것이 가장 한적합니다.
• 산책을 마친 뒤에는 인근 카페에서 따뜻한 음료를 마시며 여유를 즐기는 것을 추천해요.`,
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['seopjikoji'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-박자양',
    address: '제주특별자치도 서귀포시 성산읍 섭지코지로 107',
    lat: 33.4260423785235,
    lng: 126.926442688389,
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=c2125cd6-ed53-430f-b6be-4f04a8b4a032',
    tagSlugs: ['sea', 'walking', 'emotional', 'healing'],
  },

  {
    regionSlug: 'jeju',
    slug: 'hamdeok-beach',
    name: '함덕해수욕장',
    summary: '에메랄드빛 바다 산책, 혼자 걷고 카페 들르기 좋은 대표 해변',
    description: `모래사장과 얕은 바다가 길게 펼쳐져 있어 혼자 걸으며 멍하니 바라보기 좋고 곳곳에 잔디밭과 야자수가 있어 앉아 쉬기 편합니다.

바다 색이 에메랄드빛에서 딥블루까지 차례로 변해 시간마다 다른 풍경을 보여주며, 해변과 연결된 산책길과 카페거리가 잘 조성되어 있어 동선을 고민할 필요가 없습니다.

초행자라도 혼자서 사진 찍기 좋은 벤치와 계단 포인트가 많으며, 서우봉 방향으로 걸어가면 비교적 한적한 구간이 나오니 중심부가 붐빌 때 피하기 좋습니다.`,
    honyeoTip: `• 사람이 많을 땐 해변 중앙을 피해 서우봉 쪽으로 이동하면 여유를 즐길 수 있어요.
• “바다 산책 → 카페에서 한숨 돌리기 → 노을 감상” 순서로 하루를 짜면 혼자서도 풍성한 시간을 보낼 수 있습니다.
• 카페 델문도 주변 테라스 자리가 명당이니 자리가 보이면 바로 선점하세요.`,
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['hamdeok-beach'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이범수',
    address: '제주특별자치도 제주시 조천읍 조함해안로 525',
    lat: 33.5428267548889,
    lng: 126.670510321052,
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=699e7a37-b06a-448e-a7bb-ccdd7517f87a',
    tagSlugs: ['sea', 'walking', 'healing', 'cafe'],
  },

  {
    regionSlug: 'jeju',
    slug: 'hyeopjae-beach',
    name: '협재해수욕장',
    summary: '얕은 수심+석양 맛집, 혼자 바다멍하기 좋은 서쪽 대표 해변',
    description: `수심이 얕고 물빛이 맑아 낮에도 바다의 여러 색을 감상할 수 있고, 해가 기울 때는 하늘과 바다가 황금빛으로 물들어 멋진 노을을 선사합니다.

파도가 잔잔하게 밀려와 산책 중에도 마음이 차분해지고 주변에는 해변을 조망할 수 있는 카페들이 많아 창가에 앉아 시간을 보내기 좋습니다.

한적하게 앉아 멍 때릴 수 있는 바위와 벤치가 있어 혼자 방문해도 눈치를 볼 필요가 없으며, 서쪽 드라이브 코스 중간에 위치해 다른 명소와 묶기 좋습니다.`,
    honyeoTip: `• 노을 시간대는 인기가 많으니 석양 40분 전쯤 도착해 해변 끝까지 걸은 뒤 되돌아오며 노을을 감상하세요.
• 바닷바람이 생각보다 차가울 수 있으니 가벼운 겉옷을 꼭 챙기세요.
• 해변 산책 후 근처의 감성 식당이나 카페로 이동해 하루를 마무리하면 완벽합니다.`,
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['hyeopjae-beach'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-천건엽',
    address: '제주특별자치도 제주시 한림읍 한림로 329-10',
    lat: 33.393748028429,
    lng: 126.239431893466,
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=52e504c8-1706-46ca-bd4b-04eb9120e91a',
    tagSlugs: ['sea', 'walking', 'healing', 'nightview'],
  },

  {
    regionSlug: 'jeju',
    slug: 'saryeoni-forest-path',
    name: '사려니숲길',
    summary: '울창한 숲길 힐링, 혼자 걸으며 리프레시/생각정리에 딱',
    description: `붉은오름 입구에서 시작해 비자림로까지 이어지는 울창한 숲길은 빽빽한 삼나무 사이로 맑고 시원한 공기가 감돕니다.

초반 구간에서는 방문객이 많지만 조금 더 들어가면 숲 전체를 전세 낸 듯 고요함을 즐길 수 있어 혼자 걷기에 아주 좋습니다. 중간중간 설치된 이정표를 따라가면 길을 잃을 걱정이 없어요.

입장료가 없고 길이 완만해 운동화만 챙기면 누구나 도전할 수 있으며, 비 온 다음 날에는 숲 향기가 더 짙어져 힐링 효과가 배가됩니다.`,
    honyeoTip: `• 버스 시간표를 미리 확인하고 붉은오름 방향에서 시작하면 완주 후 교통편을 이용하기 수월해요.
• 비가 온 뒤에는 길이 미끄러울 수 있으니 미끄럼 방지 운동화를 꼭 신으세요.
• 이어폰 볼륨을 낮추고 숲이 들려주는 새소리와 바람 소리에 귀를 기울여보세요.`,
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['saryeoni-forest-path'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이명일',
    address: '제주특별자치도 제주시 조천읍 교래리 719-10',
    lat: 33.4272549268897,
    lng: 126.661749005986,
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=716dcc75-7ea7-45c8-b20c-67594101a86e',
    tagSlugs: ['nature', 'walking', 'healing', 'thinking'],
  },

  {
    regionSlug: 'jeju',
    slug: 'bijarim-forest',
    name: '비자림',
    summary: '비자나무 숲 산책, 혼자 천천히 걷기 좋은 “초록 힐링” 코스',
    description: `수백 년 된 비자나무가 울창하게 뻗어 있는 숲길로, 무장애 코스와 오솔길 코스 두 가지가 있어 체력에 맞게 선택할 수 있습니다.

비 온 뒤에는 촉촉한 공기와 짙은 나무 향 덕분에 숲이 더욱 초록빛으로 빛나고, 산책로가 잘 정비되어 안전하게 걷기 좋습니다.

이른 아침에 방문하면 거의 사람이 없어 혼자 조용히 걸으며 생각을 정리하기에 최적이지만, 시간이 지나면 단체 관광객이 몰리니 피크 타임을 피하는 것이 좋습니다.`,
    honyeoTip: `• 입구 주변이 붐빌 땐 안쪽 오솔길로 들어가면 훨씬 조용한 분위기를 즐길 수 있어요.
• 60~90분 정도 여유 있게 시간을 잡고 중간중간 벤치에 앉아 숲 향기를 느껴보세요.
• 비자림 관람 후 근처의 조용한 구좌읍 카페들과 연계하면 동선이 매끄럽습니다.`,
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['bijarim-forest'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이정수',
    address: '제주특별자치도 제주시 구좌읍 비자숲길 55',
    lat: 33.4910972819998,
    lng: 126.811461205688,
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=33c37895-6fb2-498a-96e0-2204fab24533',
    tagSlugs: ['nature', 'walking', 'healing', 'stress-relief'],
  },

  {
    regionSlug: 'jeju',
    slug: 'manjanggul-cave',
    name: '만장굴',
    summary: '용암동굴 자연유산, 혼자도 쉽게 즐기는 “시원한” 원데이 코스',
    description: `만장굴은 용암이 흘러 형성된 거대한 동굴로 사계절 내내 서늘해 더운 여름날에도 쾌적하게 관람할 수 있습니다.

내부는 일방향으로 조성되어 동선이 명확하며, 용암 석주와 터널 등을 가까이에서 볼 수 있어 신비로운 경험을 선사합니다.

내부 조명이 은은해 신비롭지만 바닥에 물기가 있는 구간이 많으므로 발밑을 주의하며 걸어야 합니다. 동쪽의 성산일출봉이나 비자림과 묶어 하루 일정으로 다녀오기에 좋습니다.`,
    honyeoTip: `• 바닥이 젖어 미끄러운 곳이 많으므로 굽이 없는 운동화를 신고 입장하세요.
• 동굴 내부 온도가 낮으니 여름에도 얇은 바람막이 등 겉옷을 하나 챙기는 게 좋습니다.
• 조용히 자연의 경이로움을 관찰하며 걷다가 나와서 근처 숲길에서 햇볕을 쬐며 몸을 풀어보세요.`,
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['manjanggul-cave'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이범수',
    address: '제주특별자치도 제주시 구좌읍 만장굴길 182',
    lat: 33.5283774190136,
    lng: 126.771615754394,
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=048a397c-65cd-4d37-bb8c-e4a2cae4e949',
    tagSlugs: ['nature', 'culture', 'oneday', 'hidden'],
  },

  {
    regionSlug: 'jeju',
    slug: 'yongnuni-oreum',
    name: '용눈이오름',
    summary: '부드러운 능선 뷰 맛집, 혼자 트레킹+사진 남기기 좋은 오름',
    description: `용눈이오름은 완만한 능선이 이어지는 오름으로 정상을 향하는 길이 단순해 초보 트레커도 쉽게 오를 수 있습니다.

능선을 따라 걷는 동안 바람과 하늘, 초지가 어우러진 감성적인 풍경이 펼쳐져 혼자서 사진을 남기기에도 더할 나위 없이 좋습니다.

정상에서는 성산일출봉과 우도까지 시야가 탁 트여 시원한 개방감을 줍니다. 바람이 강한 날이 많으니 바람막이를 챙기면 좋고, 드라이브 중 가볍게 들르기 좋은 위치에 있습니다.`,
    honyeoTip: `• 무리하지 않고 천천히 한 바퀴 돌아보는 코스를 추천해요. 약 60분 정도면 충분합니다.
• 중간중간 멈춰 서서 능선의 부드러운 곡선을 배경으로 사진을 남겨보세요.
• 지정된 탐방로를 따라 이동하며 제주 오름의 정취를 만끽하시길 바랍니다.`,
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['yongnuni-oreum'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-우창민',
    address: '제주특별자치도 제주시 구좌읍 종달리 28',
    lat: 33.5056066803762,
    lng: 126.912061000058,
    externalUrl:
      'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=5429c4dc-e53a-4f15-a02d-061927bdf791',
    tagSlugs: ['mountain', 'walking', 'emotional', 'oneday'],
  },

  {
    regionSlug: 'jeju',
    slug: 'camellia-hill',
    name: '카멜리아힐',
    summary: '사계절 정원 산책+감성 사진, 혼자 가도 즐길 거리 많은 수목원',
    description: `계절마다 다른 꽃들이 피어나는 수목원으로 동선이 잘 정리되어 있어 혼자 산책하기 매우 좋습니다.

테마별로 조성된 정원과 포토존이 곳곳에 배치되어 있어 사진 찍는 재미가 있고, 중간에 쉴 수 있는 벤치와 카페가 있어 혼자 머무는 시간이 자연스럽게 길어집니다.

동백꽃 시즌에는 인기가 많아 붐비지만 그 외 시즌에는 한적하게 산책을 즐길 수 있어 서쪽 일정에 포함하기 좋습니다.`,
    honyeoTip: `• 붐비지 않는 평일 오전에 방문하면 포토존 줄을 서지 않고 여유롭게 촬영할 수 있어요.
• 동백 시즌엔 오픈 직후 입장해 빠르게 한 바퀴 둘러본 뒤 조용한 구간에서 머무르세요.
• 산책 후 근처의 안덕면이나 협재 방향 해변으로 이동하면 하루가 알차게 채워집니다.`,
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['camellia-hill'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이범수',
    address: '제주특별자치도 서귀포시 안덕면 병악로 166',
    lat: 33.290140185764,
    lng: 126.368365225196,
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=173bc002-7eb9-4c60-bea4-cc89e7a96c86',
    tagSlugs: ['healing', 'emotional', 'walking', 'oneday'],
  },

  {
    regionSlug: 'jeju',
    slug: 'handam-coastal-walk',
    name: '한담해안산책로',
    summary: '애월 바다 옆 산책로, 혼자 걷고 카페 들르기 좋은 20~30 핫코스',
    description: `애월 해안에 자리한 산책로로 바다와 거의 맞닿아 있어 걷는 내내 시원한 파도 소리를 가까이서 들을 수 있습니다.

산책로가 길지 않고 동선이 명확해 잠시 들렀다 가기 좋으며, 현무암 바위와 해안선이 만들어내는 풍경이 일품입니다.

주변에 개성 있는 카페와 맛집이 많아 “걷고 쉬고 먹는” 루틴을 자연스럽게 만들 수 있으며, 일몰 무렵의 붉은 노을은 놓치기 아까운 장면입니다.`,
    honyeoTip: `• 일몰 한 시간 전부터 산책을 시작해 여유 있게 노을을 즐겨보세요.
• 산책 후 가까운 카페 창가 자리에서 바다를 바라보며 커피 한 잔의 여유를 즐기시길 권합니다.
• 주말에는 주차가 매우 어려우니 가급적 대중교통이나 이른 시간 방문을 추천해요.`,
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['handam-coastal-walk'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-김계호',
    address: '제주특별자치도 제주시 애월읍 곽지리 1359',
    lat: 33.4590846763959,
    lng: 126.310575628004,
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=630a663c-738b-430f-b60f-0c23a766b1df',
    tagSlugs: ['sea', 'walking', 'emotional', 'healing'],
  },

  {
    regionSlug: 'jeju',
    slug: 'dongmun-traditional-market',
    name: '동문재래시장',
    summary: '제주 원도심 쇼핑+간식, 혼자 구경하며 먹기 좋은 시장',
    description: `제주 원도심 중심에 위치해 접근성이 좋으며 과일, 수산물, 기념품 등 다양한 상점들이 빼곡히 들어서 있습니다.

좁은 골목을 따라 천천히 걸으며 소소한 간식들을 조금씩 맛보기 좋아 혼자서도 심심할 틈이 없습니다. 밤이 되면 야시장으로 변신해 더욱 활기찬 분위기를 자아내요.

인근 산지천과 관덕정 일대와도 가까워 시장 방문 후 제주 시내 도시 산책으로 이어가기에 가장 좋은 거점입니다.`,
    honyeoTip: `• 한가로운 분위기를 선호한다면 야시장이 열리기 전인 평일 늦은 오후에 방문하세요.
• 먹거리는 욕심내기보다 평판 좋은 한두 가지를 골라 집중하는 게 대기 스트레스가 적어요.
• 시장을 나와 산지천 산책로를 따라 가볍게 걸으며 소화시키는 코스를 추천합니다.`,
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['dongmun-traditional-market'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-김지호',
    address: '제주특별자치도 제주시 관덕로14길 20',
    lat: 33.5115902822492,
    lng: 126.526018218964,
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=4d1ef8c2-ce76-450a-87b0-b9b0e917d95c',
    tagSlugs: ['shopping', 'culture', 'solo-eating', 'oneday'],
  },

  {
    regionSlug: 'jeju',
    slug: 'udo-seobinbaeksa',
    name: '우도 산호해변(서빈백사)',
    summary: '산호모래 해변 감성 끝판왕, 혼자 우도 원데이 코스로 강추',
    description: `우도에 위치한 서빈백사는 산호가 부서진 하얀 모래와 투명한 물빛이 조화를 이루어 이국적인 풍경을 보여줍니다.

널찍한 백사장 덕분에 혼자 걸으며 바다를 감상하기 좋고, 주변에 우도 땅콩 아이스크림 등 특색 있는 간식을 파는 가게들이 많습니다.

우도를 둘러보는 여정의 핵심 지점이며, 바다색이 워낙 선명해 날씨가 조금 흐려도 충분히 아름답습니다. 잔잔한 파도에 발을 담그며 멍 때리기에 최적의 장소입니다.`,
    honyeoTip: `• 아침 첫 배를 타고 들어와 서빈백사를 먼저 보고 우도 한 바퀴를 도는 일정이 가장 여유로워요.
• 배 시간표를 사진 찍어두어 나가는 배를 놓치지 않도록 시간을 미리 체크하세요.
• 해변에서 시간을 보내다 보면 알림을 놓칠 수 있으니 여유 있게 항구로 이동하는 게 좋습니다.`,
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['udo-seobinbaeksa'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이범수',
    address: '제주특별자치도 제주시 우도면 우도해안길 252',
    lat: 33.5026665933324,
    lng: 126.94374024047,
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
    description: `제주공항과 매우 가까워 제주를 떠나기 전이나 도착 직후 잠시 들르기 좋은 해안 명소입니다.

용의 머리를 닮은 바위가 거친 파도와 어우러지는 풍경이 인상적이며, 짧은 산책로가 잘 조성되어 있어 혼자 걷기에 부담이 없습니다.

해안도로를 따라 이어지는 산책길과 근처 카페들 덕분에 짧은 방문 후에도 일정을 확장하기 좋습니다. 낮의 시원한 바다 뷰도 좋지만 해 질 녘의 노을도 아름답습니다.`,
    honyeoTip: `• 바람이 세차게 부는 날에는 안전을 위해 난간 안쪽에서만 촬영하세요.
• “용두암 → 용연 구름다리 → 원도심 관덕정” 순으로 동선을 잡으면 짧은 시간에 제주 시내를 두루 둘러볼 수 있습니다.
• 주차장에서 바위까지 매우 가까워 20~30분이면 충분히 구경할 수 있어요.`,
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['yongduam-rock'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이범수',
    address: '제주특별자치도 제주시 용두암길 15',
    lat: 33.5148035919525,
    lng: 126.511798046978,
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=180b1d63-a40b-4d0f-8fc3-5bd37dd70701',
    tagSlugs: ['sea', 'walking', 'emotional', 'oneday'],
  },

  {
    regionSlug: 'jeju',
    slug: 'iho-taewoo-beach',
    name: '이호테우해변',
    summary:
      '말등대와 노을이 예쁜 해변, 혼자 산책+사진 남기기 좋은 공항 근처 코스',
    description: `이호테우해변은 말 모양의 독특한 등대로 유명한 제주의 포토 포인트입니다.

넓게 트인 백사장과 잔잔한 파도 덕분에 혼자 걸으며 여유를 느끼기에 아주 좋습니다. 특히 해 질 무렵 붉게 물드는 석양은 제주 여행의 낭만을 더해줍니다.

공항과 가까워 여행의 시작이나 마무리에 편하게 들를 수 있으며, 석양 후 보랏빛으로 변하는 하늘의 여운을 즐기기 위해 늦은 오후 방문을 추천합니다.`,
    honyeoTip: `• 일몰 1시간 전부터 등대 방향으로 산책하며 최고의 사진 각도를 찾아보세요.
• 해가 진 뒤엔 바닷바람이 급격히 차가워지니 걸칠 옷을 꼭 챙기세요.
• 등대 앞에서 사진을 찍은 후 주변 해안도로 카페에서 따뜻한 차 한 잔으로 몸을 녹이면 좋습니다.`,
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['iho-taewoo-beach'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이범수',
    address: '제주특별자치도 제주시 이호일동 1665-13',
    lat: 33.4974714026006,
    lng: 126.452982388818,
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=d1577f5a-cc1f-4990-a61d-f0f6d0071b0e',
    tagSlugs: ['sea', 'nightview', 'walking', 'healing'],
  },

  {
    regionSlug: 'jeju',
    slug: 'yongmeori-coast',
    name: '용머리해안',
    summary:
      '파도와 현무암 절벽이 만드는 제주 감성, 혼자도 사진 찍기 좋은 해안 코스',
    description: `오랜 세월 파도에 깎여 만들어진 독특한 현무암 지형이 끝없이 이어지는 자연 스튜디오 같은 곳입니다.

해안 바위 길을 따라 걷다 보면 삼각대를 세워 놓고 사진을 찍기 좋은 포인트들이 계속해서 나타나요. 산방산과 인접해 있어 남서쪽 코스로 잘 맞습니다.

다만 만조나 기상 상황에 따라 입장이 수시로 제한되므로 방문 전 확인이 필수이며, 바닥이 미끄러울 수 있으니 신발 선택에 유의해야 합니다.`,
    honyeoTip: `• 출입 통제 여부를 당일 전화나 SNS로 반드시 미리 확인하고 가세요.
• 바닥이 거친 바위 길이라 굽 없는 운동화나 미끄럼 방지 신발이 필수입니다.
• 주변의 사계해변이나 산방산 주변 카페와 묶어서 반나절 일정을 짜보세요.`,
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['yongmeori-coast'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-천건엽',
    address: '제주특별자치도 서귀포시 안덕면 사계남로216번길 24-32',
    lat: 33.233371144923,
    lng: 126.313291313646,
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=3d6c01ad-2383-49c9-b213-3f028011d509',
    tagSlugs: ['sea', 'walking', 'emotional', 'hidden'],
  },

  {
    regionSlug: 'jeju',
    slug: 'cheonjiyeon-waterfall',
    name: '천지연폭포',
    summary: '서귀포 도심 속 폭포 산책, 혼자 저녁 산책 코스로도 인기',
    description: `서귀포 시내 중심부에 위치해 산책로가 평탄하고 잘 관리되어 있어 혼자 가볍게 걷기에 최적의 장소입니다.

시원하게 떨어지는 폭포수뿐만 아니라 울창한 상록수림 덕분에 걷는 내내 숲의 정취를 느낄 수 있습니다. 야간 개장을 하므로 밤에 조명 켜진 폭포를 감상하기에도 좋습니다.

인근의 올레시장, 이중섭거리와 매우 가까워 서귀포 시내권 여행의 중심 코스로 활용하기 좋습니다.`,
    honyeoTip: `• 저녁 식사 전후로 가볍게 한 바퀴 돌며 기분 전환을 해보세요.
• 폭포 주변은 물안개 때문에 항상 촉촉하니 미끄러지지 않게 천천히 걸으세요.
• 관람 후 도보 거리에 있는 올레시장에서 저녁 먹거리를 사서 숙소로 들어가는 동선을 추천합니다.`,
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['cheonjiyeon-waterfall'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-황성훈',
    address: '제주특별자치도 서귀포시 남성중로 2-15',
    lat: 33.2447168409268,
    lng: 126.559551124451,
    externalUrl:
      'https://access.visitkorea.or.kr/opentour/detail.do?cotId=8d5fe3ef-a2d0-442d-9380-89979f7fcf41',
    tagSlugs: ['nature', 'walking', 'healing', 'oneday'],
  },

  {
    regionSlug: 'jeju',
    slug: 'soesokkak-estuary',
    name: '쇠소깍',
    summary:
      '에메랄드 물빛 계곡 바다 만나는 곳, 혼자 산책+사진에 강한 자연 스팟',
    description: `맑은 계곡물과 바다가 만나는 신비로운 지형으로, 특유의 에메랄드와 코발트 물빛이 눈길을 사로잡습니다.

나무가 우거진 산책로를 따라 걷는 것만으로도 충분히 매력적이며, 복잡한 일정 중에 잠시 들러 자연의 색을 감상하기 좋습니다.

체험 프로그램도 있지만 혼자라면 테크 산책로를 따라 걸으며 다양한 각도에서 물빛을 사진으로 담는 것이 가장 편안한 관람 방법입니다. 서귀포 남부 해안 일대와 동선 연결이 매우 좋습니다.`,
    honyeoTip: `• 체험 예약을 하지 않더라도 산책로 뷰가 훌륭하니 편안하게 산책하세요.
• 물가 주변 바위는 미끄러울 수 있으니 주의하시길 바랍니다.
• 근처 하효항 방면 해변의 검은 모래 사장까지 함께 걸어보는 코스를 추천해요.`,
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['soesokkak-estuary'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-황성훈',
    address: '제주특별자치도 서귀포시 쇠소깍로 104',
    lat: 33.2542467910888,
    lng: 126.622406641831,
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=f9ef9d87-ab94-48da-9ec3-8148508b7381',
    tagSlugs: ['sea', 'nature', 'walking', 'oneday'],
  },

  {
    regionSlug: 'jeju',
    slug: 'lee-jungseop-street',
    name: '이중섭거리',
    summary:
      '작은 갤러리와 감성 골목이 이어지는 서귀포 산책길, 혼자 걷기 좋은 문화 코스',
    description: `화가 이중섭의 자취를 따라 조성된 이 거리는 작은 갤러리와 카페, 아기자기한 소품샵들이 모여 있는 문화 예술 골목입니다.

좁은 골목을 따라 천천히 걸으며 독특한 아이템을 구경하거나 소규모 전시를 관람하는 재미가 있어 혼자 걷기에 더없이 좋습니다.

서귀포 올레시장과 천지연폭포와 도보로 연결되는 중심부에 있어, 서귀포 도심 산책의 시작점으로 잡기에 가장 좋은 장소입니다.`,
    honyeoTip: `• 낮에는 골목 소품샵과 갤러리를 구경하고, 저녁에는 시장의 먹거리로 하루를 마무리하세요.
• 평일 오후에 방문하면 좀 더 여유롭고 고즈넉하게 골목의 감성을 즐길 수 있습니다.
• 거리 곳곳에 배치된 벤치에 앉아 사람 구경을 하거나 그림을 감상해 보세요.`,
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['lee-jungseop-street'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이정수',
    address: '제주특별자치도 서귀포시 이중섭로 11',
    lat: 33.2470807983266,
    lng: 126.564458845032,
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=8834bb74-18f0-4339-b689-2dacf33e7d34',
    tagSlugs: ['culture', 'walking', 'emotional', 'oneday'],
  },

  // 2) FOOD

  {
    regionSlug: 'jeju',
    slug: 'ujin-haejangguk',
    name: '우진해장국',
    summary: '제주 고사리 해장국 원탑급, 혼자도 많이 먹는 “혼밥 최강” 맛집',
    description: `제주공항 인근 원도심에서 가장 유명한 맛집 중 하나로, 부드럽게 갈린 고사리와 고기가 듬뿍 들어간 육개장이 일품입니다.

새벽 일찍부터 문을 열어 여행의 첫 끼로 손색이 없으며, 메뉴가 단출해 혼자 방문해도 고민 없이 주문할 수 있습니다.

웨이팅이 길지만 대기 번호를 받고 기다리는 시스템이 정착되어 있어 혼자 기다리기에도 무리가 없습니다. 식사 후 동문시장까지 걸어서 이동하기 좋은 위치입니다.`,
    honyeoTip: `• 웨이팅을 피하고 싶다면 오전 7시 이전이나 오후 3~4시경 애매한 시간대를 노려보세요.
• 시간이 부족하다면 포장 주문을 해서 근처 공원이나 숙소에서 즐기는 것도 방법입니다.
• 식사 후 산지천 산책로를 따라 걸으며 제주 시내의 정취를 느껴보세요.`,
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '제주특별자치도 제주시 서사로 11',
    lat: 33.5115386823178,
    lng: 126.520016120454,
    externalUrl: 'https://place.map.kakao.com/11547525',
    tagSlugs: ['solo-eating', 'culture'],
  },

  {
    regionSlug: 'jeju',
    slug: 'jeju-kimmanbok',
    name: '제주김만복(만복이네김밥집)',
    summary: '전복내장 김밥으로 유명, 혼자 픽업/혼밥 난이도 최저',
    description: `고소한 전복 내장이 들어간 밥과 달콤한 계란 지단이 어우러진 김밥으로 유명한 포장 전문 맛집입니다.

메뉴 구성이 단순해 주문이 매우 빠르며, 이동 중 차 안이나 해변 벤치에서 간편하게 식사를 해결하고 싶은 혼행족들에게 최적의 선택입니다.

공항 근처에 본점이 있어 도착 직후나 출발 전에 들러 픽업하기 아주 좋습니다. 오징어 무침을 곁들여 먹으면 더욱 감칠맛 나게 즐길 수 있습니다.`,
    honyeoTip: `• 김밥을 사서 가까운 용두암 해안도로 벤치에 앉아 바다를 보며 드셔보세요.
• 포장 위주라 대기 시간이 길지 않으니 이동 동선상에 있다면 고민 말고 들르세요.
• 갓 만든 김밥은 따뜻할 때 바로 먹는 게 가장 맛있습니다.`,
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '제주특별자치도 제주시 오라로 41',
    lat: 33.4970418018495,
    lng: 126.50892242155,
    externalUrl: 'https://place.map.kakao.com/1046180098',
    tagSlugs: ['solo-eating', 'oneday'],
  },

  {
    regionSlug: 'jeju',
    slug: 'olle-guksu',
    name: '올래국수',
    summary: '고기국수로 유명한 제주 혼밥 성지, 회전 빠르고 1인 방문 많음',
    description: `제주의 소울 푸드인 고기국수를 전문으로 하는 식당으로, 진한 육수와 두툼한 돼지고기 수육이 푸짐하게 올라가 나옵니다.

단일 메뉴에 가까워 주문과 동시에 조리가 빠르게 이루어지며, 혼자 식사하는 여행객이 매우 많아 부담 없이 자리를 잡을 수 있습니다.

회전율이 좋아 대기가 있어도 금방 자리가 나는 편이며, 공항 인근에 위치해 첫날 점심으로 든든하게 먹기에 아주 좋습니다.`,
    honyeoTip: `• 주말이나 점심시간엔 대기가 있으니 영업 시작 직후나 오후 시간을 추천해요.
• 고춧가루를 살짝 풀어 칼칼하게 드시면 고기 육수의 풍미를 더 잘 느낄 수 있습니다.
• 식사 후 도두봉에 올라 공항 활주로와 바다를 한눈에 담는 코스를 추천합니다.`,
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '제주특별자치도 제주시 월성로 39 1층',
    lat: 33.5009069049856,
    lng: 126.505991734749,
    externalUrl: 'https://place.map.kakao.com/559359242',
    tagSlugs: ['solo-eating', 'stress-relief', 'oneday'],
  },

  {
    regionSlug: 'jeju',
    slug: 'jamae-guksu-jeju',
    name: '자매국수(제주점)',
    summary: '국수 메뉴로 깔끔하게 한 끼, 혼자도 부담 적은 제주 국수집',
    description: `깔끔한 매장 시설과 체계적인 대기 시스템 덕분에 혼자서도 쾌적하게 식사할 수 있는 고기국수 맛집입니다.

진한 사골 육수의 고기국수와 매콤달콤한 비빔국수가 대표적이며, 1인용 테이블이나 바 좌석 배려가 잘 되어 있어 혼밥 난이도가 낮습니다.

공항에서 가깝고 넓은 주차 공간을 갖추고 있어 렌터카로 이동하는 혼자 여행객에게 특히 편리한 선택지입니다.`,
    honyeoTip: `• 비빔국수를 주문하면 작은 고기국수 육수가 함께 나오니 두 가지 맛을 다 즐겨보세요.
• 매장이 워낙 크고 현대적이라 혼자 방문해도 눈치 볼 일이 전혀 없습니다.
• 캐치테이블 등 앱을 이용해 미리 웨이팅 현황을 확인하고 방문하세요.`,
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '제주특별자치도 제주시 항골남길 46',
    lat: 33.4985789993217,
    lng: 126.459142607002,
    externalUrl: 'https://place.map.kakao.com/21455793',
    tagSlugs: ['solo-eating', 'oneday', 'stress-relief'],
  },

  {
    regionSlug: 'jeju',
    slug: 'matna-restaurant-seongsan',
    name: '맛나식당(성산)',
    summary:
      '성산 동쪽 맛집으로 유명한 한 끼, 1인 주문도 가능한 편이라 혼밥 코스로 인기',
    description: `성산 일대에서 생선 조림으로 가장 유명한 로컬 식당 중 한 곳으로, 가성비와 맛을 모두 잡은 푸짐한 한 상을 제공합니다.

전통적인 식당 분위기지만 혼자 여행하는 이들도 많이 찾아 1인 식사가 가능한 시간대라면 최고의 동쪽 식사를 즐길 수 있습니다.

주변의 성산일출봉이나 우도 선착장과 가까워 오전 일찍 대기를 걸어놓고 주변 산책을 다녀오는 동선이 매우 효율적입니다.`,
    honyeoTip: `• 새벽부터 번호표를 배부할 만큼 인기가 많으니 일찍 움직여 번호를 선점하세요.
• 혼자라면 고등어조림이나 갈치조림을 섞어서 주문할 수 있는지 미리 확인해 보세요.
• 식사 후 든든한 마음으로 성산일출봉을 등반하는 코스를 강력 추천합니다.`,
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '제주특별자치도 서귀포시 성산읍 동류암로 41',
    lat: 33.4485368642457,
    lng: 126.916013018154,
    externalUrl: 'https://place.map.kakao.com/8970084',
    tagSlugs: ['solo-eating', 'oneday', 'sea'],
  },

  {
    regionSlug: 'jeju',
    slug: 'ozo-haenyeo-house',
    name: '오조해녀의집',
    summary:
      '바다 앞 해녀식 한 끼, 혼자도 편한 메뉴 구성으로 동쪽 코스에 잘 붙는 곳',
    description: `성산 바다가 시원하게 내다보이는 곳에서 해녀들이 직접 잡은 해산물로 만든 전복죽과 소라 등을 맛볼 수 있는 곳입니다.

단품 메뉴 위주라 혼자 주문하기에 아주 적절하며, 창밖의 바다 풍경을 보며 천천히 식사할 수 있는 여유가 매력입니다.

내부가 넓고 투박하지만 정감 가는 분위기 덕분에 혼자 여행자들도 꾸준히 찾는 명소입니다. 성산과 우도를 잇는 동선 상에서 영양 가득한 한 끼를 챙기기에 좋습니다.`,
    honyeoTip: `• 전복죽이 양이 꽤 많으니 든든한 아침 식사나 이른 점심으로 선택하세요.
• 식당 앞 바다 산책로를 따라 가볍게 걸으며 성산일출봉 뷰를 감상해 보세요.
• 재료가 일찍 소진될 수 있으니 가급적이면 오후 늦은 시간보다는 낮 시간대 방문을 추천해요.`,
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '제주특별자치도 서귀포시 성산읍 한도로 141-13',
    lat: 33.4697358277887,
    lng: 126.922293910822,
    externalUrl: 'https://place.map.kakao.com/8016700',
    tagSlugs: ['solo-eating', 'sea', 'oneday'],
  },

  // 3) CAFE

  {
    regionSlug: 'jeju',
    slug: 'jeju-glass-house',
    name: '제주 글라스하우스',
    summary: '안도 다다오 건축+오션뷰, 혼자 앉아 멍 때리기 좋은 감성 스팟',
    description: `세계적인 건축가 안도 다다오의 작품으로, 통유리 너머로 섭지코지의 해안선과 성산일출봉이 한눈에 들어오는 압도적인 뷰를 자랑합니다.

좌석 사이의 간격이 넓어 혼자 조용히 창밖을 바라보며 사색에 잠기기에 최적이며, 건축미와 대자연이 만나는 풍경은 그 자체로 힐링이 됩니다.

건물 안팎에 감각적인 포토존이 많아 혼자서도 멋진 사진을 남길 수 있습니다. 섭지코지 산책 후에 들러 땀을 식히며 바다를 감상하기에 가장 고급스러운 장소입니다.`,
    honyeoTip: `• 해 질 무렵 노을이 유리창으로 쏟아져 들어올 때가 가장 아름답습니다.
• 가격대는 있는 편이지만 건축 투어와 뷰를 동시에 즐긴다고 생각하면 가치 있는 선택이에요.
• 성산일출봉을 바라보는 야외 데크에서도 꼭 사진을 한 장 남겨보세요.`,
    category: SpotCategory.CAFE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeju']['jeju-glass-house'],
    imageSource: ImageSource.ETC,
    address: '제주특별자치도 서귀포시 성산읍 동류암로36번길 2',
    lat: 33.4493055260732,
    lng: 126.916872277607,
    externalUrl:
      'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=cb03367a-0231-4384-b990-4e4b51f9a0a7',
    tagSlugs: ['cafe', 'emotional', 'sea', 'oneday'],
  },

  {
    regionSlug: 'jeju',
    slug: 'cafe-delmoondo',
    name: '카페 델문도',
    summary: '함덕 오션뷰 대형 카페, 혼자 바다 보며 쉬기 좋은 안정적인 선택',
    description: `함덕해변의 에메랄드빛 바다 바로 위에 떠 있는 듯한 느낌을 주는 대형 카페로, 환상적인 오션뷰를 제공합니다.

규모가 매우 커서 혼자 방문해도 눈치 보지 않고 바다 쪽 좌석을 차지할 수 있는 기회가 많으며, 실내와 야외 테라스 공간이 넓어 선택의 폭이 넓습니다.

해변 산책로와 곧바로 연결되어 있어 "바다 걷기 → 커피 휴식"의 완벽한 루트를 만들어줍니다. 창가에 앉아 시시각각 변하는 바다색을 구경하는 것만으로도 시간이 금방 흐릅니다.`,
    honyeoTip: `• 평일 오전이나 늦은 오후에 방문하면 창가 명당자리를 잡기가 훨씬 수월해요.
• 카페에서 직접 구운 빵과 함께 커피를 즐기며 함덕의 풍경을 만끽해 보세요.
• 야외 테라스 끝 쪽 좌석은 파도 소리가 더 가깝게 들려 '물멍'하기 좋습니다.`,
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '제주특별자치도 제주시 조천읍 조함해안로 519-10',
    lat: 33.5437022656737,
    lng: 126.668709879591,
    externalUrl: 'https://www.delmoondo.com',
    tagSlugs: ['cafe', 'sea', 'healing', 'emotional'],
  },

  {
    regionSlug: 'jeju',
    slug: 'cafe-bomnal-aewol',
    name: '카페 봄날(애월)',
    summary: '애월 감성 오션뷰 카페, 혼자도 사진 찍고 쉬기 좋은 대표 핫플',
    description: `애월 카페거리의 시조새 격인 명소로, 아기자기하게 꾸며진 마을 같은 카페 내부와 바다를 마주한 창가 자리가 일품입니다.

카페 곳곳이 감각적인 포토존으로 꾸며져 있어 혼자 삼각대를 세워 놓고 인생샷을 남기기에 더할 나위 없이 좋습니다.

내부 좌석에서도 애월의 푸른 바다가 가깝게 보여 시원한 개방감을 줍니다. 한담해안산책로의 시작점에 위치해 산책 전후로 들르기에 가장 효율적인 위치입니다.`,
    honyeoTip: `• 입구에서 주문을 해야 안으로 입장할 수 있는 시스템이니 참고하세요.
• 바다 바로 앞 창가 자리는 항상 인기가 많으니 오픈런을 추천합니다.
• 카페 정원에서 바다를 배경으로 사진을 찍은 뒤 해안 산책로를 따라 가볍게 걸어보세요.`,
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '제주특별자치도 제주시 애월읍 애월로1길 25',
    lat: 33.4625070040388,
    lng: 126.30958807087,
    externalUrl: 'https://place.map.kakao.com/693062983',
    tagSlugs: ['cafe', 'emotional', 'sea', 'oneday'],
  },

  {
    regionSlug: 'jeju',
    slug: 'monsant-aewol',
    name: '몽상드애월',
    summary: '애월 오션뷰 감성 카페, 혼자도 ‘바다멍’하기 좋은 포토스팟',
    description: `거울 같은 통유리창으로 애월의 하늘과 바다를 그대로 반사하는 독특한 외관으로 유명한 공간입니다.

실내 좌석이 넉넉하고 세련된 인테리어를 갖추고 있어 혼자 앉아 창밖의 수평선을 바라보며 여유를 즐기기에 좋습니다.

해안 절벽 바로 위에 위치해 야외 좌석에서도 파도 소리를 생생하게 들을 수 있습니다. 애월의 화려한 감성을 느끼면서도 혼자만의 사색 시간을 갖고 싶은 여행자에게 추천합니다.`,
    honyeoTip: `• 일몰 시간대엔 창가 자리가 매우 혼잡하니 1~2시간 미리 방문해 노을을 기다려보세요.
• 카페 주변의 현무암 해안선을 배경으로 사진을 찍으면 제주스러운 느낌이 가득 담깁니다.
• 늦은 오후에는 바람이 강해질 수 있으니 실내 창가 좌석을 선점하는 게 좋습니다.`,
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '제주특별자치도 제주시 애월읍 애월로1길 25-4',
    lat: 33.4628305712777,
    lng: 126.309343263799,
    tagSlugs: ['cafe', 'emotional', 'sea', 'thinking'],
  },

  {
    regionSlug: 'jeju',
    slug: 'naeum-coffee-bar',
    name: '내음커피바',
    summary: '커피와 위스키를 함께 즐기는 커피바, 혼자 앉아 좋은 바테이블',
    description: `낮에는 정성스럽게 내린 커피를, 밤에는 취향에 맞는 위스키를 즐길 수 있는 원도심의 감성적인 바(Bar)입니다.

바테이블 중심의 구조라 혼자 방문해도 전혀 어색하지 않으며, 바텐더와 가벼운 대화를 나누거나 혼자 책을 읽으며 조용히 머물기에 좋습니다.

차분한 음악과 은은한 조명 덕분에 복잡한 여행 중 잠시 쉼표를 찍고 싶은 혼행족들에게 아지트 같은 공간이 되어줍니다. 산지천 주변의 고즈넉한 정취와도 잘 어울립니다.`,
    honyeoTip: `• 낮에는 필터 커피 한 잔을 마시며 산지천 뷰를 감상해 보세요.
• 바 자리에 앉아 사장님의 추천을 받아 새로운 원두나 위스키에 도전해 보시는 것도 좋습니다.
• 저녁 산책 후 조용히 혼술하며 하루를 마무리하기에 가장 적당한 장소입니다.`,
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '제주특별자치도 제주시 산지로 17',
    lat: 33.5153134737439,
    lng: 126.529633040597,
    externalUrl: 'https://place.map.kakao.com/768821365',
    tagSlugs: ['solo-drinking', 'emotional', 'thinking'],
  },

  // 4) DRINK

  {
    regionSlug: 'jeju',
    slug: 'zencantos-winebar',
    name: '젠칸투스',
    summary: 'LP 감성 와인바, 혼자 음악 들으며 한 잔 하기 좋은 곳',
    description: `방대한 LP 컬렉션과 따뜻한 목재 인테리어가 어우러진 와인바로, 음악에 온전히 집중하며 한 잔의 여유를 즐길 수 있는 곳입니다.

바 좌석이 잘 구비되어 있어 혼자 와인 잔을 기울여도 눈치가 보이지 않으며, 잔잔하게 흐르는 LP 음악 소리가 혼자만의 시간을 풍성하게 채워줍니다.

다양한 와인 리스트와 함께 가벼운 안주가 준비되어 있어 취향에 맞는 매칭이 가능합니다. 화려한 술집보다는 아늑한 음악 공간을 선호하는 분들에게 최고의 선택입니다.`,
    honyeoTip: `• 좋아하는 장르의 음악을 신청해 보거나, 사장님의 선곡을 믿고 감상해 보세요.
• 혼자라면 구석진 바 자리에 앉아 조용히 생각 정리를 하기에 매우 좋습니다.
• 주말보다는 평일 밤에 들러야 이곳 특유의 고요한 감성을 100% 느낄 수 있습니다.`,
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '제주특별자치도 제주시 연삼로 145',
    lat: 33.4933162944438,
    lng: 126.507731049394,
    externalUrl: 'https://place.map.kakao.com/328342741',
    tagSlugs: ['solo-drinking', 'emotional', 'nightview'],
  },

  {
    regionSlug: 'jeju',
    slug: 'gwangan-solo-bar',
    name: '광장(제주 혼술바)',
    summary: '혼술 컨셉 칵테일바, 혼자 앉아 한 잔하기 좋은 분위기',
    description: `대화보다는 혼자만의 침묵과 술을 존중하는 콘셉트의 칵테일바로, 혼행족들 사이에서 이미 유명한 아지트입니다.

바텐더가 불필요한 말을 걸지 않아 온전히 칵테일의 맛과 음악, 그리고 나 자신에게 집중할 수 있는 분위기를 제공합니다.

어두운 조명 아래서 즐기는 하이볼이나 칵테일 한 잔은 여행의 피로를 씻어내기에 충분합니다. 좌석이 많지 않아 프라이빗한 느낌을 주며, 평일에는 더욱 고요한 시간을 보낼 수 있습니다.`,
    honyeoTip: `• 혼자 술 마시는 게 처음이라면 이곳에서 시작해 보시는 것을 강력 추천해요.
• 메뉴판을 보며 취향에 맞는 칵테일을 골라보고, 가벼운 책 한 권을 읽으며 시간을 보내보세요.
• 인기 있는 곳이라 오픈 시간대에 맞춰 방문해야 대기 없이 자리를 잡을 수 있습니다.`,
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '제주특별자치도 제주시 북성로 9 1층',
    lat: 33.5155907232231,
    lng: 126.523455372718,
    externalUrl: 'https://place.map.kakao.com/5544310',
    tagSlugs: ['solo-drinking', 'emotional', 'nightview'],
  },

  {
    regionSlug: 'jeju',
    slug: 'magpie-brewing-taproom',
    name: '맥파이 브루어리(탭룸/양조장)',
    summary: '제주 수제맥주 대표 브랜드, 혼자 한 잔하기 좋은 캐주얼 탭룸',
    description: `제주 수제맥주의 자부심이라 불리는 맥파이의 탭룸으로, 신선한 생맥주를 다양한 종류로 맛볼 수 있는 공간입니다.

세련된 공장형 인테리어와 캐주얼한 분위기 덕분에 혼자 들러 피자 한 조각에 맥주 한 잔을 즐기는 여행자들이 매우 많습니다.

바 좌석이 넉넉해 혼자 방문해도 전혀 불편함이 없으며, 양조장 투어와 함께 즐기면 더욱 알찬 경험이 됩니다. 낮술을 즐기기에도 부담 없는 활기찬 분위기가 매력입니다.`,
    honyeoTip: `• 샘플러 메뉴가 있다면 여러 맥주를 조금씩 맛보며 취향을 찾아보세요.
• 맥주와 찰떡궁합인 이곳의 피자도 혼자 먹기에 부담 없는 양으로 즐길 수 있습니다.
• 제주 시내와 조금 떨어져 있으니 대리운전이나 대중교통 이용을 염두에 두고 방문하세요.`,
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '제주특별자치도 제주시 동회천1길 23',
    lat: 33.503206117821,
    lng: 126.61717764321,
    externalUrl: 'https://place.map.kakao.com/602353817',
    tagSlugs: ['solo-drinking', 'stress-relief', 'oneday'],
  },

  {
    regionSlug: 'jeju',
    slug: 'the-booze-jeju',
    name: '더 부즈 제주(The Booze Jeju)',
    summary: '위스키 중심 바, 혼자 조용히 마시기 좋은 ‘바 좌석’ 분위기',
    description: `간판 없는 스피크이지 바 스타일로, 비밀스러운 문을 열고 들어가면 신세계가 펼쳐지는 매력적인 위스키 전문 바입니다.

어른스럽고 정중한 분위기 속에서 위스키 소믈리에의 추천을 받으며 나만의 취향을 찾아가는 재미가 있습니다.

조용하게 대화하거나 혼자 침묵 속에서 술을 즐기는 손님이 대부분이라 소란스러운 술집을 피하고 싶은 분들에게 완벽한 장소입니다. 노형동 신시가지에 위치해 인근 숙소에서 접근하기 좋습니다.`,
    honyeoTip: `• 입구를 찾는 것부터가 여행의 재미이니 지도를 잘 살펴보고 찾아가세요.
• 위스키가 생소하다면 바텐더에게 좋아하는 향이나 평소 즐기는 맛을 말하고 추천을 받으세요.
• 1인 방문객을 위한 바 자리가 이곳의 가장 큰 명당입니다.`,
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '제주특별자치도 제주시 노형11길 5-4',
    lat: 33.4841320041765,
    lng: 126.479028832389,
    externalUrl: 'https://place.map.kakao.com/857455861',
    tagSlugs: ['solo-drinking', 'thinking', 'nightview'],
  },
];
