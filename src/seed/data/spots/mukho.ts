import { ImageSource } from 'src/types/util';
import { SpotCategory } from 'src/types/spot';
import imageMap from '../../image-map.json';
import type { SpotSeedData } from './index';

export const mukhoSpots: SpotSeedData[] = [
  // 1) NATURE / ACTIVITY / ETC

  {
    regionSlug: 'mukho',
    slug: 'mukho-nongoldamgil',
    name: '논골담길(묵호)',
    summary: '바다 보이는 벽화 골목길, 혼자 걷기 좋은 감성 산책 코스',
    description: `묵호항 언덕을 따라 이어지는 골목 산책 코스예요. 논골담길에는 벽화와 계단이 구간별로 자리해 있어서 위쪽 등대에서 내려오며 천천히 둘러보면 부담 없이 걸을 수 있습니다.

1~3길로 나뉜 작은 길들은 분위기가 조금씩 달라서 지루하지 않고, 중간중간 ‘바람의 언덕’ 같은 전망 포인트에서 바다를 내려다볼 수 있어요.

길 자체는 길지 않아 혼자 천천히 걸어도 금세 한 바퀴 돌 수 있고, 항구와 시장, 카페가 가까워 동선을 짜기에도 매우 편리합니다.`,
    honyeoTip: `• 아침 9시 전에는 골목이 한산해서 혼자 여유롭게 걸을 수 있어요.
• 등대공원 쪽에서 출발해 논골담길을 내려오면 경사가 덜하고 벽화를 감상하기 좋습니다.
• 계단이 많은 구간이 있으니 편한 신발을 준비하고, 중간중간 바다를 바라볼 수 있는 포인트에서 사진을 남겨보세요.`,
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['mukho']['mukho-nongoldamgil'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-나기환',
    address: '강원특별자치도 동해시 일출로 97',
    lat: 37.55213157325,
    lng: 129.118277965788,
    externalUrl:
      'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=3e82a842-f061-4f01-a20e-b06590b47b2e',
    tagSlugs: ['culture', 'walking', 'emotional', 'hidden'],
  },

  {
    regionSlug: 'mukho',
    slug: 'mukho-lighthouse-park',
    name: '묵호등대공원',
    summary: '묵호항과 동해바다 전망, 혼자 생각정리하기 좋은 언덕 공원',
    description: `항구 위 언덕을 오르면 묵호등대공원이 나와요. 길이 길지 않아 혼자 천천히 걸어도 부담이 없고, 정상에 서면 항구와 동해 바다가 시원하게 펼쳐져서 잠시 멍하니 있기 좋습니다.

나무 벤치가 곳곳에 있어 바람을 들으며 쉬기 편하고, 논골담길에서 바로 이어져 동선 짜기도 쉬워요. 바람이 세게 부는 날이 많아 적당한 옷차림을 갖추면 더욱 즐겁게 머무를 수 있습니다.`,
    honyeoTip: `• 오후 늦게 올라가면 노을과 야경이 이어져 분위기 변화를 더 크게 느낄 수 있어요.
• 전망대는 10시부터 21시까지 무료로 운영되니 시간을 확인하고 방문하세요.
• 바람이 부는 날에는 체온 유지를 위해 가벼운 겉옷을 꼭 챙기는 것이 좋습니다.`,
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['mukho']['mukho-lighthouse-park'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-조영권',
    address: '강원특별자치도 동해시 해맞이길 289',
    lat: 37.5548307473287,
    lng: 129.118474114269,
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=b084c6f2-9ba8-4456-b97e-10047192e284',
    tagSlugs: ['nightview', 'walking', 'thinking', 'healing'],
  },

  {
    regionSlug: 'mukho',
    slug: 'mukho-fish-market',
    name: '묵호항 수산시장(묵호어시장)',
    summary: '싱싱한 해산물 구경 & 1인도 가능한 물회로 혼밥하기 좋은 곳',
    description: `묵호항 앞에는 활기 넘치는 수산시장과 회센터가 나란히 자리하고 있어요. 시장 바닥에 가득한 해산물과 상인들의 활기를 구경하는 것만으로도 여행의 재미를 더해줍니다.

물회나 회덮밥 같이 1인 메뉴를 취급하는 식당이 많아 혼자서도 부담 없이 싱싱한 해산물을 맛볼 수 있어요. 가격과 구성이 가게마다 조금씩 다르니 가볍게 한 바퀴 둘러보며 고르는 재미가 있습니다.

논골담길이나 등대공원에서 내려오면 바로 이어지는 위치라 동선을 짜기에도 매우 효율적입니다.`,
    honyeoTip: `• 오전에서 이른 점심 사이(11시 이전)가 상대적으로 한적해서 구경하기 편해요.
• 혼자라면 ‘물회’나 ‘회덮밥’ 같은 단품 메뉴를 주문하는 것이 가성비 면에서 좋습니다.
• 시장 통로 바닥에 물기가 많고 좁은 구간이 있으니 미끄럽지 않은 신발을 신으세요.`,
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['mukho']['mukho-fish-market'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-강원지사',
    address: '강원특별자치도 동해시 일출로 22',
    lat: 37.5503132695053,
    lng: 129.11250086314,
    tagSlugs: ['solo-eating', 'shopping', 'culture', 'sea'],
  },

  {
    regionSlug: 'mukho',
    slug: 'eodal-beach',
    name: '어달해변',
    summary: '조용한 바다 산책 + 오션뷰 카페 동선 짜기 쉬운 해변',
    description: `어달해변은 길이가 길지 않고 아담해서 혼자 조용히 파도 소리를 즐기기에 딱 좋은 곳이에요. 바다와 모래의 경계가 완만해 해변을 따라 천천히 걷기 좋습니다.

주변에는 오션뷰 카페들이 가까이 붙어 있어 산책 후 바로 들어가 시원한 음료와 함께 바다를 조망할 수 있어요.

날씨가 맑은 날에는 수평선과 하늘색이 매우 선명해 사진 찍기에도 훌륭하며, 복잡한 대형 해수욕장과는 다른 고요한 매력을 지니고 있습니다.`,
    honyeoTip: `• 바람이 많은 날에는 모래가 날릴 수 있으니 모자나 후드가 있는 옷이 유용해요.
• 해변 산책 후 바로 길 건너 오션뷰 카페에서 휴식하는 '산책+카페' 루틴을 추천합니다.
• 30~40분 정도면 충분히 둘러볼 수 있어 여행 중 가벼운 쉼표로 넣기 좋습니다.`,
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['mukho']['eodal-beach'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-강원지사',
    address: '강원특별자치도 동해시 어달동 52-4',
    lat: 37.5661636753346,
    lng: 129.119134444133,
    externalUrl:
      'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=065bab20-dc4a-4506-91b4-0596bef432fb',
    tagSlugs: ['sea', 'walking', 'healing', 'cafe'],
  },

  {
    regionSlug: 'mukho',
    slug: 'dodokkaebi-gol-skyvalley',
    name: '도째비골 스카이밸리',
    summary: '바다 절벽 전망 + 포토스팟, 혼자여행 사진 남기기 좋은 곳',
    description: `도째비골 스카이밸리는 절벽 위에서 동해 바다를 짜릿하게 내려다볼 수 있는 해안 시설이에요. 언덕을 따라 올라가면 여러 포토 포인트가 마련되어 있어 바다 배경의 멋진 사진을 남길 수 있습니다.

유리로 된 스카이워크와 하늘 자전거 같은 체험 시설이 있어 짧지만 강렬한 경험을 원하는 여행자에게 인기가 많아요.

주변의 어달해변이나 해랑전망대와 함께 코스를 짜면 묵호의 핵심 스팟을 알차게 둘러볼 수 있습니다. 바람이 강한 날에는 체감 온도가 낮으니 옷차림에 신경 쓰시길 바랍니다.`,
    honyeoTip: `• 강풍 시 안전을 위해 휴장할 수 있으니 방문 전 공식 공지나 전화로 운영 여부를 확인하세요.
• 평일 오후나 해 질 무렵에 방문하면 대기가 적어 혼자서도 여유 있게 사진을 남기기 좋습니다.
• 입장료가 있지만 스카이워크에서 보는 전망만으로도 충분히 방문할 가치가 있어요.`,
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['mukho']['dodokkaebi-gol-skyvalley'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-조영권',
    address: '강원특별자치도 동해시 묵호진동 2-109',
    lat: 37.5552546018564,
    lng: 129.119130864078,
    externalUrl:
      'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=e9a05e03-fd27-45ca-8956-6ecc2c173238',
    tagSlugs: ['activity', 'sea', 'emotional', 'oneday'],
  },

  {
    regionSlug: 'mukho',
    slug: 'haerang-observatory',
    name: '해랑전망대',
    summary: '동해 바다 전망 포인트, 혼자 바다멍/야경 코스로 좋음',
    description: `스카이밸리 바로 아래쪽 해안에 위치한 해랑전망대는 바다 위를 걷는 듯한 기분을 느낄 수 있는 데크 시설이에요.

바다 위로 뻗은 길을 따라 걷다 보면 동해 바다의 시원함이 온몸으로 전해집니다. 특별한 체험 시설은 없지만 바다 자체가 주인공인 공간이라 혼자 서 있어도 마음이 평온해집니다.

일몰 즈음에는 등대와 스카이밸리에 조명이 들어와 야경 코스로도 훌륭하며, 스카이밸리를 이용하지 않더라도 가볍게 들러 바다멍을 즐기기에 아주 좋습니다.`,
    honyeoTip: `• 일몰 직전부터 어두워지기 시작할 때의 풍경이 가장 아름답고 감성적이에요.
• 바다 한가운데로 뻗어 있어 바람이 매우 강하니 스카프나 가벼운 겉옷을 준비하세요.
• 밤 9시까지 운영되니 저녁 식사 후 조용한 바다 소리를 들으며 산책하기 좋습니다.`,
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['mukho']['haerang-observatory'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-조영권',
    address: '강원특별자치도 동해시 묵호진동 산 42',
    lat: 37.5559592543675,
    lng: 129.112693460991,
    externalUrl:
      'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=815c90b6-5e1a-4b3f-86b2-0fb63419b7ce',
    tagSlugs: ['nightview', 'sea', 'walking', 'healing'],
  },

  {
    regionSlug: 'mukho',
    slug: 'chuam-candle-rock',
    name: '추암 촛대바위',
    summary: '동해 대표 일출 명소, 혼자 감성 사진 찍기 좋은 바다 스팟',
    description: `추암 촛대바위는 해안에 촛대처럼 솟은 기암괴석으로, 동해의 일출 명소로 손꼽히는 장소입니다.

새벽 일출 시각 바위 뒤로 떠오르는 태양이 만드는 실루엣이 매우 장엄하며, 낮 시간대에도 에메랄드빛 바다와 조화를 이뤄 훌륭한 전망을 선사합니다.

산책로가 잘 조성되어 있어 혼자 천천히 걷기에 좋고, 주변에 출렁다리와 해암정 등 소소한 볼거리들이 모여 있어 지루할 틈이 없습니다.`,
    honyeoTip: `• 일출을 보러 간다면 새벽 공기가 매우 차가우니 방한 준비를 철저히 하세요.
• 일출 직후 사람들이 빠져나간 20~30분 뒤가 가장 조용하게 인생샷을 남길 수 있는 황금 시간대예요.
• 낮에 방문해도 투명한 바다 위로 솟은 바위들이 멋지니 일정에 맞춰 편하게 방문해 보세요.`,
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['mukho']['chuam-candle-rock'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-김지호',
    address: '강원특별자치도 동해시 촛대바위길 26',
    lat: 37.4772598442864,
    lng: 129.159180069071,
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=022727b9-4e80-4e5b-a77f-826fe13ca5dc',
    tagSlugs: ['sea', 'emotional', 'walking', 'oneday'],
  },

  {
    regionSlug: 'mukho',
    slug: 'mureung-valley',
    name: '무릉계곡',
    summary: '계곡 산책과 자연 힐링, 혼자 리프레시하기 좋은 곳',
    description: `무릉계곡은 울창한 산세와 맑은 계곡물이 어우러진 휴식처 같은 곳이에요. 용추폭포까지 이어지는 산책로는 경사가 완만해 혼자서도 여유롭게 트레킹을 즐길 수 있습니다.

맑은 물소리를 들으며 걷다 보면 일상의 스트레스가 씻겨 내려가는 기분이 들고, 비가 온 직후에는 물안개가 피어올라 신비로운 분위기를 자아냅니다.

길목에 있는 유서 깊은 사찰인 삼화사와 넓은 바위 평상인 무릉반석 등 잠시 멈춰 쉴 수 있는 공간이 많아 나만의 속도로 힐링하기 좋습니다.`,
    honyeoTip: `• 바닥에 돌이 많고 미끄러운 구간이 있으니 가벼운 등산화나 편한 운동화를 꼭 신으세요.
• 혼자라면 왕복 약 2.5~3시간 정도를 잡고 중간에 계곡물에 발을 담그며 쉬어가는 것을 추천해요.
• 입구 근처 상가에서 파는 산채비빔밥으로 산행 전후 배를 채우면 완벽한 코스가 됩니다.`,
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['mukho']['mureung-valley'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-홍정표',
    address: '강원특별자치도 동해시 삼화로 538',
    lat: 37.4634742179798,
    lng: 129.01938679801,
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=72aadee7-5d98-468c-b00b-42ee60b6f9cd',
    tagSlugs: ['nature', 'mountain', 'healing', 'walking'],
  },

  {
    regionSlug: 'mukho',
    slug: 'mangsang-beach',
    name: 'mangsang-beach',
    summary: '길게 이어지는 바다 산책, 혼자 걷기 좋은 동해 대표 해변',
    description: `망상해변은 수평선이 끝없이 펼쳐진 광활한 모래사장이 특징인 곳이에요. 해변 길이가 매우 길어 아무리 사람이 많아도 조금만 옆으로 걸어가면 나만의 조용한 공간을 찾을 수 있습니다.

평탄한 백사장을 따라 맨발로 걷는 '어싱' 산책을 하기에도 좋으며, 파도 소리가 일정하게 들려와 걷기만 해도 마음이 차분해집니다.

주변에 오토캠핑장과 카페들이 잘 조성되어 있어 산책 후 커피 한 잔을 곁들이며 바다를 바라보기에 아주 편리한 환경을 갖추고 있습니다.`,
    honyeoTip: `• 주말보다는 평일에 방문해야 망상해변 특유의 끝없는 고요함을 온전히 즐길 수 있어요.
• 해변이 매우 넓어 그늘이 거의 없으니 선글라스와 모자, 선크림을 꼭 챙기세요.
• 산책로 중간중간 설치된 포토존에서 타이머를 활용해 바다 배경의 전신샷을 남겨보세요.`,
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['mukho']['mangsang-beach'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-조영권',
    address: '강원특별자치도 동해시 동해대로 6270-10',
    lat: 37.5922569104686,
    lng: 129.089689992668,
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=49b2b7f4-9541-44e2-aabd-f6520a643fac',
    tagSlugs: ['sea', 'walking', 'healing', 'oneday'],
  },

  // 2) FOOD

  {
    regionSlug: 'mukho',
    slug: 'mukho-udon',
    name: '묵호우동',
    summary: '혼자 먹기 쉬운 우동 한 그릇, 동선 사이에 끼우기 좋은 한 끼',
    description: `항구와 시장 근처 골목에 위치한 아담하고 정갈한 우동 전문점이에요. 테이블 수가 적고 조용한 분위기라 혼자 방문해도 전혀 어색하지 않은 공간입니다.

직접 뽑은 면발의 쫄깃함이 살아 있으며, 따뜻한 국물 우동부터 유자 향이 상큼한 냉우동까지 선택의 폭이 다양합니다.

주문과 서빙 시스템이 간결해 흐름이 빠르므로, 산책 일정 중간에 가볍지만 만족스럽게 한 끼를 해결하기에 더할 나위 없는 곳입니다.`,
    honyeoTip: `• 점심 피크인 12~13시를 살짝 피해 방문하면 줄 서지 않고 여유롭게 앉을 수 있어요.
• 겨울에는 튀김 우동, 여름에는 상큼한 유자 냉우동을 추천합니다.
• 셀프 바에서 반찬을 가져오는 시스템이니 자리를 잡고 천천히 이용해 보세요.`,
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '강원특별자치도 동해시 발한로 215-1 1층',
    lat: 37.5487188054976,
    lng: 129.108610556491,
    externalUrl: 'https://place.map.kakao.com/138712598',
    tagSlugs: ['solo-eating', 'oneday', 'walking'],
  },

  {
    regionSlug: 'mukho',
    slug: 'diver-grilled-fish',
    name: '다이버구이',
    summary: '숯불 생선구이 한 상, 혼자도 비교적 편한 로컬 한 끼',
    description: `숯불 향이 은은하게 배어 있는 생선구이를 맛볼 수 있는 곳으로, 지역 주민들이 인정하는 찐 맛집이에요.

고등어, 가자미, 꽁치 등 제철 생선들이 돌판 위에 따뜻하게 서빙되어 마지막 한 점까지 맛있게 즐길 수 있습니다.

혼자 여행객을 위한 1인 세트 메뉴가 마련되어 있어 '생선구이는 2인 이상'이라는 편견 없이 당당하게 혼밥을 즐길 수 있는 고마운 곳입니다. 든든한 반찬과 국이 함께 나와 집밥 같은 따스함을 줍니다.`,
    honyeoTip: `• 숯불에 굽는 시간이 있으니 배가 너무 고파지기 전에 미리 방문하는 것이 좋아요.
• 브레이크타임이 끝나는 오후 5시경에 방문하면 대기 없이 바로 쾌적하게 식사할 수 있습니다.
• 생선 냄새가 옷에 밸 수 있으니 아끼는 옷보다는 가벼운 옷차림을 추천해요.`,
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '강원특별자치도 동해시 일출로 89',
    lat: 37.5521998711043,
    lng: 129.117579397991,
    externalUrl: 'https://place.map.kakao.com/172579686',
    tagSlugs: ['solo-eating', 'stress-relief', 'oneday'],
  },

  {
    regionSlug: 'mukho',
    slug: 'bibiso-local-diner',
    name: '비비소',
    summary: '든든한 로컬 한 끼, 혼밥 손님이 많아 편한 식당',
    description: `논골담길 바로 입구 근처에 위치해 접근성이 아주 뛰어난 로컬 식당이에요. 대표 메뉴인 육회비빔밥은 신선함이 살아 있어 한 입만 먹어도 여행의 피로가 풀리는 기분이 듭니다.

깊고 진한 맛의 소고기국이 함께 제공되어 한 상 가득 든든하게 대접받는 느낌을 줍니다.

매장 분위기가 깔끔하고 혼자 식사하는 손님들이 많아 혼밥 난이도가 매우 낮은 곳입니다. 산책 전후 에너지를 충전하기에 이보다 좋은 곳은 없습니다.`,
    honyeoTip: `• 육회비빔밥이 대표적이지만 소고기 짬뽕국도 현지인들이 많이 찾는 메뉴이니 취향껏 골라보세요.
• 식사 후 바로 논골담길 오르막을 오르기보다는 항구 쪽 평지를 가볍게 산책하며 소화시키는 동선을 추천해요.
• 사장님이 친절하시니 혼자 여행 중 궁금한 점이 있다면 가볍게 여쭤보셔도 좋아요.`,
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '강원특별자치도 동해시 일출로 95 1층',
    lat: 37.5520778183096,
    lng: 129.118136026783,
    externalUrl: 'https://place.map.kakao.com/1354416290',
    tagSlugs: ['solo-eating', 'hidden', 'oneday'],
  },

  {
    regionSlug: 'mukho',
    slug: 'mukho-gimbap',
    name: '묵호김밥',
    summary: '가볍게 한 끼, 혼자도 부담 없는 로컬 김밥집',
    description: `묵호역과 항구 사이에서 여행객들의 든든한 배웅과 마중을 책임지는 작은 김밥집입니다.

달걀 지단이 가득 들어간 부드러운 김밥은 한 줄만 먹어도 속이 꽉 찬 느낌을 주며, 포장이 매우 깔끔해 어디서든 먹기 좋습니다.

매장 내 자리가 협소하지만, 오히려 포장해서 바닷가 벤치나 공원에서 나만의 피크닉을 즐기기에 딱 맞는 메뉴입니다. 로컬 시장의 정취와 맛을 동시에 느낄 수 있는 가성비 최고의 선택입니다.`,
    honyeoTip: `• 매장이 작아 가급적 포장 주문을 해서 근처 등대공원이나 해변 벤치에서 즐겨보세요.
• 인기 있는 재료는 점심시간 직후에 소진될 수 있으니 가급적 오전 중에 방문하는 것이 안전합니다.
• 김밥과 함께 파는 수제 식혜나 간단한 간식거리도 훌륭한 여행 간식이 됩니다.`,
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '강원특별자치도 동해시 일출로 9-1 1층',
    lat: 37.550252060928,
    lng: 129.109319970541,
    externalUrl: 'https://place.map.kakao.com/382019330',
    tagSlugs: ['solo-eating', 'oneday', 'walking'],
  },

  {
    regionSlug: 'mukho',
    slug: 'donghae-daewoo-kalguksu',
    name: '대우칼국수',
    summary: '뜨끈한 칼국수 한 그릇, 혼자 먹기 쉬운 로컬 국수집',
    description: `오랜 세월의 흔적이 느껴지는 건물 2층에서 투박하지만 정겨운 장칼국수를 선보이는 곳이에요.

칼칼한 고추장 육수에 쫄깃한 면발, 그리고 감자와 야채가 어우러져 동해 로컬의 맛을 제대로 경험할 수 있습니다. 오래된 창문 밖으로 묵호항의 일상을 내려다보며 식사하는 기분이 묘하게 편안합니다.

혼자 방문해도 합석이 자연스러운 시골 식당의 정이 느껴지며, 한 그릇 비우고 나면 마음까지 든든해지는 경험을 할 수 있습니다.`,
    honyeoTip: `• 메뉴는 장칼국수 하나이니 자리에 앉아 인원수만 말씀하시면 주문이 끝납니다.
• 재료가 일찍 소진되어 15~16시경 문을 닫는 경우가 많으니 오후 늦게 방문은 삼가세요.
• 매장이 좁고 오래되었지만, 그만큼 '찐' 로컬의 분위기를 사랑하는 분들에게 강력 추천합니다.`,
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '강원특별자치도 동해시 일출로 10',
    lat: 37.549955067277,
    lng: 129.109656916276,
    externalUrl: 'https://place.map.kakao.com/21448202',
    tagSlugs: ['solo-eating', 'stress-relief', 'oneday'],
  },

  // 3) CAFE

  {
    regionSlug: 'mukho',
    slug: 'roundabout-cafe',
    name: '라운드어바웃(ROUNDABOUT)',
    summary: '흑임자 커피 한 잔, 혼자 쉬기 딱 좋은 묵호 로컬 카페',
    description: `묵호항 근처 조용한 골목에 숨겨진 감각적인 카페로, 아담한 공간이 주는 아늑함이 특징이에요.

시그니처인 흑임자 커피는 고소한 크림과 쌉싸름한 에스프레소의 조화가 훌륭해 여행 중 지친 카페인 충전용으로 최적입니다. 테이블 수가 적어 손님이 없을 땐 나만의 서재 같은 느낌을 줍니다.

아기자기한 소품과 따뜻한 조명이 어우러진 내부에서 혼자 조용히 여행 노트를 정리하거나 다음 행선지를 계획하기에 매우 적당한 장소입니다.`,
    honyeoTip: `• 흑임자 커피는 처음엔 섞지 말고 크림과 커피를 같이 마시다가 나중에 저어서 드세요.
• 휘낭시에 같은 작은 디저트도 훌륭하니 커피와 세트로 즐겨보세요.
• 주말에는 자리가 금방 찰 수 있으니 평일 방문이나 오픈 직후를 공략하세요.`,
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '강원특별자치도 동해시 발한로 220 1층',
    lat: 37.5490686082424,
    lng: 129.109008498216,
    externalUrl: 'https://place.map.kakao.com/390658344',
    tagSlugs: ['cafe', 'emotional', 'thinking', 'oneday'],
  },

  {
    regionSlug: 'mukho',
    slug: 'hangeol-cafe',
    name: '한결',
    summary: '조용히 앉기 좋은 로컬 카페, 혼자 일정 중간 쉼표',
    description: `어달해변의 푸른 바다를 큰 창으로 오롯이 마주할 수 있는 베이커리 브런치 카페입니다.

3층까지 이어지는 넉넉한 공간 덕분에 혼자서도 창가 명당을 차지하고 앉아 바다 멍을 즐기기에 부족함이 없습니다. 빵과 브런치 메뉴가 다양해 식사와 커피를 한 번에 해결하기에도 좋습니다.

세련된 인테리어와 넉넉한 테이블 간격 덕분에 주변의 방해 없이 온전히 바다 풍경과 나 자신에게 집중할 수 있는 쉼터 같은 공간입니다.`,
    honyeoTip: `• 3층 좌석이 시야를 가리는 것 없이 바다가 가장 잘 보이니 무조건 위로 올라가 보세요.
• 브런치 메뉴가 꽤 푸짐하게 나오니 늦은 아침이나 점심 대용으로 방문하기 좋습니다.
• 노을이 지기 시작하는 오후 늦은 시간, 창가 자리에 앉아 변하는 하늘색을 감상해 보세요.`,
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '강원특별자치도 동해시 일출로 195',
    lat: 37.5595681663062,
    lng: 129.119933734962,
    externalUrl: 'https://place.map.kakao.com/1611635334',
    tagSlugs: ['cafe', 'healing', 'thinking', 'oneday'],
  },

  {
    regionSlug: 'mukho',
    slug: 'caramel-station',
    name: '카라멜스테이션',
    summary: '인스타 감성 오션뷰 카페, 혼자여도 뷰 자체로 만족스러운 곳',
    description: `붉은 벽돌의 세련된 외관부터 시선을 끄는 이곳은 카페와 호텔이 공존하는 복합 문화 공간 같은 느낌을 줍니다.

실내는 층고가 높고 쾌적하며, 힙한 감성 속에 따뜻한 가구들이 배치되어 혼자 앉아도 기분 좋은 에너지를 받을 수 있습니다. 특히 지하에는 1인 작업이나 독서에 최적화된 좌석이 있어 혼자 여행자들의 아지트로 손색없습니다.

시그니처인 옥수수 커피(콘수수커피)는 제주에서 보던 것과는 또 다른 고소하고 달콤한 풍미를 선사합니다. 묵호역과 가까워 기차 타기 전 마지막 여유를 즐기기에 가장 좋은 장소입니다.`,
    honyeoTip: `• 조용히 집중하고 싶다면 지하 1인 전용 좌석을 찾아보세요. 아주 아늑합니다.
• 콘수수커피와 직접 구운 휘낭시에를 곁들이면 최고의 조합이에요.
• 영업시간이 오후 6시로 일찍 끝나는 편이니 늦지 않게 방문하시는 것이 포인트입니다.`,
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '강원특별자치도 동해시 발한로 219-11 1층',
    lat: 37.5496127484116,
    lng: 129.1075492225,
    externalUrl: 'https://place.map.kakao.com/1075109088',
    tagSlugs: ['cafe', 'sea', 'emotional', 'walking'],
  },

  {
    regionSlug: 'mukho',
    slug: 'almare-cafe',
    name: '알마레(Almare)',
    summary: '오션뷰로 쉬어가기, 혼자여도 분위기 잡히는 바다 카페',
    description: `한섬해변을 바로 내려다보는 대형 건물의 꼭대기 층에 위치해 막힘없는 수평선을 제공합니다.

4층 카페 공간은 전면 통창으로 되어 있어 어디에 앉아도 바다가 눈앞에 펼쳐지며, 루프탑에 올라가면 동해의 시원한 바닷바람을 온몸으로 느낄 수 있습니다.

음료 주문 시 제공되는 소소한 쿠키 서비스에서 주인장의 배려가 느껴지며, 좌석이 넉넉하고 주차 공간도 충분해 렌터카 여행 중에도 편하게 들를 수 있는 안정적인 스팟입니다.`,
    honyeoTip: `• 루프탑은 날씨가 맑은 날 인생샷을 남기기에 가장 좋은 명당입니다.
• 한섬해변 산책로와 바로 연결되니 커피 한 잔 들고 해변 데크를 따라 걸어보세요.
• 5층 루프탑 자리는 노을이 질 때 특히 로맨틱하니 혼자라도 꼭 올라가 보시길 권합니다.`,
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '강원특별자치도 동해시 감추6길 40 4층',
    lat: 37.5193628787247,
    lng: 129.121292576324,
    externalUrl: 'https://instagram.com/almare_official',
    tagSlugs: ['cafe', 'sea', 'emotional', 'nightview'],
  },

  // 4) DRINK

  {
    regionSlug: 'mukho',
    slug: 'sadam-winebar',
    name: '사담',
    summary: '조용히 혼술하기 좋은 와인바/바, 여행 마무리로 딱',
    description: `동해 북평시장 근처에 숨겨진 홍콩 레트로 무드의 와인바입니다. 2층으로 올라가는 순간, 동해의 조용한 분위기와는 대조되는 이국적이고 매혹적인 붉은 조명의 공간이 나타나요.

바(Bar) 자리가 잘 갖춰져 있어 혼자 와인 한 잔을 시켜놓고 분위기에 취하기에 더없이 좋습니다. 독특한 홍콩식 안주들은 와인과의 조합이 훌륭해 새로운 미식 경험을 제공합니다.

차분하고 정적인 무드 덕분에 혼자서 여행의 기억을 되새기며 조용히 술 한 잔을 즐기고 싶은 분들에게 강력히 추천하는 '비밀 아지트' 같은 곳입니다.`,
    honyeoTip: `• 입구가 눈에 띄지 않을 수 있으니 지도를 잘 확인하고 2층으로 올라가세요. 문을 여는 순간 놀라실 거예요.
• 와인이 어렵다면 바텐더에게 좋아하는 맛의 특징을 말씀드리고 추천을 받으세요.
• 쪽파 베이컨 크림치즈 크로켓은 이곳에서 꼭 맛봐야 할 인기 안주입니다.`,
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '강원특별자치도 동해시 대동로 103 2층',
    lat: 37.4812858792673,
    lng: 129.127702563111,
    externalUrl: 'https://place.map.kakao.com/1449484740',
    tagSlugs: ['solo-drinking', 'emotional', 'nightview'],
  },

  {
    regionSlug: 'mukho',
    slug: 'windy-hill-donghae-tapas-wine-beer',
    name: '바람의 언덕 동해타파스 와인 앤 비어',
    summary: '언덕 위 오션뷰 한 잔, 혼자여행 밤을 예쁘게 마무리',
    description: `논골담길의 가장 높은 곳, 바람의 언덕에 자리 잡은 이국적인 분위기의 펍입니다. 오르는 길이 제법 가파르지만, 도착해서 마주하는 묵호항의 야경과 바다 풍경은 그 노력을 보상하고도 남습니다.

투명한 비닐 천막이 쳐진 바 자리에 앉아 야경을 보며 마시는 시원한 맥주나 와인은 혼자 여행의 낭만을 극대화해 줍니다.

소박하고 따뜻한 펜션 정원 같은 분위기라 혼자 방문해도 주인장의 따뜻한 환영을 받을 수 있는 정겨운 공간입니다. 추운 날씨에는 난로 옆에서 몸을 녹이며 바다를 감상할 수 있습니다.`,
    honyeoTip: `• 일몰 직후 어둑어둑해지며 항구에 조명이 하나둘 켜질 때 방문하는 것이 가장 드라마틱해요.
• 오르막길이 꽤 있으니 구두보다는 운동화를 신고 산책하듯 천천히 올라가세요.
• 겨울에는 야외석이 추울 수 있으니 무릎 담요를 요청하거나 겉옷을 든든히 챙기세요.`,
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '강원특별자치도 동해시 논골1길 22-7 1층',
    lat: 37.5529887691578,
    lng: 129.118194972339,
    externalUrl: 'https://place.map.kakao.com/1958929129',
    tagSlugs: ['solo-drinking', 'nightview', 'emotional', 'sea'],
  },

  {
    regionSlug: 'mukho',
    slug: 'donghae-125th-street',
    name: '125TH 스트릿',
    summary: '분위기 좋은 와인/칵테일, 혼자 앉기 좋은 바 무드',
    description: `천곡동 번화가 한복판에 있지만, 문을 열고 들어서면 몽환적이고 정적인 클래식 바의 세계가 펼쳐집니다.

은은한 조명과 벨벳 카펫, 아기자기한 소품들이 어우러져 혼자 앉아도 풍경이 되는 멋진 공간입니다. 바텐더와의 적당한 거리감이 유지되는 바 좌석은 혼자 칵테일 한 잔의 여유를 즐기기에 최적입니다.

클래식한 칵테일부터 무알콜 옵션까지 다양하게 구비되어 있어, 술을 잘 못 드시는 분들도 분위기에 취해 편안하게 시간을 보낼 수 있는 곳입니다.`,
    honyeoTip: `• 취향에 딱 맞는 한 잔을 원하신다면 바텐더에게 선호하는 맛을 말씀드리고 커스텀 추천을 받아보세요.
• 기본으로 제공되는 설탕 건빵이 칵테일과 의외로 잘 어울리니 즐겨보세요.
• 분위기가 차분해 시끄러운 술집이 부담스러운 혼자 여행자들에게 가장 추천하는 동해의 밤 코스입니다.`,
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '강원도 동해시 천곡동 916',
    lat: 37.5197020261347,
    lng: 129.117138435083,
    externalUrl: 'https://www.diningcode.com/profile.php?rid=l08LWnjld6kd',
    tagSlugs: ['solo-drinking', 'emotional', 'nightview', 'thinking'],
  },
];
