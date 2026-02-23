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
      '700여 채의 한옥이 이어지는 마을은 구역이 넓어서 혼자 걸어도 심심하지 않아요. 큰 길과 골목마다 카페, 소품샵, 한복 대여점, 사진 스팟이 이어져 발길 닿는 대로 산책하는 재미가 있고, 낮에는 한복 체험과 먹거리로 활기가 넘치지만 밤이 되면 조명이 켜져 한옥지붕이 다른 분위기를 보여줘요. 입장료 없이 24시간 열려 있어 아침 일찍이나 늦은 밤에도 자유롭게 둘러볼 수 있고, 걸어 다닐 거리가 길어 편한 신발을 준비하는 게 좋아요. 한옥마을 중심에서 경기전과 전동성당, 오목대까지 도보로 연결돼 동선을 단순하게 짤 수 있어 혼자 여행에도 잘 맞습니다.',
    honyeoTip:
      '아침 9~10시쯤 가장 여유롭고 한옥마을 앞 전동성당은 10~11시에 빛이 순해 사진이 예쁘게 나와요. 한옥 지붕 위로 노을이 비치는 밤 산책까지 염두에 두고 “한옥마을 산책 → 경기전·성당 → 카페 → 야경” 순서로 코스를 구성하면 혼자서도 하루가 알차요.',
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['jeonju']['jeonju-hanok-village'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-최용',
    address: '전라북도 전주시 완산구 기린대로 99',
    lat: 35.8182133310179,
    lng: 127.153608497904,
    externalUrl:
      'https://access.visitkorea.or.kr/opentour/detail.do?cotId=c691150a-d8b4-4cf0-9a6b-c8ed0dd3c0c6',
    tagSlugs: ['culture', 'walking', 'emotional', 'oneday'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'gyeonggijeon',
    name: '경기전',
    summary: '대나무길 한 컷, 고즈넉한 공기 속 혼자 걷는 역사 산책',
    description:
      '태조 이성계의 어진을 모신 공간으로 한옥마을 안쪽에 있어서 걸어가기가 편해요. 돌담과 대나무 숲길, 홍살문을 지나면 울창한 수목이 만든 그늘 덕분에 여름에도 시원하고, 비 온 다음날에는 돌길과 기와담장이 더 운치 있어요. 작은 비자림 같은 대나무 숲이 마련돼 있어 바람에 흔들리는 잎사귀 소리를 들으며 잠시 멈춰 서기 좋고, 일방향 동선이라 혼자 둘러볼 때 헤맬 일이 거의 없어요. 관람을 마치고 나와서 바로 이어진 홍백나무 길을 걸으면 여름엔 배롱나무 꽃 터널이 이어져 사진 찍기 좋은 포인트가 많습니다.',
    honyeoTip:
      '한옥마을을 둘러본 뒤 오전에 들르면 사람이 적어 천천히 걷기 좋아요. 한옥카페나 베이커리와 가까워 “경기전 산책 → 카페 휴식”으로 끊어가면 혼자 여행의 리듬이 무너지지 않아요.',
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['jeonju']['gyeonggijeon'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-IR스튜디오',
    address: '전라북도 전주시 완산구 태조로 44',
    lat: 35.8155189138776,
    lng: 127.150120200082,
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=63f4bf53-5dbb-46aa-8167-3241f2069318',
    tagSlugs: ['culture', 'walking', 'healing', 'emotional'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'jaman-mural-village',
    name: '자만벽화마을',
    summary: '언덕 골목 감성, 혼자 천천히 올라가는 포토 산책',
    description:
      '승암산 기슭의 오래된 마을을 2012년부터 주민들과 작가들이 벽화를 그려 넣어 색감이 살아 있는 골목이 되었어요. 한옥마을 맞은편 언덕에 있어 계단을 오르내리며 천천히 걷는 재미가 있고, 집집마다 만화 캐릭터나 꽃무늬 등 다양한 벽화가 그려져 있어 혼자도 사진 포인트를 찾기 쉬워요. 전망이 좋은 옥상 정원에서 전주시내와 한옥 지붕을 바라볼 수 있고, 작은 카페와 게스트하우스도 들어서 있어 잠시 쉬어가기 좋아요. 오목대와 임목대를 잇는 산책길과 이어져 있어 코스를 확장하기 쉽습니다.',
    honyeoTip:
      '노을이 질 무렵에는 골목에 조명이 들어와 분위기가 한층 더 따뜻해져요. 언덕과 계단이 많아 미끄러지지 않는 신발을 신고, 소음이 적은 동네이니 주민들을 배려하면서 천천히 산책하면 좋아요.',
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['jeonju']['jaman-mural-village'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-김지호',
    address: '전라북도 전주시 완산구 교동 50-158',
    lat: 35.8140015134659,
    lng: 127.157200715702,
    externalUrl:
      'https://tour.jeonju.go.kr/board/view.jeonju?boardId=BBS_0000003&menuCd=DOM_000000101006003000&paging=ok&startPage=1&dataSid=16022',
    tagSlugs: ['emotional', 'walking', 'hidden', 'oneday'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'omokdae',
    name: '오목대',
    summary: '한옥마을 지붕 라인 한눈에, 혼자 노을 멍 때리기',
    description:
      '한옥마을 뒤편 언덕길을 따라 나무 데크와 계단을 올라가면 오목대 정자에 도착해요. 크지 않은 정자지만 탁 트인 전망대에서 한옥 지붕이 겹쳐 보이는 풍경을 내려다볼 수 있어 잠깐의 오르막을 감수할 만합니다. 정자 주변에는 벤치가 있어 혼자 앉아 바람을 맞으며 멍 때리기 좋고, 일몰 즈음에는 서쪽 하늘이 물들어 사진을 찍기 좋은 시간이 돼요. 오목대에서 내려와 바로 자만벽화마을이나 임목대 쪽으로 연결되는 산책로가 있어 짧은 코스로 묶기 편합니다.',
    honyeoTip:
      '일몰 30~40분 전에 올라가면 지붕 위로 떨어지는 빛을 여유 있게 감상할 수 있어요. 바람이 차가울 수 있으니 얇은 겉옷을 챙기고, 정자에서 내려올 때 계단이 미끄러울 수 있어 천천히 움직이면 안전합니다.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeonju']['omokdae'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-디엔에이스튜디오',
    address: '전라북도 전주시 완산구 기린대로 55',
    lat: 35.8144023799218,
    lng: 127.154570677765,
    externalUrl:
      'https://tour.jeonju.go.kr/board/view.jeonju?menuCd=DOM_000000101006001000&boardId=BBS_0000003&contentsSid=1738&paging=ok&startPage=1&dataSid=9742',
    tagSlugs: ['nightview', 'walking', 'healing', 'thinking'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'gaekridan-gil',
    name: '객리단길',
    summary: '전주 핫플 밀집, 혼자도 자연스러운 카페·바 거리',
    description:
      '옛 전주객사 뒤편 골목길이 몇 년 사이 젊은 사장들의 카페와 작은 가게들로 채워지면서 “객리단길”이라는 별칭을 얻었어요. 프랜차이즈보다 개인이 꾸민 식당, 편집숍, 바가 모여 있어 골목을 돌다 마음에 드는 곳에 들어가는 재미가 있고, 저녁이 되면 조명이 켜지면서 낮과 다른 분위기가 납니다. 인근 영화의 거리와 이어져 있어 영화관과 서점, 레코드 숍을 함께 둘러볼 수 있고, 번화가지만 골목 폭이 좁아 혼자 걸어도 부담이 적어요. 주말엔 대기가 길지만 평일 오후에는 한적해 혼자 천천히 카페 세 곳쯤 옮겨 다녀도 좋습니다.',
    honyeoTip:
      '평일 오후 3시쯤부터 여유가 있어 “카페 한 곳 → 소품샵 한 곳 → 저녁 식사”처럼 코스를 짜면 알차요. 밤에는 젊은이들이 많아 붐비니 늦은 시간보다는 이른 저녁에 들르는 게 혼자 여행자에겐 편합니다.',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['jeonju']['gaekridan-gil'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사',
    address: '전라북도 전주시 완산구 중앙동2가 10-1',
    lat: 35.8176211005514,
    lng: 127.143707160094,
    externalUrl:
      'https://tour.jeonju.go.kr/index.jeonju?menuCd=DOM_000000112002006000',
    tagSlugs: ['cafe', 'emotional', 'shopping', 'solo-drinking'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'jeondong-cathedral',
    name: '전동성당',
    summary: '벽돌 성당 한 컷, 한옥마을 옆에서 만나는 영화 같은 풍경',
    description:
      '한옥마을 입구에 세워진 붉은 벽돌 성당으로 프랑스 로마네스크 양식과 비잔틴 양식이 어우러져 건축미가 돋보여요. 1890년대에 세워진 성당은 광장과 함께 열려 있어 누구나 자유롭게 드나들 수 있고, 영화 촬영지로도 유명해 사진 찍으러 오는 사람이 많습니다. 낮에는 햇빛을 받는 벽돌이 따뜻한 느낌을 주고, 해 질 무렵에는 그림자와 함께 차분한 분위기가 내려앉아 산책하기 좋아요. 경기전과 풍남문, 남부시장까지 걸어서 이어지는 거리에 있어 코스를 이어가기 쉽습니다.',
    honyeoTip:
      '사람이 몰리기 전인 오전 10~11시쯤 도착하면 성당 벽면에 부드러운 햇빛이 내려 사진이 예쁘게 나와요. 붐비는 시간에는 광장 바깥쪽에서 구도를 잡으면 편하고, 성당을 본 뒤 풍남문과 시장으로 이어가면 자연스러운 동선이 됩니다.',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['jeonju']['jeondong-cathedral'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-김찬영',
    address: '전라북도 전주시 완산구 태조로 51',
    lat: 35.8132038044753,
    lng: 127.149574658463,
    externalUrl:
      'https://tour.jeonju.go.kr/board/view.jeonju?menuCd=DOM_000000101006001000&boardId=BBS_0000003&contentsSid=1738&paging=ok&startPage=1&dataSid=9752',
    tagSlugs: ['culture', 'emotional', 'walking', 'oneday'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'pungnammun-gate',
    name: '전주 풍남문',
    summary: '도심 한복판 성문, 야경 산책에 포인트가 되는 곳',
    description:
      '전주성의 남문으로 남아 있는 풍남문은 1768년에 중건된 전라 감영의 관문 역할을 했던 성문입니다. 성문 주변은 원도심 한복판으로 지금은 차도와 교차하지만, 성문이 남아 있어 잠시 머물며 역사적 분위기를 느낄 수 있어요. 밤에는 조명이 켜져 옛 성문의 형태가 선명하게 드러나고 사진도 잘 나오며, 바로 옆의 남부시장과 한옥마을과 이어져 동선을 잡기 쉽습니다. 성문 앞은 차량 통행이 있으니 도로를 건널 때는 신호를 잘 지켜야 합니다.',
    honyeoTip:
      '해가 지는 시간대에 가면 조명이 들어오는 성문과 주위의 야경을 함께 볼 수 있어요. “풍남문 → 남부시장 야시장 → 객리단길”로 저녁 동선을 이어가면 혼자서도 꽉 찬 저녁이 됩니다.',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['jeonju']['pungnammun-gate'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-황성훈',
    address: '전라북도 전주시 완산구 풍남문3길 1',
    lat: 35.8134931559396,
    lng: 127.147567911694,
    externalUrl:
      'https://tour.jeonju.go.kr/board/view.jeonju?menuCd=DOM_000000101006001000&boardId=BBS_0000003&contentsSid=1738&paging=ok&startPage=1&dataSid=9746',
    tagSlugs: ['walking', 'nightview', 'oneday', 'culture'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'hanbyeokdang-pavilion',
    name: '한벽당',
    summary: '전주 8경 감성, 강바람 맞으며 혼자 쉬기 좋은 정자',
    description:
      '전주천을 내려다보는 산기슭에 자리한 한벽당은 조선시대 학자 최기남의 별서로 전주 8경 가운데 하나로 꼽힐 만큼 경관이 뛰어나요. 정자에 앉으면 강과 도심, 멀리 전주천 둔치가 한눈에 들어와 바람을 맞으며 머리를 비우기 좋고, 아침 안개나 저녁 노을이 깔릴 때 특히 아름답습니다. 오목대·임목대에서 이어지는 산책로를 따라 가면 자만벽화마을을 지나 이곳에 도착할 수 있어 코스를 자연스럽게 엮을 수 있어요. 한적한 공간이라 혼자 간단한 간식과 물을 챙겨 천천히 머물다 오기에 좋습니다.',
    honyeoTip:
      '산책 중 휴식 포인트로 잠시 들러 10~20분 정도 앉아 있으면 마음이 가라앉아요. 바람이 불어 선선하니 겉옷을 챙기는 것이 좋고, 계단이 가파른 곳이 있어 신발 끈을 단단히 하고 천천히 움직이면 안전합니다.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeonju']['hanbyeokdang-pavilion'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이범수',
    address: '전라북도 전주시 완산구 기린대로 2',
    lat: 35.8118872288499,
    lng: 127.160824666268,
    externalUrl:
      'https://tour.jeonju.go.kr/board/view.jeonju?menuCd=DOM_000000101006001000&boardId=BBS_0000003&contentsSid=1738&paging=ok&startPage=1&dataSid=9741',
    tagSlugs: ['healing', 'walking', 'thinking', 'nightview'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'jeonjucheon-river',
    name: '전주천',
    summary: '물길 따라 걷는 힐링, 혼자 걷기 딱 좋은 전주 산책길',
    description:
      '전주 도심을 가로지르는 전주천에는 산책로와 자전거도로가 잘 갖춰져 있어 혼자 걷거나 뛰기 좋아요. 강변엔 버드나무와 벚나무가 늘어서 있어 봄에는 벚꽃, 가을에는 억새와 물빛의 변화에 따라 같은 길도 다른 풍경을 보여주고, 곳곳에 벤치와 쉼터가 있어 지치면 잠시 앉아 쉴 수 있습니다. 주변 주민들은 생태와 문화 공간으로 활용하며 음악 공연이나 플리마켓 등이 열리는 경우도 있어 혼자 들르면 지역 분위기를 느끼기 좋아요. 한옥마을 근처 구간은 관광 동선과 바로 연결돼 산책 루트를 만들기 쉽습니다.',
    honyeoTip:
      '해 질 무렵이나 아침 이른 시간대가 가장 한적해요. “한옥마을 → 한벽굴·자만벽화마을 → 전주천 산책”으로 이어가면 자연스럽고, 긴 산책을 할 땐 물을 챙기고 편한 운동화를 신으면 더 즐거워요.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['jeonju']['jeonjucheon-river'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이범수',
    address: '전라북도 전주시 완산구 완산동 73-11',
    lat: 35.8116362522319,
    lng: 127.145973043834,
    externalUrl:
      'https://tour.jeonju.go.kr/board/view.jeonju?menuCd=DOM_000000101006001000&boardId=BBS_0000003&contentsSid=1738&paging=ok&startPage=1&dataSid=9745',
    tagSlugs: ['walking', 'healing', 'nature', 'stress-relief'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'jeonju-nambu-market',
    name: '전주 남부시장',
    summary: '시장 먹거리 투어, 혼자도 부담 없이 즐기는 전주 로컬 코스',
    description:
      '풍남문 옆에 자리한 남부시장은 낮에는 반찬, 과일, 공산품 등 다양한 상점이 늘어선 재래시장이고, 금·토요일 밤엔 야시장으로 변해 40여 개의 음식 노점과 버스킹 공연이 펼쳐집니다. 좁은 골목 안에 전주식 피순대, 수제 맥주, 해외 음식을 파는 노점이 늘어서 있어 혼자 가도 한두 가지씩 골라 먹으며 걷기 좋고, 계절에 따라 분식과 전통 먹거리부터 퓨전 메뉴까지 다양해요. 시장 건물 2층에는 젊은 상인들이 모인 청년몰이 있어 소품숍과 카페를 구경하기 좋고, 바로 옆 풍남문과 한옥마을까지 이어지는 동선이라 금세 다른 장소로 이동할 수 있습니다.',
    honyeoTip:
      '금요일과 토요일 저녁에는 야시장이 열려 음식과 공연을 함께 즐길 수 있으니 현금을 조금 챙겨가면 편해요. 혼자라면 배불리 먹기보다 한두 가지 맛만 보고 남부시장-풍남문-객리단길로 이어가면 과식하지 않고 동선이 자연스러워요.',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['jeonju']['jeonju-nambu-market'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-니오타니스튜디오',
    address: '전라북도 전주시 완산구 풍남문1길 19-3',
    lat: 35.8127859743493,
    lng: 127.147537060132,
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
      '객사길과 이어지는 번화가 일대를 “전주 영화의 거리”라 부르는데, 영화관과 카페, 음식점, 숍이 한데 모여 있어 혼자 시간을 보내기 좋은 곳이에요. 매년 전주국제영화제가 열리는 동안에는 거리 전체가 축제 분위기로 바뀌고, 그 외 평소에도 독립영화관과 소규모 상영관이 있어 영화를 보고 바로 옆 카페에서 여운을 즐기기 좋아요. 네온 간판이 켜지는 밤엔 화려하면서도 과하지 않은 분위기로 사진도 잘 나오고, 바로 근처의 객리단길과 연계해 카페와 숍을 함께 둘러보면 알찬 오후를 보낼 수 있습니다. 큰 도로에 인접해 있어 늦은 시간에도 비교적 안전하게 움직일 수 있어 혼자 산책하기 무리 없어요.',
    honyeoTip:
      '영화 한 편과 커피 한 잔을 코스로 묶으면 “영화의 거리”의 매력을 천천히 느낄 수 있어요. 주말 밤에는 인파가 많아 평일이나 저녁 전 시간대를 노리면 혼자 앉을 자리 찾기가 수월합니다.',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['jeonju']['jeonju-film-street'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-조영권',
    address: '전라북도 전주시 완산구 전주객사3길 22',
    lat: 35.818360772715,
    lng: 127.14271712521,
    externalUrl:
      'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=9c27799a-ec07-44f6-b605-92a5462127ba',
    tagSlugs: ['culture', 'walking', 'nightview', 'oneday'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'korean-traditional-culture-center',
    name: '한국전통문화전당',
    summary: '전통+전시+체험, 혼자 가도 채워지는 문화 시간',
    description:
      '한국전통문화전당은 전통 공예와 한지, 한복, 음식 등을 주제로 한 전시와 체험 프로그램을 운영하는 문화 시설이에요. 실내 공간이라 날씨에 영향을 받지 않고, 한옥마을과 도보로 가까워 혼자 여행 도중 들러도 부담이 적습니다. 상설 전시는 물론 사전 예약이 필요한 체험 프로그램도 있어 초보자도 가볍게 한지 공예나 한복 입어보기 등을 시도할 수 있고, 관람을 마친 뒤엔 주변 카페나 시장으로 금방 이동할 수 있어요. 전통문화 전당 주변에는 전주부성 터와 전라감영 등 역사적 장소가 있어 산책하며 이어가기 좋습니다.',
    honyeoTip:
      '방문 전 홈페이지에서 원하는 체험 프로그램이 있는지 확인하고 예약하면 시간을 더 알차게 쓸 수 있어요. 전시 하나만 보고 바로 주변을 산책해도 만족도가 높으니 혼자라면 짧게 끊어가는 것도 추천입니다.',
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['jeonju']['korean-traditional-culture-center'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사',
    address: '전라북도 전주시 완산구 현무1길 20',
    lat: 35.8205463417058,
    lng: 127.148217143505,
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
      '칼국수 한 그릇으로 유명한 곳으로 한옥마을 근처에 있어 이동 동선이 좋고, 메뉴가 몇 가지 안 돼 주문부터 식사까지 흐름이 빠릅니다. 작은 테이블에서 바로 식사가 이뤄져 혼자 방문해도 어색함이 적고 회전율이 높아 줄이 길어도 빠르게 줄어드는 편입니다. 국물이 진하고 면이 부드러워 체력 회복용 한 끼로 적당해 여행 중 부담 없이 먹기 좋고, 점심시간엔 여행객과 현지인이 몰려 활기가 넘칩니다.',
    honyeoTip:
      '혼자라면 점심 피크(12~13시)를 피해 오전 11시나 오후 2~4시쯤 방문하면 줄을 크게 서지 않아 편해요. 식사 후 한옥마을이나 근처 카페로 바로 이동해 소화를 겸한 산책을 즐기면 코스가 자연스럽습니다.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '전라북도 전주시 완산구 경기전길 135',
    lat: 35.8134321438362,
    lng: 127.151549622353,
    externalUrl: 'https://place.map.kakao.com/15482458',
    tagSlugs: ['solo-eating', 'culture', 'oneday'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'hyundaiok',
    name: '현대옥 전주본점',
    summary: '콩나물국밥 한 그릇, 혼자 먹기 가장 쉬운 전주 아침',
    description:
      '전주에서 유명한 콩나물국밥집으로 아침부터 문을 열어 여행 첫 끼로 많이 찾는 곳이에요. 한 사람씩 먹기 좋은 그릇에 밥과 국이 담겨 나와 혼자 방문해도 주문이 쉽고, 파김치와 수란을 곁들여 먹는 방법까지 테이블에 안내돼 있어 처음 먹어보는 사람도 편합니다. 식당 규모가 크지 않아 점심시간에는 줄이 생기지만 회전이 빨라 대기가 길지 않고, 한옥마을과 시장에 가까워 아침을 먹고 곧바로 관광으로 이어가기 좋아요.',
    honyeoTip:
      '아침 8~10시대가 가장 한가하니 일정 시작 전에 들르면 여유 있게 먹을 수 있어요. 푹 끓인 콩나물국밥을 먹고 나면 속이 든든하니 곧장 한옥마을 산책이나 시장 투어를 시작하기 좋아요.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '전라북도 전주시 완산구 풍남문2길 63',
    lat: 35.8124206430671,
    lng: 127.146546528754,
    externalUrl: 'https://place.map.kakao.com/8153907',
    tagSlugs: ['solo-eating', 'culture', 'oneday'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'gyodong-tteokgalbi',
    name: '교동떡갈비',
    summary: '한옥마을 근처 든든한 한 끼, 1인도 가능한 떡갈비',
    description:
      '떡갈비와 백반으로 유명한 식당으로, 한옥마을과 가깝기 때문에 관광 중 배를 든든하게 채우기 좋습니다. 1인 메뉴 선택이 가능해 혼자도 부담 없이 주문할 수 있고, 불판에 구운 떡갈비와 반찬 구성이 푸짐해 걸어 다니느라 허기질 때 좋습니다. 내부가 넓은 편이라 혼자 앉을 자리 찾기도 어렵지 않지만, 점심과 저녁 시간에는 기다릴 수 있으니 시간대를 조금 조절하는 게 좋아요.',
    honyeoTip:
      '혼자라면 점심 피크 전인 11시경이나 오후 3시쯤 방문하면 비교적 한가해요. 식사 후에는 경기전과 전동성당까지 걸어서 5~10분 정도라 소화 겸 산책 코스로 이어가면 좋습니다.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '전라북도 전주시 완산구 은행로 52',
    lat: 35.8153461526783,
    lng: 127.152261652914,
    externalUrl: 'https://place.map.kakao.com/12307116',
    tagSlugs: ['solo-eating', 'oneday', 'walking'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'geumam-myeonok',
    name: '금암면옥',
    summary: '객리단길 근처 든든한 한 끼, 혼자도 무난한 분위기',
    description:
      '객리단길 근처에 있는 국수집으로 오랜 세월 영업해온 곳이라 지역 주민 사이에서 평이 좋은 편입니다. 담백한 육수와 푸짐한 냉면·온면이 대표 메뉴라 혼자 여행 중 간단히 한 끼 해결하기 좋고, 내부가 소박해 혼자 들어가도 부담이 덜합니다. 먹고 나서 바로 영화의 거리나 객리단길 산책으로 이어가기 좋은 위치라 한 끼 먹으며 휴식 겸 동선을 정리하기 좋습니다.',
    honyeoTip:
      '이른 점심 시간대에 방문하면 대기 없이 편안하게 식사할 수 있어요. 식사 후에는 주변 번화가를 천천히 걸으며 카페나 숍을 둘러보며 소화시키기 좋습니다.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '전라북도 전주시 완산구 전주객사4길 47',
    lat: 35.8197462690239,
    lng: 127.143407787186,
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
      '전라감영길에 위치한 대형 카페로 층고가 높고 좌석이 많아 혼자 커피를 마시며 머물기 좋은 곳이에요. 내부가 널찍해 다른 테이블과 거리가 있어 시선이 분산되고, 조용한 음악이 흘러 주변 소음이 적어 독서나 노트 정리하기에 좋습니다. 객사와 구도심 산책 동선과 가깝고, 한옥마을과 이어지는 길목에 있어 잠시 쉬어가기에도 편합니다. 혼자 오래 앉아 있는 손님이 많다는 후기가 있어 눈치 보지 않고 휴식할 수 있어요.',
    honyeoTip:
      '평일 오후 2~5시가 가장 쾌적하니 산책 중 잠시 들러 카페인 충전하거나 노트 정리를 해보세요. 커피를 마신 후 영화의 거리나 객리단길로 이어 가면 동선이 잘 맞습니다.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '전라북도 전주시 완산구 전라감영4길 16-7 3층',
    lat: 35.8170516309091,
    lng: 127.144877851915,
    externalUrl: 'https://place.map.kakao.com/1851904708',
    tagSlugs: ['cafe', 'thinking', 'stress-relief', 'oneday'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'haengwon-hanok-cafe',
    name: '한옥카페 행원',
    summary: '마당 뷰 한옥카페, 혼자 조용히 쉬기 좋은 공간감',
    description:
      '풍남문 인근에 자리한 한옥카페로 마당이 보이는 창문과 방석을 깐 좌식 공간이 매력적입니다. 신발을 벗고 들어가는 좌석도 있어 느긋하게 앉아 있을 수 있고, 전통 한옥의 목재와 감성 덕분에 밖에서 바라보는 한옥마을의 분위기를 오래 느끼기에 좋아요. 한옥마을과 도보 거리에 있어 걷다 지쳤을 때 들러 차 한 잔 마시며 휴식하기 좋고, 실내외의 좌석이 다양해 혼자 방문해도 자리 선택이 편합니다.',
    honyeoTip:
      '창가나 마당을 바라볼 수 있는 자리에서 차를 마시면 한옥 감성이 한층 더 살아나요. 주말엔 손님이 많아 평일 방문을 추천하고, 한옥마을 산책 중 잠시 앉아 책을 읽거나 생각 정리하기에 좋은 곳입니다.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '전라북도 전주시 완산구 풍남문3길 12',
    lat: 35.8143354039959,
    lng: 127.147551766032,
    externalUrl: 'https://place.map.kakao.com/8678642',
    tagSlugs: ['cafe', 'emotional', 'walking', 'healing'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'chagyeong-hanok-cafe',
    name: '한옥카페 차경',
    summary: '한옥 감성+디저트, 혼자도 안정적인 좌석 구성',
    description:
      '경기전길에 위치한 한옥카페로, 전통 가옥 특유의 기와지붕과 마루가 그대로 보존돼 있어 사진이 잘 나옵니다. 내부는 현대적인 감각으로 단정하게 꾸며져 편안하게 머물 수 있고, 음료와 함께 한식 디저트를 맛볼 수 있어 산책 중 “중간 쉼표”로 적당해요. 경기전과 한옥마을, 전동성당까지 도보로 이어져 있어 전주 문화 코스 사이에 끼워 넣기 쉬우며, 시간대에 따라 조용한 분위기 속에서 노트북이나 책을 꺼내기도 좋습니다.',
    honyeoTip:
      '오픈 직후나 오후 4~6시 사이에 방문하면 비교적 한적해 편안하게 머무를 수 있어요. 산책하다 목이 마르면 바로 들러 휴식하고 다시 길을 나서면 혼자 여행의 리듬을 유지하기 좋습니다.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '전라북도 전주시 완산구 경기전길 61',
    lat: 35.8167405570045,
    lng: 127.150708743771,
    externalUrl: 'https://place.map.kakao.com/902174089',
    tagSlugs: ['cafe', 'emotional', 'culture', 'oneday'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'jeonju-view-cafe',
    name: '전망대카페',
    summary: '한옥마을 뷰로 쉬어가기, 혼자도 사진이 되는 카페',
    description:
      '한옥마을 전망을 즐길 수 있는 높은 층의 카페로, 창밖으로 한옥 지붕과 전주시내가 내려다보여 멍 때리기 좋습니다. 건물 3~7층에 카페가 있어 엘리베이터로 올라가면 소란한 거리와 조금 떨어진 느낌이라 혼자 있어도 차분하고, 날씨가 좋으면 야외 테라스도 이용할 수 있어요. 한옥마을과 오목대, 자만벽화마을 사이에 위치해 산책 중간에 들르기 좋고, 음료 한 잔으로 전망을 즐긴 후 다시 골목길로 이어나가기 쉽습니다.',
    honyeoTip:
      '평일 낮에는 창가 자리 확보가 쉬우니 여유 있게 전망을 감상하며 쉬었다 가세요. “전망대카페 → 오목대·자만마을” 코스로 이어가면 동선이 자연스럽습니다.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '전라북도 전주시 완산구 어진길 15',
    lat: 35.8177885368806,
    lng: 127.153913973422,
    externalUrl: 'https://place.map.kakao.com/1595025887',
    tagSlugs: ['cafe', 'nightview', 'emotional', 'walking'],
  },

  // 4) DRINK (혼술/바)

  {
    regionSlug: 'jeonju',
    slug: 'deokgil-sanghoe',
    name: '덕길상회',
    summary: '레트로 감성에 위스키 한 잔, 혼자 와도 자연스러운 밤',
    description:
      '웰리단길(전라감영길)에서 빈티지 소품과 위스키를 함께 즐길 수 있는 레트로 감성 술집으로 알려져 있어요. 내부는 작은 앤티크 소품들로 꾸며져 있어 둘러보는 재미가 있고, 다양한 위스키와 하이볼을 가볍게 한두 잔 즐기기 좋은 분위기라 혼술 입문자도 부담이 덜합니다. 한옥마을과 도보 거리에 있어 밤 산책 후 들르기 좋고, 오래 머물기보다 짧게 한두 잔 나누고 나오기 좋은 타입입니다.',
    honyeoTip:
      '혼자라면 오픈 직후나 평일 저녁이 가장 한적해요. 위스키 한 잔과 간단한 안주로 마무리하고 주변 골목을 산책하며 귀가하면 여운이 길게 남습니다.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '전라북도 전주시 완산구 전라감영4길 16-4 1층',
    lat: 35.8168027134216,
    lng: 127.144943792044,
    externalUrl: 'https://place.map.kakao.com/2038831371',
    tagSlugs: ['solo-drinking', 'emotional', 'thinking', 'nightview'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'blending-bar-jeonju',
    name: '블렌딩바 전주',
    summary: '낯선 밤도 편해지는 커뮤니티바, 혼술 입문에 좋은 곳',
    description:
      '“혼술바”라는 콘셉트로 알려진 커뮤니티 바로, 바텐더와 손님들이 함께 대화를 나누며 술을 즐길 수 있는 공간입니다. 공간이 넓지 않지만 바 좌석이 중심이라 혼자 앉아도 자연스럽고, 취향을 말하면 맞춤 하이볼이나 칵테일을 추천해주는 점이 매력적이에요. 차분한 조명과 편안한 음악 덕분에 부담 없이 한두 잔 하기에 좋고, 웰리단길 동선에 있어 다른 술집과 묶어 나들이하기도 편합니다.',
    honyeoTip:
      '처음이라면 바 좌석에 앉아 취향을 간단히 말해보세요. 평일 저녁 시간대가 여유로워 혼자 천천히 마시기 좋고, 귀가 동선을 미리 정해두면 마음이 더 편안해요.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '전라북도 전주시 완산구 전라감영4길 13-19',
    lat: 35.8165346480927,
    lng: 127.14406947371,
    externalUrl: 'https://place.map.kakao.com/1660338397',
    tagSlugs: ['solo-drinking', 'emotional', 'stress-relief', 'thinking'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'blending-bar-music',
    name: '블렌딩바 뮤직',
    summary: '신청곡 틀어주는 뮤직바, 혼자 앉아도 심심하지 않게',
    description:
      '신청곡을 받아주는 뮤직바로, 바텐더가 LP나 음원으로 손님이 원하는 곡을 틀어주는 콘셉트라 혼자 가도 지루하지 않아요. 바 형태라 혼술이 어색하지 않고, 음악이 흘러나오면서 분위기가 바뀌어 기분 전환하기 좋다는 리뷰가 많습니다. 웰리단길의 다른 바들과 가까워 덕길상회나 블렌딩바 전주와 묶어 밤 코스를 만들기 쉬우며, 늦은 밤까지 운영해 마지막 술자리로도 적당합니다.',
    honyeoTip:
      '초저녁에 들어가 신청곡 한두 곡을 부탁하면 분위기에 자연스럽게 녹아들어요. 귀가할 교통편을 미리 확인하고 적당한 시간에 나오는 것이 혼자 여행자에게는 안전합니다.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '전라북도 전주시 완산구 전라감영4길 16-3',
    lat: 35.8169382042113,
    lng: 127.144843011107,
    externalUrl: 'https://place.map.kakao.com/1784628761',
    tagSlugs: ['solo-drinking', 'emotional', 'nightview', 'stress-relief'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'chorochoro',
    name: '초로초로',
    summary: '일본 감성 이자카야, 바자리에서 조용히 한 잔',
    description:
      '객리단길 인근에 있는 일본식 이자카야로, 어두운 조명과 나무 인테리어가 편안한 분위기를 만듭니다. 바 테이블이 준비돼 있어 혼자 앉아도 눈치 보지 않고 사케나 하이볼을 즐길 수 있고, 사소한 안주 메뉴가 잘 준비되어 있어 간단히 한두 잔 하기 좋다는 후기가 많아요. 영화의 거리와 객리단길 사이에 있어 저녁 식사나 영화 관람 후 가볍게 들르기 좋은 위치입니다.',
    honyeoTip:
      '피크타임인 저녁 8~10시를 피해 이른 저녁에 방문하면 조용한 분위기에서 혼술을 즐길 수 있어요. 바 좌석에서 주문하면 동선이 간단해 혼자서도 편안합니다.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '전라북도 전주시 완산구 전주객사2길 75 1층',
    lat: 35.8200530108205,
    lng: 127.139620057851,
    externalUrl: 'https://place.map.kakao.com/1746531640',
    tagSlugs: ['solo-drinking', 'emotional', 'oneday', 'stress-relief'],
  },

  {
    regionSlug: 'jeonju',
    slug: 'so-eum',
    name: '소음',
    summary: '안주 맛으로 유명한 요리주점, 혼자도 가능한 바자리 무드',
    description:
      '객사길 주변 요리주점으로 깔끔한 인테리어와 수준 높은 안주로 알려져 있습니다. 바 좌석과 일반 테이블이 모두 있어 1~2인 손님도 부담 없이 방문할 수 있고, 요리 위주의 안주를 주문해 술과 함께 천천히 즐기기 좋은 곳이에요. 번화가 중심에 위치해 늦은 시간에도 이동이 어렵지 않고, 젊은 여행자들에게 “조용히 한잔하기 좋은” 곳으로 자주 추천됩니다.',
    honyeoTip:
      '혼자라면 안주 한 가지와 술 한두 잔 정도로 가볍게 즐기는 것이 좋아요. 평일이나 오픈 직후에 방문하면 자리가 여유로워 혼자 머물기 편하고, 너무 늦게까지 마시지 않도록 귀가 시간을 정해두면 더욱 안심입니다.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '전라북도 전주시 완산구 전주객사3길 12-29 2층',
    lat: 35.8181817565385,
    lng: 127.143571399868,
    externalUrl:
      'https://m.map.kakao.com/actions/searchView?q=%EC%86%8C%EC%9D%8C&wxEnc=MLOSLOHR&wyEnc=NSRRUOHR&lvl=2',
    tagSlugs: ['solo-drinking', 'stress-relief', 'oneday', 'emotional'],
  },
];
