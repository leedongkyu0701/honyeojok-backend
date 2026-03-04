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
    description: `여의도 한강공원은 한강을 따라 길게 펼쳐진 공원으로 지하철 여의나루역 2번 출구를 나오면 바로 한강이 펼쳐져요.

따릉이(공공자전거)를 빌릴 수 있는 대여소가 가까워서 강변을 가볍게 달리거나 산책할 수 있고, 넓은 잔디와 쉼터가 많아 혼자 돗자리를 펴고 시간을 보내기 좋아요.

해가 지기 전부터 강을 바라보며 책을 읽거나 음악을 듣다가, 밤이 되면 건너편 빌딩과 마포대교 조명이 반짝여 야경이 빛나요. 편의점(CU, 미니스톱, 이마트24)이 곳곳에 있어 간식과 음료를 쉽게 구할 수 있어 혼자 와도 준비가 덜 부담돼요.

사람들 속에서도 혼자 앉아 시간을 보내는 이들이 많아 혼자 여행자도 눈치 보지 않아도 돼요.`,
    honyeoTip: `• 따릉이를 빌려 강변을 한 바퀴 돌고 잔디밭에서 간식과 함께 쉬어가는 루트가 좋아요.
• 해 질 무렵에 찾아가 노을과 야경이 이어지는 시간을 보내면 분위기가 달라져요.
• 밤에는 강가가 서늘하니 얇은 겉옷을 챙기세요.`,
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['seoul']['yeouido-hangang-park'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-임찬경',
    address: '서울특별시 영등포구 여의동로 330',
    lat: 37.5263474738219,
    lng: 126.933595431713,
    externalUrl:
      'https://korean.visitseoul.net/yongsan-yeouido/%EC%97%AC%EC%9D%98%EB%8F%84-%ED%95%9C%EA%B0%95%EA%B3%B5%EC%9B%90%EC%86%8C%EB%85%80%EC%8B%9C%EB%8C%80%EC%88%B2_/12993',
    tagSlugs: ['healing', 'nightview', 'activity'],
  },

  {
    regionSlug: 'seoul',
    slug: 'seoul-forest',
    name: '서울숲',
    summary: '도심 속 큰 공원, 혼자 쉬기 좋은 공간 많음',
    description: `서울숲은 도심 한가운데서 계절의 변화를 느낄 수 있는 큰 공원이에요.

봄에는 벚꽃과 은행나무가 가득해 산책로가 자연 속 터널처럼 이어지고, 여름과 가을에도 녹음이 우거져 돗자리 펴고 쉬기 좋습니다. 사슴우리에서 사료 자판기(유료)로 먹이를 주면서 가까이 체험할 수 있는 공간도 있어요.

공원 내부에는 데크 산책로와 자전거 길, 잔디밭이 넓어서 혼자 걸으며 생각 정리하거나 책을 읽기에 좋고, 다리로 연결된 한강변까지 이어 걸어가 해질녘 강바람을 느낄 수도 있어요.

도시 가운데 이렇게 큰 자연을 느낄 수 있어 혼자여도 지루하지 않아요.`,
    honyeoTip: `• 봄, 가을에는 주말보다 평일 오전에 방문하면 한적하게 산책할 수 있어요.
• 사슴 먹이 체험은 자판기에서 작은 봉지를 사서 주면 되니 관심이 있다면 현금을 준비하세요.
• 산책을 마친 뒤 다리를 건너 한강을 따라 걸으면 또 다른 분위기를 느낄 수 있어요.`,
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['seoul']['seoul-forest'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-임태원',
    address: '서울특별시 성동구 뚝섬로 273',
    lat: 37.5430701468405,
    lng: 127.041799099222,
    externalUrl:
      'https://korean.visitseoul.net/nature/%EC%84%9C%EC%9A%B8%EC%88%B2/KOP001838',
    tagSlugs: ['healing', 'nature', 'activity'],
  },

  {
    regionSlug: 'seoul',
    slug: 'cheonggyecheon-stream',
    name: '청계천',
    summary: '도심 속 물길 산책, 혼자 걷기 좋은 대표 코스',
    description: `청계천은 광화문·종로 도심 한복판을 흐르는 물길로, 평평한 산책로를 따라 걷기 좋은 곳이에요.

발을 딛고 건널 수 있는 징검다리와 조각품, 작은 폭포가 있어 밤에는 조명이 켜져 풍경이 더 예뻐요.

주중 퇴근 후에도 많은 사람들이 산책을 즐기지만 길이 넓고 조명시설이 있어 혼자 걷기에도 안전하고 편안합니다. 천을 따라 다양한 다리와 연결된 골목길들이 있어 덕수궁, 인사동 등 다른 명소로 자연스럽게 이어져요.`,
    honyeoTip: `• 해가 지고 조명이 켜지는 시간에 걷는 것이 가장 분위기 있어요.
• 출발은 청계광장에서 시작해 마음에 드는 지점까지 천천히 걸었다가 가까운 지하철역으로 나와도 됩니다.
• 구간별로 폭포가 있으니 물튀김에 대비해 미끄럽지 않은 신발을 신으세요.`,
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['seoul']['cheonggyecheon-stream'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-서뮨교',
    address: '서울특별시 종로구 무교로 37',
    lat: 37.5694076173271,
    lng: 126.97909830012,
    externalUrl:
      'https://korean.visitseoul.net/attractions/%EC%B2%AD%EA%B3%84%EC%B2%9C_/380',
    tagSlugs: ['walking', 'healing', 'oneday'],
  },

  {
    regionSlug: 'seoul',
    slug: 'gyeongui-line-forest-park',
    name: '경의선숲길(연트럴파크)',
    summary: '카페거리 사이로 이어지는 도심 산책길',
    description: `경의선숲길은 폐선된 철로를 정원과 산책로로 탈바꿈한 길로 연남동과 홍대를 잇는 도심 속 숲길이에요.

길 양옆으로 잔디와 작은 개천, 나무들이 심어져 있어 도심 속에서도 자연을 느낄 수 있고, 벤치와 데크가 많아 혼자 앉아 책을 읽거나 쉬기 좋아요.

길 중간중간에는 예술작품과 벽화, 소규모 공연이 있어 걷다가 눈에 띄는 작품을 발견하는 재미가 있어요. 주변에는 카페와 상점이 밀집해 있어 산책 중간에 커피 한 잔 하고 다시 걸을 수 있어요.`,
    honyeoTip: `• 해질 무렵에 숲길을 걷다가 연남동 카페거리로 들어가 여유롭게 쉬는 코스가 좋아요.
• 주말 오후엔 사람과 반려견 산책이 많아 조금 붐비니 평일이나 이른 시간대가 더 한적해요.
• 길 양쪽에 횡단보도가 많으니 자전거를 탈 때는 속도를 조절해 주세요.`,
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['seoul']['gyeongui-line-forest-park'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이범수',
    address: '서울특별시 마포구 양화로 188',
    lat: 37.5577458058734,
    lng: 126.926498328277,
    externalUrl:
      'https://korean.visitseoul.net/nature/%EA%B2%BD%EC%9D%98%EC%84%A0%EC%88%B2%EA%B8%B8_/37216',
    tagSlugs: ['walking', 'healing', 'cafe'],
  },

  {
    regionSlug: 'seoul',
    slug: 'banpo-hangang-park',
    name: '반포한강공원',
    summary: '야경·피크닉·산책 모두 되는 한강 명소',
    description: `반포한강공원은 강변 잔디와 산책로가 넓어 피크닉과 산책을 즐기기 좋은 곳이에요.

저녁이 되면 반포대교에 설치된 무지개 분수 쇼가 펼쳐져 380개의 노즐에서 뿜어져 나오는 물줄기가 음악과 함께 연출돼요.

공원에는 벤치와 데크가 많아 혼자 앉아 강바람을 맞으며 노을과 야경을 감상할 수 있지만, 공연 시간대에는 자리가 빨리 차니 여유 있게 일찍 도착하는 것이 좋아요. 지하철 3·7·9호선 고속터미널역 8-1번 출구에서 바로 접근할 수 있어 교통도 편리합니다.`,
    honyeoTip: `• 분수 쇼는 일몰 후 일정 시간마다 진행되니 시간표를 확인하고 미리 자리를 잡아두세요.
• 강가 바람이 강해 밤에는 체감온도가 낮으니 담요나 겉옷을 챙기면 좋아요.
• 간단한 간식은 근처 편의점에서 사서 돗자리와 함께 즐기면 혼자서도 여유로운 시간을 보낼 수 있어요.`,
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['seoul']['banpo-hangang-park'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-서문교',
    address: '서울특별시 서초구 신반포로11길 40',
    lat: 37.5076939718271,
    lng: 126.992730984132,
    externalUrl:
      'https://korean.visitseoul.net/nature/%EB%B0%98%ED%8F%AC%ED%95%9C%EA%B0%95%EA%B3%B5%EC%9B%90_/29937',
    tagSlugs: ['nightview', 'healing', 'walking'],
  },

  {
    regionSlug: 'seoul',
    slug: 'nodeul-island',
    name: '노들섬',
    summary: '한강 위 문화섬, 책·음악·산책이 한 번에',
    description: `노들섬은 한강 중앙에 떠 있는 작은 섬으로, 자연과 문화가 어우러진 공간이에요.

섬 안에는 작은 서점과 갤러리, 라이브 공연을 즐길 수 있는 노들라이브하우스가 있어 전시나 공연을 보고 책을 읽으며 시간을 보낼 수 있어요.

주말에는 무료 야외 공연이 열리기도 하고 피자·타코 같은 음식을 파는 푸드트럭과 카페가 있어 한강을 바라보며 간단한 식사도 가능해요. 자연에 둘러싸여 있어 산책로를 따라 걷거나 강변에 앉아 일몰을 감상하기 좋고, 도시 한가운데지만 주변 건물의 소음이 적어 여유를 느낄 수 있어요.`,
    honyeoTip: `• 섬은 한강대교 아래로 연결된 도보 교량을 통해 출입하니 편한 신발을 신고 이동하세요.
• 해질 무렵에 도착해 서점과 카페를 둘러본 뒤 노을과 야경까지 보고 돌아오면 좋습니다.
• 주말에는 공연 스케줄을 미리 확인하고 돗자리나 깔개를 챙기면 한층 편해요.`,
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['seoul']['nodeul-island'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-안영관',
    address: '서울특별시 용산구 양녕로 445',
    lat: 37.5176638307111,
    lng: 126.958036465507,
    externalUrl:
      'https://korean.visitseoul.net/nature/%EB%85%B8%EB%93%A4%EC%84%AC_/31922',
    tagSlugs: ['healing', 'emotional', 'walking', 'culture'],
  },

  {
    regionSlug: 'seoul',
    slug: 'hanyang-do-seong-gil',
    name: '한양도성길',
    summary: '서울성곽길과 야경을 함께 즐기는 혼자 산책 명소',
    description: `한양도성길은 낙산구간을 따라 서울 성곽과 도시 전경을 함께 볼 수 있는 산책로예요.

성곽을 따라 이어지는 길은 잘 포장되어 있지만 구간마다 계단과 경사가 있어 천천히 올라가야 합니다. 성곽 위 전망대에서는 서울 도심과 남산을 한눈에 볼 수 있고, 밤에는 조명이 켜져 안전하게 야경을 즐길 수 있어요.

출발은 혜화역 2번 출구에서 시작하는 것이 일반적이며 길을 따라 올라가다 보면 이화 벽화마을과 작은 카페들이 나타나 잠시 쉬어가기 좋아요. 먹거리나 물을 판매하는 곳이 많지 않으니 준비해 가는 것이 좋습니다.`,
    honyeoTip: `• 일몰 1시간 전쯤부터 올라가면 해 지는 모습과 야경을 순서대로 볼 수 있어요.
• 신발은 발목을 잘 잡아주는 운동화를 신어야 계단에서 미끄럼을 줄일 수 있고, 물과 간단한 간식을 챙기면 중간에 벤치나 전망대에서 쉬면서 즐길 수 있습니다.
• 이화 벽화마을을 지나며 조용히 사진을 찍고 주민들에게 피해가 가지 않도록 주의하세요.`,
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['seoul']['hanyang-do-seong-gil'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-두드림',
    address: '서울특별시 종로구 낙산길 41',
    lat: 37.5805926127615,
    lng: 127.006531505857,
    externalUrl:
      'https://korean.visitseoul.net/nature/%EB%82%99%EC%82%B0%EA%B3%B5%EC%9B%90_/3702',
    tagSlugs: ['nightview', 'walking', 'thinking'],
  },

  {
    regionSlug: 'seoul',
    slug: 'gyeongbokgung-palace',
    name: '경복궁',
    summary: '조선의 법궁, 혼자 천천히 걷기 좋은 대표 역사 명소',
    description: `경복궁은 조선시대의 법궁으로 넓은 마당과 전각들이 자리한 서울 대표 역사 명소예요.

오전 9시부터 개방하며 화요일은 휴궁이고 성인 입장료는 3,000원인데 한복을 입으면 무료로 들어갈 수 있어요.

궁 내부는 규모가 커서 반나절 정도 천천히 걸으며 교태전, 경회루 같은 전각과 뒤편의 연못, 정원을 둘러보는 데 시간이 걸립니다. 이른 아침이나 늦은 오후에 방문하면 빛이 부드럽고 관람객이 적어 혼자 천천히 사진을 찍거나 벤치에 앉아 조용히 쉬기 좋아요.

바로 옆에는 북촌한옥마을과 인사동, 삼청동이 있어 동선에 함께 넣기 쉽습니다.`,
    honyeoTip: `• 문 열리자마자 입장하면 한적하게 궁을 둘러볼 수 있고, 매 시간 열리는 수문장 교대식을 가까이서 볼 수 있어요.
• 한복을 대여해 입장하면 무료이므로 전통 의상 체험을 해보는 것도 추천해요.
• 궁을 둘러본 뒤에는 삼청동이나 인사동 골목길로 이어서 산책하면 하루 동선이 자연스럽습니다.`,
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['seoul']['gyeongbokgung-palace'],
    imageSource: ImageSource.UNSPLASH,
    address: '서울특별시 종로구 사직로 161',
    lat: 37.5759040910202,
    lng: 126.976842133821,
    externalUrl:
      'https://korean.visitseoul.net/attractions/%EA%B2%BD%EB%B3%B5%EA%B6%81_/72',
    tagSlugs: ['culture', 'emotional'],
  },

  {
    regionSlug: 'seoul',
    slug: 'bukchon-hanok-village',
    name: '북촌한옥마을',
    summary: '한옥과 골목 풍경이 예쁜 산책 코스',
    description: `북촌한옥마을은 청계천과 종로 북쪽 언덕에 자리한 전통 한옥 주거지예요.

조선시대부터 이어진 한옥 수백 채가 골목마다 남아 있고, 일부는 문화센터나 게스트하우스, 한식당 등으로 활용되고 있어요. 좁은 골목길을 따라 걷다 보면 현대식 카페와 갤러리, 세탁소 등 삶의 흔적이 섞여 있어 오래된 주택과 현대적인 공간이 공존하는 분위기를 느낄 수 있습니다.

이 동네는 주민들이 실제로 거주하는 곳이어서 조용히 사진을 찍으며 걸어야 하고, 이른 아침에는 골목길이 한산해 혼자 산책하기 특히 좋아요.`,
    honyeoTip: `• 해 뜨기 직후나 오전 시간대에 방문하면 관광객이 적어 골목을 여유 있게 둘러볼 수 있어요.
• 주민들의 사생활을 존중해 큰 소리로 떠들거나 집 앞을 들여다보지 마세요.
• 마음에 드는 카페나 공방에 들러 차를 마시거나 기념품을 구입해 보세요.
• 경복궁과 인사동, 삼청동과 가까워 함께 묶어 걸으면 동선이 좋아요.`,
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['seoul']['seoul-bukchon-hanok-village'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이범수',
    address: '서울특별시 종로구 계동길 37',
    lat: 37.5790883269606,
    lng: 126.986276109794,
    externalUrl:
      'https://korean.visitseoul.net/attractions/%EB%B6%81%EC%B4%8C%ED%95%9C%EC%98%A5%EB%A7%88%EC%9D%84_/261',
    tagSlugs: ['culture', 'emotional'],
  },

  {
    regionSlug: 'seoul',
    slug: 'namsan-seoul-tower',
    name: '남산 서울타워',
    summary: '서울 전경을 360도로 볼 수 있는 전망대가 있는 곳이에요.',
    description: `남산 서울타워는 서울 전경을 360도로 볼 수 있는 전망대가 있는 곳이에요.

정상까지 올라가는 방법은 케이블카, 버스, 도보가 있는데 케이블카를 타면 경사가 큰 길을 걷지 않고도 편하게 올라가며 창밖으로 서울 시내를 볼 수 있어 처음 방문하는 사람에게 추천돼요.

버스는 남산순환버스를 이용하면 타워 바로 아래까지 가지만 마지막 구간은 도보로 계단을 올라야 하고, 예산을 절약하고 싶다면 남산둘레길을 따라 걷는 것도 무리가 없어요. 정상에 오르면 전망대와 사랑의 자물쇠 광장, 카페 등이 있어 야경이 아름답고 혼자여도 주변을 둘러보며 충분히 시간을 보낼 수 있습니다.`,
    honyeoTip: `• 해 질 무렵에 케이블카를 타고 올라가 노을과 야경을 이어서 보는 것을 추천해요.
• 버스나 도보를 선택할 경우에도 경사가 있으니 편한 신발과 겉옷을 준비하세요.
• 내려올 때는 케이블카나 버스를 이용하면 체력 부담을 줄일 수 있어요.
• 전망대 외에도 남산길 산책로를 따라 조금 더 걸어보면 한적한 숲길을 즐길 수 있습니다.`,
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['seoul']['namsan-seoul-tower'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이범수',
    address: '서울특별시 용산구 남산공원길 105',
    lat: 37.5511225714939,
    lng: 126.987867837993,
    externalUrl:
      'https://korean.visitseoul.net/attractions/%EB%82%A8%EC%82%B0%EC%84%9C%EC%9A%B8%ED%83%80%EC%9B%8C%20_/36',
    tagSlugs: ['nightview', 'culture'],
  },

  {
    regionSlug: 'seoul',
    slug: 'ssamziegil-insadong',
    name: '쌈지길(인사동)',
    summary: '전통+트렌드 소품 쇼핑, 혼자 구경하기 좋은 복합 공간',
    description: `쌈지길은 인사동 중심에 위치한 4층짜리 복합 쇼핑 공간으로, 나선형으로 이어지는 통로를 따라 오르내리며 다양한 공예품과 소품, 작가 굿즈를 구경할 수 있는 곳이에요.

각 층마다 테마가 달라 1층은 체험공방과 작은 갤러리, 2층은 수공예·전통 소품, 3층은 의류와 디자인 제품, 4층은 하늘정원과 북카페로 구성돼 있어 혼자 둘러보며 새로운 발견을 할 수 있어요.

건물 외관과 내부에는 예술 작품이 곳곳에 배치돼 있어 사진 찍기에도 좋고, 인사동 특유의 전통과 현대가 섞인 분위기를 느낄 수 있어요. 익선동·북촌한옥마을·청계천 등과 가까워 동선 짜기 편합니다.`,
    honyeoTip: `• 오전 10시 30분부터 문을 열어 이른 시간에 방문하면 한적하게 둘러볼 수 있어요.
• 통로를 따라 천천히 걷다가 마음에 드는 공방이나 카페에 들러 체험을 해보고, 옥상정원에서 잠시 쉬어가는 것도 추천해요.
• 인사동 메인 거리와 이어져 있으니 익선동이나 북촌으로 이어지는 코스를 계획해 보세요.`,
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['seoul']['ssamziegil-insadong'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-라이브스튜디오',
    address: '서울특별시 종로구 인사동길 44',
    lat: 37.5742647725946,
    lng: 126.984876575201,
    externalUrl:
      'https://korean.visitseoul.net/shopping/%EC%8C%88%EC%A7%80%EA%B8%B8_/37934',
    tagSlugs: ['shopping', 'culture', 'emotional'],
  },

  {
    regionSlug: 'seoul',
    slug: 'ikseon-dong-hanok-village',
    name: '익선동 한옥거리',
    summary: '한옥 감성 카페·맛집 밀집, 혼자 가도 어색하지 않은 골목',
    description: `익선동 한옥거리는 오래된 한옥과 현대적인 상점이 뒤섞여 있는 골목으로, 좁은 길에 전신주와 전선이 얽혀 있는 모습부터 트렌디한 카페와 편집숍까지 다양한 풍경이 공존해요.

일부 한옥은 오래돼 비닐막을 덧대거나 보수 중이지만 다른 집들은 리모델링되어 갤러리나 맛집으로 변신했어요. 좁은 골목을 따라 혼자 걸으며 숨은 카페를 찾고 사진을 찍다 보면 시간이 금방 지나가요.

주민들이 실제로 거주하는 집도 있으니 조용히 걷는 배려가 필요합니다.`,
    honyeoTip: `• 주말에는 많은 사람이 몰리니 평일 낮이나 오픈 시간대에 방문하면 좁은 골목길을 여유롭게 걸을 수 있어요.
• 한옥 카페에서 차 한 잔 마시거나 편집숍에서 소품을 구경해 보세요.
• 종로3가역과 인사동, 쌈지길과 가까우니 함께 동선을 짜면 좋습니다.`,
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['seoul']['ikseon-dong-hanok-village'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-정규진',
    address: '서울특별시 종로구 돈화문로11가길 17',
    lat: 37.5733907062616,
    lng: 126.990919055365,
    externalUrl:
      'https://korean.visitseoul.net/area/%EC%9D%B5%EC%84%A0%EB%8F%99%ED%95%9C%EC%98%A5%EA%B1%B0%EB%A6%AC/KOP037008',
    tagSlugs: ['cafe', 'emotional', 'walking', 'culture'],
  },

  {
    regionSlug: 'seoul',
    slug: 'gwangjang-market',
    name: '광장시장',
    summary: '혼밥 난이도 낮은 시장 먹거리 성지',
    description: `광장시장은 100년이 넘는 역사를 가진 재래시장으로, 빈대떡과 육회, ‘마약김밥’ 등이 대표 먹거리예요.

새로 단장한 순희네 빈대떡 같은 인기 점포에는 외국인 관광객도 많아 종일 북적이지만, 노릇하게 부쳐져 기름냄새가 풍기는 빈대떡과 소고기완자, 매콤한 육회는 기다림의 가치가 있어요.

시장 통로에는 포장과 테이블 주문을 구분해 운영하는 곳이 많아 혼자서도 자리에 앉아 먹을 수 있고, 마약김밥은 포장해 다른 곳에서 먹기 좋습니다. 시장은 실내라 비 오는 날에도 둘러보기 좋고, 먹거리를 탐방하는 재미가 큰 곳이에요.`,
    honyeoTip: `• 점심 피크 전에 방문하면 줄이 짧고 자리도 잡기 쉬워요.
• 빈대떡과 육회, 마약김밥을 하나씩 먹어보면 시장의 대표 맛을 경험할 수 있어요.
• 현금결제를 준비하면 빠르게 주문할 수 있습니다.
• 반찬과 막걸리도 준비되어 있으니 느긋하게 천천히 맛보세요.`,
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['seoul']['gwangjang-market'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-IR스튜디오',
    address: '서울특별시 종로구 창경궁로 88',
    lat: 37.5701196320637,
    lng: 126.999798964693,
    externalUrl:
      'https://korean.visitseoul.net/shopping-list/%EA%B4%91%EC%9E%A5%EC%8B%9C%EC%9E%A5_/287',
    tagSlugs: ['solo-eating', 'culture', 'shopping'],
  },

  {
    regionSlug: 'seoul',
    slug: 'mangwon-market',
    name: '망원시장',
    summary: '로컬 감성 시장 먹거리, 혼자 간식 투어하기 좋음',
    description: `망원시장은 지역 주민들이 즐겨 찾는 로컬 시장으로, 광장시장보다 가격이 저렴하고 시장 규모가 아담해 한 바퀴 돌며 간식과 반찬을 고르기 좋아요.

칼국수 수제비 전문점 ‘홍덕이 손칼국수’에서는 3,500원 정도에 걸쭉하고 고소한 칼국수를 맛볼 수 있고, 닭강정·도넛·잡채호떡 등 간식 가게가 줄지어 있어 먹으면서 구경하는 재미가 있어요.

시장 골목은 다소 좁지만 상인들이 친절하고 관광객보다 동네 주민이 많아 정감이 넘쳐 혼자 걸어도 불편함이 적습니다.`,
    honyeoTip: `• 점심시간 전에 방문하면 칼국수집 대기가 짧고, 갓 튀긴 간식을 바로 맛볼 수 있어요.
• 시장을 둘러본 후에는 망원한강공원이나 연남동으로 이어서 산책하면 하루 일정이 자연스럽게 이어져요.
• 현금과 작은 가방을 준비해 편하게 쇼핑하세요.`,
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['seoul']['mangwon-market'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-니오타니 스튜디오',
    address: '서울특별시 마포구 포은로6길 27',
    lat: 37.5560222529246,
    lng: 126.906451891223,
    externalUrl:
      'https://korean.visitseoul.net/shopping/%EB%A7%9D%EC%9B%90%EC%8B%9C%EC%9E%A5/KOP037950',
    tagSlugs: ['solo-eating', 'culture', 'shopping'],
  },

  {
    regionSlug: 'seoul',
    slug: 'ddp',
    name: '동대문디자인플라자(DDP)',
    summary: '전시·야간 산책·포토스팟까지 한 번에 즐기는 디자인 랜드마크',
    description: `동대문디자인플라자(DDP)는 건축가 자하 하디드가 설계한 유려한 곡선의 건물로, 전시관·디자인 마켓·도서관 등 다양한 공간이 모인 복합 문화시설이에요.

낮에는 전시와 팝업스토어, 디자인 제품을 구경할 수 있고, 밤이 되면 외관과 LED 장미정원이 불을 밝혀 산책과 사진을 즐기기에 좋아요.

내부 전시장은 주제별로 수시로 바뀌어 언제 가도 새로운 콘텐츠를 만날 수 있고, 실내와 야외 공간이 연결되어 혼자 돌아다니기 편리합니다. 지하철 동대문역사문화공원역과 바로 연결돼 접근성이 좋습니다.`,
    honyeoTip: `• 평일 오후나 저녁에 방문하면 사람이 적어 전시를 여유롭게 관람할 수 있어요.
• 방문 전 홈페이지에서 전시 일정과 운영 시간을 확인하세요.
• 야간에는 LED 장미정원과 주변 조명 아래에서 사진을 찍어보세요.
• DDP에서 나와서는 을지로와 청계천을 따라 산책하며 하루를 마무리하기 좋습니다.`,
    category: SpotCategory.ETC,
    imageUrl: imageMap.spots['seoul']['ddp'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-Liu Lu',
    isRecommended: true,
    address: '서울특별시 중구 을지로 281',
    lat: 37.5680445876689,
    lng: 127.010890355484,
    externalUrl: 'https://ddp.or.kr/?menuno=235',
    tagSlugs: ['culture', 'emotional', 'oneday', 'shopping'],
  },

  {
    regionSlug: 'seoul',
    slug: 'haneul-park',
    name: '하늘공원',
    summary: '노을·억새·야경까지, 혼자도 만족도 높은 월드컵공원 명소',
    description: `하늘공원은 월드컵공원 내 언덕 위에 조성된 전망공원으로, 억새밭과 풍력발전기가 있는 넓은 잔디 언덕이에요.

입구에서 정상까지 계단과 경사로가 이어지는데, 전기차(맹꽁이 전기차)를 타고 올라갈 수도 있고 한 방향은 2,000원, 왕복은 3,000원이에요.

정상에 오르면 탁 트인 전망대와 통나무 데크를 따라 걸으며 노을과 서울 시내 야경을 감상할 수 있고, 가을에는 억새가 바람에 흔들리는 모습이 특히 아름다워요. 공원 안에는 매점이나 자판기가 없고 입구 부근에만 작은 매점이 있어 미리 음료와 간식을 준비해야 해요.`,
    honyeoTip: `• 노을이 지기 40~60분 전에 도착해 천천히 올라가면 하늘색이 변하는 과정을 여유롭게 볼 수 있어요.
• 걷기 힘들다면 왕복 전기차를 이용하는 것도 좋습니다.
• 정상은 바람이 강해 겉옷을 챙기는 것이 필수입니다.
• 산책 후에는 월드컵경기장이나 망원한강공원으로 내려가 하루 일정을 마무리해 보세요.`,
    category: SpotCategory.NATURE,
    imageUrl: imageMap.spots['seoul']['haneul-park'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-라이브스튜디오',
    isRecommended: true,
    address: '서울특별시 마포구 하늘공원로 95',
    lat: 37.5690794796181,
    lng: 126.886318397942,
    externalUrl:
      'https://korean.visitseoul.net/area/%ED%95%98%EB%8A%98%EA%B3%B5%EC%9B%90/KOP003830',
    tagSlugs: ['nightview', 'walking', 'healing', 'nature'],
  },

  {
    regionSlug: 'seoul',
    slug: 'mmca-seoul',
    name: '국립현대미술관 서울',
    summary: '삼청동 전시·필름·굿즈까지, 혼자 보내기 좋은 문화 코스',
    description: `국립현대미술관 서울관은 삼청동에 자리한 현대미술관으로, 모던한 건축과 넓은 로비, 전시실 사이에 휴식 공간이 마련되어 있어 혼자 천천히 둘러보기 좋아요.

1층에 디지털 정보 안내판과 사물함이 있고, 야외에는 조각 정원이 있어 전시를 잠시 쉬며 밖에서 바람을 쐴 수 있어요.

저녁 6시 이후에는 무료 입장이 가능해 퇴근 후 들르기에도 부담이 없으며, 전시뿐 아니라 영상·다원 예술 프로그램도 열려 체류 시간이 길어질 수 있습니다. 미술관 밖으로 나가면 삼청동길과 북촌, 경복궁과 이어져 하루 코스를 짜기 편해요.`,
    honyeoTip: `• 무료 입장이 시작되는 야간개장 시간(요일별 상이)을 노려 조용히 관람하는 것이 좋아요.
• 전시마다 예약 방식이 다를 수 있으니 사전에 홈페이지에서 확인하세요.
• 관람 후 삼청동 골목길을 산책하거나 북촌·서촌 카페에서 휴식하면 하루가 알차요.`,
    category: SpotCategory.ACTIVITY,
    imageUrl: imageMap.spots['seoul']['mmca-seoul'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사',
    isRecommended: true,
    address: '서울특별시 종로구 삼청로 30',
    lat: 37.5787436166877,
    lng: 126.980032718285,
    externalUrl: 'https://www.mmca.go.kr/visitingInfo/seoulInfo.do',
    tagSlugs: ['culture', 'thinking', 'walking', 'oneday'],
  },

  // 2) FOOD

  {
    regionSlug: 'seoul',
    slug: 'mibundang-seongsu',
    name: '미분당 성수점',
    summary: '1인석 중심 쌀국수, 혼밥 난이도 낮은 성수 맛집',
    description: `미분당 성수점은 바 테이블과 1인석 위주로 구성된 쌀국수 전문점이에요.

15석 내외의 긴 테이블에 앉으면 오픈 키친이 한눈에 보이고, 기본 세트를 주문하면 담백한 국물에 숯불향이 나는 고기와 고명, 채소가 든든하게 나와요.

자리마다 고추·새콤한 소스·피쉬소스 같은 양념이 놓여 있고 국물·면·야채 리필이 가능해 혼자라도 배부르게 먹을 수 있습니다. 셀프 주문 키오스크로 주문하며 매장이 조용해 대화를 크게 하는 분위기가 아니라 혼밥하기 편안해요. 성수동 카페거리와 서울숲에서 도보로 가까워 코스 짜기 좋습니다.`,
    honyeoTip: `• 오픈 직후나 점심 피크가 지난 2시 이후에 방문하면 대기 없이 바로 앉을 수 있어요.
• 바 좌석에 앉아 조용히 식사하고, 원하는 만큼 면이나 국물을 리필해 보세요.
• 식사 후에는 성수동 카페나 서울숲으로 이동해 산책하면 하루 루트가 자연스럽습니다.`,
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '서울특별시 성동구 성수일로10길 26',
    lat: 37.5465865067207,
    lng: 127.052952183671,
    externalUrl: 'https://place.map.kakao.com/1372288632',
    tagSlugs: ['solo-eating', 'oneday', 'healing', 'walking'],
  },

  {
    regionSlug: 'seoul',
    slug: 'kaden-yeonhui',
    name: '카덴(우동카덴) 연희점',
    summary: '연희동 우동·덴푸라, 혼자도 편한 깔끔한 일식',
    description: `카덴 연희점은 연희동에서 인기 있는 우동집으로, 차가운 부카게우동부터 가마타마버터우동까지 다양한 메뉴가 있어 우동을 좋아하는 사람에게 좋은 곳이에요.

가마타마버터우동은 뜨거운 우동 위에 버터와 계란노른자를 얹어 비벼 먹는 메뉴로 양이 넉넉해 한 끼 식사로 충분해요.

매장은 깔끔하고 좌석이 넓지만 점심시간에는 줄이 길어 오픈 시간에 맞춰 가거나 1시 이후에 방문하면 비교적 빠르게 들어갈 수 있어요. 튀김이나 초밥 등 곁들임 메뉴도 준비돼 있어 입맛에 따라 조합할 수 있습니다.`,
    honyeoTip: `• 혼자라면 오픈 직후 방문해 번호표를 받아 두면 대기 시간을 줄일 수 있어요.
• 메뉴가 다양하니 평소 먹어보지 못한 우동을 시도해 보거나 튀김을 추가해 보면 좋습니다.
• 식사 후에는 연희동 골목과 경의선숲길을 산책하며 소화시키세요.`,
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '서울특별시 서대문구 연희로 173 1층 101호',
    lat: 37.5724988690741,
    lng: 126.935060703737,
    externalUrl: 'https://place.map.kakao.com/1449183784',
    tagSlugs: ['solo-eating', 'healing', 'oneday', 'walking'],
  },

  {
    regionSlug: 'seoul',
    slug: 'kandasoba-hyehwa',
    name: '칸다소바 혜화점',
    summary: '대학로 라멘·마제소바, 카운터 중심으로 혼밥하기 좋은 곳',
    description: `칸다소바 혜화점은 일본식 마제소바 전문점으로, 혜화역과 대학로 공연장 사이에 위치해 공연 전후로 한 끼 해결하기 좋은 곳이에요.

메뉴는 소수의 소바와 마제소바 위주로 간결하게 구성돼 있고 주문과 결제는 선불 키오스크에서 진행해요.

매장이 크지 않아 대기줄이 생기지만 회전이 빠른 편이며, 바 좌석이 있어 혼자 앉아 먹기 편해요. 면과 소스를 비벼 먹고 취향에 따라 식초나 고추가루를 더해 맛을 조절할 수 있어요.`,
    honyeoTip: `• 브레이크타임 직후나 평일 오후에 방문하면 대기 시간이 짧아요.
• 키오스크에서 미리 메뉴를 정해 빠르게 주문하면 혼자서도 편하게 이용할 수 있어요.
• 식사 후 낙산공원이나 대학로 공연장을 이어서 즐기면 알찬 하루가 됩니다.`,
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '서울특별시 종로구 대학로 131-1',
    lat: 37.5828817598949,
    lng: 127.001362314604,
    externalUrl: 'https://place.map.kakao.com/1340493944',
    tagSlugs: ['solo-eating', 'stress-relief', 'oneday', 'walking'],
  },

  {
    regionSlug: 'seoul',
    slug: 'butanchyu-hongdae',
    name: '부탄츄 홍대본점',
    summary: '라멘 커스터마이징이 재미있는 홍대 혼밥 라멘집',
    description: `부탄츄 홍대본점은 진한 돈코츠라멘을 맛볼 수 있는 라멘집으로, 메뉴가 네 가지 정도로 간단해 주문하기 쉽고 국물 진득한 돈코츠 육수가 유명해요.

면 굵기와 삶기 정도를 선택할 수 있어 개인 취향에 맞출 수 있고, 가격도 7,000원 선으로 비교적 부담이 적습니다.

낮 11시 50분쯤이면 줄이 없지만 정오가 지나면 대기가 생기니 빨리 방문하는 것이 좋아요. 홍대입구역과 가깝고 카운터 좌석이 많아 혼자 식사하기 편해요.`,
    honyeoTip: `• 오픈 직후에 방문해 라멘을 주문하면 기다리지 않고 식사할 수 있어요.
• 면의 종류나 국물의 농도도 취향에 따라 조절할 수 있으니 직원에게 문의해 보세요.
• 식사 후에는 홍대 거리나 연남동으로 이어서 산책하며 카페를 들러보는 코스로 추천합니다.`,
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '서울특별시 마포구 와우산로35길 75 1층',
    lat: 37.5564036476463,
    lng: 126.926735502823,
    externalUrl: 'https://place.map.kakao.com/18742750',
    tagSlugs: ['solo-eating', 'oneday', 'stress-relief', 'walking'],
  },

  {
    regionSlug: 'seoul',
    slug: 'myeongdong-gyoja-sin-gwan',
    name: '명동교자 신관명동역점',
    summary: '회전 빠른 칼국수·만두, 혼자도 무난한 명동 한 끼',
    description: `명동교자 신관명동역점은 1960년대부터 이어져 온 칼국수 전문점으로, 메뉴가 칼국수·비빔국수·만두 등 몇 가지뿐이라 선택이 단순해요.

진한 닭육수에 쫄깃한 면이 어우러진 칼국수와 푸짐한 만두가 대표 메뉴이며, 한 그릇 양이 많아 혼자 먹어도 든든해요.

미쉐린 빕 구르망에도 선정된 만큼 품질이 꾸준하고 혼밥 손님도 많아 눈치 보지 않고 식사할 수 있어요. 점심·저녁에는 줄이 길지만 회전이 빨라 기다림이 길지 않고, 이른 시간에는 줄이 거의 없어요.`,
    honyeoTip: `• 혼자라면 오전 11시 전에 방문하거나 오후 2~4시 사이에 가면 대기 스트레스가 적어요.
• 칼국수와 만두를 함께 주문해도 혼자 충분히 먹을 수 있으니 배가 많이 고프면 시도해 보세요.
• 식사 후 명동 거리나 남산 타워로 이어서 걷기 좋은 위치에 있습니다.`,
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '서울특별시 중구 퇴계로 129',
    lat: 37.5611818318625,
    lng: 126.986083137331,
    externalUrl: 'https://place.map.kakao.com/1479300828',
    tagSlugs: ['solo-eating', 'oneday', 'walking', 'stress-relief'],
  },

  // 3) CAFE

  {
    regionSlug: 'seoul',
    slug: 'scene-seongsu-cafe',
    name: '씬(Seongsu) - 카페/셀렉트샵',
    summary: '성수에서 혼자 쉬기 좋은 카페 + 쇼핑 동선',
    description: `씬은 성수동의 카페이자 셀렉트숍으로, 콘크리트로 지은 널찍한 건물 안에 자체 로스터리 카페와 패션 소품이 공존하는 공간이에요.

커피는 이틀마다 직접 로스팅해 신선도를 유지하며, 매장 한 켠에는 의류·향초 같은 라이프스타일 상품이 진열돼 있어 둘러보는 재미가 있어요.

좌석은 많지 않지만 바와 창가 좌석이 마련돼 있어 혼자 커피를 마시며 시간을 보내기 좋고, 성수역과 가까워 서울숲이나 카페 거리 사이 코스에 자연스럽게 들어갑니다.`,
    honyeoTip: `• 오픈 시간에 맞춰 가면 한적하게 커피를 즐기며 상품을 구경할 수 있어요.
• 주차가 가능하니 차량 이동 시에도 편해요.
• 커피를 마신 뒤에는 근처 성수 카페 골목이나 서울숲을 산책하는 루트가 추천돼요.
• 매장이 조용한 편이니 혼자 노트북 작업을 하거나 책을 읽기에도 좋아요.`,
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '서울특별시 성동구 연무장5길 20 1층',
    lat: 37.5448924963523,
    lng: 127.053445596401,
    externalUrl: 'https://place.map.kakao.com/2130919995',
    tagSlugs: ['cafe', 'emotional', 'shopping'],
  },

  {
    regionSlug: 'seoul',
    slug: 'cafe-onion-anguk',
    name: '카페 어니언 안국',
    summary: '한옥 감성 베이커리 카페, 혼자도 사진·휴식 모두 가능한 곳',
    description: `카페 어니언 안국은 한옥을 개조한 베이커리 카페로, 기와지붕과 마당이 어우러져 전통과 현대가 공존하는 공간이에요.

입구를 들어서면 갓 구운 빵과 과자 냄새가 퍼지고, 주문 후 마당이나 실내 다다미 자리에서 신발을 벗고 앉아 여유롭게 쉴 수 있어요.

인기 있는 카페라 주말에는 대기시간이 길어 자리 잡기가 어려우며, 빵이 빠르게 품절되기도 해 이른 시간 방문이 좋습니다. 북촌·인사동·경복궁과 가까워 산책길 사이에 들르기 좋아요.`,
    honyeoTip: `• 오픈 시간에 맞춰 가면 빵 종류가 가장 다양하고 자리를 쉽게 잡을 수 있어요.
• 한옥 마당에서 차와 빵을 먹으며 휴식을 취한 뒤, 익선동이나 북촌 골목을 이어 걸어보세요.
• 실내 다다미 자리에서는 신발을 벗어야 하니 양말 상태를 미리 체크하세요.`,
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '서울특별시 종로구 계동길 5',
    lat: 37.5773990614114,
    lng: 126.986348419217,
    externalUrl: 'https://place.map.kakao.com/853028118',
    tagSlugs: ['cafe', 'emotional', 'walking', 'culture'],
  },

  {
    regionSlug: 'seoul',
    slug: 'blue-bottle-seongsu',
    name: '블루보틀 성수 카페',
    summary: '성수 대표 스페셜티 카페, 혼자 커피 마시기 좋은 안정적인 분위기',
    description: `블루보틀 성수 카페는 공장을 개조한 듯한 높은 천장과 여러 층으로 이루어진 공간이 인상적인 스페셜티 커피숍이에요.

로스터리를 겸하고 있어 커피 원두를 직접 볶는 모습을 볼 수 있고, 바 좌석과 테이블 좌석이 다양해 혼자 앉기에도 편해요.

주문은 카운터에서 하고 이름을 불러주면 음료를 받아 가는 방식이며, 커피의 향미가 살아있어 많은 사람들이 방문해요. 늦은 오후에는 대기가 길어질 수 있으니 시간 선택이 중요합니다.`,
    honyeoTip: `• 평일 오전이나 이른 오후에 방문하면 줄이 짧고 자리 선택이 자유로워요.
• 시즌 한정 음료나 싱글 오리진 커피를 시도해 보세요.
• 2층이나 3층에서 로스팅 과정을 내려다보며 커피를 즐기는 것도 좋습니다.
• 커피를 마신 뒤에는 서울숲이나 성수동 편집숍을 둘러보는 코스를 추천합니다.`,
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '서울특별시 성동구 아차산로 7',
    lat: 37.5481060299191,
    lng: 127.045641393072,
    externalUrl: 'https://place.map.kakao.com/1492599844',
    tagSlugs: ['cafe', 'healing', 'stress-relief', 'walking'],
  },

  {
    regionSlug: 'seoul',
    slug: 'cafe-layered-yeonnam',
    name: '카페 레이어드 연남',
    summary: '유럽 감성 베이커리 카페, 혼자 디저트 타임 즐기기 좋은 곳',
    description: `카페 레이어드 연남은 영국식 감성을 담은 베이커리 카페로, 실내에는 영국 국기와 고전 소품이 가득하고 외관은 하얀 유럽풍 건물이에요.

스콘과 케이크, 파운드 등 디저트 종류가 다양해 진열대를 구경하는 재미가 있고, 레몬허니티 같은 음료도 인기예요.

1층은 주문대와 작은 좌석, 2층은 반쯤 개방된 테라스로 자리 수가 넉넉해 혼자 앉아 디저트를 즐기기 좋습니다. 연남동 메인거리와 가까워 경의선숲길 산책 중 들르기 좋습니다.`,
    honyeoTip: `• 평일 낮이나 오후 5시 전후에 가면 비교적 한적하게 좌석을 잡을 수 있어요.
• 2층 테라스 자리를 노려 여유롭게 디저트를 즐겨보세요.
• 디저트가 인기라 오후 늦게 가면 품절되는 메뉴가 있을 수 있으니 주의하세요.`,
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '서울특별시 마포구 성미산로 161-4',
    lat: 37.5649902551936,
    lng: 126.924197234558,
    externalUrl: 'https://place.map.kakao.com/502958473',
    tagSlugs: ['cafe', 'emotional', 'walking', 'stress-relief'],
  },

  {
    regionSlug: 'seoul',
    slug: 'terarosa-gwanghwamun',
    name: '테라로사 광화문점',
    summary: '책장 같은 공간감, 혼자 노트북·독서하기 좋은 광화문 카페',
    description: `테라로사 광화문점은 높은 천장과 책장 같은 인테리어가 특징인 대형 카페로, 광화문역 인근 빌딩에 자리해 있어요.

넓은 테이블과 소파 섹션이 있어 혼자 노트북 작업이나 독서를 하기 좋고, 직접 로스팅한 품질 좋은 커피를 맛볼 수 있습니다.

벽면에는 예술 서적과 그림이 전시돼 있어 카페 안에서도 문화적인 분위기를 느낄 수 있으며, 근처 청계천이나 경복궁까지 이어서 산책하기 좋은 위치입니다.`,
    honyeoTip: `• 혼자 집중하고 싶다면 평일 오전이나 오후 3~5시 사이에 방문해보세요.
• 커피와 함께 간단한 샌드위치를 곁들이며 독서하기 좋습니다.
• 여유 있게 머물 수 있는 공간이므로 시간에 쫓기지 않는 방문을 추천해요.`,
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '서울특별시 종로구 종로1길 50 더케이트윈타워 B동 1층',
    lat: 37.5747244659804,
    lng: 126.979022440109,
    externalUrl: 'https://place.map.kakao.com/24725284',
    tagSlugs: ['cafe', 'thinking', 'stress-relief', 'oneday'],
  },

  // 4) DRINK

  {
    regionSlug: 'seoul',
    slug: 'bar-cham',
    name: '바 참(Bar Cham)',
    summary: '서촌 한옥 칵테일 바, 혼술하기 좋은 카운터 중심 분위기',
    description: `바 참은 서촌 한옥을 개조한 칵테일 바로, 한국 재료를 활용한 창의적인 칵테일을 선보여 아시아 최고 칵테일 바 리스트에 오르는 등 평가가 높아요.

작은 마당과 바테이블이 있는 아늑한 공간이라 혼자 앉아도 부담이 없고, 바텐더들이 재료와 제작 과정에 대해 친절하게 설명해 줘 대화를 나누며 술을 즐길 수 있습니다.

인기 시간이면 예약이 빨리 차니 사전 예약이나 월초 예약 오픈에 맞춰 계획하는 것이 좋아요.`,
    honyeoTip: `• 평일 이른 저녁에 방문하면 한적하게 바텐더와 대화를 나누며 칵테일을 즐길 수 있어요.
• 예약이 필수인 날이 많으니 한 달 전 예약 오픈 시기를 미리 확인하세요.
• 귀가 동선을 미리 정하고 한두 잔 정도로 적당히 즐기는 것을 추천해요.`,
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '서울특별시 종로구 자하문로7길 34',
    lat: 37.5791708240401,
    lng: 126.970384685143,
    externalUrl: 'https://place.map.kakao.com/939585270',
    tagSlugs: ['solo-drinking', 'emotional', 'nightview', 'thinking'],
  },

  {
    regionSlug: 'seoul',
    slug: 'le-chamber',
    name: '르챔버(Le Chamber)',
    summary: '비밀문 콘셉트의 클래식 칵테일 바, 혼자 앉기 좋은 바 좌석',
    description: `르챔버는 청담동에 위치한 클래식한 스피크이지 바로, 피아노 재즈와 크리스털 샹들리에, 가죽 소파가 어울려 오페라 하우스 같은 분위기를 연출해요.

비밀문을 지나 내려가는 계단부터 특별한 경험을 제공하며, 상을 받은 바텐더들이 위스키를 베이스로 한 창의적인 칵테일을 선보입니다.

고급스러운 인테리어 덕분에 혼자 바 좌석에 앉아도 멋스러운 시간을 보낼 수 있습니다.`,
    honyeoTip: `• 평일 이른 시간이나 예약제로 입장하면 대기 없이 앉을 수 있어요.
• 바텐더에게 선호하는 베이스를 말해 나만의 칵테일을 추천받아 보세요.
• 분위기를 고려해 깔끔한 복장을 추천하며, 귀가 교통편을 미리 체크하세요.`,
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '서울특별시 강남구 도산대로55길 42 지하 1층',
    lat: 37.526255545851,
    lng: 127.041127909578,
    externalUrl: 'https://place.map.kakao.com/25689487',
    tagSlugs: ['solo-drinking', 'emotional', 'thinking', 'nightview'],
  },

  {
    regionSlug: 'seoul',
    slug: 'alice-cheongdam',
    name: '앨리스(Alice Cheongdam)',
    summary: '청담 대표 칵테일 바, 혼술도 가능한 바테이블 중심',
    description: `앨리스 청담은 꽃집을 연상시키는 입구 뒤에 숨은 칵테일 바로, ‘이상한 나라의 앨리스’를 테마로 한 공간이에요.

영국식 저택을 연상시키는 실내에서 스윙 재즈가 흐르고, 직원들이 퍼포먼스를 곁들인 창의적인 칵테일을 선보여요.

음료마다 다른 스토리가 담겨 있어 메뉴를 고르는 재미가 있으며, 바와 테이블 좌석이 나뉘어 있어 혼자 술 한 잔 즐기기에도 적당합니다.`,
    honyeoTip: `• 숨겨진 입구를 찾는 재미가 있으니 방문 전 약도를 꼭 확인하세요.
• 평일 저녁이나 오픈 직후에 가면 여유롭게 분위기를 즐길 수 있어요.
• 직원에게 취향을 이야기해 어울리는 스토리의 칵테일을 추천받아 보세요.
• 과한 음주는 피하며 1~2잔 정도 가볍게 즐기는 것을 추천해요.`,
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '서울특별시 강남구 도산대로55길 47 지하 1층',
    lat: 37.5266775490869,
    lng: 127.040943739564,
    externalUrl: 'https://place.map.kakao.com/26857068',
    tagSlugs: ['solo-drinking', 'emotional', 'stress-relief', 'nightview'],
  },

  {
    regionSlug: 'seoul',
    slug: 'southside-parlor',
    name: '사우스사이드 팔러(Southside Parlor)',
    summary: '이태원 크래프트 칵테일, 혼자도 편한 바 분위기',
    description: `사우스사이드 팔러는 이태원 녹사평역 근처에 자리한 텍사스 스타일의 칵테일 바로, 남부 미국에서 영감을 받은 칵테일과 텍스멕스 요리를 함께 즐길 수 있어요.

바 내부는 캐주얼하고 널찍하며, 루프탑 공간이 있어 날씨 좋은 날에는 야외에서 서울의 풍경을 보며 술을 즐기기 좋아요.

창의적인 칵테일과 따뜻한 서비스 덕분에 혼자 방문해도 금세 편안함을 느낄 수 있는 곳입니다.`,
    honyeoTip: `• 초저녁 시간대에 방문해 식사와 칵테일을 함께 즐기면 붐비지 않아 좋아요.
• 루프탑 이용 시 날씨를 확인하고 따뜻한 옷을 준비하세요.
• 남산 순환버스 정류장이 가까워 일정 마무리 동선을 짜기 편리합니다.`,
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '서울특별시 용산구 녹사평대로 218 1층, 4층',
    lat: 37.5371226680306,
    lng: 126.987065867141,
    externalUrl: 'https://place.map.kakao.com/26972066?openhour=1',
    tagSlugs: ['solo-drinking', 'stress-relief', 'nightview', 'emotional'],
  },
];
