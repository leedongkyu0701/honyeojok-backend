import { ImageSource } from 'src/types/util';
import { SpotCategory } from 'src/types/spot';
import imageMap from '../../image-map.json';
import type { SpotSeedData } from './index';

export const mookhoSpots: SpotSeedData[] = [
  // 1) NATURE / ACTIVITY / ETC

  {
    regionSlug: 'mookho',
    slug: 'mukho-nongoldamgil',
    name: '논골담길(묵호)',
    summary: '바다 보이는 벽화 골목길, 혼자 걷기 좋은 감성 산책 코스',
    description:
      '묵호항 언덕을 따라 이어지는 골목 산책 코스예요. 벽화·계단·바다 뷰 포인트가 자연스럽게 이어져서 혼자 천천히 걸어도 지루하지 않아요. 구간마다 분위기가 달라 “발길 닿는 대로” 걷기 좋고, 사진도 혼자 찍기 쉬운 스팟이 많은 편입니다. 근처 항구/시장/카페 동선이 붙어 있어 코스 짜기도 편해요.',
    honyeoTip:
      '오전 9~11시가 가장 한적해요. “논골담길 → 등대공원 → 항구/시장”으로 내려오는 동선이 체력도 덜 들고 사진도 역광이 덜합니다.',
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['mookho']['mukho-nongoldamgil'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-나기환',
    address: '강원특별자치도 동해시 해맞이길 289 일대',
    externalUrl:
      'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=8f2ed49f-89ee-4ab0-b5dd-98f9b3debe14',
    tagSlugs: ['culture', 'walking', 'emotional', 'hidden'],
  },

  {
    regionSlug: 'mookho',
    slug: 'mukho-lighthouse-park',
    name: '묵호등대공원',
    summary: '묵호항과 동해바다 전망, 혼자 생각정리하기 좋은 언덕 공원',
    description:
      '묵호항을 내려다보는 언덕 전망 포인트예요. 올라가는 길이 길지 않아 혼자 가볍게 산책하기 좋고, 정상 쪽은 바다·항구 뷰가 시원하게 열립니다. 바람 소리 들으면서 잠깐 멈춰 서기 좋은 벤치/포인트가 있어요. 논골담길과 동선이 자연스럽게 연결됩니다.',
    honyeoTip:
      '바람이 꽤 세서 체감온도가 떨어져요(겉옷 추천). 해 질 무렵에 올라가면 노을→야경으로 분위기 변화가 확 느껴집니다.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['mookho']['mukho-lighthouse-park'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-조영권',
    address: '강원특별자치도 동해시 해맞이길 289(묵호등대공원 일대)',
    externalUrl:
      'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=edc596d5-125b-4c3b-a8a8-5f3a10c2c43c',
    tagSlugs: ['nightview', 'walking', 'thinking', 'healing'],
  },

  {
    regionSlug: 'mookho',
    slug: 'mukho-fish-market',
    name: '묵호항 수산시장(묵호어시장)',
    summary: '싱싱한 해산물 구경 & 1인도 가능한 물회로 혼밥하기 좋은 곳',
    description:
      '묵호항 주변 수산시장/회센터 라인이에요. 구경만 해도 재미가 있고, 물회·회덮밥 같은 1인 메뉴로 혼자 한 끼 해결하기도 쉬운 편입니다. 시간대에 따라 사람 밀도가 확 달라서 혼자 여행자는 타이밍만 잘 잡으면 스트레스가 적어요. 논골담길/등대공원에서 내려오는 동선에 자연스럽게 붙습니다.',
    honyeoTip:
      '오전~점심 전(11시대)이 덜 붐벼요. 혼자라면 “물회/회덮밥/매운탕 1인”처럼 단품 가능한 메뉴 위주로 고르면 편합니다.',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['mookho']['mukho-fish-market'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-강원지사',
    address: '강원특별자치도 동해시 일출로 22 (묵호항/묵호어시장 일대)',
    tagSlugs: ['solo-eating', 'shopping', 'culture', 'sea'],
  },

  {
    regionSlug: 'mookho',
    slug: 'eodal-beach',
    name: '어달해변',
    summary: '조용한 바다 산책 + 오션뷰 카페 동선 짜기 쉬운 해변',
    description:
      '규모가 과하지 않아 혼자 걷기 딱 좋은 해변이에요. 모래사장 산책로가 단순해서 “생각 정리”하면서 걷기 좋고, 파도 소리 덕에 멍 때리기도 좋아요. 주변에 오션뷰 카페/간단한 식사 포인트가 붙어 있어 코스 설계가 쉬운 편입니다. 날씨 좋은 날엔 사진이 안정적으로 잘 나와요.',
    honyeoTip:
      '바람이 강한 날이 많아서 모자/후드 추천. “해변 산책 → 카페 1곳 → 저녁(시장/항구)”로 끊으면 하루 리듬이 좋아요.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['mookho']['eodal-beach'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-강원지사',
    address: '강원특별자치도 동해시 일출로 357(어달해변 일대)',
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
      '절벽 라인 위에서 동해 바다를 내려다보는 대표 포토 스팟이에요. 동선이 명확해서 혼자 방문해도 “어디서 뭘 해야 할지”가 깔끔하고, 사진 포인트가 구간별로 나뉘어 있어요. 바다 색이 잘 나오는 날엔 그냥 서 있기만 해도 결과물이 잘 나옵니다. 어달/추암 라인과 묶으면 하루 코스가 좋아요.',
    honyeoTip:
      '강풍/기상에 따라 운영 변동이 있으니 당일 공지 체크 추천. 혼자라면 평일 오후(해질 무렵 전)가 덜 붐벼서 사진 찍기 편해요.',
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['mookho']['dodokkaebi-gol-skyvalley'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-조영권',
    address: '강원특별자치도 동해시 묵호진동 2-109(도째비골 스카이밸리 일대)',
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
      '스카이밸리와 함께 묶기 좋은 전망 포인트예요. 짧게 들러도 뷰가 확 열려서 기분 전환이 되고, 해 질 무렵엔 하늘·바다 색이 예쁘게 변합니다. 사람 많은 시간만 피하면 혼자 조용히 바다 보며 쉬기 좋아요. 사진도 “광각 한 컷”으로 정리되기 쉬운 타입입니다.',
    honyeoTip:
      '해 질 무렵~야경 초반이 제일 예뻐요. 바람이 세면 체감이 확 떨어지니 겉옷은 꼭 챙기세요.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['mookho']['haerang-observatory'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-조영권',
    address: '강원특별자치도 동해시 묵호진동 산 42(해랑전망대 일대)',
    externalUrl: 'https://www.gwto.or.kr/contents.asp?page=262&kind=1&IDX=2948',
    tagSlugs: ['nightview', 'sea', 'walking', 'healing'],
  },

  {
    regionSlug: 'mookho',
    slug: 'chuam-candle-rock',
    name: '추암 촛대바위',
    summary: '동해 대표 일출 명소, 혼자 감성 사진 찍기 좋은 바다 스팟',
    description:
      '촛대처럼 솟은 바위 실루엣이 유명한 명소예요. 풍경 자체가 강해서 혼자 가도 “그냥 보고 찍는 것만으로” 만족도가 높은 편입니다. 해변 산책로가 단순해서 혼자 걷기 좋고, 사진 포인트도 명확해요. 일출 시간대는 사람이 몰릴 수 있지만 낮에도 충분히 예쁩니다.',
    honyeoTip:
      '일출 보려면 새벽 이동이라 방풍 준비 필수. 혼자라면 일출 직후 30분만 더 머물면 사람 빠져서 사진 찍기 훨씬 편해요.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['mookho']['chuam-candle-rock'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-김지호',
    address: '강원특별자치도 동해시 추암동(추암해변/촛대바위 일대)',
    externalUrl:
      'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=09c722f6-7f85-4c89-8f91-6d3b6e1e4b07',
    tagSlugs: ['sea', 'emotional', 'walking', 'oneday'],
  },

  {
    regionSlug: 'mookho',
    slug: 'mureung-valley',
    name: '무릉계곡',
    summary: '계곡 산책과 자연 힐링, 혼자 리프레시하기 좋은 곳',
    description:
      '물소리 들으면서 걷기 좋은 계곡 산책 코스예요. 길이 너무 빡세지 않아서 혼자도 무리 없이 걷기 좋고, 중간중간 쉬어갈 포인트가 있습니다. 날씨가 더울수록 만족도가 올라가는 타입이고, 비 온 다음날은 분위기가 더 살아나요. 바다 코스와 다른 결의 “자연 리셋” 코스로 추천합니다.',
    honyeoTip:
      '편한 운동화 필수(바닥이 젖어 있을 수 있어요). 혼자라면 왕복 시간을 짧게 잡고 “산책 + 휴식” 위주로 즐기면 체력 부담이 적습니다.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['mookho']['mureung-valley'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-홍정표',
    address: '강원특별자치도 동해시 삼화로 538(무릉계곡 일대)',
    externalUrl:
      'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=1b5b0c64-6b0e-4d60-a7c3-3f02f3c36b78',
    tagSlugs: ['nature', 'mountain', 'healing', 'walking'],
  },

  {
    regionSlug: 'mookho',
    slug: 'mangsang-beach',
    name: '망상해변',
    summary: '길게 이어지는 바다 산책, 혼자 걷기 좋은 동해 대표 해변',
    description:
      '동해 라인에서 규모가 큰 해변이라 산책 만족도가 높아요. 길게 걷기 좋은 구간이 많아서 혼자 여행자에게 특히 잘 맞고, 바다 색이 잘 나오는 날엔 사진도 안정적입니다. 사람 많은 구간을 피해 조금만 옆으로 이동하면 훨씬 한적해져요. 해변 코스 뒤에 카페/식사로 이어가기 좋습니다.',
    honyeoTip:
      '혼자라면 주말보다 평일이 훨씬 편해요. “해변 40분 산책 → 카페 1곳 → 저녁(묵호항)”처럼 끊어가면 루트가 깔끔합니다.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: '',
    imageSource: undefined as unknown as ImageSource,
    imageCredit: '',
    address: '강원특별자치도 동해시 망상동(망상해변 일대)',
    externalUrl:
      'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=4635de7b-a20a-4b12-9074-9dcd10d8987e',
    tagSlugs: ['sea', 'walking', 'healing', 'oneday'],
  },

  // 2) FOOD

  {
    regionSlug: 'mookho',
    slug: 'mukho-udon',
    name: '묵호우동',
    summary: '혼자 먹기 쉬운 우동 한 그릇, 동선 사이에 끼우기 좋은 한 끼',
    description:
      '우동/국수류는 혼자 여행에서 실패 확률이 낮은 메뉴예요. 메뉴가 단순하면 주문도 빠르고 식사 흐름이 짧아 이동 동선 사이에 넣기 좋습니다. 역/항구권에서 접근이 쉬운 편이라 일정 중간에 붙이기 좋아요. 혼자 방문 후기 기반으로 “가볍게 한 끼” 타입에 잘 맞습니다.',
    honyeoTip:
      '점심 피크(12~13시)만 피하면 훨씬 편해요. “산책 → 우동 → 카페”로 끊어가면 하루 리듬이 안정적입니다.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '강원특별자치도 동해시 발한로 215-1 1층',
    externalUrl: 'https://place.map.kakao.com/138712598',
    tagSlugs: ['solo-eating', 'oneday', 'walking'],
  },

  {
    regionSlug: 'mookho',
    slug: 'diver-grilled-fish',
    name: '다이버구이',
    summary: '숯불 생선구이 한 상, 혼자도 비교적 편한 로컬 한 끼',
    description:
      '생선구이는 혼자 먹기 좋은 메뉴라 혼밥 난이도가 낮은 편이에요. 구성이 단단해서 “든든하게 먹고 걷기” 코스에 잘 맞습니다. 인기 시간대엔 붐빌 수 있어 타이밍이 중요하고, 브레이크타임 전후로 분위기가 달라질 수 있어요. 바다 코스 중간에 붙이기 좋습니다.',
    honyeoTip:
      '브레이크타임 끝나는 직후가 비교적 편해요. 혼자라면 너무 늦은 저녁보다 이른 저녁(5~6시대) 추천.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '강원특별자치도 동해시 일출로 89',
    externalUrl: 'https://place.map.kakao.com/172579686',
    tagSlugs: ['solo-eating', 'stress-relief', 'oneday'],
  },

  {
    regionSlug: 'mookho',
    slug: 'bibiso-local-diner',
    name: '비비소',
    summary: '든든한 로컬 한 끼, 혼밥 손님이 많아 편한 식당',
    description:
      '혼밥 손님이 자연스러운 로컬 식당은 혼자 여행 중에 진짜 편해요. 메뉴 구성이 단단해서 “바다 코스 전/후로 든든하게” 먹기 좋고, 식사 흐름도 빠른 편이라는 후기가 많습니다. 관광 동선과 크게 멀지 않아 일정에 넣기 쉬운 편이에요.',
    honyeoTip:
      '혼자라면 점심 피크만 살짝 피하면 더 편해요. 식사 후 항구/논골담길로 이동해 산책으로 소화 코스 추천.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '강원특별자치도 동해시 일출로 95 1층',
    externalUrl: 'https://place.map.kakao.com/1354416290',
    tagSlugs: ['solo-eating', 'hidden', 'oneday'],
  },

  {
    regionSlug: 'mookho',
    slug: 'mukho-gimbap',
    name: '묵호김밥',
    summary: '가볍게 한 끼, 혼자도 부담 없는 로컬 김밥집',
    description:
      '항구/역 근처 동선에서 “빨리 먹고 움직이기” 좋은 김밥·분식 타입이에요.혼자 여행 중엔 메뉴가 단순한 곳이 주문도 빠르고 실패 확률이 낮습니다.포장도 자연스러워서 시장/바다 산책 전에 챙겨가기도 좋아요.붐비는 시간대엔 회전이 빠른 편이라 타이밍만 잘 잡으면 편하게 먹을 수 있어요.',
    honyeoTip:
      '혼자라면 포장해서 “어달해변/등대공원” 쪽에서 바다 보며 먹는 루트가 좋아요. 점심 피크(12~13시)만 피하면 훨씬 편합니다.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '강원특별자치도 동해시 일출로 9-1 1층',
    externalUrl: 'https://place.map.kakao.com/382019330',
    tagSlugs: ['solo-eating', 'oneday', 'walking'],
  },

  {
    regionSlug: 'mookho',
    slug: 'donghae-daewoo-kalguksu',
    name: '대우칼국수',
    summary: '뜨끈한 칼국수 한 그릇, 혼자 먹기 쉬운 로컬 국수집',
    description:
      '칼국수는 혼자 여행 중 “가장 무난한 한 끼”에 속해요. 메뉴가 단단하고 식사 속도가 빨라 동선 사이에 끼워 넣기 좋습니다. 바다/시장 코스 전후로 속 편하게 먹기 좋아 재방문 후기도 많은 편이에요. 대기 가능성이 있으면 시간대를 살짝 비워두는 게 좋아요.',
    honyeoTip:
      '혼자라면 오픈 직후 또는 점심 피크 지난 1~3시 사이가 편해요. 먹고 나서 등대공원/항구 쪽으로 걷는 소화 코스 추천.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '강원특별자치도 동해시 일출로 10',
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
      '묵호역/항구권에서 접근이 쉬워 “산책-카페”로 동선이 깔끔해요. 흑임자 커피/라떼로 유명해서 목적 방문하는 후기가 꾸준히 보입니다. 공간 규모가 크진 않지만 혼자 앉아 쉬거나 사진 정리하기 좋은 톤이고, 주말/피크엔 웨이팅이 생길 수 있어 시간대 선택이 중요해요.',
    honyeoTip:
      '혼자라면 오픈 직후(10시대)나 늦은 오후(4~5시대)가 가장 편해요. “논골담길/등대 → 라운드어바웃 → 시장” 흐름으로 끊으면 동선이 예쁩니다.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '강원특별자치도 동해시 발한로 220 1층',
    externalUrl: 'https://place.map.kakao.com/390658344',
    tagSlugs: ['cafe', 'emotional', 'thinking', 'oneday'],
  },

  {
    regionSlug: 'mookho',
    slug: 'hangeol-cafe',
    name: '한결',
    summary: '조용히 앉기 좋은 로컬 카페, 혼자 일정 중간 쉼표',
    description:
      '묵호/발한 권역에서 혼자 들르기 좋은 카페로 언급이 자주 보이는 편이에요. 좌석 톤이 비교적 안정적이면 혼자 앉아도 시선 스트레스가 덜하고, 산책 코스(논골담길/항구) 사이에 넣기 좋아 일정이 잘 이어집니다. 바람 센 날/비 오는 날에도 일정 “안전빵”으로 넣기 좋은 타입이에요.',
    honyeoTip:
      '혼자라면 2~5시 사이가 가장 쾌적한 경우가 많아요. 카페에서 쉬었다가 해질 무렵 등대/항구 쪽으로 다시 나가면 하루 마무리가 좋아요.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '강원특별자치도 동해시 일출로 195',
    externalUrl: 'https://place.map.kakao.com/1611635334',
    tagSlugs: ['cafe', 'healing', 'thinking', 'oneday'],
  },

  {
    regionSlug: 'mookho',
    slug: 'caramel-station',
    name: '카라멜스테이션',
    summary: '인스타 감성 오션뷰 카페, 혼자여도 뷰 자체로 만족스러운 곳',
    description:
      '인스타에서 유행하는 콘수수커피와 카라멜크림커피를 맛볼 수 있는곳 ',
    honyeoTip:
      '혼자라면 평일 낮 또는 해 지기 전 1~2시간이 베스트예요. 바다 먼저 걷고 들어가면 자리 경쟁이 줄고, 사진도 더 예쁘게 나와요.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '강원특별자치도 동해시 발한로 219-11 1층',
    externalUrl: 'https://place.map.kakao.com/1075109088',
    tagSlugs: ['cafe', 'sea', 'emotional', 'walking'],
  },
  {
    regionSlug: 'mookho',
    slug: 'almare-cafe',
    name: '알마레(Almare)',
    summary: '오션뷰로 쉬어가기, 혼자여도 분위기 잡히는 바다 카페',
    description:
      '어달해변 라인에서 “뷰가 목적”으로 들르기 좋은 오션뷰 카페 타입이에요. 혼자 창가에 앉아 바다 보면서 쉬면 일정이 과해도 리셋이 되고, 사진도 뷰 자체로 안정적으로 나와서 인스타 감성에 잘 맞습니다. 해질 무렵엔 분위기가 더 좋아져 “바다-카페-야경” 흐름이 예뻐요.',
    honyeoTip:
      '혼자라면 해 지기 1시간 전쯤 도착해서 노을 시작까지 앉아있어 보세요. 바람이 세면 실내 창가 자리로 잡는 게 베스트예요.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '강원특별자치도 동해시 감추6길 40 4층',
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
      '바(카운터) 톤이 강한 곳은 혼자 들어가도 자연스러운 편이에요. 조도가 낮고 분위기가 차분하면 혼자 여행 마무리로 딱 좋습니다. 한두 잔만 마시고 나오는 흐름이 가능해 부담이 덜하고, 대화 없이도 시간을 보내기 좋아요. 야경 산책과 함께 묶기 좋습니다.',
    honyeoTip:
      '혼술은 오픈 직후/평일이 가장 편해요. 들어가기 전에 귀가 동선(택시/버스)을 먼저 정해두면 마음이 편합니다.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '강원특별자치도 동해시 대동로 103 2층',
    externalUrl: '', // TODO: 카카오맵 플레이스 URL 확인 필요
    tagSlugs: ['solo-drinking', 'emotional', 'nightview'],
  },

  // 기존 장소
  {
    regionSlug: 'mookho',
    slug: 'windy-hill-donghae-tapas-wine-beer',
    name: '바람의 언덕 동해타파스 와인 앤 비어',
    summary: '언덕 위 오션뷰 한 잔, 혼자여행 밤을 예쁘게 마무리',
    description:
      '언덕 위 뷰가 있는 와인/비어바는 혼자 있어도 덜 어색해요. 창가/바 자리에서 바다 보며 한 잔하기 좋은 흐름이고, 사진도 자연스럽게 남길 수 있습니다. 논골담길 산책 후 바로 이어지는 동선이라 저녁 코스로 붙이기 좋아요. 주말엔 붐빌 수 있어 타이밍이 중요합니다.',
    honyeoTip:
      '해 질 무렵 방문하면 노을→야경으로 분위기 흐름이 좋아요. 혼자라면 1~2잔으로 가볍게 즐기는 게 만족도가 높습니다.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '강원특별자치도 동해시 묵호진동(논골담길 인근 언덕 권역)',
    externalUrl: '', // TODO: 카카오맵 플레이스 URL 확인 필요
    tagSlugs: ['solo-drinking', 'nightview', 'emotional', 'sea'],
  },

  {
    regionSlug: 'mookho',
    slug: 'donghae-125th-street',
    name: '125TH 스트릿',
    summary: '분위기 좋은 와인/칵테일, 혼자 앉기 좋은 바 무드',
    description:
      '조용히 한 잔 하기 좋은 톤의 바는 혼자 여행에서 진짜 효자예요. 조도/음악 톤이 과하지 않으면 혼자 들어가도 부담이 적고, 바텐더에게 취향만 말해도 주문이 수월합니다. “산책 후 1~2잔”으로 마무리하기 좋은 타입이에요.',
    honyeoTip:
      '혼자라면 오픈 직후나 평일 초저녁이 가장 안정적이에요. 귀가 동선을 먼저 정해두고 1~2잔으로 마무리하면 만족도가 높습니다.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '강원특별자치도 동해시 논골1길 22-7',
    externalUrl: '', // TODO: 카카오맵 플레이스 URL로 교체(가게명: 125TH 스트릿)
    tagSlugs: ['solo-drinking', 'emotional', 'nightview', 'thinking'],
  },
];
