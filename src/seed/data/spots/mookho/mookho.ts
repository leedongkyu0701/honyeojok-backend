import { ImageSource } from 'src/types/util';
import { SpotCategory } from 'src/types/spot';
import imageMap from '../../../image-map.json';
import type { SpotSeedData } from '../index';

export const mookhoSpots: SpotSeedData[] = [
  // 1) NATURE / ACTIVITY / ETC

  {
    regionSlug: 'mookho',
    slug: 'mukho-nongoldamgil',
    name: '논골담길(묵호)',
    summary: '바다 보이는 벽화 골목길, 혼자 걷기 좋은 감성 산책 코스',
    description:
      '묵호항 언덕을 따라 이어지는 골목 산책 코스예요. 논골담길에는 벽화와 계단이 구간별로 자리해 있어서 위쪽 등대에서 내려오며 천천히 둘러보면 부담 없이 걸을 수 있어요. 1~3길로 나뉜 작은 길들은 분위기가 조금씩 달라서 지루하지 않고, 중간중간 ‘바람의 언덕’ 같은 전망 포인트에서 바다를 내려다볼 수 있어요. 길 자체는 길지 않아 혼자 천천히 걸어도 금세 한 바퀴 돌 수 있고, 동네 강아지나 주민들과 마주칠 때는 가볍게 인사하며 스스로 여행자의 리듬을 만들 수 있습니다. 항구와 시장, 카페가 가까워 동선을 짜기도 편해요.',
    honyeoTip:
      '아침 9시 전에는 골목이 한산해서 혼자 여유롭게 걸을 수 있어요. 등대공원 쪽에서 출발해 논골담길을 내려오면 경사가 덜하고 벽화를 감상하기 좋습니다. 계단이 많은 구간이 있으니 편한 신발을 준비하고, 중간중간 바다를 바라볼 수 있는 포인트에서는 잠시 멈춰 사진을 남겨보세요.',
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['mookho']['mukho-nongoldamgil'],
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
    regionSlug: 'mookho',
    slug: 'mukho-lighthouse-park',
    name: '묵호등대공원',
    summary: '묵호항과 동해바다 전망, 혼자 생각정리하기 좋은 언덕 공원',
    description:
      '항구 위 언덕을 오르면 묵호등대공원이 나와요. 길이 길지 않아 혼자 천천히 걸어도 부담이 없고, 정상에 서면 항구와 동해 바다가 시원하게 펼쳐져서 잠시 멍하니 있기 좋습니다. 나무 벤치가 곳곳에 있어 바람을 들으며 쉬기 편하고, 논골담길에서 바로 이어져 동선 짜기도 쉬워요. 바람이 세게 부는 날이 많아 적당한 옷차림을 갖추면 좋습니다.',
    honyeoTip:
      '오후 늦게 올라가면 노을과 야경이 이어져 분위기 변화가 크게 느껴져요. 바람이 부는 날에는 겉옷을 챙기고, 전망대는 10시부터 21시까지 무료로 운영되니 시간 확인 후 방문하면 좋아요.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['mookho']['mukho-lighthouse-park'],
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
    regionSlug: 'mookho',
    slug: 'mukho-fish-market',
    name: '묵호항 수산시장(묵호어시장)',
    summary: '싱싱한 해산물 구경 & 1인도 가능한 물회로 혼밥하기 좋은 곳',
    description:
      '묵호항 앞에는 작은 수산시장과 회센터가 나란히 있어요. 시장 바닥에 해산물이 가득하고 상인들이 활기를 더해 구경만 해도 재미가 있습니다. 물회나 회덮밥 같이 1인 메뉴를 취급하는 식당이 많아 혼자서도 간단히 한 끼 해결하기 쉽고, 가격과 구성이 가게마다 달라 걸어 다니며 살펴볼 수 있어요. 방문 시간에 따라 인파가 확 달라서, 한산한 시간엔 상인들과 편하게 이야기를 나눌 수 있습니다. 논골담길과 등대공원에서 내려오면 바로 이어지니 동선이 자연스럽습니다.',
    honyeoTip:
      '오전에서 이른 점심 사이(11시 이전)가 상대적으로 한적해요. 혼자라면 ‘물회·회덮밥·매운탕 1인’처럼 단품으로 주문하면 부담이 덜하고, 시장 통로가 좁으니 편한 신발을 신는 것이 좋아요.',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['mookho']['mukho-fish-market'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-강원지사',
    address: '강원특별자치도 동해시 일출로 22',
    lat: 37.5503132695053,
    lng: 129.11250086314,
    tagSlugs: ['solo-eating', 'shopping', 'culture', 'sea'],
  },

  {
    regionSlug: 'mookho',
    slug: 'eodal-beach',
    name: '어달해변',
    summary: '조용한 바다 산책 + 오션뷰 카페 동선 짜기 쉬운 해변',
    description:
      '어달해변은 길이가 길지 않고 모래사장이 단순해서 혼자 조용히 걷기 딱 좋은 곳이에요. 바다와 모래의 경계가 완만해 맨발로 걷기도 부담이 없고, 파도 소리를 들으며 생각을 정리하기 좋습니다. 주변에는 오션뷰 카페와 간단한 식사 공간이 가까이 붙어 있어 산책 후 바로 쉬어갈 수 있고, 날씨가 맑은 날에는 수평선과 하늘 색이 선명하게 찍혀 사진도 잘 나옵니다. 바람이 종종 세게 불어 모래가 날릴 수 있으니 날씨를 체크하고 방문하면 좋아요.',
    honyeoTip:
      '바람이 많은 날엔 모자나 후드를 챙기면 편해요. 해변을 30~40분쯤 걷고 길 건너 카페에서 차 한 잔하며 쉬었다가 저녁에 시장이나 항구로 이동하면 하루 동선이 균형 있게 이어집니다.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['mookho']['eodal-beach'],
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
    regionSlug: 'mookho',
    slug: 'dodokkaebi-gol-skyvalley',
    name: '도째비골 스카이밸리',
    summary: '바다 절벽 전망 + 포토스팟, 혼자여행 사진 남기기 좋은 곳',
    description:
      '도째비골 스카이밸리는 절벽 위에서 바다를 바라볼 수 있는 해안 시설이에요. 언덕을 따라 올라가면 여러 포토 포인트가 구간별로 마련돼 있어 어디서 사진을 찍어도 바다 배경이 잘 나옵니다. 유리로 된 스카이워크와 하늘 자전거 등 체험 시설이 있어 짧지만 짜릿한 경험을 할 수 있고, 운영 시간이 일정하지 않아 당일 현장 안내를 확인하는 게 좋아요. 어달해변이나 추암과 함께 코스에 넣으면 하루 일정이 자연스럽게 이어집니다. 바람이 강하게 부는 날에는 체감 온도가 크게 떨어질 수 있어 겉옷을 챙기세요.',
    honyeoTip:
      '강풍이나 기상 상황에 따라 휴장하는 날이 있으니 출발 전에 공식 공지를 확인하는 것이 안전해요. 평일 오후나 해질 무렵 전후에는 방문객이 많지 않아 혼자 조용히 사진을 남기기 편합니다. 체험 시설을 이용할 때는 대기 시간이 있을 수 있으니 여유 있게 시간을 잡으세요.',
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['mookho']['dodokkaebi-gol-skyvalley'],
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
    regionSlug: 'mookho',
    slug: 'haerang-observatory',
    name: '해랑전망대',
    summary: '동해 바다 전망 포인트, 혼자 바다멍/야경 코스로 좋음',
    description:
      '해랑전망대는 스카이밸리와 함께 둘러보기 좋은 전망 시설이에요. 짧은 데크를 따라 걷다 보면 동해 바다와 절벽이 한눈에 들어오고, 특히 해 질 무렵 하늘과 바다의 색이 바뀌는 모습을 여유롭게 감상할 수 있습니다. 체험 시설은 없지만 바다가 주인공인 공간이라서 혼자 서 있어도 마음이 편안해지고, 바람이 세찬 날에는 파도소리가 더욱 크게 들립니다. 스카이밸리에서 이어지는 길목에 있어 잠깐 들렀다 가기 좋아요.',
    honyeoTip:
      '일몰 직전이나 해 지고 난 뒤가 가장 아름다워요. 데크는 바람을 막아주는 곳이 적어 체감 온도가 금방 떨어지니 겉옷을 준비하세요. 정해진 운영 시간이 있으니 방문 전 확인하고 이동하면 동선이 한결 안정적입니다.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['mookho']['haerang-observatory'],
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
    regionSlug: 'mookho',
    slug: 'chuam-candle-rock',
    name: '추암 촛대바위',
    summary: '동해 대표 일출 명소, 혼자 감성 사진 찍기 좋은 바다 스팟',
    description:
      '추암 촛대바위는 해안에서 촛대처럼 솟은 바위 실루엣이 유명한 명소예요. 이른 새벽 해가 수평선에서 올라올 때 바위가 검은 그림자로 남아 사진으로 많이 담기고, 낮 시간에도 파도와 바위가 만들어내는 풍경이 인상적입니다. 해변 산책로가 단순해 혼자 걷기 좋으며, 전망 포인트들이 분산돼 있어 어느 지점에서나 바다를 바라볼 수 있어요. 사람 많을 때도 잠시만 기다리면 자리가 비어 여유롭게 사진을 찍을 수 있습니다. 날씨가 좋은 날엔 수평선과 하늘의 대비가 선명해 감성 사진 찍기에 좋아요.',
    honyeoTip:
      '일출을 보려면 새벽 이동이라 방풍 준비가 필수예요. 일출 직후 20~30분만 더 머물면 사람들이 빠지고 한적한 시간에 사진을 남길 수 있어요. 해가 높아지는 낮 시간대에도 충분히 아름다우니 일정에 맞춰 방문하면 됩니다.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['mookho']['chuam-candle-rock'],
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
    regionSlug: 'mookho',
    slug: 'mureung-valley',
    name: '무릉계곡',
    summary: '계곡 산책과 자연 힐링, 혼자 리프레시하기 좋은 곳',
    description:
      '무릉계곡은 울창한 산과 계곡이 어우러진 산책 코스예요. 입구에서 용추폭포까지 편도 약 1.5시간 정도 걸리며 길이 험하지 않아 혼자 걸어도 무리가 없어요. 계곡물은 맑고 깊어서 여름에는 물소리를 들으며 몸과 마음을 시원하게 식힐 수 있고, 비가 온 직후에는 물안개와 짙은 녹음 덕분에 풍경이 더 아름답습니다. 길 중간에는 삼화사와 쉼터가 있어 잠시 쉬어가기 좋고, 주차장과 매표소가 잘 정비돼 있어 접근도 어렵지 않습니다.',
    honyeoTip:
      '편한 운동화를 신어야 미끄러운 구간에서도 안전해요. 혼자라면 왕복 시간을 여유 있게 잡고 산책과 휴식을 번갈아 즐기면 체력 부담이 적습니다. 여름에는 아침 일찍이나 평일에 가면 한적하게 자연을 만끽할 수 있어요.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['mookho']['mureung-valley'],
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
    regionSlug: 'mookho',
    slug: 'mangsang-beach',
    name: '망상해변',
    summary: '길게 이어지는 바다 산책, 혼자 걷기 좋은 동해 대표 해변',
    description:
      '망상해변은 길이 5킬로미터에 달하는 넓은 모래 해변이라 걷는 재미가 좋은 곳이에요. 모래사장이 넓고 평탄해 맨발로도 편안하게 걸을 수 있고, 해파랑길 34코스에 속해 있어 걸으면서 작은 포구와 마을 풍경도 엿볼 수 있어요. 사람 많은 구간을 벗어나 조금만 옆으로 가면 훨씬 한적해 혼자 산책하기 좋고, 날씨가 맑은 날에는 바다 색이 안정적으로 찍혀 사진도 잘 나옵니다. 해변 뒤에는 카페나 식당으로 이어지는 길이 있어 하루 일정에 넣기 편합니다.',
    honyeoTip:
      '혼자라면 주말보다 평일에 방문하는 게 훨씬 여유로워요. 넓은 해변을 40분 정도 천천히 걸은 뒤 가까운 카페에서 쉬었다가 묵호항 쪽으로 이어가면 동선이 깔끔합니다. 바람이 강한 날엔 모래가 날릴 수 있으니 모자와 선글라스를 챙기면 좋아요.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['mookho']['mangsang-beach'],
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
    regionSlug: 'mookho',
    slug: 'mukho-udon',
    name: '묵호우동',
    summary: '혼자 먹기 쉬운 우동 한 그릇, 동선 사이에 끼우기 좋은 한 끼',
    description:
      '묵호우동은 항구 근처에 자리한 작은 우동집이에요. 홀에 6개 안팎의 테이블만 있어 혼자 방문해도 자리 잡기가 수월하고, 주문과 반찬은 셀프 방식이라 흐름이 빠른 편입니다. 국물은 맑고 진하며 유자향이 나는 냉우동부터 따끈한 튀김 우동까지 메뉴가 단순해 실패할 가능성이 적어요. 어항이나 등대 쪽 동선 사이에 들르기 쉬워 산책 중 가볍게 한 끼 해결하기 좋고, 오전 시간이 한산해 웨이팅 걱정도 덜합니다.',
    honyeoTip:
      '점심 피크(12~13시)만 피해가면 한결 여유로워요. 산책하다 들러 우동 한 그릇으로 속을 채운 뒤 근처 카페에서 커피를 마시면 하루 리듬이 안정적입니다. 자리 회전이 빠르니 혼자라도 음식이 나오기 전에 미리 번호표를 챙겨두세요.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '강원특별자치도 동해시 발한로 215-1 1층',
    lat: 37.5487188054976,
    lng: 129.108610556491,
    externalUrl: 'https://place.map.kakao.com/138712598',
    tagSlugs: ['solo-eating', 'oneday', 'walking'],
  },

  {
    regionSlug: 'mookho',
    slug: 'diver-grilled-fish',
    name: '다이버구이',
    summary: '숯불 생선구이 한 상, 혼자도 비교적 편한 로컬 한 끼',
    description:
      '다이버구이는 숯불에 구운 생선 한 상을 맛볼 수 있는 로컬 식당이에요. 기본 세트에는 꽁치·가자미·고등어 등 여러 생선이 함께 나와 다양하게 맛볼 수 있고, 뜨거운 돌 위에 올려져 있어 식사 내내 따뜻하게 유지됩니다. 혼자 여행객을 위한 1인 메뉴가 있어 혼밥이 자연스러우며, 반찬과 매운탕도 든든하게 나와 배부르게 먹기 좋아요. 인기가 많아 점심시간에는 대기가 생기기도 하는데, 브레이크타임 직후나 이른 저녁 시간에 방문하면 비교적 한적합니다.',
    honyeoTip:
      '브레이크타임이 끝난 직후(오후 5시 무렵)에 가면 자리가 빨리 납니다. 혼자라면 너무 늦은 시간보다 이른 저녁에 들러 숯불 생선 한 상으로 속을 든든히 채운 뒤 해변 산책을 하면 만족도가 높아요. 생선 냄새가 옷에 배기 쉬우니 가벼운 겉옷을 챙겨두면 편합니다.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '강원특별자치도 동해시 일출로 89',
    lat: 37.5521998711043,
    lng: 129.117579397991,
    externalUrl: 'https://place.map.kakao.com/172579686',
    tagSlugs: ['solo-eating', 'stress-relief', 'oneday'],
  },

  {
    regionSlug: 'mookho',
    slug: 'bibiso-local-diner',
    name: '비비소',
    summary: '든든한 로컬 한 끼, 혼밥 손님이 많아 편한 식당',
    description:
      '비비소는 항구와 논골담길 사이에 위치한 로컬 식당으로, 육회비빔밥과 소고기짬뽕국이 대표 메뉴예요. 육회비빔밥은 신선한 육회를 채소와 함께 비벼 먹는 방식으로 한 그릇이 푸짐하고, 곁들이로 따뜻한 소고기국이 나와 속을 든든하게 합니다. 메뉴 구성이 단순해 주문이 빠르고, 혼밥 손님이 많아 혼자 방문해도 눈치를 볼 필요가 없어요. 아침부터 문을 열어 바다 코스에 앞서 든든한 식사를 하기에 좋고, 항구·논골담길과도 가까워 일정에 자연스럽게 넣을 수 있습니다.',
    honyeoTip:
      '점심시간 직후에는 한산해 혼자 식사하기 편해요. 식사 후에는 바로 논골담길이나 항구로 이동해 산책하면서 소화를 시키면 만족도가 높습니다. 매운 국물이나 육회가 처음이라면 사장님께 추천을 부탁하면 친절하게 설명해 주세요.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '강원특별자치도 동해시 일출로 95 1층',
    lat: 37.5520778183096,
    lng: 129.118136026783,
    externalUrl: 'https://place.map.kakao.com/1354416290',
    tagSlugs: ['solo-eating', 'hidden', 'oneday'],
  },

  {
    regionSlug: 'mookho',
    slug: 'mukho-gimbap',
    name: '묵호김밥',
    summary: '가볍게 한 끼, 혼자도 부담 없는 로컬 김밥집',
    description:
      '묵호김밥은 항구와 역 근처에 있는 작은 분식집이에요. 김밥 한 줄에 달걀과 속재료를 듬뿍 넣어 맛과 식감이 풍부하고, 어묵 꼬치(핫바) 등 함께 곁들일 수 있는 간식도 준비돼 있어요. 포장이 자연스러워 바다나 시장에 들고 가서 먹기 편하고, 혼자 방문해도 주문이 빠른 편입니다. 인기가 많아 재료가 일찍 소진될 수 있으니 오전이나 이른 점심에 방문하면 원하는 메뉴를 받을 수 있어요.',
    honyeoTip:
      '혼자라면 김밥을 포장해 어달해변이나 등대공원 쪽으로 들고 가 바다를 보며 먹는 것도 좋습니다. 점심 피크(12~13시)만 피하면 줄을 서지 않고 금방 받을 수 있고, 매장 내 좌석이 적으니 포장을 추천해요.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '강원특별자치도 동해시 일출로 9-1 1층',
    lat: 37.550252060928,
    lng: 129.109319970541,
    externalUrl: 'https://place.map.kakao.com/382019330',
    tagSlugs: ['solo-eating', 'oneday', 'walking'],
  },

  {
    regionSlug: 'mookho',
    slug: 'donghae-daewoo-kalguksu',
    name: '대우칼국수',
    summary: '뜨끈한 칼국수 한 그릇, 혼자 먹기 쉬운 로컬 국수집',
    description:
      '대우칼국수는 오래된 건물 2층에 자리한 칼국수집으로, 메뉴는 오직 하나인 장칼국수예요. 진득한 고추장 육수에 면을 말고 각종 야채를 듬뿍 올린 방식으로, 맵지 않아 속이 부담되지 않습니다. 오래된 창문 사이로 햇살이 들어오는 내부는 동네 사람들의 일상적인 식사 공간이라 혼자 앉아도 편안하고, 주문과 식사 흐름이 빠른 편이에요. 영업 시간이 짧아 오후 늦게는 재료가 소진되어 문을 닫는 경우가 있어요.',
    honyeoTip:
      '오픈 직후나 점심시간이 지나 1~3시 사이가 가장 한산해 혼자 식사하기 좋아요. 칼국수를 먹은 뒤 등대공원이나 항구 쪽으로 천천히 걸으면 소화에도 도움이 됩니다. 매장은 16시 무렵에는 마감하니 너무 늦게 방문하지 않도록 주의하세요.',
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
    regionSlug: 'mookho',
    slug: 'roundabout-cafe',
    name: '라운드어바웃(ROUNDABOUT)',
    summary: '흑임자 커피 한 잔, 혼자 쉬기 딱 좋은 묵호 로컬 카페',
    description:
      '라운드어바웃은 묵호항 근처에 자리한 아담한 카페예요. 내부에는 4개 정도의 테이블만 있어 공간이 크진 않지만 창가로 들어오는 햇살 덕분에 따뜻한 분위기가 감돌고, 혼자 조용히 커피를 즐기기에 어색하지 않습니다. 시그니처인 흑임자 커피는 고소한 흑임자와 에스프레소의 조합이 부드럽고, 위에 얹은 크림을 중간에 섞으면 또 다른 맛을 느낄 수 있어요. 휘낭시에나 크로칸트 같은 디저트도 준비되어 있지만 인기 품목은 오전에 품절되기도 하니 일찍 가야 맛볼 수 있어요. 항구와 논골담길 사이 동선이 가까워 산책 후 들르기에 좋습니다.',
    honyeoTip:
      '혼자 방문한다면 오픈 직후(10시경)나 늦은 오후(4~5시경)가 가장 한적해요. 흑임자 커피는 처음에는 섞지 않고 한 모금 마신 후, 얼음과 함께 가볍게 저어 마시면 고소한 맛과 단맛을 두 번 즐길 수 있어요. 주말에는 작은 공간이 금방 만석이 되니 대기 시간을 감안하고 방문하세요.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '강원특별자치도 동해시 발한로 220 1층',
    lat: 37.5490686082424,
    lng: 129.109008498216,
    externalUrl: 'https://place.map.kakao.com/390658344',
    tagSlugs: ['cafe', 'emotional', 'thinking', 'oneday'],
  },

  {
    regionSlug: 'mookho',
    slug: 'hangeol-cafe',
    name: '한결',
    summary: '조용히 앉기 좋은 로컬 카페, 혼자 일정 중간 쉼표',
    description:
      '한결은 어달해변 건너편에 자리한 베이커리 겸 브런치 카페로, 바다를 바라볼 수 있는 통창이 가장 큰 매력이에요. 건물은 3층까지 앉을 수 있고 각 층의 창가 쪽 자리를 넉넉히 배치해 바다를 바라보며 천천히 앉아 있기 좋아요. 브리오슈 프렌치토스트나 불고기버섯크림리조또 같은 브런치 메뉴가 든든하게 나와 한 끼 식사로도 충분하고, 커피는 디카페인으로도 주문할 수 있어 취향에 맞게 선택할 수 있어요. 사진을 찍기 좋은 포토존과 거울, 넉넉한 테이블 간격 덕분에 혼자 앉아도 주변의 시선을 크게 느끼지 않습니다.',
    honyeoTip:
      '노을이 지기 1시간 전쯤 방문하면 창 너머 바다와 하늘의 색이 변하는 모습을 여유롭게 감상할 수 있어요. 3층 좌석은 바다와 바로 맞닿은 듯한 시야를 제공하니, 엘리베이터가 없다면 조금 올라가서라도 창가에 자리잡아 보세요. 점심시간 직후에는 한적해 혼자 브런치와 커피를 즐기기 좋습니다.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '강원특별자치도 동해시 일출로 195',
    lat: 37.5595681663062,
    lng: 129.119933734962,
    externalUrl: 'https://place.map.kakao.com/1611635334',
    tagSlugs: ['cafe', 'healing', 'thinking', 'oneday'],
  },

  {
    regionSlug: 'mookho',
    slug: 'caramel-station',
    name: '카라멜스테이션',
    summary: '인스타 감성 오션뷰 카페, 혼자여도 뷰 자체로 만족스러운 곳',
    description:
      '카라멜스테이션은 카페와 호텔이 함께 있는 붉은 벽돌 건물로, 묵호역과 묵호항 사이에 자리해 있어요. 카페 내부는 널찍하고 창가에서 햇볕이 들어와 힙한 감성 속에서도 따스함을 느낄 수 있고, 지하층에는 1인석이 마련돼 조용히 작업하거나 책을 읽기에도 좋아요. 대표 메뉴는 콘수수커피와 카라멜크림커피로, 옥수수맛이 고소하게 느껴지며 디저트는 매장에서 직접 구워내는 휘낭시에, 바스크 치즈케이크, 쿠키 등이 다양하게 준비돼요. 카페와 호텔이 함께 있어 숙박객이 없는 시간대에는 상대적으로 한산해 혼자 앉아 바다를 바라보기 좋습니다.',
    honyeoTip:
      '영업시간은 오전 11시부터 오후 6시쯤까지니 늦은 시간에는 이용이 어려워요. 평일 낮이나 해 지기 전 1~2시간 전이 가장 여유롭고, 바다를 산책한 후 들어오면 자리 경쟁을 피할 수 있어요. 콘수수커피는 양이 많지 않으니 디저트와 함께 주문해보는 것도 좋고, 지하 1인석을 활용하면 혼자만의 시간을 편하게 즐길 수 있어요.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '강원특별자치도 동해시 발한로 219-11 1층',
    lat: 37.5496127484116,
    lng: 129.1075492225,
    externalUrl: 'https://place.map.kakao.com/1075109088',
    tagSlugs: ['cafe', 'sea', 'emotional', 'walking'],
  },
  {
    regionSlug: 'mookho',
    slug: 'almare-cafe',
    name: '알마레(Almare)',
    summary: '오션뷰로 쉬어가기, 혼자여도 분위기 잡히는 바다 카페',
    description:
      '알마레는 한섬해변 바로 앞에 위치한 다층 건물로, 1층은 주차장, 3층은 레스토랑, 4층은 디저트 카페, 5층은 루프탑으로 구성돼 있어요. 4층 카페는 통창과 루프탑 덕분에 바다를 한눈에 바라볼 수 있고, 커피 한 잔 가격도 크게 비싸지 않아 부담이 적습니다. 아메리카노를 주문하면 미니 쿠키가 함께 나오고, 크로플을 바나나에 설탕을 입혀 토치로 구워주는 등 디저트의 퀄리티가 높아요. 건물 규모가 커 좌석이 넉넉하고 주차 공간도 충분해 혼자 찾는 여행자도 편하게 머물 수 있습니다.',
    honyeoTip:
      '루프탑은 날씨가 좋을 때 바다와 하늘을 동시에 즐길 수 있는 최고의 자리라 해 질 무렵에 올라가 보는 것을 추천해요. 주문한 음료는 포장해 한섬해변을 걸으며 마셔도 좋고, 실내에서 창가 자리를 선택하면 바람이 불어도 편하게 바다를 감상할 수 있어요. 카페와 레스토랑의 운영시간이 다르니 방문 전 시간을 확인하세요.',
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
    regionSlug: 'mookho',
    slug: 'sadam-winebar',
    name: '사담',
    summary: '조용히 혼술하기 좋은 와인바/바, 여행 마무리로 딱',
    description:
      '사담은 북평시장 근처 2층에 자리한 홍콩식 와인바로, 외관부터 홍콩 레트로 감성이 물씬 풍겨요. 내부는 은은한 조명과 와인 병으로 꾸며져 있어 분위기가 차분해 혼자 앉아도 어색하지 않으며, 바와 아늑한 테이블들이 적당한 거리감으로 배치돼 있어요. 메뉴는 쪽파 & 베이컨 크림치즈 크로켓, 홍콩식 오이무침 등 흔치 않은 안주와 와인 리스트가 준비돼 있어 새로운 조합을 즐길 수 있고, 직원들이 추천을 도와줘 와인 초보자도 편하게 주문할 수 있습니다. 정기 휴일과 영업 시간이 있으니 방문 전에 확인해야 합니다.',
    honyeoTip:
      '혼술이라면 평일 오픈 직후나 장날 오전시간에 방문하면 여유로운 분위기를 즐길 수 있어요. 외관이 다소 눈에 띄지 않지만 2층으로 올라가면 홍콩 영화 속 한 장면 같은 분위기가 펼쳐지니 주저하지 말고 문을 열어보세요. 귀가 동선을 미리 정해두고 1~2잔 정도 가볍게 즐기면 여행 마무리로 딱입니다.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '강원특별자치도 동해시 대동로 103 2층',
    lat: 37.4812858792673,
    lng: 129.127702563111,
    externalUrl: 'https://place.map.kakao.com/1449484740',
    tagSlugs: ['solo-drinking', 'emotional', 'nightview'],
  },

  {
    regionSlug: 'mookho',
    slug: 'windy-hill-donghae-tapas-wine-beer',
    name: '바람의 언덕 동해타파스 와인 앤 비어',
    summary: '언덕 위 오션뷰 한 잔, 혼자여행 밤을 예쁘게 마무리',
    description:
      '바람의 언덕 동해타파스 와인 앤 비어는 논골담길 언덕 위에 자리한 작은 와인·맥주 바예요. 길을 따라 한참 올라가야 하지만 정상에 도착하면 바다와 항구가 한눈에 내려다보이는 풍경이 펼쳐져서 오르는 수고를 잊게 해줍니다. 야외 좌석은 비닐막이 씌워진 바 좌석 5석 정도와 실내 온실처럼 꾸며진 테이블 몇 개가 있어 바다를 가까이서 바라보며 한 잔을 즐길 수 있어요. 메뉴는 치즈와 나초, 빠네수프 등 간단히 곁들일 수 있는 안주와 맥주·와인이 준비돼 있고, 날씨에 따라 난로를 켜주어 겨울에도 따뜻하게 머물 수 있습니다. 카페 느낌보다는 소박한 펜션 같은 분위기라 혼자 가도 부담이 적어요.',
    honyeoTip:
      '오르막길이 제법 가파르니 편한 신발을 신고 천천히 올라오세요. 노을이 지는 시간대에 방문하면 해가 지는 바다와 어둑한 항구를 이어서 볼 수 있어 분위기가 가장 좋습니다. 야외 좌석은 정면으로 해가 들어와 선글라스가 있으면 편하고, 겨울엔 따뜻한 겉옷과 장갑을 챙기면 더 오래 머물 수 있어요.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '강원특별자치도 동해시 논골1길 22-7 1층',
    lat: 37.5529887691578,
    lng: 129.118194972339,
    externalUrl: 'https://place.map.kakao.com/1958929129',
    tagSlugs: ['solo-drinking', 'nightview', 'emotional', 'sea'],
  },

  {
    regionSlug: 'mookho',
    slug: 'donghae-125th-street',
    name: '125TH 스트릿',
    summary: '분위기 좋은 와인/칵테일, 혼자 앉기 좋은 바 무드',
    description:
      '125TH 스트릿은 천곡동의 상가거리 안쪽에 자리한 와인·칵테일 바예요. 예전에는 술집으로 운영되던 공간을 칵테일 바로 개조해 차분한 분위기를 갖추고 있고, 메인홀에는 둥근 테이블과 바 좌석이 적당히 섞여 있어 혼자 앉아도 부담스럽지 않아요. 카펫이 깔린 바닥과 은은한 조명, 소품들이 몽환적인 무드를 만들어주며, 메뉴에는 위스키·와인·리큐르를 기반으로 한 칵테일과 무알콜 칵테일까지 다양하게 준비돼 있어 취향에 맞는 한 잔을 고를 수 있습니다. 기본 안주로 제공되는 설탕 건빵 외에도 감자튀김 등 간단한 안주를 주문할 수 있어 가볍게 술 한 잔하며 시간을 보내기 좋아요.',
    honyeoTip:
      '영업시간은 월요일부터 토요일까지 오후 6시부터 새벽 2시까지예요. 혼자라면 이른 시간대에 들어가 바텐더와 천천히 대화를 나누며 자신에게 맞는 칵테일을 추천받아 보세요. 분위기가 차분해 시끌벅적한 주점을 선호하지 않는 사람에게 잘 맞고, 귀가 동선을 미리 정해두면 마음이 한결 편합니다.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '강원도 동해시 천곡동 916',
    lat: 37.5197020261347,
    lng: 129.117138435083,
    externalUrl: 'https://www.diningcode.com/profile.php?rid=l08LWnjld6kd',
    tagSlugs: ['solo-drinking', 'emotional', 'nightview', 'thinking'],
  },
];
