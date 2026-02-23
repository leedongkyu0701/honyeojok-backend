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
      '정상까지 이어지는 계단과 나무데크가 잘 정비되어 있어 길을 헤맬 일이 거의 없어요. 주차장에서 출발해 20~30분 정도 천천히 올라가면 웅장한 분화구와 푸른 바다가 한눈에 들어오며 곳곳에 잠시 숨을 고를 수 있는 쉼터도 있습니다. 오르는 동안 뒤를 돌아보면 성산 마을과 해안선이 한 프레임에 담겨 사진 찍는 재미가 쏠쏠하고 해 뜰 무렵엔 사람은 많지만 일방향 동선이라 혼자 움직여도 흐름이 끊기지 않아요. 날씨가 좋을 때는 화산지형과 초록빛 풀밭이 대비되어 자연이 만들어낸 경이로움을 느낄 수 있습니다.',
    honyeoTip:
      '일출을 노린다면 해 뜨기 30분쯤 전에 도착해 여유 있게 올라가야 포토스팟에서 기다리는 시간을 줄일 수 있어요. 바람이 매서운 날이 많으니 가벼운 겉옷과 장갑을 챙기고, 내려온 뒤에는 성산항이나 섭지코지로 이동해 동쪽 코스를 이어가면 하루 일정이 자연스럽게 이어집니다.',
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
    description:
      '완만한 해안길과 언덕길이 자연스럽게 이어져 동선을 고민할 필요가 없고, 등대와 초원, 현무암 해안이 연달아 나타나 걸음마다 풍경이 바뀝니다. 파도가 부서지는 소리를 들으며 천천히 걷다 보면 사진 찍기 좋은 포인트가 많아 혼자서도 삼각대를 세워 촬영하기 수월해요. 주변에는 카페와 식당들이 가까워 산책 후 잠시 쉬어 가기 좋고 성산일출봉과 묶어 하루 코스로 엮기에도 동선이 효율적입니다. 바람이 강한 날이 잦으므로 모자나 후드가 있는 겉옷을 챙기면 더 편안합니다.',
    honyeoTip:
      '노을을 보고 싶다면 해 지기 한 시간 전부터 천천히 걸으며 전망대를 향해 올라가세요. 사람 많은 시간을 피하려면 평일 오후나 오전에 방문하는 것이 좋고, 산책을 마친 뒤에는 인근 카페에서 따뜻한 음료를 마시며 몸을 녹이는 것도 추천해요.',
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
    description:
      '모래사장과 얕은 바다가 길게 펼쳐져 있어 혼자 걸으며 멍하니 바라보기 좋고 곳곳에 잔디밭과 야자수가 있어 앉아 쉬기 편합니다. 바다 색이 에메랄드빛에서 딥블루까지 차례로 변해 시간마다 다른 풍경을 보여주고, 여유롭게 앉아 있는 사람들과 가족 단위 여행객이 어우러진 모습이 정겨워요. 해변과 연결된 산책길과 카페거리가 잘 조성되어 있어 초행자라도 동선을 고민할 필요가 없고, 혼자서도 사진 찍기 좋은 벤치와 계단 포인트가 많습니다. 서우봉 방향으로 걸어가면 비교적 한적한 구간이 나오니 중심부가 붐빌 때 피하기 좋습니다.',
    honyeoTip:
      '사람이 많을 땐 해변 중앙을 피해 서우봉 쪽으로 이동하면 여유를 즐길 수 있어요. “바다 산책 → 카페에서 한숨 돌리기 → 노을 감상” 순서로 하루를 짜면 혼자서도 충분히 풍성한 시간을 보낼 수 있습니다.',
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
    description:
      '수심이 얕고 물빛이 맑아 낮에도 바다의 여러 색을 감상할 수 있고, 해가 기울 때는 하늘과 바다가 황금빛으로 물들어 멋진 노을을 선사합니다. 파도가 잔잔하게 밀려와 산책 중에도 마음이 차분해지고 주변에는 해변을 조망할 수 있는 카페들이 많아 창가에 앉아 시간을 보내기 좋습니다. 한적하게 앉아 멍 때릴 수 있는 바위와 벤치가 있어 혼자 방문해도 눈치를 볼 필요가 없으며, 동선이 단순해 처음 가는 사람도 헤매지 않습니다. 서쪽 드라이브 코스 중간에 위치해 다른 명소와 묶기 편한 점도 장점입니다.',
    honyeoTip:
      '노을 시간대는 인기가 많으니 석양 40분 전쯤 도착해 해변 끝까지 걸은 뒤 되돌아오며 하늘 색이 변하는 과정을 즐겨보세요. 바닷바람이 차가워질 수 있으니 가벼운 겉옷을 챙기고, 해변에서 나와 근처 카페나 식당으로 이동해 하루를 마무리하면 좋습니다.',
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
    description:
      '붉은오름 입구에서 시작해 비자림로까지 이어지는 약 10km의 숲길은 빽빽한 삼나무와 삼나무 사이로 이어져 첫발을 들이는 순간부터 쿨한 공기가 감돕니다. 초반 2~3km 구간에서는 등산객이 많지만 조금 더 들어가면 숲 전체를 전세 낸 듯 고요함을 즐길 수 있어 혼자 걷기에도 마음이 편해요. 중간중간 설치된 이정표를 따라가면 길을 잃을 걱정이 없고, 실개천과 물찻오름 등 소소한 볼거리가 나타나 지루할 틈이 없습니다. 입장료가 없고 길이 완만해 운동화만 챙기면 누구나 도전할 수 있으며, 비 온 다음 날에는 숲 향기가 더 짙어 힐링 효과가 큽니다.',
    honyeoTip:
      '버스 시간표를 미리 확인하고 붉은오름 방향에서 시작하면 완주 후 교통편을 이용하기 수월해요. 비오는 날이나 비가 갠 뒤에는 길이 미끄러울 수 있으니 미끄럼 방지 운동화를 신고, 이어폰 볼륨을 낮춰 주변 소리에 귀를 기울이며 천천히 걷는 것이 안전합니다.',
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
    description:
      '비자림은 수백 년 된 비자나무가 울창하게 뻗어 있는 숲길로, 무장애 코스와 조금 긴 코스 두 가지가 준비되어 있어 체력에 맞게 선택할 수 있습니다. 비 온 뒤에는 촉촉한 공기와 짙은 나무 향 덕분에 숲이 더욱 초록빛으로 빛나고, 산책로 밖으로 들어갈 수 없어 안전하게 걷기 좋아요. 이른 아침에 방문하면 거의 사람이 없어 혼자 조용히 걸으며 생각을 정리하기에 좋은데 시간이 지나면 단체 관광객이 몰리니 피크 시간을 피하는 것이 좋습니다. 길 곳곳에 사진 찍기 좋은 장소가 있어 멈춰 서서 멍하니 숲을 바라보다 보면 어느새 시간이 흘러 있습니다.',
    honyeoTip:
      '입구가 붐빌 때는 조금만 안쪽으로 들어가면 훨씬 조용하고, 벤치에 앉아 숲 향기를 느껴보세요. 60~90분 정도 여유 있게 잡으면 천천히 걷고 쉬어가기 좋고, 비자림을 나온 후 근처 카페나 다른 동쪽 명소와 연결하면 일정이 매끄럽습니다.',
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
    description:
      '만장굴은 용암이 흘러 형성된 거대한 동굴로 사계절 내내 서늘해 더운 날씨에도 쾌적하게 관람할 수 있습니다. 동굴 내부는 일방향으로 조성되어 있어 초행자도 동선이 헷갈리지 않고 용암지형과 석주, 용암 터널 등을 가까이에서 볼 수 있어 사진 찍는 재미가 있어요. 바닥에 물기가 있는 구간이 있으니 조심히 걸어야 하고 내부 조명이 은은해 신비로운 분위기를 느끼게 해줍니다. 성산일출봉, 우도, 비자림 등 동쪽 코스와 묶어 하루 일정으로 다녀오기에 적당합니다.',
    honyeoTip:
      '바닥이 젖어 미끄러운 곳이 많으므로 미끄럼 방지되는 운동화를 신고, 겉옷을 챙기면 동굴 속 낮은 온도에 대비할 수 있어요. 동굴 내부에서 대화할 필요가 거의 없으니 조용히 자연의 형태를 관찰하며 걷다가 나와서 근처 카페나 숲길에서 몸을 풀어보세요.',
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
    description:
      '용눈이오름은 완만한 언덕이 이어지는 오름으로 정상까지 오르는 길이 단순해 초행자도 쉽게 올라갈 수 있습니다. 능선을 따라 걷는 동안 바람과 하늘, 초지가 어우러져 감성적인 풍경이 펼쳐지며 삼각대를 세워 혼자 사진을 남기기에도 적당해요. 정상에서는 성산일출봉과 우도까지 시야가 트여 있어 전망이 탁 트이고, 초목이 낮아 사계절 각기 다른 색의 풍경을 만날 수 있습니다. 바람이 강한 날이 많으니 모자 끈이나 바람막이를 챙기면 편안하며, 동쪽 드라이브 코스 중간에 들르기 좋아요.',
    honyeoTip:
      '오름에 오를 때는 무리하지 않고 천천히 한 바퀴 돌아보는 코스를 추천해요. 60분 정도 시간을 잡고 중간중간 휴식을 취하면 체력 부담이 적고, 농로와 사유지로 이어지는 곳은 들어가지 말고 지정된 길을 따라 이동하면 안전합니다.',
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
    description:
      '카멜리아힐은 계절마다 다른 꽃과 나무가 피어나는 수목원으로 동선이 잘 정리되어 있어 천천히 걷기 좋습니다. 여러 테마 정원과 포토존이 배치되어 있어 꽃을 배경으로 사진 찍는 재미가 있고, 중간에 앉아 쉴 수 있는 벤치와 카페가 있어 혼자 머무는 시간도 자연스럽게 길어져요. 동백꽃 시즌에는 인기가 많아 붐비지만 그 외 시즌에는 한적하게 산책할 수 있고, 서쪽 드라이브 코스에 자연스럽게 포함하기 쉽습니다. 온실과 야외 정원이 잘 구분되어 있어 비가 오는 날에도 즐길 수 있는 편입니다.',
    honyeoTip:
      '붐비지 않는 평일 오전에 방문하면 사진 찍기 좋은 자리와 벤치를 차지하기 수월해요. 동백 시즌엔 오픈 시간에 입장해 빠르게 한 바퀴 둘러본 뒤 조용한 구간을 찾아 천천히 머무는 것을 추천하고, 산책 후에는 근처 카페나 해변으로 이동하면 일정을 채우기 좋습니다.',
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
    description:
      '애월 해안에 자리한 한담해안산책로는 바다와 거의 맞닿아 있어 걷는 내내 파도 소리를 가까이서 들을 수 있습니다. 산책로가 짧고 동선이 분명해 잠시 들렀다 가기 좋으며, 현무암 바위와 해안선이 만들어내는 풍경이 계절마다 다른 매력을 보여줍니다. 길 중간중간에 사진 찍기 좋은 난간과 벤치가 있고, 주변에 개성 있는 카페와 맛집이 많아 “걷고 쉬고 먹는” 루틴을 자연스럽게 만들 수 있어요. 일몰 무렵에는 노을빛이 해안가를 붉게 물들이지만 그 시간대가 가장 혼잡하니 시간 여유를 두고 방문하는 것이 좋습니다.',
    honyeoTip:
      '일몰 한 시간 전부터 산책을 시작해 여유 있게 걸으면 붐비지 않는 풍경과 노을을 모두 즐길 수 있어요. 산책을 마친 뒤에는 가까운 카페에 들어가 창가 자리에서 바다를 바라보며 커피를 마시면 하루의 피로가 사라집니다.',
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
    description:
      '제주 원도심 중심에 위치해 접근성이 좋은 전통시장으로 과일, 해산물, 기념품, 간식 등 다양한 상점이 빼곡히 들어서 있습니다. 좁은 골목을 따라 천천히 걸으면서 조금씩 맛보며 구경하기 좋아 혼자서도 부담이 없고, 밤이 되면 야시장처럼 활기가 넘쳐 사진 찍기 좋은 분위기가 연출돼요. 인기 있는 간식점 앞에는 줄이 생기기도 하지만 메뉴를 미리 정해두면 기다림을 줄일 수 있습니다. 인근 산지천과 관덕정 일대와도 가까워 시장 방문 후 도시 산책으로 이어가기 좋은 위치입니다.',
    honyeoTip:
      '한가로운 분위기를 즐기고 싶다면 평일 늦은 오후에 방문해요. 먹거리는 욕심내기보다 먹고 싶은 것 한두 가지를 골라 집중하면 대기 스트레스가 덜하고, 시장을 나와 산지천 산책로를 따라 걸으면 소화도 되고 일정이 자연스럽게 이어집니다.',
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
    description:
      '우도에 위치한 서빈백사는 산호가 부서진 하얀 모래와 투명한 물빛이 조화를 이루어 사진이 특히 잘 나오는 해변입니다. 널찍한 백사장과 완만한 해변 덕분에 혼자 걸으며 시간을 보내기 좋고, 인근에 간단한 간식과 음료를 파는 가게들이 있어 배를 채우기에 부담이 없습니다. 성산항에서 배를 타고 들어와 하루 동안 우도를 둘러보는 여정의 중간 지점으로 넣기 좋으며, 바다색이 워낙 선명해 날씨가 흐려도 매력이 있어요. 파도가 잔잔해 해변 가장자리에서 발을 담그며 멍 때리기에도 좋습니다.',
    honyeoTip:
      '우도를 당일로 다녀올 계획이라면 아침 첫 배를 타고 들어와 서빈백사와 동쪽 해안을 돌아보고 오후 배로 돌아오는 일정이 가장 여유롭습니다. 혼자 여행 시에는 배 시간표를 미리 확인해 놓으면 정신없이 움직이지 않아도 되고, 해변에서 시간을 보내다 보면 돌아가는 배 시간을 놓치기 쉬우니 알람을 맞춰두세요.',
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
    description:
      '제주공항과 가까워 도착하거나 출발하기 전 잠시 들르기 좋은 해안 절벽 포인트입니다. 용두암이라는 이름처럼 용이 머리를 들고 있는 듯한 바위가 파도와 어우러져 독특한 풍경을 만들고, 짧은 산책로가 있어 혼자 걸으며 사진을 남기기 좋습니다. 바위 주변은 바람이 강하고 난간이 낮아 안전을 위해 난간 밖으로 나가지 않는 것이 중요하며, 해안도로를 따라 이어지는 산책길과 근처 카페들 덕분에 일정 확장이 쉬워요. 낮에는 시원한 해안을, 해 질 무렵에는 부드러운 노을을 감상할 수 있습니다.',
    honyeoTip:
      '바람이 세차게 부는 날에는 난간 안쪽에서만 사진을 찍고 해안 산책로를 중심으로 움직이세요. “용두암 → 용연/산지천 → 원도심” 순으로 동선을 잡으면 짧은 시간 안에 제주 시내를 두루 둘러볼 수 있습니다.',
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
    description:
      '공항에서 멀지 않은 이호테우해변은 말 모양 등대가 인상적인 포토 포인트입니다. 넓게 트인 백사장과 잔잔한 파도 덕분에 혼자 걸으며 여유를 느끼기 좋고, 해 질 무렵에는 석양이 바다를 물들여 특히 아름다운 장면을 선사합니다. 해변 주변에 특별한 시설은 많지 않지만 근처 카페와 작은 식당들이 있어 간단히 차를 마시거나 요기를 할 수 있으며, 공항과 가까워 여행 첫날이나 마지막 날 일정에 편하게 끼워 넣을 수 있어요. 날씨가 좋을 때는 석양 후 하늘이 보랏빛으로 변하는 여운까지 보고 돌아오는 것도 추천합니다.',
    honyeoTip:
      '일몰 시간대를 노린다면 해가 지기 한 시간 전부터 해변을 산책하며 등대와 바다를 배경으로 사진을 남겨보세요. 바닷바람이 해가 진 뒤 더욱 차가워지니 겉옷을 챙기고, 해변 산책을 끝낸 후에는 근처 카페에 들러 따뜻한 음료로 몸을 녹이면 좋습니다.',
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
    description:
      '현무암 절벽과 파도에 깎인 독특한 지형이 이어지는 용머리해안은 걸을 때마다 새로운 모습을 보여주는 자연 스튜디오입니다. 해안 바위길을 따라 천천히 걸으면 포토스팟이 많아 혼자서 삼각대를 세워 촬영하기 좋고, 산방산과 함께 묶으면 이동 거리가 짧아 남서쪽 반나절 코스로 잘 맞아요. 다만 파도와 바람이 강한 날에는 일부 구간이 통제되므로 방문 전에 운영 여부를 확인해야 하고, 바닥이 거칠어 미끄럼 방지 신발이 필수입니다. 맑은 날에는 햇빛에 비친 현무암의 질감과 파란 바다가 대비되어 감탄을 자아냅니다.',
    honyeoTip:
      '출입이 통제될 수 있으니 당일 운영 정보를 미리 확인하고, 입구에서 미끄럼 방지 신발을 착용해 안전하게 이동하세요. 혼자라면 바위 끝까지 한 번 걷고 되돌아오며 사진을 남기는 루틴이 가장 효율적이고, 산방산이나 주변 카페와 코스로 묶으면 반나절 일정이 완성됩니다.',
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
    description:
      '서귀포 시내에 자리한 천지연폭포는 입구부터 폭포까지 산책로가 잘 정리되어 있어 혼자 천천히 걷기 좋습니다. 낮에는 울창한 숲과 시원한 폭포수를, 해가 지고 조명이 켜지면 또 다른 분위기를 감상할 수 있어 하루 두 얼굴을 가진 곳이에요. 계단과 데크 길을 따라 이동해 폭포를 바라보는 전망대까지 도착하면 물안개가 만들어내는 시원한 바람을 느낄 수 있고, 인근에는 올레시장과 이중섭거리가 가까워 산책 후 식사나 쇼핑으로 이어가기 좋습니다. 바닥이 젖은 구간이 있으니 미끄럼에 주의해야 합니다.',
    honyeoTip:
      '해 질 무렵 방문하면 낮과 밤의 분위기를 모두 즐길 수 있어요. 혼자라면 폭포를 보고 난 뒤 올레시장이나 이중섭거리로 이동해 저녁을 해결하면 동선이 깔끔하고, 폭포 주변이 미끄러우니 운동화를 신고 천천히 걸으세요.',
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
    description:
      '쇠소깍은 맑은 계곡물과 바다가 만나는 지점으로 물빛이 독특하게 에메랄드와 코발트색을 띱니다. 짧은 산책로를 따라 걸으며 물길과 숲을 바라보기에 충분하며, 시간 여유가 없을 때도 잠깐 들러 풍경을 즐기기 좋습니다. 테우나 카약 같은 체험 프로그램이 있지만 당일 기상 상황에 따라 운영이 달라지므로 체험 계획보다는 산책을 중심으로 계획하는 것이 안전해요. 남부 해안과 서귀포·표선 라인과 동선이 좋아 하루 코스에 끼워 넣기 편합니다.',
    honyeoTip:
      '혼자라면 카약 등 체험을 무리하게 계획하기보다 산책과 사진 찍기에 집중하는 것이 편해요. 물가 주변은 미끄러운 구간이 있으니 조심해서 걷고, 방문 전 체험 운영 여부를 확인하면 일정이 꼬이는 것을 막을 수 있습니다.',
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
    description:
      '이중섭거리는 화가 이중섭의 이름을 딴 작은 골목으로 소규모 갤러리, 카페, 소품샵이 모여 있는 감성적인 거리입니다. 골목 자체가 아기자기해 혼자 천천히 걸으며 사진을 찍기 좋고, 전시 공간과 상점들이 가깝게 붙어 있어 시간이 자연스럽게 흘러갑니다. 주변의 올레시장과 천지연폭포와 동선이 좋아 하루 동안 서귀포 도심을 둘러보기 좋은 중심지 역할을 하고, 낮과 밤의 분위기가 달라 낮에는 산책과 카페, 밤에는 시장과 야경으로 다른 매력을 느낄 수 있어요. 길이 좁아 주말에는 조금 붐비지만 혼자 걷기엔 큰 불편이 없습니다.',
    honyeoTip:
      '낮에는 골목 곳곳의 갤러리와 카페를 둘러보고, 저녁에는 시장으로 이동해 식사를 해결하면 이동이 최소화돼요. 혼자라면 평일 오후가 비교적 한산해 마음 편하게 산책할 수 있으며, 늦은 시간에는 조명이 어두워지니 밝을 때 이동하는 것이 안전합니다.',
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
    description:
      '우진해장국은 공항과 원도심 사이에 위치해 제주 여행의 첫 끼나 마지막 끼로 자주 들르는 곳입니다. 새벽 6시부터 문을 열어 아침 식사가 가능하고, 고사리와 고기가 든 육개장을 대표 메뉴로 내세워 주문이 단순해 혼자 방문해도 부담이 없어요. 웨이팅이 길기로 유명하지만 포장 주문도 가능해 시간에 쫓기는 여행자에게 유용하며, 주차장이 넓어 접근성이 좋다는 후기도 많습니다. 회전율이 빨라 혼자 앉아도 금방 자리가 나고, 식사 후에는 가까운 동문시장이나 산지천으로 산책을 이어가기 좋습니다.',
    honyeoTip:
      '혼자라면 아침 일찍이나 애매한 시간대(10~11시, 3~5시)에 방문해 대기 시간을 줄이는 것이 좋습니다. 대기가 길다면 포장을 받아 숙소나 해변에서 먹어도 맛이 크게 떨어지지 않고, 식사 후에는 동문시장이나 산지천 산책로로 가볍게 걸으며 소화를 시켜보세요.',
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
    description:
      '전복 내장을 넣은 김밥으로 유명한 포장 전문점으로 메뉴가 단출해 주문이 간단하고, 여행 중 이동하면서 끼니를 해결하기 좋아 혼자 여행객에게 인기가 많습니다. 매장에서 먹을 자리보다 포장 손님이 많아 기다림이 길지 않고, 공항과 가까워 도착 직후나 출발 전에 들러 간편하게 챙기기 좋습니다. 김밥 외에도 간단한 간식이 있어 차 안이나 숙소, 해변에서 먹어도 불편함이 없고, 짭짤한 전복내장과 밥의 조화가 독특해 한 번쯤 맛볼 만한 곳이에요.',
    honyeoTip:
      '공항 이동 동선에 맞춰 들러 포장해 가는 것이 가장 효율적이에요. 혼자라면 긴 대기 시간을 피하기 위해 평일 오전이나 오후 빠른 시간에 방문하는 것이 좋고, 포장한 김밥은 숙소나 바다에서 여유 있게 즐기세요.',
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
    description:
      '올래국수는 돼지고기 국수가 대표 메뉴인 곳으로 메뉴가 단순해 주문과 식사가 빠르게 진행됩니다. 회전율이 높아 혼자 앉아도 금세 자리가 나고 국수 한 그릇으로 든든하게 채울 수 있어 이동이 많은 날에 특히 좋습니다. 현지인과 관광객 모두 찾는 곳이라 대기 줄이 길 때도 있지만, 피크 시간을 피하면 기다림이 길지 않고 근처에 공영주차장이 있어 접근성이 좋아요. 식사 후에는 도두봉이나 이호테우해변 등 공항 근처 코스로 이어가기 편합니다.',
    honyeoTip:
      '점심과 저녁 피크 시간을 피해 오전 늦게나 오후 중간 타임에 방문하면 혼자서도 여유롭게 식사할 수 있어요. 매장이 크지 않아 대기가 길다면 포장 옵션을 고려해 숙소나 해변에서 식사하는 것도 괜찮고, 식사 후 공항 근처 해안도로로 산책을 나가보세요.',
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
    description:
      '자매국수는 다양한 국수류가 있는 식당으로 메뉴가 단순해 혼자 주문하기 쉽고, 한 그릇 식사로 배를 채울 수 있어 일정 중간에 들르기 좋습니다. 대기 시스템이 비교적 명확해 혼자 기다려도 부담이 덜하고, 포장도 가능해 시간이 없다면 테이크아웃으로 해결할 수 있어요. 깔끔한 국수 맛과 무난한 가격 덕분에 혼밥 후기에서 자주 언급되는 곳이며, 공항과도 가까워 동쪽이나 서쪽 일정에 넣기 무리가 없습니다.',
    honyeoTip:
      '브레이크 타임 여부를 미리 확인하고 방문하는 것이 좋습니다. 대기가 길 때는 포장 주문을 고려해 일정을 맞추고, 식사 후에는 가까운 카페나 해안도로로 이동해 여유를 즐겨보세요.',
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
    description:
      '성산일출봉과 섭지코지 사이에 위치한 맛나식당은 한식을 중심으로 한 단출한 메뉴를 제공해 주문이 어렵지 않습니다. 여행자들이 동쪽 코스를 돌며 식사하기 좋은 위치라 혼자 들러도 눈치 보지 않고 식사할 수 있고, 후기에 “혼자 방문했다”는 언급이 많아 혼밥 난이도가 낮아요. 회전이 빠른 편이라 대기가 길지 않지만, 피크 시간에는 줄이 생길 수 있으므로 시간 조절이 필요합니다. 식사 후 바로 해변이나 카페로 이동하기 쉬워 코스 짜기에도 편리합니다.',
    honyeoTip:
      '오픈 직후에 방문하면 대기 시간이 짧고 원하는 자리에 앉기 쉽습니다. 식사를 마친 뒤에는 성산항이나 섭지코지 방면으로 이어지는 산책 루트를 붙여 하루의 흐름을 자연스럽게 이어보세요.',
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
    description:
      '성산항과 가까운 바다 앞에 위치한 식당으로 해산물 단품 메뉴가 중심이어서 혼자 주문이 어렵지 않습니다. 통유리창 너머로 바다를 바라보며 식사할 수 있어 식사 자체가 여행 콘텐츠가 되고, 성산·우도 라인과 가까워 이동 스트레스가 적어요. 후기에서 재방문 언급이 많을 만큼 맛과 분위기가 안정적이며, 혼자 방문해도 직원들의 응대가 친절해 편안하게 식사를 즐길 수 있습니다.',
    honyeoTip:
      '주문은 많지 않은 메뉴 중에서 1~2가지로 간단히 즐기고, 식사 후 해안 산책로를 따라 걷거나 근처 카페에서 바다를 감상하면 만족도가 높아요. 인기 있는 메뉴는 일찍 품절될 수 있으니 점심시간 이전에 방문하는 것이 좋습니다.',
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
    description:
      '건축가 안도 다다오가 설계한 유리 건물로 통유리 너머로 성산 앞바다를 바라볼 수 있어 시선이 자연스럽게 바깥으로 향합니다. 좌석 사이 간격이 넓어 혼자 앉아도 눈치 보이지 않고, 내부와 외부 곳곳에 포토존이 있어 건축미와 자연을 함께 담을 수 있어요. 섭지코지와 성산일출봉 사이에 위치해 산책 후 잠시 들러 휴식을 취하기 좋고, 건물 자체가 큰 볼거리라 커피를 마시며 멍 때리기에 안성맞춤입니다. 노을이 지는 시간에는 유리창으로 붉은 빛이 들어와 또 다른 분위기를 만끽할 수 있습니다.',
    honyeoTip:
      '노을을 즐기고 싶다면 조금 일찍 도착해 창가 자리를 확보하는 것이 좋습니다. 산책 후 땀을 식히거나 일정을 정리하는 중간 휴식 포인트로 활용하면 좋고, 성산일출봉이나 섭지코지와 묶어 하루 일정을 구성하면 동선이 효율적입니다.',
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
    description:
      '함덕해변 바로 앞에 자리한 대형 카페로 층마다 좌석이 넉넉해 혼자 방문해도 자리 찾기가 수월합니다. 창가에서 바라보는 에메랄드빛 바다와 하얀 모래사장이 한눈에 들어와 커피 한 잔과 함께 멍 때리기 좋은 장소이고, 실내·외 공간이 분리되어 있어 날씨에 따라 선택할 수 있어요. 규모가 크고 동선이 단순해 주문부터 착석까지 스트레스가 적으며, 해변 산책로와 바로 이어져 있어 “해변 산책 → 카페 휴식” 루틴을 만들기 좋습니다. 다만 주말과 휴가철에는 창가 자리가 금방 차니 시간대를 잘 맞추는 것이 좋습니다.',
    honyeoTip:
      '창가 자리를 원한다면 오픈 직후나 평일 낮 시간대를 노리는 것이 가장 안정적이에요. 커피를 마신 후 해변을 다시 걸어보거나 근처 카페거리에서 다른 분위기의 카페를 탐방해보는 것도 좋은 방법입니다.',
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
    description:
      '애월 해안도로에 위치한 카페 봄날은 바다를 바라볼 수 있는 감성 좌석과 외관의 포토존으로 유명합니다. 건물 주변과 정원이 잘 꾸며져 있어 혼자 삼각대를 세워 사진을 찍기 좋고, 내부 좌석도 적당히 떨어져 있어 바다를 보며 커피를 즐기기에 편안해요. 한담해안산책로와 가까워 산책을 이어가기 좋지만 주말에는 좌석 경쟁이 치열할 수 있으니 시간대를 잘 선택해야 합니다. 붕붕이 소품 등 사진 소품도 구비되어 있어 재미있게 시간을 보낼 수 있습니다.',
    honyeoTip:
      '혼자라면 오픈 시간에 맞춰 들러 사람들이 몰리기 전에 사진과 커피를 해결하는 것을 추천해요. 카페를 즐긴 후에는 한담해안산책로로 이동해 바다를 바라보며 산책을 하거나 애월의 다른 카페를 탐방해보세요.',
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
    description:
      '몽상드애월은 큰 통유리로 바다와 하늘이 그대로 들어오는 카페로, 내부가 넓고 좌석이 다양해 혼자 앉기에도 편안합니다. 해안도로와 가까워 드라이브 중 잠시 들르기 좋고, 바 좌석이나 창가 자리는 혼자 시간을 보내기에 안성맞춤입니다. 곳곳에 독창적인 인테리어와 포토존이 있어 사진을 남기기 좋지만 주말과 성수기에는 대기 시간이 생길 수 있습니다. 커피 외에도 간단한 디저트를 판매해 간식으로도 손색없어요.',
    honyeoTip:
      '평일 낮이나 아침 시간대에 방문하면 비교적 조용한 분위기에서 바다를 바라볼 수 있습니다. 짧게 머물 계획이라면 근처 한담해안산책로로 이동해 산책을 이어가면 감성 있는 코스가 완성돼요.',
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
    summary: '커피와 위스키를 함께 즐기는 커피바, 혼자 앉기 좋은 바테이블',
    description:
      '낮에는 커피바, 밤에는 위스키바로 변신하는 공간으로 시간대에 따라 다른 분위기를 느낄 수 있습니다. 바테이블이 중심인 구조라 혼자 앉아도 어색하지 않고, 조용한 음악과 은은한 조명 덕분에 혼자 생각을 정리하거나 책을 읽기에 좋은 분위기예요. 커피와 위스키 모두 퀄리티가 높다는 후기가 많고, 바텐더와의 대화도 부담 없이 즐길 수 있어 혼술 입문에도 무리가 없습니다.',
    honyeoTip:
      '혼자 방문할 때는 바테이블을 선택하면 주문과 동선이 자연스럽습니다. 낮에는 커피 한 잔으로 시작하고, 밤에는 위스키 한 잔으로 하루를 마무리하며 인근 산지천이나 원도심 산책과 묶어보세요.',
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
    description:
      '젠칸투스는 LP로 음악을 들려주는 와인바로, 조용한 조도와 따뜻한 나무 인테리어가 어우러져 차분한 분위기를 자아냅니다. 바 좌석과 작은 테이블이 있어 혼자 와인 한 잔을 즐기기에 부담이 없고, 음악과 함께 시간을 보내다 보면 혼자임을 잊을 정도로 편안해요. 다양한 와인 리스트와 간단한 안주가 준비되어 있어 취향에 따라 선택할 수 있으며, 후기에서는 혼자 앉기 좋은 자리와 편안한 분위기가 장점으로 꼽힙니다.',
    honyeoTip:
      '오픈 직후 방문하면 원하는 자리를 고를 수 있고, 너무 늦은 시간에는 만석일 수 있으니 일정 초반에 들르는 것이 좋아요. 와인 1~2잔 정도로 가볍게 즐기고 귀가 동선을 미리 정해두면 마음이 편안합니다.',
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
    description:
      '광장은 혼자 술을 즐기는 콘셉트로 꾸며진 칵테일바로, 바텐더가 대화를 강요하지 않아 혼자 방문하는 손님들이 편안하게 술을 즐길 수 있습니다. 칵테일과 하이볼 중심의 메뉴가 부담 없고, 적당히 어두운 조명과 잔잔한 음악이 혼자만의 시간을 더욱 깊게 만들어줘요. 좌석이 많지 않아 피크 시간에는 금방 만석이 되지만 평일이나 이른 시간에는 여유롭게 자리를 잡을 수 있습니다.',
    honyeoTip:
      '평일 밤이나 오픈 시간대에 방문하면 혼자서도 안정적으로 자리를 잡을 수 있어요. 1~2잔 정도로 가볍게 즐기면 좋고, 바텐더와 이야기하고 싶을 때는 부담 없이 말을 걸어보세요.',
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
    description:
      '맥파이는 제주를 대표하는 수제맥주 브랜드로, 탭룸에서는 직접 양조한 다양한 맥주를 한 잔씩 맛볼 수 있습니다. 캐주얼한 분위기라 혼자 들러도 부담이 없고, 바 좌석과 스탠딩 테이블이 있어 혼술 진입장벽이 낮습니다. 오후 시간대에도 운영해 관광 후 잠깐 들러 맥주를 즐기기 좋고, 맥주와 함께 가벼운 안주 메뉴도 준비되어 있어 간단하게 배를 채울 수 있어요. 제주 로컬 감성을 느껴보고 싶은 맥주 애호가라면 꼭 한 번 방문할 만한 곳입니다.',
    honyeoTip:
      '혼자라면 스탠딩이나 바 좌석을 선택하면 주문과 착석이 편합니다. 여러 잔을 시도하기보다는 취향에 맞는 두세 가지를 맛본 후 다음 일정에 영향을 주지 않도록 가볍게 즐기세요.',
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
    description:
      '더 부즈 제주는 위스키와 하이볼을 중심으로 한 조용한 바입니다. 어두운 조명과 바 중심 구조 덕분에 혼자 앉아도 어색하지 않고, 바텐더가 필요한 경우에만 다가와줘 혼술 초보자도 편안하게 시간을 보낼 수 있어요. 다양한 위스키를 취향에 맞게 선택할 수 있고, 적당한 음악과 함께 비밀 아지트 같은 분위기를 느낄 수 있습니다. 신제주 지역에 위치해 주변 식당과 카페와 연계하기 좋은 점도 장점입니다.',
    honyeoTip:
      '혼자라면 1~2잔 정도로 가볍게 즐기고, 금요일과 주말에는 만석이 될 수 있으니 평일 방문을 고려하거나 오픈 시간대에 맞춰 가는 것을 추천해요.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '제주특별자치도 제주시 노형11길 5-4',
    lat: 33.4841320041765,
    lng: 126.479028832389,
    externalUrl: 'https://place.map.kakao.com/857455861',
    tagSlugs: ['solo-drinking', 'thinking', 'nightview'],
  },
];
