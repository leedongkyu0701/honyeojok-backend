import { ImageSource } from 'src/types/util';
import { SpotCategory } from 'src/types/spot';
import imageMap from '../../image-map.json';
import type { SpotSeedData } from './index';

export const seoulSpots: SpotSeedData[] = [
  // 1) NATURE / ACTIVITY / ETC

  {
    regionSlug: 'seoul',
    slug: 'yeouido-hangang-park',
    name: '여의도 한강공원',
    summary: '접근성 좋은 한강공원, 산책·피크닉·야경 모두 OK',
    description:
      '접근성 좋은 한강공원. 산책/따릉이/피크닉하기 좋고, 행사 시즌엔 볼거리도 많다.',
    honyeoTip: '산책/피크닉/야경',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['seoul']['yeouido-hangang-park'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-임찬경',
    address: '서울특별시 영등포구 여의동로 330',
    externalUrl:
      'https://korean.visitseoul.net/yongsan-yeouido/%EC%97%AC%EC%9D%98%EB%8F%84-%ED%95%9C%EA%B0%95%EA%B3%B5%EC%9B%90%EC%86%8C%EB%85%80%EC%8B%9C%EB%8C%80%EC%88%B2_/12993',
    tagSlugs: ['healing', 'nightview', 'activity'],
  },

  {
    regionSlug: 'seoul',
    slug: 'seoul-forest',
    name: '서울숲',
    summary: '도심 속 큰 공원, 혼자 쉬기 좋은 공간 많음',
    description:
      '도심 속 큰 공원. 산책/휴식/사진 모두 좋고, 혼자 쉬기 편한 공간이 많다.',
    honyeoTip: '성수랑 묶어서 하루 코스로 딱',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['seoul']['seoul-forest'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-임태원',
    address: '서울특별시 성동구 뚝섬로 273',
    externalUrl:
      'https://korean.visitseoul.net/nature/%EC%84%9C%EC%9A%B8%EC%88%B2/KOP001838',
    tagSlugs: ['healing', 'nature', 'activity'],
  },

  {
    regionSlug: 'seoul',
    slug: 'cheonggyecheon-stream',
    name: '청계천',
    summary: '도심 속 물길 산책, 혼자 걷기 좋은 대표 코스',
    description:
      '광화문·종로 일대에서 시작해 도심을 가로지르는 산책 코스. 밤에는 조명 분위기가 좋아 혼자 걸어도 안전하고 편하다.',
    honyeoTip: '퇴근 시간대 이후 조명 켜질 때가 분위기 좋아요',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['seoul']['cheonggyecheon-stream'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-서뮨교',
    address: '서울특별시 종로구 무교로 37 일대(청계광장 주변)',
    externalUrl:
      'https://korean.visitseoul.net/attractions/%EC%B2%AD%EA%B3%84%EC%B2%9C_/380',
    tagSlugs: ['walking', 'healing', 'oneday'],
  },

  {
    regionSlug: 'seoul',
    slug: 'gyeongui-line-forest-park',
    name: '경의선숲길(연트럴파크)',
    summary: '카페거리 사이로 이어지는 도심 산책길',
    description:
      '연남동~홍대 쪽 도심 산책로. 혼자 걷다가 카페 들르고 다시 걷기 좋은 동선.',
    honyeoTip: '해 질 무렵 산책 후 연남 카페 한 곳 들르면 딱 좋아요',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['seoul']['gyeongui-line-forest-park'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이범수',
    address: '서울특별시 마포구 양화로 188 일대(연남동/홍대입구 주변)',
    externalUrl:
      'https://korean.visitseoul.net/nature/%EA%B2%BD%EC%9D%98%EC%84%A0%EC%88%B2%EA%B8%B8_/37216',
    tagSlugs: ['walking', 'healing', 'cafe'],
  },

  {
    regionSlug: 'seoul',
    slug: 'banpo-hangang-park',
    name: '반포한강공원',
    summary: '야경·피크닉·산책 모두 되는 한강 명소',
    description:
      '한강 야경이 좋아 혼자 산책하거나 피크닉하기 좋다. 근처 편의시설도 많아 혼자 일정 짜기 쉬움.',
    honyeoTip: '야경 보면서 걷기 좋고, 따릉이 타기도 좋아요',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['seoul']['banpo-hangang-park'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-서문교',
    address: '서울특별시 서초구 신반포로11길 40',
    externalUrl:
      'https://korean.visitseoul.net/nature/%EB%B0%98%ED%8F%AC%ED%95%9C%EA%B0%95%EA%B3%B5%EC%9B%90_/29937',
    tagSlugs: ['nightview', 'healing', 'walking'],
  },

  {
    regionSlug: 'seoul',
    slug: 'nodeul-island',
    name: '노들섬',
    summary: '한강 위 문화섬, 책·음악·산책이 한 번에',
    description:
      '한강 가운데 섬 형태의 문화 공간. 혼자 산책하며 쉬기 좋고, 전시/공연/서점 같은 콘텐츠가 있어 혼자 시간 보내기 좋다.',
    honyeoTip: '해질 무렵 강변 산책 후 카페 들르면 코스 완성',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['seoul']['nodeul-island'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-안영관',
    address: '서울특별시 용산구 양녕로 445',
    externalUrl:
      'https://korean.visitseoul.net/nature/%EB%85%B8%EB%93%A4%EC%84%AC_/31922',
    tagSlugs: ['healing', 'emotional', 'walking', 'culture'],
  },

  {
    regionSlug: 'seoul',
    slug: 'hanyang-do-seong-gil',
    name: '한양도성길',
    summary: '서울성곽길과 야경을 함께 즐기는 혼자 산책 명소',
    description:
      '성곽 따라 걷는 동선이 좋아 혼자 천천히 걷기 좋다. 야경 포인트가 많아 저녁 산책 코스로도 인기.',
    honyeoTip: '해 질 무렵~야경 시간대 추천 (바람 대비 겉옷)',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['seoul']['hanyang-do-seong-gil'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-두드림',
    address: '서울특별시 종로구 낙산길 41',
    externalUrl:
      'https://korean.visitseoul.net/nature/%EB%82%99%EC%82%B0%EA%B3%B5%EC%9B%90_/3702',
    tagSlugs: ['nightview', 'walking', 'thinking'],
  },

  {
    regionSlug: 'seoul',
    slug: 'gyeongbokgung-palace',
    name: '경복궁',
    summary: '조선의 법궁, 혼자 천천히 걷기 좋은 대표 역사 명소',
    description:
      '조선의 법궁으로 서울을 대표하는 역사 명소. 이른 시간에 방문하면 혼자 천천히 산책하며 궁궐의 분위기를 느끼기 좋다.',
    honyeoTip: '아침 방문 추천',
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['seoul']['gyeongbokgung-palace'],
    imageSource: ImageSource.UNSPLASH,
    address: '서울특별시 종로구 사직로 161',
    externalUrl:
      'https://korean.visitseoul.net/attractions/%EA%B2%BD%EB%B3%B5%EA%B6%81_/261',
    tagSlugs: ['culture', 'emotional'],
  },

  {
    regionSlug: 'seoul',
    slug: 'bukchon-hanok-village',
    name: '북촌한옥마을',
    summary: '한옥과 골목 풍경이 예쁜 산책 코스',
    description:
      '한옥과 골목 풍경이 예쁜 산책 코스. 혼자 사진 찍고 천천히 걷기 좋다.',
    honyeoTip: '아침 방문 추천 (조용할 때)',
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['seoul']['seoul-bukchon-hanok-village'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이범수',
    address: '서울특별시 종로구 북촌로',
    externalUrl:
      'https://korean.visitseoul.net/attractions/%EB%B6%81%EC%B4%8C%ED%95%9C%EC%98%A5%EB%A7%88%EC%9D%84_/261',
    tagSlugs: ['culture', 'emotional'],
  },

  {
    regionSlug: 'seoul',
    slug: 'namsan-seoul-tower',
    name: '남산 서울타워',
    summary: '서울 전경을 한눈에, 야경·전망 대표 명소',
    description:
      '서울 전경을 한눈에 볼 수 있는 대표 전망 명소. 해 질 무렵부터 야경 시간대까지 혼자 천천히 올라가기 좋다.',
    honyeoTip: '야경·전망',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['seoul']['namsan-seoul-tower'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이범수',
    address: '서울특별시 용산구 남산공원길 105',
    externalUrl:
      'https://korean.visitseoul.net/attractions/%EB%82%A8%EC%82%B0-%EC%84%9C%EC%9A%B8%ED%83%80%EC%9B%8C_/261',
    tagSlugs: ['nightview', 'culture'],
  },

  {
    regionSlug: 'seoul',
    slug: 'ssamziegil-insadong',
    name: '쌈지길(인사동)',
    summary: '전통+트렌드 소품 쇼핑, 혼자 구경하기 좋은 복합 공간',
    description:
      '인사동에서 혼자 천천히 구경하기 좋은 쇼핑·체험 공간. 소품샵/작가 굿즈/전통 감성 구경하기 좋다.',
    honyeoTip: '인사동-익선동을 한 코스로 묶으면 딱 좋아요',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['seoul']['ssamziegil-insadong'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-라이브스튜디오',
    address: '서울특별시 종로구 인사동길 44',
    externalUrl:
      'https://korean.visitseoul.net/shopping/%EC%8C%88%EC%A7%80%EA%B8%B8_/37934',
    tagSlugs: ['shopping', 'culture', 'emotional'],
  },

  {
    regionSlug: 'seoul',
    slug: 'ikseon-dong-hanok-village',
    name: '익선동 한옥거리',
    summary: '한옥 감성 카페·맛집 밀집, 혼자 가도 어색하지 않은 골목',
    description:
      '한옥 골목 특유의 분위기 때문에 혼자 걷고 사진 찍기 좋다. 카페/식당이 많아 혼자 일정 짜기도 쉬움.',
    honyeoTip: '주말은 붐비니 평일 낮/오픈 시간대 추천',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['seoul']['ikseon-dong-hanok-village'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-정규진',
    address: '서울특별시 종로구 돈화문로11가길 일대(익선동)',
    externalUrl:
      'https://korean.visitseoul.net/area/%EC%9D%B5%EC%84%A0%EB%8F%99%ED%95%9C%EC%98%A5%EA%B1%B0%EB%A6%AC/KOP037008',
    tagSlugs: ['cafe', 'emotional', 'walking', 'culture'],
  },

  {
    regionSlug: 'seoul',
    slug: 'gwangjang-market',
    name: '광장시장',
    summary: '혼밥 난이도 낮은 시장 먹거리 성지',
    description:
      '빈대떡/마약김밥 등 먹거리 라인이 잘 되어 있어 혼자 먹기 여행으로도 부담이 적다. 구경거리도 많아 시간 보내기 좋다.',
    honyeoTip: '점심 피크 전(11시 전후) 가면 덜 붐벼요',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['seoul']['gwangjang-market'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-IR스튜디오',
    address: '서울특별시 종로구 창경궁로 88',
    externalUrl:
      'https://korean.visitseoul.net/shopping-list/%EA%B4%91%EC%9E%A5%EC%8B%9C%EC%9E%A5_/287',
    tagSlugs: ['solo-eating', 'culture', 'shopping'],
  },

  {
    regionSlug: 'seoul',
    slug: 'mangwon-market',
    name: '망원시장',
    summary: '로컬 감성 시장 먹거리, 혼자 간식 투어하기 좋음',
    description:
      '규모가 적당하고 먹거리·반찬·간식 선택지가 많아 혼자 한 바퀴 돌며 먹기 좋다.',
    honyeoTip: '시장-망원한강공원-연남/홍대 쪽으로 이어가도 좋아요',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['seoul']['mangwon-market'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-니오타니 스튜디오',
    address: '서울특별시 마포구 포은로6길 27',
    externalUrl:
      'https://korean.visitseoul.net/shopping/%EB%A7%9D%EC%9B%90%EC%8B%9C%EC%9E%A5/KOP037950',
    tagSlugs: ['solo-eating', 'culture', 'shopping'],
  },

  {
    regionSlug: 'seoul',
    slug: 'ddp',
    name: '동대문디자인플라자(DDP)',
    summary: '전시·야간 산책·포토스팟까지 한 번에 즐기는 디자인 랜드마크',
    description:
      '동대문역사문화공원역과 바로 연결되는 대형 복합문화공간으로 전시·팝업·마켓이 자주 열린다. 야간에는 외관 조명과 주변 동선이 좋아 혼자 사진 찍고 걷기에도 부담이 적다. 일정이 비어도 “그냥 가면 뭐라도 있는” 편이라 20~30대 서울 데이트/혼행 코스로 자주 묶인다.',
    honyeoTip:
      '전시는 시간대별로 혼잡도가 갈리니 평일 오후나 저녁에 “전시 1개 + 주변 산책(동대문/을지로)”로 짧게 끊어가면 만족도가 높아요.',
    category: SpotCategory.ETC,
    imageUrl: imageMap.spots['seoul']['ddp'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-Liu Lu',
    isRecommended: true,
    address: '서울특별시 중구 을지로 281',
    externalUrl: 'https://ddp.or.kr/?menuno=235',
    tagSlugs: ['culture', 'emotional', 'oneday', 'shopping'],
  },

  {
    regionSlug: 'seoul',
    slug: 'haneul-park',
    name: '하늘공원',
    summary: '노을·억새·야경까지, 혼자도 만족도 높은 월드컵공원 명소',
    description:
      '월드컵공원 내 언덕 위 전망 포인트로, 노을 시간대에 특히 인기가 많다. 계절마다 풍경이 확 달라서 같은 코스라도 재방문 가치가 있고, 넓은 공간이라 혼자 걸어도 부담이 적다. 전망대 쪽은 바람이 강할 수 있어 체감온도 대비가 필요하다.',
    honyeoTip:
      '노을 보려면 해 지기 40~60분 전에 도착해 천천히 올라가세요. 바람이 세니 얇은 겉옷 챙기면 혼자 사진 찍고 오래 머물기 좋아요.',
    category: SpotCategory.NATURE,
    imageUrl: imageMap.spots['seoul']['haneul-park'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-라이브스튜디오',
    isRecommended: true,
    address: '서울특별시 마포구 하늘공원로 95',
    externalUrl:
      'https://korean.visitseoul.net/area/%ED%95%98%EB%8A%98%EA%B3%B5%EC%9B%90/KOP003830',
    tagSlugs: ['nightview', 'walking', 'healing', 'nature'],
  },

  {
    regionSlug: 'seoul',
    slug: 'mmca-seoul',
    name: '국립현대미술관 서울',
    summary: '삼청동 전시·필름·굿즈까지, 혼자 보내기 좋은 문화 코스',
    description:
      '삼청동에 위치한 국립현대미술관으로, 전시뿐 아니라 영상/다원 프로그램이 함께 열려 혼자 방문해도 체류 시간이 길어지는 곳이다. 건물 내부 동선이 명확하고 휴식 가능한 공간이 있어 혼자 천천히 보기에 좋다. 관람 후에는 북촌·서촌·경복궁과 묶어 당일치기 코스로 확장하기 쉽다.',
    honyeoTip:
      '혼자라면 야간 개장(있는 요일) 시간대가 분위기 좋고, 관람 후 삼청동 골목 산책까지 이어가기 좋아요. 전시마다 예약/입장 방식이 달라질 수 있으니 방문 전 공지 확인 추천.',
    category: SpotCategory.ACTIVITY,
    imageUrl: imageMap.spots['seoul']['mmca-seoul'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사',
    isRecommended: true,
    address: '서울특별시 종로구 삼청로 30',
    externalUrl: 'https://www.mmca.go.kr/visitingInfo/seoulInfo.do',
    tagSlugs: ['culture', 'thinking', 'walking', 'oneday'],
  },

  // 2) FOOD

  {
    regionSlug: 'seoul',
    slug: 'mibundang-seongsu',
    name: '미분당 성수점',
    summary: '1인석 중심 쌀국수, 혼밥 난이도 낮은 성수 맛집',
    description:
      '베트남 쌀국수 전문점으로, 매장 구조가 바 테이블/1인석 위주라 혼자 들어가도 어색하지 않다. 주문부터 식사까지 흐름이 단순해 성수 카페거리·서울숲 코스 중간 식사로 붙이기 좋다. 피크 시간대에는 대기가 생길 수 있어 오픈 직후나 늦은 점심이 상대적으로 편하다.',
    honyeoTip:
      '혼자면 입구 쪽 1인석/바 자리로 바로 안내받기 쉬워요. 성수 일정은 “서울숲 산책 → 쌀국수 혼밥 → 카페”로 끊으면 동선이 깔끔합니다.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '서울특별시 성동구 서울숲4길 18',
    externalUrl: 'https://place.map.kakao.com/1372288632',
    tagSlugs: ['solo-eating', 'oneday', 'healing', 'walking'],
  },

  {
    regionSlug: 'seoul',
    slug: 'kaden-yeonhui',
    name: '카덴(우동카덴) 연희점',
    summary: '연희동 우동·덴푸라, 혼자도 편한 깔끔한 일식',
    description:
      '연희동 대표 우동 맛집으로, 식사 흐름이 빨라 혼자 방문해도 부담이 적다. 매장이 비교적 정돈된 분위기라 혼밥 시에도 시선 스트레스가 덜한 편이다. 주말/피크에는 대기가 생길 수 있고, 웨이팅 후 입장하는 구조라 시간 여유를 잡는 게 좋다.',
    honyeoTip:
      '혼자라면 오픈 시간대나 브레이크타임 직후가 가장 편해요. 연남 산책(경의선숲길)과 연결해 “걷고 먹는” 코스로 짜면 만족도가 높습니다.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '서울특별시 서대문구 연희로 173 1층 101호',
    externalUrl: 'https://place.map.kakao.com/1449183784',
    tagSlugs: ['solo-eating', 'healing', 'oneday', 'walking'],
  },

  {
    regionSlug: 'seoul',
    slug: 'kandasoba-hyehwa',
    name: '칸다소바 혜화점',
    summary: '대학로 라멘·마제소바, 카운터 중심으로 혼밥하기 좋은 곳',
    description:
      '대학로에서 라멘/마제소바로 유명한 곳으로, 혼자 방문 후기와 혼밥 수요가 많은 편이다. 주문 후 빠르게 식사하는 구조라 공연/전시 전후로 혼자 끼니 해결하기 좋다. 인기 시간대에는 대기가 생길 수 있고, 라스트오더/브레이크타임이 있어 방문 시간을 맞추는 게 중요하다.',
    honyeoTip:
      '혼자라면 대기 줄이 짧은 평일 오후(브레이크 전/후) 타이밍을 노려보세요. 혜화는 골목이 많으니 식사 후 낙산공원 쪽으로 이어서 산책하면 딱 좋아요.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '서울특별시 종로구 대학로 131-1',
    externalUrl: 'https://place.map.kakao.com/1340493944',
    tagSlugs: ['solo-eating', 'stress-relief', 'oneday', 'walking'],
  },

  {
    regionSlug: 'seoul',
    slug: 'butanchyu-hongdae',
    name: '부탄츄 홍대본점',
    summary: '라멘 커스터마이징이 재미있는 홍대 혼밥 라멘집',
    description:
      '홍대입구 근처 돈코츠 라멘 전문점으로, 혼자 라멘 먹기 좋은 분위기라는 후기가 꾸준히 보인다. 라멘을 취향대로 커스터마이징할 수 있어 “혼자 먹어도 심심하지 않은” 타입이다. 홍대/연남 코스 중간 식사로 붙이기 좋고, 심야 라멘 운영 등 시간대 선택지도 있는 편이다.',
    honyeoTip:
      '혼자면 입장 후 바로 주문 흐름이 잡히는 자리(카운터/벽면 좌석)를 선택하면 편해요. 홍대는 피크가 빨리 차니 오픈 직후나 2~4시 사이가 비교적 수월합니다.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '서울특별시 마포구 와우산로35길 75 1층',
    externalUrl: 'https://place.map.kakao.com/18742750',
    tagSlugs: ['solo-eating', 'oneday', 'stress-relief', 'walking'],
  },

  {
    regionSlug: 'seoul',
    slug: 'myeongdong-gyoja-sin-gwan',
    name: '명동교자 신관명동역점',
    summary: '회전 빠른 칼국수·만두, 혼자도 무난한 명동 한 끼',
    description:
      '명동 대표 칼국수/만두 라인으로, 매장 회전이 빠르고 혼자 방문도 흔한 편이라 혼밥 난이도가 낮다. 명동·남산·시청/정동 코스 중간에 넣기 좋아 “관광 동선 + 한 끼”로 자주 쓰인다. 점심/저녁 피크에는 줄이 길 수 있어 애매한 시간대가 훨씬 편하다.',
    honyeoTip:
      '혼자면 피크(12~1시, 6~7시)를 피해서 11시대 또는 2~4시 사이에 가면 대기 스트레스가 확 줄어요. 식사 후 명동~남산 방향으로 걸어서 소화 코스까지 연결 추천.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '서울특별시 중구 퇴계로 129',
    externalUrl: 'https://place.map.kakao.com/1479300828',
    tagSlugs: ['solo-eating', 'oneday', 'walking', 'stress-relief'],
  },

  // 3) CAFE

  {
    regionSlug: 'seoul',
    slug: 'scene-seongsu-cafe',
    name: '씬(Seongsu) - 카페/셀렉트샵',
    summary: '성수에서 혼자 쉬기 좋은 카페 + 쇼핑 동선',
    description:
      '카페 겸 셀렉트샵 콘셉트로, 혼자 앉아 쉬면서 구경하기 좋다. 성수 카페거리 코스 중간 휴식 포인트로 추천.',
    honyeoTip: '오픈 시간대 가면 자리 잡기 쉬워요',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '서울특별시 성동구 연무장5길 20 1층',
    externalUrl: 'https://place.map.kakao.com/2130919995',
    tagSlugs: ['cafe', 'emotional', 'shopping'],
  },

  {
    regionSlug: 'seoul',
    slug: 'cafe-onion-anguk',
    name: '카페 어니언 안국',
    summary: '한옥 감성 베이커리 카페, 혼자도 사진·휴식 모두 가능한 곳',
    description:
      '한옥을 개조한 베이커리 카페로, 공간 자체가 콘텐츠라 혼자 방문해도 할 일이 많은 편이다. 빵 진열·주문 동선이 명확해 혼자 움직이기 편하고, 북촌/익선/경복궁 코스 사이에 쉬어가기 좋다. 인기 지점이라 주말엔 대기가 길 수 있고, 좌석 확보가 관건이다.',
    honyeoTip:
      '혼자라면 오픈 직후에 들어가 자리 먼저 잡고 주문하는 게 안정적이에요. 안국/북촌 산책 후 카페로 마무리하면 동선이 깔끔합니다.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '서울특별시 종로구 계동길 5',
    externalUrl: 'https://place.map.kakao.com/853028118',
    tagSlugs: ['cafe', 'emotional', 'walking', 'culture'],
  },

  {
    regionSlug: 'seoul',
    slug: 'blue-bottle-seongsu',
    name: '블루보틀 성수 카페',
    summary: '성수 대표 스페셜티 카페, 혼자 커피 마시기 좋은 안정적인 분위기',
    description:
      '성수의 대표 카페 중 하나로, 혼자 와서 커피 한 잔 하고 가는 손님이 많은 편이다. 바/테이블 좌석이 다양해 혼자 앉기 어렵지 않고, 서울숲·성수 카페거리 동선에 자연스럽게 붙는다. 피크 시간엔 대기와 자리 경쟁이 있어 시간대를 잘 잡는 게 중요하다.',
    honyeoTip:
      '혼자면 평일 오전/이른 오후가 가장 쾌적해요. “서울숲 산책 → 블루보틀 → 성수 편집숍”으로 코스 짜면 쉬운 하루 코스가 됩니다.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '서울특별시 성동구 아차산로 7',
    externalUrl: 'https://place.map.kakao.com/1492599844',
    tagSlugs: ['cafe', 'healing', 'stress-relief', 'walking'],
  },

  {
    regionSlug: 'seoul',
    slug: 'cafe-layered-yeonnam',
    name: '카페 레이어드 연남',
    summary: '유럽 감성 베이커리 카페, 혼자 디저트 타임 즐기기 좋은 곳',
    description:
      '연남동 메인 라인에 있는 베이커리 카페로, 스콘·케이크 라인업이 강해서 “혼자 디저트 먹으러” 들르기 좋다. 주문 후 자리에서 천천히 먹는 흐름이라 혼자 시간 보내기에도 무난하다. 주말에는 대기/혼잡이 잦아 좌석 확보가 변수다.',
    honyeoTip:
      '혼자라면 평일 낮이나 저녁 피크 전(5시 전후) 타이밍이 좋아요. 경의선숲길 산책 후 바로 붙이기 좋은 위치입니다.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '서울특별시 마포구 성미산로 161-4',
    externalUrl: 'https://place.map.kakao.com/502958473',
    tagSlugs: ['cafe', 'emotional', 'walking', 'stress-relief'],
  },

  {
    regionSlug: 'seoul',
    slug: 'terarosa-gwanghwamun',
    name: '테라로사 광화문점',
    summary: '책장 같은 공간감, 혼자 노트북·독서하기 좋은 광화문 카페',
    description:
      '광화문역 인근 빌딩에 위치한 대형 카페로, 좌석이 비교적 많아 혼자 앉기 좋다. 브런치/커피 모두 무난하고, 책장 같은 인테리어 덕분에 혼자 독서·생각정리하기에 분위기가 잘 맞는다. 출퇴근 시간대에는 직장인 수요로 붐빌 수 있다.',
    honyeoTip:
      '혼자 집중하고 싶다면 평일 오전이나 3~5시 사이가 좋아요. 경복궁·청계천·덕수궁 라인과 묶어 “도심 문화 산책 + 카페” 코스로 추천합니다.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '서울특별시 종로구 종로1길 50 더케이트윈타워 B동 1층',
    externalUrl: 'https://place.map.kakao.com/24725284',
    tagSlugs: ['cafe', 'thinking', 'stress-relief', 'oneday'],
  },

  // 4) DRINK

  {
    regionSlug: 'seoul',
    slug: 'bar-cham',
    name: '바 참(Bar Cham)',
    summary: '서촌 한옥 칵테일 바, 혼술하기 좋은 카운터 중심 분위기',
    description:
      '서촌 골목 한옥 공간에서 한국 재료 기반 칵테일을 선보이는 바로, 분위기 자체가 목적이 되는 곳이다. 바(카운터) 중심으로 운영되는 편이라 혼자 입장해 칵테일 한두 잔 마시기에도 자연스럽다. 인기 시간대에는 만석/대기가 생길 수 있고, 조용히 즐기려면 피크를 피하는 게 좋다.',
    honyeoTip:
      '혼술은 카운터 자리가 가장 편해요(바텐더와 거리감이 적고 주문도 쉬움). 경복궁/서촌 산책 후 오픈 시간대에 맞춰 가면 대기 확률이 낮습니다.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '서울특별시 종로구 자하문로7길 34',
    externalUrl: 'https://place.map.kakao.com/939585270',
    tagSlugs: ['solo-drinking', 'emotional', 'nightview', 'thinking'],
  },

  {
    regionSlug: 'seoul',
    slug: 'le-chamber',
    name: '르챔버(Le Chamber)',
    summary: '비밀문 콘셉트의 클래식 칵테일 바, 혼자 앉기 좋은 바 좌석',
    description:
      '클래식 칵테일로 유명한 청담 라인의 바 중 하나로, 바 좌석에서 혼자 마시는 손님도 꽤 있는 편이다. 조도가 낮고 대화 톤이 차분해 혼자 조용히 마시기 좋다. 시간대에 따라 만석이 빠르게 될 수 있어 예약 또는 이른 시간 방문이 유리하다.',
    honyeoTip:
      '혼자라면 오픈 직후나 평일 초저녁이 제일 안정적이에요. “청담 카페/쇼핑 → 바 1~2잔”으로 동선 짜면 무리 없이 즐길 수 있습니다.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '서울특별시 강남구 도산대로55길 42 지하 1층',
    externalUrl: 'https://place.map.kakao.com/25689487',
    tagSlugs: ['solo-drinking', 'emotional', 'thinking', 'nightview'],
  },

  {
    regionSlug: 'seoul',
    slug: 'alice-cheongdam',
    name: '앨리스(Alice Cheongdam)',
    summary: '청담 대표 칵테일 바, 혼술도 가능한 바테이블 중심',
    description:
      '청담권에서 오래 알려진 칵테일 바로, 바테이블 위주 좌석 덕분에 혼자 방문도 어색하지 않은 편이다. 칵테일 라인업이 다양해 혼자 천천히 취향 찾기에도 좋고, 분위기 변화가 필요할 때 “한 잔 하러” 들르기 좋다. 피크 타임에는 대기가 생길 수 있다.',
    honyeoTip:
      '혼자면 바테이블에 앉아 “기분/선호(달달·드라이·위스키 베이스)”만 말해도 추천을 잘 받아요. 택시/대중교통 귀가 동선까지 같이 생각해서 마시는 양을 정하면 안전합니다.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '서울특별시 강남구 도산대로55길 47 지하 1층',
    externalUrl: 'https://place.map.kakao.com/26857068',
    tagSlugs: ['solo-drinking', 'emotional', 'stress-relief', 'nightview'],
  },

  {
    regionSlug: 'seoul',
    slug: 'southside-parlor',
    name: '사우스사이드 팔러(Southside Parlor)',
    summary: '이태원 크래프트 칵테일, 혼자도 편한 바 분위기',
    description:
      '이태원/녹사평 라인에서 크래프트 칵테일로 유명한 바로, 바 분위기가 자연스러워 혼자 방문도 크게 튀지 않는다. 칵테일 메뉴가 다양해 한 잔씩 천천히 즐기기 좋고, 늦은 시간까지 운영하는 편이라 일정 마무리로 붙이기 좋다. 주말 밤에는 혼잡할 수 있어 이른 시간대가 더 편하다.',
    honyeoTip:
      '혼술은 평일/주말 초저녁이 베스트예요. 이태원은 귀가 동선이 다양하니 마시기 전 “집까지 이동”을 먼저 정해두면 마음이 편합니다.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '서울특별시 용산구 녹사평대로 218 1층, 4층',
    externalUrl: 'https://place.map.kakao.com/26972066?openhour=1',
    tagSlugs: ['solo-drinking', 'stress-relief', 'nightview', 'emotional'],
  },
];
