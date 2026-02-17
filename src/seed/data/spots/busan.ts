import { ImageSource } from 'src/types/util';
import { SpotCategory } from 'src/types/spot';
import imageMap from '../../image-map.json';
import type { SpotSeedData } from './index';

export const busanSpots: SpotSeedData[] = [
  // 1) NATURE / ACTIVITY / ETC
  {
    regionSlug: 'busan',
    slug: 'gamcheon-culture-village',
    name: '감천문화마을',
    summary: '알록달록한 골목 산책, 혼자 걷기 좋은 예술 마을',
    description:
      '산비탈에 형성된 마을이 예술 프로젝트로 재탄생한 부산 대표 명소. 안내소에서 지도를 받아 골목을 따라 천천히 걷다 보면 벽화·작품·전망 포인트를 자연스럽게 만나게 된다. 동선이 골목 위주라 혼자 이어폰 끼고 걷기 좋고, 중간중간 카페/상점이 있어 쉬어가기에도 편하다. 다만 계단과 경사가 있어 편한 신발이 만족도를 좌우한다.',
    honyeoTip: '초입 안내소에서 지도/스탬프 확인 → 한적한 골목 위주로 걷기',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['busan']['gamcheon-culture-village'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이상민',
    tagSlugs: ['culture', 'walking', 'emotional', 'hidden'],
    address: '부산광역시 사하구 감내2로 177-11',
    externalUrl:
      'https://www.busan.go.kr/eng/CultureAttraction.do?gugun=seogu&seq=12',
  },

  {
    regionSlug: 'busan',
    slug: 'haeundae-beach',
    name: '해운대해수욕장',
    summary: '아침 산책부터 야경까지, 혼자 놀기 쉬운 대표 해변',
    description:
      '긴 백사장과 편의시설이 잘 갖춰져 있고, 해변 산책로가 좋아 혼자 걷기에도 부담이 적다. 아침엔 한적하고, 밤엔 마린시티 쪽 야경이 예쁘다. 카페/식당 밀집도가 높아 “산책 → 커피 → 한 끼”로 동선을 짜기 쉽고, 일정이 비어도 주변에서 금방 채울 수 있는 편이다.',
    honyeoTip: '아침엔 해변 산책, 저녁엔 야경 포인트(마린시티 방향) 추천',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['busan']['haeundae-beach'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-부산관광공사',
    tagSlugs: ['sea', 'activity', 'nightview', 'healing'],
    address: '부산광역시 해운대구 해운대해변로 264',
    externalUrl:
      'https://www.visitbusan.net/index.do?menuCd=DOM_000000201001001000',
  },

  {
    regionSlug: 'busan',
    slug: 'jagalchi-market',
    name: '자갈치시장',
    summary: '부산 대표 어시장, 혼밥/해산물 미식 루트 핵심',
    description:
      '부산을 대표하는 전통 어시장. 활기 있는 시장 풍경을 구경하고, 회/해산물 메뉴로 혼밥도 가능한 편이라 미식 코스에 넣기 좋다. 초행이라면 먼저 시장을 한 바퀴 돌고 “먹고 싶은 메뉴를 정한 뒤” 2층 식당가나 인근 식당으로 이어가면 선택 스트레스가 줄어든다. 피크 시간대에는 사람이 몰려 이동이 번잡할 수 있다.',
    honyeoTip: '오전 방문이면 한적 + 손질/구경 재미, 식사는 피크 시간 피하기',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['busan']['jagalchi-market'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-부산관광공사',
    tagSlugs: ['solo-eating', 'culture', 'shopping'],
    address: '부산광역시 중구 자갈치해안로 52',
    externalUrl:
      'https://www.visitbusan.net/index.do?menuCd=DOM_000000201001005000',
  },

  {
    regionSlug: 'busan',
    slug: 'gwangalli-beach',
    name: '광안리해변',
    summary: '광안대교 야경 + 카페/혼술 동선이 좋은 밤바다',
    description:
      '도심 접근성이 좋아 저녁 산책/카페/버스킹을 한 번에 즐기기 좋다. 광안대교 조명과 바다 분위기가 좋아 혼자 마무리 코스로도 훌륭하다. 해변 라인에 카페와 식당이 길게 이어져 있어 “걷다가 마음에 드는 곳에 들어가기”가 쉬운 편이고, 야경 시간대엔 사진 포인트도 명확하다.',
    honyeoTip: '일몰~초저녁에 카페 창가 자리 잡고 야경까지 이어가기',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['busan']['gwangalli-beach'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-디자인글꼴',
    tagSlugs: ['sea', 'nightview', 'cafe', 'activity', 'emotional'],
    address: '부산광역시 수영구 광안해변로 219',
    externalUrl:
      'https://www.visitbusan.net/en/index.do?menuCd=DOM_000000301001001000&uc_seq=377&lang_cd=en',
  },

  {
    regionSlug: 'busan',
    slug: 'gukje-market',
    name: '국제시장',
    summary: '골목 탐방+쇼핑+길거리 음식, 혼자 돌아다니기 좋은 시장',
    description:
      '부산 원도심의 대표 재래시장. 골목이 많아 구경하는 재미가 크고, 길거리 음식도 많아 혼자 가볍게 먹기에도 좋다. 상가와 노점이 촘촘히 이어져 “한 바퀴 산책하듯” 둘러보며 필요한 걸 사기 좋고, 인근 남포동/자갈치/부평깡통시장과 연결해 반나절 코스로 묶기 쉽다.',
    honyeoTip: '편한 신발 필수. 오전~점심이 비교적 덜 붐빔',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['busan']['gukje-market'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이병현',
    tagSlugs: ['shopping', 'solo-eating', 'culture', 'emotional'],
    address: '부산광역시 중구 중구로 42',
    externalUrl:
      'https://www.visitbusan.net/en/index.do?menuCd=DOM_000000301001001000&uc_seq=1042&lang_cd=en',
  },

  {
    regionSlug: 'busan',
    slug: 'busan-tower',
    name: '부산타워 (용두산공원)',
    summary: '원도심 전망+야경, 혼자 사진 찍기 좋은 대표 전망 포인트',
    description:
      '용두산공원에 위치한 전망 타워. 부산항과 원도심 전경이 잘 보여 첫 부산 여행에도 만족도가 높다. 해 질 무렵 방문하면 분위기가 특히 좋다. 공원 산책로가 짧게 정리돼 있어 혼자 가볍게 걷고 전망대에 올라 “전경 보는 시간”을 만들기 좋고, 남포동/국제시장 라인과도 가까워 이동 동선이 편하다.',
    honyeoTip: '일몰 30분 전 입장 → 어두워질 때까지 머물면 사진 두 배',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['busan']['busan-tower'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이병현',
    tagSlugs: ['nightview', 'activity', 'culture'],
    address: '부산광역시 중구 용두산길 37-55',
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=856837d8-4d1c-4e0b-8d9e-c9da47474fa7',
  },

  {
    regionSlug: 'busan',
    slug: 'haedong-yonggungsa-temple',
    name: '해동용궁사',
    summary: '바다 절벽 사찰, 혼자 “생각정리” 하기 좋은 풍경',
    description:
      '바다와 사찰이 함께 보이는 독특한 장소. 계단이 많아 천천히 걷게 되고, 바다 소리 들으며 혼자 생각 정리하기 좋다. 절벽 라인 전망이 시원하게 열려 있어 사진 포인트도 많고, 혼자 조용히 둘러보는 분위기에도 잘 어울린다. 다만 주말/성수기에는 단체 관광객이 많아 한적함을 원하면 이른 시간 방문이 유리하다.',
    honyeoTip: '아침 일찍 가면 비교적 한적. 편한 신발 추천',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['busan']['haedong-yonggungsa-temple'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-부산관광공사',
    tagSlugs: ['culture', 'sea', 'healing', 'walking'],
    address: '부산광역시 기장군 기장읍 용궁길 86',
    externalUrl:
      'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=2116b628-ded9-42c2-b17e-99d17b5b65e4',
  },

  {
    regionSlug: 'busan',
    slug: 'oryukdo-skywalk',
    name: '오륙도 스카이워크',
    summary: '유리 바닥 위 바다 전망, 짧고 강한 액티비티 코스',
    description:
      '해안 절벽 위로 길게 뻗은 유리 바닥 전망대. 짧게 방문해도 “부산 바다”를 강하게 느낄 수 있어 혼자 여행 루트에 넣기 좋다. 포인트가 명확해 오래 머물기보다 “찍고-보고-이동”이 편하고, 주변 해안 산책과 묶으면 만족도가 올라간다. 바람이 세면 체감이 크게 달라진다.',
    honyeoTip: '바람 강한 날은 운영 제한 가능 → 방문 전 체크',
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['busan']['oryukdo-skywalk'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-부산관광공사',
    tagSlugs: ['activity', 'sea', 'walking'],
    address: '부산광역시 남구 오륙도로 137',
    externalUrl:
      'https://english.visitkorea.or.kr/svc/whereToGo/locIntrdn/rgnContentsView.do?vcontsId=73894',
  },

  {
    regionSlug: 'busan',
    slug: 'songdo-marine-cable-car',
    name: '송도해상케이블카',
    summary: '바다 위를 가로지르는 케이블카, 혼자 타도 부담 없는 코스',
    description:
      '송도해수욕장과 암남공원을 잇는 해상 케이블카. 바다/해안 절벽을 한눈에 볼 수 있어 힐링 루트에 잘 맞고, 혼자 타도 어색하지 않다. 왕복으로 타면 동선이 단순해 계획이 쉬우며, 도착 지점에서 산책로(암남공원)까지 이어가면 “짧은 액티비티+걷기” 코스가 완성된다.',
    honyeoTip: '맑은 날 오후 추천. 왕복으로 잡으면 동선이 편함',
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['busan']['songdo-marine-cable-car'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-부산관광공사',
    tagSlugs: ['activity', 'sea', 'healing', 'nightview'],
    address: '부산광역시 서구 송도해변로 171',
    externalUrl: 'https://busanaircruise.co.kr',
  },

  {
    regionSlug: 'busan',
    slug: 'bupyeong-kkangtong-market',
    name: '부평깡통시장',
    summary: '야시장 분위기 + 가성비 먹거리, 혼자 먹방 코스에 최적',
    description:
      '먹거리 중심 시장으로 저녁에는 야시장이 열려 활기가 넘친다. 여러 음식을 조금씩 맛보는 “혼자 먹방”에 특히 잘 맞는다. 메뉴 선택지가 넓어 한 끼를 정식으로 먹기보다 “꼬치/분식/디저트”처럼 가볍게 이어가기 좋고, 주변 국제시장/남포동과도 가까워 원도심 코스에 자연스럽게 붙는다.',
    honyeoTip: '저녁 시간엔 붐빔. 현금/간편결제 준비하면 편함',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['busan']['bupyeong-kkangtong-market'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-부산관광공사',
    tagSlugs: ['solo-eating', 'nightview', 'culture', 'shopping'],
    address: '부산광역시 중구 부평1길 48',
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=a855c95c-ef06-418a-9148-64268ea4d24f',
  },

  {
    regionSlug: 'busan',
    slug: 'haeundae-sky-capsule',
    name: '해운대 스카이캡슐(블루라인파크)',
    summary: '하늘 위 레일 따라 바다를 스치듯, 인생샷 자동 생성 코스',
    description:
      '미포~청사포 구간을 공중 레일로 달리는 캡슐 체험. 혼자 타도 동선이 단순하고, 창밖으로 바다가 계속 따라와 사진이 잘 나온다. 예약 경쟁이 있는 편이라 일정 확정되면 먼저 예매하는 게 안전하다. 청사포에 내려 다릿돌전망대나 카페로 자연스럽게 이어지기 좋아 반나절 코스로 구성하기 쉽다.',
    honyeoTip:
      '혼자라면 평일/오전 타임이 덜 붐빔. 미포→청사포 편도로 타고, 청사포에서 바다 산책+카페까지 묶으면 루트가 깔끔해요.',
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['busan']['haeundae-sky-capsule'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-디앤에이스튜디오',
    tagSlugs: ['activity', 'sea', 'emotional', 'oneday'],
    address: '부산광역시 해운대구 청사포로 116',
    externalUrl: 'https://www.bluelinepark.com/skyCapsuleCourse.do',
  },

  {
    regionSlug: 'busan',
    slug: 'cheongsapo-daritdol-observatory',
    name: '청사포 다릿돌전망대',
    summary: '투명 바닥 끝에서 바다 위를 걷는 느낌, 짧고 강한 스카이워크',
    description:
      '바다로 길게 뻗은 전망대 끝쪽에 투명 바닥 구간이 있어 “바다 위를 걷는” 느낌이 확실하다. 사진 포인트가 명확해서 혼자 가도 찍을 컷이 많고, 주변에 카페/식당이 몰려 있어 이동 스트레스가 적다. 스카이캡슐 하차 후 들르기 좋은 구성이라 한 번에 묶어 다니기 좋다. 바람이 세면 체감 온도가 크게 떨어질 수 있다.',
    honyeoTip:
      '바람이 세면 체감 온도가 확 떨어져요. 얇은 바람막이 하나 챙기면 만족도가 확 올라갑니다.',
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['busan']['cheongsapo-daritdol-observatory'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-나금주',
    tagSlugs: ['sea', 'activity', 'walking', 'nightview'],
    address: '부산광역시 해운대구 청사포로 167',
    externalUrl:
      'https://visitbusan.net/archive/dataSearch/view.nm?dataSid=METADATA006349',
  },

  {
    regionSlug: 'busan',
    slug: 'huinnyeoul-culture-village',
    name: '흰여울문화마을',
    summary: '절벽 골목+바다 라인, 혼자 걷기 딱 좋은 “감성 산책”',
    description:
      '영도 절벽 위 골목을 따라 걷다 보면 바다가 계속 펼쳐지는 감성 마을. 골목이 길게 이어져 혼자 이어폰 끼고 걷기 좋고, 포토스팟도 자연스럽게 등장한다. 근처에 오션뷰 카페가 많아 “산책→카페” 흐름이 깔끔하게 이어진다. 내리막/계단 구간이 있어 체력과 신발 컨디션에 따라 만족도가 갈릴 수 있다.',
    honyeoTip:
      '오전~이른 오후가 사진 찍기 편해요(그림자 덜함). 계단/내리막이 있어 편한 신발 추천!',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['busan']['huinnyeoul-culture-village'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-부산울신지사 디자인글꼴',
    tagSlugs: ['walking', 'emotional', 'sea', 'hidden'],
    address: '부산광역시 영도구 영선동4가 1043',
    externalUrl:
      'https://www.visitbusan.net/kr/index.do?lang_cd=ko&menuCd=DOM_000000201001001000&uc_seq=255',
  },

  // 2) FOOD
  {
    regionSlug: 'busan',
    slug: 'milyang-sundae-dwaeji-gukbap-haeundae',
    name: '밀양순대돼지국밥 해운대점',
    summary: '뜨끈한 국밥 한 그릇으로 혼자 든든하게, 실패 없는 부산식 한 끼',
    description:
      '국밥은 기본적으로 1인 식사에 최적화된 메뉴라 혼밥 난이도가 낮다. 해운대/해리단길 동선에서 접근이 좋아 “바다→식사” 코스로 자주 묶인다. 후기에서도 회전이 빠르고 혼자 온 손님이 섞여 있는 편이라 부담이 적다는 이야기가 많다. 든든하게 한 끼를 해결하고 다음 일정으로 넘어가기 좋은 타입이다.',
    honyeoTip:
      '점심 12~13시만 피하면 훨씬 편해요. 혼자면 “국밥 단품+수육 소” 같은 조합보다 단품으로 깔끔하게 추천.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '부산광역시 해운대구 구남로 28',
    externalUrl: 'https://place.map.kakao.com/960933553',
    tagSlugs: ['solo-eating', 'culture', 'stress-relief'],
  },

  {
    regionSlug: 'busan',
    slug: 'tonshow-gwangalli',
    name: '톤쇼우 광안점',
    summary: '바삭 촉촉 돈카츠, 혼자 웨이팅해도 납득되는 “인생 한 끼”',
    description:
      '광안리에서 “돈카츠 하면 여기”로 자주 언급되는 곳이라 후기 기반 신뢰도가 높다. 혼자 와도 주문이 단순하고 식사 흐름이 빠른 편이라 혼밥 난이도가 낮다. 광안리 해변/카페 동선과도 가까워서 “야경 전 든든하게” 넣기 좋다. 인기 시간대에는 웨이팅이 길어질 수 있다.',
    honyeoTip:
      '혼자면 오픈 직후/브레이크 직후가 제일 편해요. 웨이팅 길면 광안리 산책 20~30분 넣고 돌아오는 루트로 짜면 멘탈이 덜 깨져요.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '부산광역시 수영구 광안해변로279번길 13',
    externalUrl: 'https://place.map.kakao.com/590377149',
    tagSlugs: ['solo-eating', 'emotional', 'stress-relief'],
  },

  {
    regionSlug: 'busan',
    slug: 'choryang-milmyeon-bonjeom',
    name: '초량밀면 본점',
    summary: '부산역 근처 “여행 시작 한 그릇”, 혼자 먹기 딱 좋은 밀면',
    description:
      '밀면/만두 조합으로 유명한 부산 클래식 코스라 후기 밀도가 높은 편이다. 혼자도 빠르게 먹고 나오기 좋은 구성이라 일정이 빡빡한 날에 특히 잘 맞는다. 부산역(도착/출발) 동선에 끼워 넣으면 “가성비 좋은 한 끼”로 깔끔하고, 이동 전후로 부담 없이 들르기 좋다.',
    honyeoTip:
      '성수기엔 줄이 생겨요. 혼자라면 애매한 시간(11시 전후/14시 전후)로 가면 체감 대기가 확 줄어듭니다.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '부산광역시 동구 중앙대로 225',
    externalUrl: 'https://place.map.kakao.com/27365831',
    tagSlugs: ['solo-eating', 'culture', 'stress-relief', 'oneday'],
  },

  {
    regionSlug: 'busan',
    slug: 'daeyeon-milmyeon',
    name: '대연밀면',
    summary: '부산 여름 미식의 정석, 시원하게 혼자 완면하기 좋은 집',
    description:
      '밀면은 혼자 빠르게 먹기 좋은 메뉴라 혼밥 부담이 적고 회전도 빠른 편이다. 현지인/관광객 후기가 꾸준히 쌓여 있는 타입이라 “검증된 한 끼”로 넣기 좋다. 해운대-광안리-남구 라인 이동할 때 한 끼 찍고 가기 좋은 포지션이라 동선에 넣기 쉽다. 성수기에는 대기 변수가 있을 수 있다.',
    honyeoTip:
      '성수기엔 대기 생길 수 있어요. 오픈 직후나 늦은 점심 타임(14시 전후)로 가면 비교적 수월합니다.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '부산광역시 남구 천제등로 55 1층',
    externalUrl: 'https://place.map.kakao.com/16697877',
    tagSlugs: ['solo-eating', 'hidden', 'stress-relief'],
  },

  {
    regionSlug: 'busan',
    slug: 'burgershop-haeundae',
    name: '버거샵 해운대점',
    summary: '해리단길 감성 수제버거, 혼자 먹어도 어색하지 않은 힙한 한 끼',
    description:
      '해리단길 쪽에 있는 레트로 감성 수제버거집. 혼자 가도 주문/식사 흐름이 단순해서 편하다. 분위기와 사진 얘기가 자주 나오는 편이라 “간단한 한 끼+감성”을 동시에 챙기기 좋고, 해운대역 주변이라 해변/카페로 바로 이어지기도 쉽다. 포장해서 바다 보며 먹는 루트로도 잘 맞는다.',
    honyeoTip:
      '혼자면 자리 회전 빠른 시간대(오픈 직후/늦은 점심)에 가면 더 편해요. 포장해서 해변에서 먹는 것도 괜찮습니다.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '부산광역시 해운대구 우동1로20번길 19 1층',
    tagSlugs: ['solo-eating', 'emotional', 'activity'],
  },

  // 3) CAFE
  {
    regionSlug: 'busan',
    slug: 'waveon-coffee',
    name: '웨이브온 커피',
    summary: '바다 앞 건축미+오션뷰, 혼자 있어도 “그림” 되는 카페',
    description:
      '오시리아/기장 쪽 오션뷰 카페로, 공간 자체가 포토스팟이라 혼자 가도 볼거리가 많다. 바다 보이는 좌석이 다양해 “혼자 오래 앉아 있기” 좋은 타입이고, 드라이브/해안 산책 루트와 함께 묶으면 하루 코스가 깔끔하게 완성된다. 인기 시간대에는 자리 경쟁이 있을 수 있어 시간대를 잘 잡는 게 중요하다.',
    honyeoTip:
      '해질 무렵이 제일 예뻐요. 혼자라면 창가 자리 고집하지 말고 “뷰 좋은 빈 자리”에 바로 앉는 게 멘탈 편합니다.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '부산광역시 기장군 장안읍 해맞이로 286',
    externalUrl: 'https://place.map.kakao.com/528293263',
    tagSlugs: ['cafe', 'sea', 'healing', 'emotional'],
  },

  {
    regionSlug: 'busan',
    slug: 'goslow-yeongdo',
    name: '고슬로(영도 오션뷰 카페)',
    summary: '흰여울 산책 후 쉬기 좋은 오션뷰, 혼자 멍때리기 딱',
    description:
      '흰여울문화마을 동선에서 자연스럽게 이어지는 오션뷰 카페. 혼자 가도 바다 보면서 쉬기 좋은 구조라 “산책→카페” 흐름이 예쁘게 떨어진다. 뷰 중심 카페라 사진도 잘 나오고, 조용히 머무르는 손님이 많은 편이라 혼자 시간 보내기에도 부담이 적다. 산책으로 체력이 빠졌을 때 회복 포인트로 잡기 좋다.',
    honyeoTip:
      '흰여울 골목은 걷다 보면 체력이 금방 빠져요. 카페는 “중간 휴식 포인트”로 잡고 루트를 짜면 만족도가 올라갑니다.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '부산광역시 영도구 절영로 234',
    externalUrl: 'https://place.map.kakao.com/901097055',
    tagSlugs: ['cafe', 'sea', 'healing', 'walking'],
  },

  {
    regionSlug: 'busan',
    slug: 'awluku-cafe-jeonpo',
    name: '카페 얼룩(AWLUK)',
    summary: '전포 감성 소품+빛 좋은 공간, 혼자 앉아도 어색하지 않은 카페',
    description:
      '전포 카페거리에서 “공간이 예쁘다”는 후기 비중이 높은 타입이라 사진이 잘 나오는 편이다. 조용히 앉아 쉬는 손님이 많아 혼자 가도 부담이 적고, 디저트/커피로 템포 조절하기 좋다. 전포 골목 산책 뒤에 자연스럽게 붙이기 쉬워 “산책→카페→저녁” 코스로 이어가기에도 편하다.',
    honyeoTip:
      '혼자면 창가 자리 욕심내기보다 “조용한 구석 자리”가 만족도 높아요. 전포는 웨이팅 많은 곳이니 카페를 완충지대로 잡아 루트를 설계하세요.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '부산광역시 부산진구 전포대로210번길 48 2층',
    externalUrl: 'https://place.map.kakao.com/1680390963',
    tagSlugs: ['cafe', 'healing', 'emotional', 'walking'],
  },

  {
    regionSlug: 'busan',
    slug: 'arden-boulangerie-namcheon',
    name: '아덴블랑제리 남천점',
    summary: '빵천동 감성 베이커리, 혼자 가도 “디저트 투어” 성립',
    description:
      '남천/광안 라인에서 베이커리 카페로 자주 언급되는 곳이라 후기 기반 검증이 쉬운 편이다. 빵 고르고 커피 한 잔하는 흐름이 자연스러워 혼자 방문해도 부담이 적고, 포장 옵션까지 활용하면 일정이 더 유연해진다. 광안리(야경) 들어가기 전에 “디저트+휴식”으로 넣으면 동선이 예쁘게 떨어진다.',
    honyeoTip:
      '혼자면 빵은 1~2개만 가볍게 고르고(포장 추가 추천), 좌석은 조용한 자리로 빠르게 앉는 게 편해요.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '부산광역시 수영구 남천동로 36 케이엠타워 1층',
    externalUrl: 'https://place.map.kakao.com/m/1512614926',
    tagSlugs: ['cafe', 'emotional', 'healing', 'walking'],
  },

  {
    regionSlug: 'busan',
    slug: 'naive-brewers-jeonpo',
    name: '나이브 브류어스',
    summary: '전포 힙 감성 핸드드립, 혼자 “집중하기 좋은” 커피 스팟',
    description:
      '전포 카페거리에서 꾸준히 언급되는 감성 카페로, 핸드드립/커피 메뉴가 강점이다. 혼자 와서 조용히 커피 마시며 생각 정리하기 좋고, 전포 골목 산책이나 소품샵 쇼핑 동선과도 붙이기 쉬워 루트 설계가 깔끔하다. 주말 오후 피크에는 혼잡할 수 있어 시간대를 조정하면 만족도가 높다.',
    honyeoTip:
      '혼자면 피크 시간(주말 오후)만 피하면 좌석 잡기 훨씬 수월해요. “전포 소품샵→카페→저녁/바”로 이어가면 하루가 예쁘게 끝나요.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '부산광역시 부산진구 전포대로186번길 37',
    externalUrl: 'https://place.map.kakao.com/1027187749',
    tagSlugs: ['cafe', 'emotional', 'walking', 'hidden'],
  },

  // 4) DRINK
  {
    regionSlug: 'busan',
    slug: 'bronx-brewing-gwangalli-bp',
    name: '브롱스브루잉컴퍼니 광안리BP점',
    summary: '광안대교 뷰 보면서 한 잔, 혼자 마무리하기 좋은 밤코스',
    description:
      '광안리 바다 바로 앞이라 야경이 강력한 수제맥주 바. 혼자라도 “뷰 있는 자리+맥주 한 잔”이 목적이면 충분히 만족도가 나오는 타입이다. 광안리 해변 산책 후 자연스럽게 들어가기 좋고, 바 자리나 가장자리 좌석을 잡으면 혼자 있어도 편하다. 피크 시간에는 자리 경쟁이 있을 수 있다.',
    honyeoTip:
      '혼자면 오픈 직후나 평일에 가면 자리 잡기 쉬워요. 2잔 이상 계획이면 귀가 동선(지하철/버스) 먼저 확인!',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '부산광역시 수영구 광안해변로 217 1층',
    externalUrl: 'https://place.map.kakao.com/703819753',
    tagSlugs: ['solo-drinking', 'nightview', 'sea', 'emotional'],
  },
  {
    regionSlug: 'busan',
    slug: 'gorilla-brewing-haeundae',
    name: '고릴라브루잉 해운대점',
    summary: '해운대 밤바다 옆 펍, 혼자 앉아도 자연스러운 수제맥주 스팟',
    description:
      '해운대에서 “펍다운 펍” 느낌으로 자주 언급되는 수제맥주 스팟. 바 좌석이나 가장자리 자리에서 혼자 한 잔하기 자연스럽고, 한 잔 마신 뒤 해변 쪽으로 산책을 이어가기도 좋다. 피크 시간대에는 붐빌 수 있어 조용하게 즐기려면 이른 시간 방문이 유리하다.',
    honyeoTip:
      '혼자면 바 자리/가장자리 좌석이 제일 편해요. 금·토는 붐비니 평일/일찍 가면 만족도 높습니다.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '부산 해운대구 해운대로570번길 46 신라스테이해운대 1층',
    externalUrl: 'https://place.map.kakao.com/878826462',
    tagSlugs: ['solo-drinking', 'nightview', 'sea', 'emotional'],
  },

  {
    regionSlug: 'busan',
    slug: 'goof-record-bar-jeonpo',
    name: '구프 레코드 (LP/바)',
    summary: '전포 감성 LP바, 혼자 “음악+한 잔” 하기 좋은 조용한 밤',
    description:
      '전포에서 “음악 듣는 바”로 자주 언급되는 곳이라 혼자 방문이 더 자연스럽다. 대화보다 음악과 분위기 중심이라 혼술 난이도가 낮고, 조명이 은은해 사진도 분위기 있게 나온다. 전포 카페거리에서 저녁으로 넘어갈 때 “마무리 한 잔”으로 붙이기 좋고, 오래 머물기보다 1~2잔으로 템포를 잡기에도 좋은 타입이다.',
    honyeoTip:
      '혼자면 오픈 직후/평일이 가장 편해요. 자리 잡고 1잔만 천천히 마셔도 충분히 분위기 납니다.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '부산광역시 부산진구 동성로25번길 29 1층',
    externalUrl: 'https://place.map.kakao.com/1877549710',
    tagSlugs: ['solo-drinking', 'emotional', 'hidden', 'nightview'],
  },

  {
    regionSlug: 'busan',
    slug: 'hey-jude-cocktail-bar-jeonpo',
    name: '헤이주드 (Hey, Jude)',
    summary: '전포 감성 칵테일바, 혼자 앉아도 편한 아늑한 분위기',
    description:
      '전포에서 “분위기 좋은 칵테일”로 언급이 꾸준한 편이라 후기 기반 검증이 쉬운 타입이다. 공간이 아늑하고 대화 톤이 과하지 않은 분위기라 혼자 조용히 앉아 한 잔하기 좋다. 전포 카페거리나 소품샵 동선 뒤에 붙이면 하루 마무리가 깔끔하고, 바 좌석이 있으면 혼자 방문 난이도는 더 내려간다. 피크 시간대에는 만석이 될 수 있다.',
    honyeoTip:
      '혼자면 바 좌석 가능 여부를 먼저 보고(없으면 구석 자리), 1~2잔으로 가볍게 끝내는 루트가 만족도가 높아요.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '부산광역시 부산진구 서전로68번길 110',
    externalUrl: 'https://place.map.kakao.com/757820658',
    tagSlugs: ['solo-drinking', 'emotional', 'nightview', 'hidden'],
  },
];
