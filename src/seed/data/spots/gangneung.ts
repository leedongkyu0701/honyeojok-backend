import { ImageSource } from 'src/types/util';
import { SpotCategory } from 'src/types/spot';
import imageMap from '../../image-map.json';
import type { SpotSeedData } from './index';

export const gangneungSpots: SpotSeedData[] = [
  // 1) NATURE / ACTIVITY / ETC

  {
    regionSlug: 'gangneung',
    slug: 'anmok-beach-coffee-street',
    name: '안목해변(커피거리)',
    summary:
      '바다 보며 커피 한 잔, 혼자서도 동선/시간 보내기 쉬운 강릉 대표 핫플',
    description:
      '안목항 옆 해변과 커피거리가 길게 이어져 “바다 산책 → 카페” 흐름이 자연스럽고 혼자여행객도 많아 혼자 걷거나 사진 찍어도 어색함이 적으며 벤치와 산책로가 잘 잡혀 있고 해 질 무렵엔 노을과 바다색이 예쁘게 나와 인스타 사진 포인트가 많고 카페 선택지가 다양해 취향대로 쉬어가기 좋다.',
    honyeoTip: '주말은 사람 많아서 평일 오전/해질 무렵이 가장 편해요.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['gangneung']['anmok-beach-coffee-street'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-디엔에이스튜디오',
    address: '강원특별자치도 강릉시 창해로14번길 20-1',
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=2f41c020-ad89-4e76-b3fe-9fb1b0a26015',
    tagSlugs: ['sea', 'cafe', 'walking', 'emotional'],
  },

  // 신규 장소 (경포/강문 라인)
  {
    regionSlug: 'gangneung',
    slug: 'gangmun-beach',
    name: '강문해변',
    summary: '경포 옆 조용한 바다 산책, 혼자 바다멍하기 딱 좋은 곳',
    description:
      '경포지구와 가까워 숙소나 카페 동선에 붙이기 쉽고 백사장과 바다색이 깔끔하게 나와 사진 찍기 좋으며 사람 흐름이 비교적 분산되는 편이라 혼자 쉬기 편하고 강문항이 가까워 가벼운 구경 포인트도 더할 수 있고 바람이 세게 부는 날이 있어 노을 시간대엔 겉옷을 챙기면 오래 머물기 좋다.',
    honyeoTip:
      '“경포해변/경포호 → 강문해변 → 카페”로 묶으면 반나절 코스가 깔끔해요.',
    category: SpotCategory.NATURE,
    imageUrl: imageMap.spots['gangneung']['gangmun-beach'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-IR스튜디오',
    isRecommended: true,
    address: '강원특별자치도 강릉시 강문동 일대',
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=0ee28a9c-a993-43c4-b1ba-ea658cb1617c',
    tagSlugs: ['sea', 'walking', 'healing', 'oneday'],
  },

  {
    regionSlug: 'gangneung',
    slug: 'gyeongpo-beach',
    name: '경포해수욕장',
    summary: '넓은 백사장과 바다멍, 혼자 걷기 좋은 강릉 대표 해변',
    description:
      '넓은 백사장이라 사람 많은 날에도 답답하지 않고 혼자 걷기 좋은 대표 해변이며 바다 풍경 자체가 콘텐츠라 사진 포인트가 많고 산책 동선이 단순해 초행도 쉽고 근처에 경포호와 카페와 숙소가 모여 “해변+호수+카페”로 코스 확장이 편하며 해 질 무렵엔 바람이 차가워질 수 있어 체감온도 대비가 필요하다.',
    honyeoTip: '해질 무렵 바람이 차가워지니 겉옷 챙기기.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['gangneung']['gyeongpo-beach'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-IR스튜디오',
    address: '강원특별자치도 강릉시 경포로 393',
    externalUrl:
      'https://access.visitkorea.or.kr/opentour/detail.do?cotId=aecbf04b-0211-4ef4-b8c4-6c4fe8d59700',
    tagSlugs: ['sea', 'walking', 'healing', 'oneday'],
  },

  {
    regionSlug: 'gangneung',
    slug: 'gangneung-jungang-market',
    name: '강릉중앙시장',
    summary:
      '20~30대도 즐기는 강릉 먹거리 핫플, 혼자 ‘주전부리 투어’ 하기 좋은 곳',
    description:
      '시장 자체가 하나의 코스라 혼자여행에도 흐름이 자연스럽고 간단히 서서 가볍게 먹을 수 있는 메뉴가 많아 “혼자 먹고 구경하고”가 가능하며 주변 도심 월화거리와 가깝고 이동 동선이 짧아 반나절 일정으로 쓰기 좋고 늦은 오후~저녁에 활기가 올라오지만 혼잡이 부담이면 평일 낮이 편하다.',
    honyeoTip: '늦은 오후~저녁에 가장 활기차고, 너무 붐비면 평일 낮 추천.',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['gangneung']['gangneung-jungang-market'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-김지호',
    address: '강원특별자치도 강릉시 금성로 21(성남동)',
    externalUrl: 'https://www.gn.go.kr/www/contents.do?key=568',
    tagSlugs: ['shopping', 'culture', 'solo-eating', 'oneday'],
  },

  {
    regionSlug: 'gangneung',
    slug: 'wolhwa-street',
    name: '강릉 월화거리',
    summary: '도심 감성 산책 코스, 혼자 걷고 사진 남기기 좋은 거리',
    description:
      '중앙시장과 가까워 “시장→골목 산책” 동선으로 붙이기 쉬운 도심 코스이며 간판과 벽화와 소품샵 등 작은 볼거리가 이어져 혼자 걸어도 심심하지 않고 주변에 카페와 디저트와 가벼운 숍들이 있어 쉬어가기 포인트를 잡기 좋고 짧은 코스로도 만족도가 나와 당일치기 일정에 특히 잘 맞는다.',
    honyeoTip: '시장+월화거리 묶어서 “도심 반나절 코스”로 쓰기 좋아요.',
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['gangneung']['wolhwa-street'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-김지호',
    address: '강원특별자치도 강릉시 금성로11번길 9',
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=b9560f37-c615-48dd-8c66-28bb6dbae173',
    tagSlugs: ['walking', 'emotional', 'shopping', 'culture'],
  },

  {
    regionSlug: 'gangneung',
    slug: 'ojukheon',
    name: '오죽헌',
    summary:
      '고즈넉한 한옥 정원 산책, 혼자 천천히 보기 좋은 강릉 대표 문화 코스',
    description:
      '율곡 이이와 신사임당 관련 유적지로 한옥과 정원이 잘 정돈되어 혼자 천천히 돌기 좋고 동선이 복잡하지 않아 사진 포인트가 명확하며 비교적 차분한 분위기라 혼자 관람해도 시선 부담이 적고 생각정리하기 좋고 경포나 초당 라인과도 멀지 않아 하루 코스로 묶기 쉽다.',
    honyeoTip:
      '혼자라면 오전 오픈 시간대가 가장 고즈넉해요. 이후 경포 쪽으로 이동 추천.',
    category: SpotCategory.ACTIVITY,
    imageUrl: imageMap.spots['gangneung']['ojukheon'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-마이픽쳐스',
    isRecommended: true,
    address: '강원특별자치도 강릉시 율곡로 3139',
    externalUrl:
      'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=679100b3-4c51-452c-8ca1-ee196477cce1',
    tagSlugs: ['culture', 'walking', 'thinking', 'oneday'],
  },

  {
    regionSlug: 'gangneung',
    slug: 'arte-museum-gangneung',
    name: '아르떼뮤지엄 강릉',
    summary:
      '몰입형 미디어아트 전시, 혼자 가도 만족도 높은 20~30대 인기 실내 코스',
    description:
      '몰입형 미디어아트 전시라 혼자 관람해도 콘텐츠가 강해 만족도가 높고 실내 동선이 비교적 명확해 혼자 천천히 보기에 좋으며 사진 포인트도 많고 비오는 날이나 한파나 폭염처럼 날씨가 애매할 때 실내 감성 코스로 특히 유용하며 초당과 경포 라인과 가까워 식사와 카페와 묶기 쉽다.',
    honyeoTip: '오픈 직후/마감 전 시간대가 비교적 덜 붐벼요.',
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['gangneung']['arte-museum-gangneung'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사',
    address: '강원특별자치도 강릉시 난설헌로 131 (초당동)',
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=38fc0d8a-0abc-46e1-a06a-31145a131588',
    tagSlugs: ['activity', 'emotional', 'culture', 'thinking'],
  },

  {
    regionSlug: 'gangneung',
    slug: 'haslla-art-world',
    name: '하슬라아트월드',
    summary:
      '바다 전망 + 예술 전시/조각공원, 혼자여행 감성 코스로 좋은 복합 공간',
    description:
      '전시와 야외 조각공원 동선이 이어져 혼자도 지루하지 않고 걷는 재미가 있으며 바다 전망이 함께 잡혀 사진이 잘 나오는 스팟이 많아 20~30대에게 특히 인기이고 야외 구간이 있어 날씨 영향을 받기 쉬우니 바람이나 비 예보를 체크하면 만족도가 올라가며 정동진 라인과 가깝게 묶여 “바다+아트” 하루 코스로 만들기 좋다.',
    honyeoTip: '야외 동선이 있어 바람/비 예보 확인하고 가면 좋아요.',
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['gangneung']['haslla-art-world'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-김효서',
    address: '강원특별자치도 강릉시 강동면 율곡로 1441',
    externalUrl: 'https://www.haslla.kr/kr/customer/notice?type=view&bsNo=136',
    tagSlugs: ['culture', 'emotional', 'activity', 'sea'],
  },

  {
    regionSlug: 'gangneung',
    slug: 'anbandegi',
    name: '안반데기',
    summary:
      '고지대 풍경과 하늘, 혼자 ‘사진+리프레시’ 하기 좋은 강릉 대표 포토스팟',
    description:
      '고지대의 탁 트인 풍경으로 유명해 하늘과 초원 느낌 사진이 잘 나오고 도심에서 벗어나 조용히 바람 쐬고 싶을 때 혼자 가도 만족도가 높으며 일출이나 별사진 등 시간대에 따라 분위기가 확 달라 촬영 목적의 재방문도 많고 밤이나 새벽은 기온이 크게 떨어지니 보온과 방풍 준비가 필수다.',
    honyeoTip: '밤/새벽은 기온 급락 + 바람 강함. 방풍/보온 필수.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['gangneung']['anbandegi'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-모먼트스튜디오',
    address: '강원특별자치도 강릉시 왕산면 안반데기길 428',
    externalUrl:
      'https://bf.gn.go.kr/home/kor/M118973891/tourist/place/edit.do?idx=cb00d1a0008a85e71a41b8741facbffe874b200743aaa1c3b892b919b8ce9504&act=detail',
    tagSlugs: ['mountain', 'nightview', 'healing', 'stress-relief'],
  },

  {
    regionSlug: 'gangneung',
    slug: 'solhyang-arboretum',
    name: '강릉 솔향수목원',
    summary: '솔향 맡으며 걷는 숲길, 혼자 힐링 산책하기 좋은 큰 수목원',
    description:
      '넓은 규모의 수목원이라 테마 공간이 다양해 혼자 걸어도 동선이 지루하지 않고 숲 생태관찰로와 치유의 길처럼 천천히 걷기에 맞춘 코스가 있어 혼행과 궁합이 좋으며 사진도 잘 나오지만 무엇보다 조용히 걷고 쉬는 목적의 만족도가 높고 지형 특성상 오르내림이 있을 수 있어 편한 신발이 필수다.',
    honyeoTip:
      '혼자면 이어폰 끼고 천천히 걷기 좋아요. 편한 신발 + 물 1병은 필수.',
    category: SpotCategory.NATURE,
    imageUrl: imageMap.spots['gangneung']['solhyang-arboretum'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-김지호',
    isRecommended: true,
    address: '강원특별자치도 강릉시 구정면 수목원길 156',
    externalUrl:
      'https://access.visitkorea.or.kr/opentour/detail.do?cotId=77b9ef9c-948d-441b-8bca-e25c1160066d',
    tagSlugs: ['nature', 'healing', 'walking', 'thinking'],
  },

  {
    regionSlug: 'gangneung',
    slug: 'jeongdongjin-beach',
    name: '정동진해변',
    summary: '기차와 바다가 어우러진 감성 스팟, 혼자 일출/산책 코스로 추천',
    description:
      '기차역과 바다가 가까워 “도착→산책→사진” 흐름이 단순해 혼행에 잘 맞고 일출과 해질 무렵 분위기가 특히 좋으며 해변 산책로가 직관적이라 초행도 쉽고 바다를 오래 바라보기 좋은 포인트가 많아 바다멍 목적의 만족도가 높으며 새벽 시간대는 체감온도가 급격히 떨어질 수 있어 방풍 준비가 필요하다.',
    honyeoTip: '일출 보려면 새벽 이동이라 방풍 준비 필수.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['gangneung']['jeongdongjin-beach'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-홍정표',
    address: '강원특별자치도 강릉시 강동면 정동진리 257',
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=60b3ac94-f4ac-44ca-a6f5-213db72833cb',
    tagSlugs: ['sea', 'emotional', 'walking', 'oneday'],
  },

  {
    regionSlug: 'gangneung',
    slug: 'jumunjin',
    name: '주문진',
    summary: '바다 앞 포토존, 혼자 찍어도 “인생샷” 나오는 주문진',
    description:
      '주문진 해변에 재현된 포토존으로 바다를 배경으로 사진이 깔끔하게 나오고 BTS팬이 아니어도 “바다+오브제” 조합이 좋아 인스타용 사진 찍기 쉬우며 근처 주문진해변이나 향호해변과 이어서 산책 코스로 확장할 수 있고 사람이 몰리는 시간대가 있어 여유롭게 찍으려면 오전 방문이 유리하다.',
    honyeoTip:
      '삼각대가 있으면 혼자도 안정적으로 찍을 수 있어요. 사람 적은 오전 추천.',
    category: SpotCategory.ETC,
    imageUrl: imageMap.spots['gangneung']['jumunjin'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-김지호',
    isRecommended: true,
    address: '강원특별자치도 강릉시 주문진읍 주문북로 210',
    externalUrl:
      'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=affa8a02-ae7b-4ad7-9bae-728b6ea04607',
    tagSlugs: ['sea', 'emotional', 'walking', 'oneday'],
  },

  // 2) FOOD

  {
    regionSlug: 'gangneung',
    slug: 'donghwa-garden',
    name: '동화가든(본점)',
    summary: '짬뽕순두부로 유명한 강릉 대표 맛집, 혼자도 식사 가능한 편',
    description:
      '초당 순두부 라인에서 가장 유명한 곳 중 하나로 메뉴가 명확해 혼자 주문이 어렵지 않고 회전이 빠른 편이라 혼밥 손님도 자연스럽게 섞이며 피크 시간대엔 대기가 길어질 수 있어 시간 조절이 만족도를 좌우하고 식사 후에는 초당/경포 라인 산책이나 카페로 이어가기 좋은 위치다.',
    honyeoTip: '웨이팅이 잦으니 오픈 직후/브레이크타임 직후 시간대 추천.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '강원특별자치도 강릉시 초당순두부길77번길 15',
    externalUrl: 'https://place.map.kakao.com/7846414',
    tagSlugs: ['solo-eating', 'hidden', 'stress-relief'],
  },

  {
    regionSlug: 'gangneung',
    slug: 'umjine-pojangmacha-main',
    name: '강릉엄지네포장마차(본점)',
    summary:
      '꼬막비빔밥으로 유명한 강릉 대표 맛집, 1인도 식사 가능한 편(현장 분위기 활발)',
    description:
      '강릉에서 “한 번쯤은” 들르는 대표 맛집으로 메뉴가 직관적이라 혼자 주문 난이도가 낮고 현장 분위기가 활발한 편이라 혼자여행에서 에너지를 올리고 싶을 때도 잘 맞으며 피크에는 웨이팅이 생길 수 있어 시간대를 잡으면 훨씬 편하게 먹을 수 있고 식사 후 월화거리나 중앙시장 쪽으로 이어서 도심 코스로 확장하기 좋다.',
    honyeoTip: '피크시간(점심 12~13시/저녁 18~19시)만 피하면 훨씬 편해요.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '강원특별자치도 강릉시 경강로2255번길 21 (포남동)',
    externalUrl: 'https://place.map.kakao.com/1280103068',
    tagSlugs: ['solo-eating', 'sea', 'culture'],
  },

  {
    regionSlug: 'gangneung',
    slug: 'geumcheon-kalguksu',
    name: '금천칼국수',
    summary: '따뜻하게 한 그릇, 혼자 먹기 편한 강릉 로컬 칼국수',
    description:
      '국수류는 1인 주문이 자연스럽고 회전도 빠른 편이라 혼밥 난이도가 낮고 담백한 국물과 면 메뉴로 여행 중 속 편하게 한 끼 채우기 좋다는 후기가 많으며 복잡한 주문 없이 “한 그릇”으로 끝나 혼자 일정 중간에 넣기 쉬운 타입이고 식사 후엔 도심 산책(월화거리/시장)로 연결하면 동선이 깔끔하다.',
    honyeoTip:
      '혼자면 점심 피크만 피하면 충분히 편해요. (11시대 or 2~4시 추천)',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '강원특별자치도 강릉시 강릉대로 445-1 1층',
    externalUrl: 'https://place.map.kakao.com/10215787',
    tagSlugs: ['solo-eating', 'healing', 'oneday', 'walking'],
  },

  {
    regionSlug: 'gangneung',
    slug: 'mandong-bakery',
    name: '만동제과',
    summary: '강릉 감성 빵집, 혼자 들러도 부담 없는 간식 코스',
    description:
      '빵과 디저트는 혼자도 자연스럽게 사서 먹을 수 있어 혼행 간식으로 난이도가 낮고 포장해서 해변이나 호수나 숙소에서 먹기에도 좋아 동선에 유연하게 붙으며 인기 빵집은 대기가 생길 수 있어 오픈 직후가 편하다는 후기가 많고 시장이나 도심 산책 코스 중간에 넣기에도 부담이 적다.',
    honyeoTip: '혼자라면 “빵 사서 바다/호수 벤치에서 먹기”가 만족도 높아요.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '강원특별자치도 강릉시 금성로 6 1층',
    externalUrl: 'https://place.map.kakao.com/1895412800',
    tagSlugs: ['solo-eating', 'emotional', 'oneday', 'stress-relief'],
  },

  // 3) CAFE

  {
    regionSlug: 'gangneung',
    slug: 'terarosa-coffee-roastery-gangneung',
    name: '테라로사 커피공장 강릉본점',
    summary: '커피 좋아하면 필수, 혼자 앉아 쉬기 좋은 대형 카페/로스터리',
    description:
      '공장형 대형 공간이라 혼자 앉아 있어도 전혀 어색하지 않고 자리 선택지가 많으며 커피와 원두와 베이커리까지 즐길 요소가 확실해 혼자 가도 체류 시간이 길어지고 주말엔 사람이 몰릴 수 있지만 평일이나 오픈 직후는 비교적 쾌적하다는 후기가 많고 차로 이동하는 일정이면 시작이나 마무리 카페로 넣기 좋은 안정적인 선택지다.',
    honyeoTip: '오전 오픈 직후가 비교적 쾌적해요.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    imageUrl: imageMap.spots['gangneung']['terarosa-coffee-roastery-gangneung'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-강원지사',
    address: '강원특별자치도 강릉시 구정면 현천길 25',
    externalUrl:
      'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=9c449ce4-d145-483d-9545-6427b7707b53',
    tagSlugs: ['cafe', 'healing', 'thinking', 'emotional'],
  },

  {
    regionSlug: 'gangneung',
    slug: 'bosanova-coffee-roasters-gangneung',
    name: '보사노바 커피로스터스 강릉점',
    summary: '바다 감성 제대로, 혼자 앉아도 편한 대형 오션뷰 카페',
    description:
      '안목 커피거리 라인에서 오션뷰로 자주 언급되는 대형 카페로 혼자여행객도 많아 창가 자리에서 바다멍하기 좋다는 후기가 많고 사진이 잘 나오는 뷰 포인트가 있어 커피와 인생샷 목적에 적합하며 피크엔 자리 경쟁이 있어 시간대를 잘 잡는 게 중요하다.',
    honyeoTip:
      '혼자면 평일 오전/이른 오후가 가장 편해요. 자리 잡고 바다멍 추천.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '강원특별자치도 강릉시 창해로14번길 28',
    externalUrl: 'https://place.map.kakao.com/27320313',
    tagSlugs: ['cafe', 'sea', 'emotional', 'thinking'],
  },

  {
    regionSlug: 'gangneung',
    slug: 'bohemian-park-ichu-coffee',
    name: '보헤미안 박이추커피(커피공장)',
    summary:
      '커피 좋아하는 혼행러에게 추천, 혼자 앉아도 어색하지 않은 ‘커피 성지’',
    description:
      '강릉 커피 문화 이야기에서 자주 언급되는 곳으로 커피 자체가 목적이 되는 타입이라 혼자 방문해 천천히 마시며 맛을 느끼는 손님이 많고 공간이 과하게 시끄럽지 않다면 독서나 생각정리에도 잘 맞으며 경포나 도심 일정과 묶어서 “커피+산책” 코스로 마무리하기 좋다.',
    honyeoTip: '혼자라면 “커피 1잔 + 노트 정리 20분” 루틴으로 쓰기 좋아요.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '강원특별자치도 강릉시 사천면 해안로 1107',
    externalUrl: 'https://place.map.kakao.com/26308981',
    tagSlugs: ['cafe', 'thinking', 'emotional', 'stress-relief'],
  },

  {
    regionSlug: 'gangneung',
    slug: 'terarosa-gyeongpo-lake',
    name: '테라로사 경포호수점',
    summary: '호수 뷰와 공간감, 혼자도 오래 머물기 좋은 경포 감성 카페',
    description:
      '경포호 근처라 “호수 산책 → 커피” 동선이 깔끔하게 붙고 층고와 공간감이 좋아 혼자 앉아도 편하며 사진도 안정적으로 잘 나온다는 후기가 많고 인기 지점이라 피크엔 자리 잡기가 어려울 수 있어 시간대를 잘 잡는 게 중요하며 경포해변과 강문해변과도 가까워 반나절 카페 코스로 활용하기 좋다.',
    honyeoTip:
      '혼자라면 오픈 직후가 제일 쾌적해요. 먼저 호수 한 바퀴 돌고 들어오면 딱.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '강원특별자치도 강릉시 난설헌로 145',
    externalUrl: 'https://place.map.kakao.com/653849031',
    tagSlugs: ['cafe', 'walking', 'healing', 'emotional'],
  },

  {
    regionSlug: 'gangneung',
    slug: 'cafe-toenmaru',
    name: '카페 툇마루',
    summary: '진한 흑임자 라떼 한 잔, 혼자 기다려도 납득되는 강릉 핫플',
    description:
      '대표 메뉴로 유명해 강릉 오면 한 번 들르는 카페로 언급이 많고 혼자 방문해도 주문과 픽업 흐름이 단순하며 테이크아웃으로도 즐기기 쉬운 타입이고 피크엔 대기가 생길 수 있어 시간대 선택이 중요하며 초당과 아르떼뮤지엄과 허균·허난설헌 공원 라인과 묶기 좋다.',
    honyeoTip: '혼자라면 “이른 오전 or 저녁”을 노리면 대기 스트레스가 줄어요.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '강원특별자치도 강릉시 난설헌로 232',
    tagSlugs: ['cafe', 'emotional', 'stress-relief', 'oneday'],
  },

  // 4) DRINK

  {
    regionSlug: 'gangneung',
    slug: 'budnamu-brewery',
    name: '버드나무 브루어리',
    summary: '강릉 수제맥주 핫플, 바/브루어리 분위기라 혼자 한 잔도 가능한 편',
    description:
      '브루어리 특유의 캐주얼한 분위기라 혼자 가도 자연스럽게 즐길 수 있고 맥주 중심이라 주문 난이도가 낮아 가볍게 한두 잔만 마시고 나오는 것도 가능하며 도심 쪽이라 저녁 일정 마무리로 붙이기 쉽고 20~30대 방문도 많은 편이지만 주말 저녁은 혼잡이나 웨이팅이 생길 수 있어 시간대를 잡으면 만족도가 올라간다.',
    honyeoTip: '주말 저녁은 웨이팅이 생길 수 있어요. 오픈 직후나 평일 추천.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '강원특별자치도 강릉시 경강로 1961',
    externalUrl: 'https://place.map.kakao.com/27152913',
    tagSlugs: ['solo-drinking', 'emotional', 'nightview', 'stress-relief'],
  },

  {
    regionSlug: 'gangneung',
    slug: 'analog-society',
    name: '아날로그 소사이어티',
    summary: '조용히 한 잔 하기 좋은 감성 바, 혼자 앉아도 어색하지 않은 분위기',
    description:
      '분위기 중심의 바 타입이라 혼자 방문해도 한 잔과 생각정리가 가능하다는 언급이 있고 조도가 낮고 음악과 공간이 차분한 편이면 혼술 난이도가 낮아 여행 마무리 코스로 좋으며 피크엔 만석이 될 수 있어 이른 시간대가 유리하다.',
    honyeoTip: '혼자라면 바 좌석/구석자리 요청하면 편해요. 초저녁 입장 추천.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '강원특별자치도 강릉시 하슬라로232번길 13 1층',
    externalUrl: 'https://place.map.kakao.com/1343283412',
    tagSlugs: ['solo-drinking', 'emotional', 'thinking', 'nightview'],
  },

  {
    regionSlug: 'gangneung',
    slug: 'terroir-cafe-winebar',
    name: '떼루아(테루아르) 카페 와인바',
    summary: '낮엔 카페, 밤엔 와인 한 잔—혼자 가도 부담 적은 무드',
    description:
      '카페와 와인바 성격을 함께 가진 곳이면 혼자 방문해도 자연스럽게 머물기 좋고 바 형태나 좌석 구성이 혼자 한 잔을 허용하는 분위기라 혼술 난이도가 낮으며 조용한 대화 톤이라면 혼자 여행 중 감성 마무리로 잘 맞고 주말 밤 피크는 붐빌 수 있어 혼자라면 이른 시간대가 안정적이다.',
    honyeoTip:
      '혼자면 “1잔만” 기준으로 즐기고, 귀가 동선(택시/대리)을 먼저 잡아두면 편해요.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '강원특별자치도 강릉시 구정면 수목원길 76-35',
    externalUrl: 'https://place.map.kakao.com/1998909293',
    tagSlugs: ['solo-drinking', 'emotional', 'thinking', 'stress-relief'],
  },

  {
    regionSlug: 'gangneung',
    slug: 'samsung-sikdang-otto',
    name: '삼성식당 오또(와인바)',
    summary: '주문진에서 조용히 한 잔, 혼자도 가능한 예약형 무드',
    description:
      '주문진 라인에서 와인바나 무드 있는 술자리로 언급되는 곳 중 하나로 예약형이나 소규모 분위기라면 혼자 방문 시에도 소음이 적어 편하고 주문진항과 해변 코스 후 마무리 한 잔으로 붙이기 좋으며 운영이나 좌석 정책이 바뀔 수 있어 방문 전 확인이 안전하다.',
    honyeoTip: '혼자면 “바 자리 가능 여부”를 미리 확인하면 더 편해요.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '강원특별자치도 강릉시 주문진읍 주문북로 12-1',
    externalUrl: 'https://place.map.kakao.com/1190779584',
    tagSlugs: ['solo-drinking', 'thinking', 'emotional', 'nightview'],
  },
];
