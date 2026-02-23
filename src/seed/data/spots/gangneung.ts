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
      '안목항 옆에 길게 이어진 커피거리는 해변과 맞붙어 있어서 산책로를 따라 걷다가 아무 카페에 들어가 커피를 마시기 좋은 구성이에요. 바람이 잔잔한 날이면 바다를 바라보며 벤치에 앉아 한참 머무를 수 있고, 비가 오거나 더울 때는 카페 안에서도 큰 창을 통해 파도를 볼 수 있어요. 독립 카페가 많아서 여러 맛과 분위기를 비교하는 재미가 있고, 해 질 무렵에는 노을이 바다를 붉게 물들여 사진 찍기 좋은 풍경이 펼쳐져요. 관광객이 몰리는 주말에는 동선이 복잡하지만 평일에는 혼자 사진을 찍거나 산책하기에도 여유로워요.',
    honyeoTip:
      '주말에는 대기 시간이 길어질 수 있으니 평일 오전이나 노을 직전 시간이 한적해요. 카페가 많아서 메뉴를 고르기 어렵다면 향이 강한 로스팅을 하는 로스터리를 먼저 들러보고, 포장해서 바닷가에 앉아 마시면 더 느긋해요. 길이 길지 않으니 천천히 걷다가 마음에 드는 카페가 나오면 바로 들어가는 게 효율적이에요.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['gangneung']['anmok-beach-coffee-street'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-디엔에이스튜디오',
    address: '강원특별자치도 강릉시 창해로14번길 20-1',
    lat: 37.7726047009298,
    lng: 128.947338719945,
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=2f41c020-ad89-4e76-b3fe-9fb1b0a26015',
    tagSlugs: ['sea', 'cafe', 'walking', 'emotional'],
  },

  {
    regionSlug: 'gangneung',
    slug: 'gangmun-beach',
    name: '강문해변',
    summary: '경포 옆 조용한 바다 산책, 혼자 바다멍하기 딱 좋은 곳',
    description:
      '강문해변은 경포대에서 조금 떨어진 곳에 자리해 있어서 크게 붐비지 않는 해변이에요. 백사장이 깔끔하고 주변에 높은 건물이 없어서 하늘과 바다가 맞닿은 풍경을 넓게 볼 수 있고, 연인보다 혼자나 소수로 산책하는 사람들을 많이 볼 수 있어요. 강문항까지 이어지는 해안 길을 따라 걸으면 어선과 작은 포구를 구경하며 소소한 즐거움을 느낄 수 있고, 바람이 세게 부는 날에는 모래바람이 치니 겉옷과 모자를 챙기면 좋아요. 노을이 질 때는 붉은 하늘이 바다와 어우러져 사진을 찍기 좋지만 여름철에는 해가 길어서 시간 조절이 필요해요.',
    honyeoTip:
      '경포호수와 경포해변을 둘러보고 강문해변까지 이어서 걷는 반나절 코스를 추천해요. 주변 카페나 작은 횟집에서 쉬어 갈 수 있으니 시간에 쫓기지 말고 여유 있게 움직이는 게 좋아요. 일몰 뒤에는 기온이 떨어지니 가벼운 겉옷을 챙겨야 바다를 오래 바라볼 수 있어요.',
    category: SpotCategory.NATURE,
    imageUrl: imageMap.spots['gangneung']['gangmun-beach'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-IR스튜디오',
    isRecommended: true,
    address: '강원특별자치도 강릉시 강문동 182-1',
    lat: 37.7949958910245,
    lng: 128.918355297872,
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
      '경포해수욕장은 백사장이 넓어서 성수기에도 비교적 여유가 있는 해변이에요. 소나무 숲이 해안선을 따라 이어져서 시원한 그늘을 제공하고, 나무 데크길이 마련되어 있어서 맨발로 걷지 않아도 바다를 가까이에서 즐길 수 있어요. 해변 뒤에는 호수와 카페, 숙박 시설이 밀집해 있어서 “해변→호수→카페”로 일정을 이어가기에 적합하고, 바다를 바라보며 멍하니 시간을 보내는 사람들을 많이 볼 수 있어요. 겨울에는 바람이 차가워 체감 온도가 낮으니 겉옷을 챙기는 게 좋고, 여름에는 밤에도 해변이 불빛으로 밝아서 혼자 산책하기에도 안전해요.',
    honyeoTip:
      '일출과 일몰이 모두 아름다워서 시간을 맞춰 방문하면 특별한 경험이에요. 해변 곳곳에 설치된 느린 우체통에 편지를 넣으면 1년 뒤에 받을 수 있으니 여행의 추억을 남기기 좋아요. 늦은 오후에는 바람이 쌀쌀해지니 챙겨온 옷을 걸치고 산책을 마무리하면 좋아요.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['gangneung']['gyeongpo-beach'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-IR스튜디오',
    address: '강원특별자치도 강릉시 경포로 393',
    lat: 37.797962643453,
    lng: 128.897388996854,
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
      '강릉중앙시장은 300여 개의 상점과 포장마차가 모여 있는 전통시장으로, 간단히 서서 먹을 수 있는 분식과 해산물 구이, 핫도그 등이 다양해서 혼자도 부담 없이 맛보기 좋아요. 시장 안쪽은 골목이 좁지만 한 바퀴 돌면서 구경하고 필요한 먹거리를 골라서 먹는 재미가 있어요. 금요일과 토요일 밤에는 야시장이 열려서 버스킹과 각종 간식 판매로 활기가 더해져요. 늦은 오후부터 저녁까지는 방문객이 많아 걷기 불편할 수 있지만 평일 낮에는 한적하게 둘러볼 수 있고, 시장 근처 월화거리와 연결하기 쉬워 반나절 코스로도 무리가 없어요.',
    honyeoTip:
      '현금을 조금 준비하면 카드 결제가 어려운 포장마차를 이용하기 편해요. 야시장 분위기를 느끼고 싶다면 주말 저녁에 방문하되, 사람에 치이는 게 싫다면 평일 오후에 가볍게 둘러보는 것도 좋아요. 시장에서 간식으로 배를 채운 뒤 월화거리나 카페로 이동하면 동선이 자연스럽게 이어져요.',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['gangneung']['gangneung-jungang-market'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-김지호',
    address: '강원특별자치도 강릉시 금성로 21(성남동)',
    lat: 37.7540166632039,
    lng: 128.898611774099,
    externalUrl: 'https://www.gn.go.kr/www/contents.do?key=568',
    tagSlugs: ['shopping', 'culture', 'solo-eating', 'oneday'],
  },

  {
    regionSlug: 'gangneung',
    slug: 'wolhwa-street',
    name: '강릉 월화거리',
    summary: '도심 감성 산책 코스, 혼자 걷고 사진 남기기 좋은 거리',
    description:
      '월화거리는 중앙시장 근처에 조성된 짧은 골목 산책로로, 가게 간판과 벽화, 작은 소품점들이 늘어서 있어서 천천히 걷기 좋아요. 거리가 길지 않아서 부담 없이 둘러볼 수 있고, 한복집과 찻집, 디저트 가게 등이 있어서 중간중간 들어가 쉬기도 좋아요. 야간에는 조명이 들어와 아기자기한 분위기가 연출되고 사람도 크게 붐비지 않아서 사진을 찍기 쉬워요. 시장과 연결되는 위치라 “시장→월화거리→카페” 순으로 움직이면 혼자서도 심심하지 않은 도심 산책 코스가 완성돼요.',
    honyeoTip:
      '시장에서 간단히 먹은 뒤 월화거리로 이어가면 소화도 되고 볼거리가 끊기지 않아요. 골목이 짧아서 금세 끝나지만 근처에 숨은 카페가 많으니 지도 앱으로 미리 위치를 확인해 두면 시간을 아낄 수 있어요. 야간 조명 아래 걷고 싶다면 해가 진 후에 들르는 것도 좋아요.',
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['gangneung']['wolhwa-street'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-김지호',
    address: '강원특별자치도 강릉시 금성로11번길 9',
    lat: 37.7541430107866,
    lng: 128.899737573024,
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
      '오죽헌은 율곡 이이와 신사임당이 태어난 집을 중심으로 꾸며진 유적지로, 검은 대나무와 돌담, 한옥이 어우러져 단정한 분위기예요. 동선이 크게 복잡하지 않아서 혼자 방문해도 어디로 가야 할지 고민이 없고, 정원 곳곳에 쉼터가 있어서 잠시 앉아 주변을 바라보며 생각을 정리하기 좋아요. 기와 지붕과 전통 가옥을 배경으로 사진을 찍을 수 있고, 전시관에서는 조선 시대 유물과 유학자들의 삶을 엿볼 수 있어요. 경포나 초당 라인과 멀지 않아서 하루 일정으로 묶기에도 무리가 없어요.',
    honyeoTip:
      '관람객이 적은 오전에 방문하면 한옥의 고즈넉함을 더 잘 느낄 수 있어요. 입구에서 전시관 안내도를 받아 동선을 파악하면 시간 효율이 높고, 여름에는 나무 그늘이 많아서 더위를 피하기 좋아요. 관람 후에는 경포해변이나 초당 순두부 거리로 이동해 다음 일정을 이어가면 자연스러워요.',
    category: SpotCategory.ACTIVITY,
    imageUrl: imageMap.spots['gangneung']['ojukheon'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-마이픽쳐스',
    isRecommended: true,
    address: '강원특별자치도 강릉시 죽헌동 201',
    lat: 37.7794451652944,
    lng: 128.877291857064,
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
      '아르떼뮤지엄 강릉은 어두운 공간에 대형 스크린과 빛, 사운드가 어우러진 미디어아트 전시라서 혼자 방문해도 현장감이 커서 심심하지 않아요. 전시는 테마별로 구획이 나뉘어 있어서 동선이 명확하고, 벤치나 바닥에 앉아 영상과 음악에 빠져 시간을 보내는 관람객도 많아요. 실내라 날씨 영향이 없어서 비가 오거나 더운 날에도 편하고, 곳곳이 포토존이라 삼각대를 가져가면 혼자서도 사진을 남기기 쉬워요. 경포·초당 지역과 가까워서 식사나 카페와 연계한 일정이 잘 어울려요.',
    honyeoTip:
      '오픈 직후나 마감 전 시간대에는 관람객이 적어서 몰입도가 높아요. 조명이 어두우니 계단이나 단차에 주의해야 하고, 사진 촬영할 때는 다른 관람객의 시야를 방해하지 않게 배려하는 게 좋아요. 관람 시간이 의외로 길어질 수 있으니 다음 일정에 여유를 두는 게 좋아요.',
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['gangneung']['arte-museum-gangneung'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사',
    address: '강원특별자치도 강릉시 난설헌로 131 (초당동)',
    lat: 37.7899348141594,
    lng: 128.907951936811,
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
      '하슬라아트월드는 실내 전시관과 야외 조각공원이 함께 있는 복합 예술 공간이라서 바다를 내려다보며 산책하는 재미와 작품 감상의 즐거움을 동시에 느낄 수 있어요. 내부 전시는 미디어아트와 현대미술이 어우러져서 어두운 공간과 밝은 공간을 번갈아 지나며 몰입이 이어져요. 야외에서는 큰 조각물과 바다 풍경을 배경으로 사진을 찍는 사람이 많고, 동선이 넓어서 혼자 걷기에도 충분하지만 시간 여유는 꼭 필요해요. 바람이 센 날에는 모자를 잡고 걷거나 머플러를 챙기는 게 좋고, 정동진역과 가깝게 묶어서 “바다+아트” 코스로 보내기 좋아요.',
    honyeoTip:
      '야외 조각공원은 해가 뜨거운 시간엔 걷기 힘들 수 있어서 오전이나 해질 무렵에 돌아보는 게 좋아요. 날씨가 좋지 않으면 바람이 강하고 우천 시 일부 구역이 미끄러울 수 있으니 운동화를 신는 게 안전해요. 전시관에 들어가기 전에 안내데스크에서 지도와 운영 정보를 확인하면 동선 계획이 더 수월해요.',
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['gangneung']['haslla-art-world'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-김효서',
    address: '강원특별자치도 강릉시 강동면 율곡로 1441',
    lat: 37.7054583826871,
    lng: 129.007843904557,
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=a7b1a83b-e8c8-4c35-926d-46b0d946533e',
    tagSlugs: ['culture', 'emotional', 'activity', 'sea'],
  },

  {
    regionSlug: 'gangneung',
    slug: 'anbandegi',
    name: '안반데기',
    summary:
      '고지대 풍경과 하늘, 혼자 ‘사진+리프레시’ 하기 좋은 강릉 대표 포토스팟',
    description:
      '안반데기는 해발 1,000m 안팎에 위치한 고랭지 채소밭으로, 넓게 펼쳐진 산지와 드넓은 하늘이 어우러져 드라마틱한 풍경을 보여주는 곳이에요. 도심에서 떨어져 있어서 방문객이 많지 않고, 차량으로 산길을 올라간 뒤 전망대에 서면 풍력발전기와 배추밭이 어우러진 모습을 한눈에 볼 수 있어요. 일출과 별사진 포인트로도 유명하지만 고도가 높아서 기온이 낮고 바람이 강하니 긴 바람막이와 따뜻한 옷이 필수예요. 낮에는 산자락에 드리운 구름과 푸른 들판이 반짝여서 혼자 산책하며 사진을 찍기 좋아요.',
    honyeoTip:
      '밤이나 새벽 촬영을 계획한다면 체감 온도가 급격히 떨어지니 두꺼운 겉옷과 모자를 준비해야 해요. 날씨가 변덕스러워 안개가 자주 끼니 방문 전에 기상 예보를 확인하면 실망을 줄일 수 있어요. 해가 높이 뜨는 오후에는 그림자가 적어서 색감이 뚜렷하니 풍경 사진을 남기기 좋아요.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['gangneung']['anbandegi'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-모먼트스튜디오',
    address: '강원특별자치도 강릉시 왕산면 안반데기길 428',
    lat: 37.6226284422145,
    lng: 128.739665790765,
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
      '강릉 솔향수목원은 넓은 부지에 여러 테마 정원이 조성된 곳이라서 숲 생태관찰로와 치유의 길 등 느린 걸음에 맞는 코스가 다양해요. 편백나무와 소나무 숲 사이를 걷다 보면 피톤치드 향이 코끝을 자극해서 도시에서 벗어난 느낌이에요. 중간중간 벤치와 전망대가 있어서 쉬어가며 책을 읽거나 물을 마실 수 있고, 일부 구간은 경사가 있어서 운동화를 신는 게 좋아요. 여름엔 곤충과 햇살을 피하려고 모자와 물을 챙기는 게 유용하고, 입구에서 지도를 받아 마음에 드는 테마를 골라 걷는 게 시간을 과하게 늘리지 않게 도와줘요.',
    honyeoTip:
      '이어폰을 끼고 천천히 걷다 보면 도시 소음을 잊게 돼요. 물 한 병과 간단한 간식은 가방에 넣고, 필요할 때 벤치에 앉아 쉬어주면 체력 안배에 도움이 돼요. 숲길은 비가 오면 미끄러워지니 우천 시에는 방수 운동화를 신거나 방문을 미루는 게 좋아요.',
    category: SpotCategory.NATURE,
    imageUrl: imageMap.spots['gangneung']['solhyang-arboretum'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-김지호',
    isRecommended: true,
    address: '강원특별자치도 강릉시 구정면 수목원길 156',
    lat: 37.6978617103175,
    lng: 128.861713325085,
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
      '정동진해변은 철도역과 해변이 맞붙어 있어서 기차에서 내리면 바로 바다를 만날 수 있는 독특한 장소예요. 해수욕장보다 규모는 작지만 모래가 고르고 파도가 잔잔해서 산책하기 좋고, 일출과 일몰 시간에는 여행객들이 삼각대를 세우고 사진을 찍는 풍경이 익숙해요. 해변 끝쪽에는 절벽 위에 크루즈 모양의 호텔이 있어서 배경으로 사진을 찍기 좋고, 근처 철길과 나무 데크 길을 따라 걸으며 바다를 한참 바라볼 수 있어요. 새벽이나 밤에는 기온이 크게 떨어지니 방풍과 방한 준비가 필요해요.',
    honyeoTip:
      '일출을 보려면 새벽 기차로 이동하는 경우가 많아서 도착하자마자 방풍복을 꺼내 입으면 추위를 덜 느껴요. 낮에는 조용해서 혼자 앉아 멍하니 시간을 보내기 좋고, 해가 지는 시간대에는 사진을 찍으려는 인파가 있으니 삼각대를 설치할 때 주변을 배려하는 게 좋아요. 해변 뒤편에 카페가 몇 곳 있어서 따뜻한 음료로 몸을 녹이기 좋아요.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['gangneung']['jeongdongjin-beach'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-홍정표',
    address: '강원특별자치도 강릉시 강동면 정동진리 259',
    lat: 37.6901203255173,
    lng: 129.034412579857,
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
      '주문진은 오징어로 유명한 항구마을이지만 최근에는 해변에 설치된 버스정류장 모형 포토존이 인기를 끌어서 사진을 찍으러 오는 여행자가 많아요. 바다를 등지고 앉거나 서서 사진을 찍으면 결과가 잘 나오는 편이고, BTS 팬이 아니어도 푸른 바다와 하얀 구조물이 어우러져 좋은 배경이에요. 바로 옆에는 주문진해변과 향호해변이 이어져 있어서 산책로가 길게 뻗어 있고, 어시장과 작은 카페가 있어서 간단히 먹고 쉬기에 괜찮아요. 인기 시간에는 줄을 서야 할 정도로 사람들이 몰리지만 오전 일찍 방문하면 조용히 삼각대를 세우고 촬영하기 좋아요.',
    honyeoTip:
      '삼각대나 셀프 카메라 리모컨을 챙기면 혼자서도 안정적으로 사진을 찍기 쉬워요. 바다 바람이 강해서 모자나 머플러가 날리지 않게 주의해야 하고, 사람 많은 시간을 피하고 싶다면 오전이나 비수기를 노리는 게 좋아요. 촬영 후에는 근처 해변이나 항구를 산책하며 여유롭게 시간을 보내면 좋아요.',
    category: SpotCategory.ETC,
    imageUrl: imageMap.spots['gangneung']['jumunjin'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-김지호',
    isRecommended: true,
    address: '강원특별자치도 강릉시 주문진읍 주문북로 210',
    lat: 37.910131525366,
    lng: 128.817676080292,
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
      '동화가든 본점은 초당 순두부 마을에서 짬뽕 순두부로 유명한 식당이라 메뉴가 단순해서 혼자 주문하기 어렵지 않아요. 식당 내부는 여러 동으로 나뉘어 좌석이 많고 회전이 빨라서 혼자 찾아도 대기 시간이 길지 않은 편이에요. 매운 짬뽕 국물과 순두부의 부드러움이 어우러져 든든하게 한 끼를 먹기 좋고, 밑반찬은 셀프로 리필할 수 있어서 편해요. 피크 시간대에는 대기 줄이 길게 늘어나지만 식사 후 경포나 초당 카페로 이어 가면 동선이 자연스러워요.',
    honyeoTip:
      '오픈 직후나 점심 피크 직후(오후 2시쯤)에 방문하면 비교적 빠르게 자리 잡기 쉬워요. 짬뽕 국물이 강해서 매운맛을 조절하고 싶다면 주문할 때 미리 말하거나 새우젓과 김치로 간을 맞추면 좋아요. 식사 후에는 근처 초당마을을 산책하거나 해변으로 이동해 소화를 시키는 걸 추천해요.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '강원특별자치도 강릉시 초당순두부길77번길 15',
    lat: 37.7911524593073,
    lng: 128.914664130458,
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
      '엄지네포장마차 본점은 꼬막비빔밥과 해물요리로 유명해서 관광객들이 자주 찾는 곳이라 늘 활기가 있어요. 메뉴가 몇 가지로 명확해서 주문이 간편하고, 테이블마다 혼자 앉은 손님도 섞여 있어서 혼밥 압박이 덜해요. 양념이 잘 밴 꼬막과 채소를 밥과 비벼 먹으면 자극적이지 않으면서 입맛을 돋워 여행 중 든든한 식사가 돼요. 피크 시간에는 대기가 길지만 회전율이 빨라서 생각보다 오래 기다리진 않고, 식사 후에는 월화거리나 중앙시장으로 이어가기 편해요.',
    honyeoTip:
      '점심 12~13시나 저녁 18~19시에는 줄이 길어지니 이른 점심이나 늦은 저녁에 방문하면 기다리는 시간을 줄일 수 있어요. 혼자 주문하면 밥과 반찬 양을 적당히 조절해 달라고 부탁하기도 편하고, 남은 꼬막 양념에 공깃밥을 추가해 먹으면 알뜰해요. 포장도 가능하니 여유가 없을 때는 테이크아웃해서 근처에서 먹는 것도 좋아요.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '강원특별자치도 강릉시 경강로2255번길 21 (포남동)',
    lat: 37.766317802103,
    lng: 128.907018449433,
    externalUrl: 'https://place.map.kakao.com/1280103068',
    tagSlugs: ['solo-eating', 'sea', 'culture'],
  },

  {
    regionSlug: 'gangneung',
    slug: 'geumcheon-kalguksu',
    name: '금천칼국수',
    summary: '따뜻하게 한 그릇, 혼자 먹기 편한 강릉 로컬 칼국수',
    description:
      '금천칼국수는 투박한 외관과 달리 내부가 깔끔하고 테이블 간 간격이 넓어서 혼자 앉기 편해요. 주문은 칼국수 한 가지와 수육 등 간단한 구성이라 고민할 필요가 없고, 국물은 담백하고 면은 쫄깃해서 속을 달래고 싶을 때 부담 없이 먹기 좋아요. 회전이 빠른 편이라 점심 시간에도 오래 기다리지 않는 편이고, 시장이나 월화거리와 가까워서 일정 중간에 들르기 좋아요. 셀프 코너에서 김치와 양념을 원하는 만큼 가져다 먹을 수 있어요.',
    honyeoTip:
      '점심 피크만 피하면 혼자 방문해도 금방 식사가 가능해요. 추가 밥이 필요하면 처음부터 무리해서 주문하기보다 먹어보고 부족하면 요청하는 게 낭비를 줄여줘요. 국물에 청양고추나 양념을 조금씩 넣어가며 간을 맞추면 취향대로 즐기기 좋아요.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '강원특별자치도 강릉시 강릉대로 445-1 1층',
    lat: 37.7733189796728,
    lng: 128.912195233676,
    externalUrl: 'https://place.map.kakao.com/10215787',
    tagSlugs: ['solo-eating', 'healing', 'oneday', 'walking'],
  },

  {
    regionSlug: 'gangneung',
    slug: 'mandong-bakery',
    name: '만동제과',
    summary: '강릉 감성 빵집, 혼자 들러도 부담 없는 간식 코스',
    description:
      '만동제과는 강릉시내에 있는 소규모 베이커리로, 유명세를 타며 여행자가 많이 찾지만 매장이 아담해서 테이크아웃 중심이에요. 소금빵과 크루아상, 계절 디저트가 진열되어 있어서 한두 가지를 골라 들고 나오면 부담 없이 맛보기 좋아요. 대기 줄이 길 때도 있지만 회전 속도가 빨라서 혼자 주문하고 포장해 나오는 게 수월해요. 포장해서 해변이나 호수 벤치에서 먹으면 분위기가 더 좋아지고, 여름이나 주말에는 원하는 빵이 빨리 소진되니 시간을 맞춰 방문하는 게 좋아요.',
    honyeoTip:
      '오픈 직후에 방문하면 인기 있는 빵을 비교적 쉽게 구입할 수 있어요. 혼자라면 빵은 1~2개만 사고, 남는 건 포장해서 다음 일정 중간에 간식으로 먹는 게 딱 적당해요. 대기 줄이 길어도 직원들이 빠르게 응대하는 편이라 줄 설 때 마음의 여유를 갖는 게 좋아요.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '강원특별자치도 강릉시 금성로 6 1층',
    lat: 37.7551815169393,
    lng: 128.899496368487,
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
      '테라로사 커피공장 강릉본점은 커피 로스팅 공장을 개조한 대형 카페라 천장이 높고 좌석이 다양해서 혼자 앉아도 주변 시선을 크게 의식하지 않게 돼요. 바리스타가 내려주는 핸드드립 커피와 베이커리류가 준비되어 있어서 한 잔 주문하고 오래 머무르는 손님이 많아요. 공간 곳곳에 원두 보관 공간과 로스터를 볼 수 있는 포인트가 있어서 구경하는 재미도 있어요. 주말과 휴일에는 여행객으로 붐비니 한적함을 원하면 평일 오전이나 오픈 시간대가 좋아요.',
    honyeoTip:
      '오픈 직후에 방문하면 가장 쾌적하고 원하는 좌석을 고르기 쉬워요. 커피를 주문할 때 원두 특징을 물어보고 취향에 맞게 골라보면 경험이 달라져요. 빵은 금방 동날 수 있으니 먹고 싶은 게 있으면 커피랑 같이 주문하는 게 좋아요.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    imageUrl: imageMap.spots['gangneung']['terarosa-coffee-roastery-gangneung'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-강원지사',
    address: '강원특별자치도 강릉시 구정면 현천길 25',
    lat: 37.6960007767371,
    lng: 128.89196352095,
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
      '보사노바 커피로스터스는 안목 커피거리에서 바다 전망이 돋보이는 대형 카페로, 내부와 테라스 어디에서든 파도와 하늘을 볼 수 있어서 머물기만 해도 힐링되는 느낌이에요. 좌석이 많고 창가 자리가 길게 나 있어서 혼자 앉아도 주변 시선이 분산돼 부담이 적어요. 다양한 원두를 선택해 취향에 맞는 커피를 즐길 수 있고, 주말에는 관광객으로 붐벼 창가 자리 경쟁이 치열하지만 평일 오전에는 여유로워요. 사진이 잘 나오는 포인트가 많아서 커피 마시며 사진을 남기기에도 좋아요.',
    honyeoTip:
      '평일 오전이나 해가 떨어질 무렵이 비교적 한적하고 풍경도 예뻐요. 자리 경쟁을 피하고 싶다면 주문 전에 빈 자리를 먼저 확인하고, 음료를 받은 뒤 자리가 나면 이동하는 것도 방법이에요. 테라스는 바람이 세니 날씨를 확인하고 겉옷을 챙기는 게 좋아요.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '강원특별자치도 강릉시 창해로14번길 28',
    lat: 37.7720325802438,
    lng: 128.947834623965,
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
      '보헤미안 박이추커피는 한국 커피 1세대 바리스타가 운영하는 로스터리 카페라 커피 자체가 목적인 여행자들이 많이 와요. 메뉴는 핸드드립과 에스프레소 기반으로 구성되어 있어서 주문이 단순하고, 내부는 소담한 공간과 야외 테라스가 있어서 혼자 앉아도 편안해요. 대화를 즐기는 분위기보다는 커피 향을 음미하며 독서를 하거나 노트에 글을 적는 손님이 많아서 조용한 편이에요. 경포나 도심 일정과 묶어서 “커피+산책” 코스로 마무리하기 좋은 위치예요.',
    honyeoTip:
      '커피 맛에 집중하고 싶다면 붐비지 않는 시간에 방문해서 바리스타에게 추천 원두를 물어보는 게 좋아요. 커피가 식기 전에 천천히 맛을 보면서 기록을 남기거나 음악을 듣는 루틴을 만들면 여행 기억이 더 또렷해져요. 야외 테라스는 바람이 셀 수 있으니 날씨에 맞는 좌석을 고르는 게 좋아요.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '강원특별자치도 강릉시 사천면 해안로 1107',
    lat: 37.8468567571874,
    lng: 128.866898461999,
    externalUrl: 'https://place.map.kakao.com/26308981',
    tagSlugs: ['cafe', 'thinking', 'emotional', 'stress-relief'],
  },

  {
    regionSlug: 'gangneung',
    slug: 'terarosa-gyeongpo-lake',
    name: '테라로사 경포호수점',
    summary: '호수 뷰와 공간감, 혼자도 오래 머물기 좋은 경포 감성 카페',
    description:
      '테라로사 경포호수점은 경포호수 옆에 자리한 카페라 호수를 바라보며 커피를 마실 수 있어요. 층고가 높고 유리 벽면이 넓어서 시야가 탁 트인 느낌이고, 좌석도 널찍하게 분산돼 있어서 혼자 가도 오래 머물기 편해요. 카운터 옆에는 빵과 디저트가 다양하게 준비되어 있어서 가벼운 식사처럼 즐기기에도 좋아요. 주말에는 대기 시간이 길 수 있지만 오픈 직후에는 한가해서 원하는 자리를 쉽게 찾을 수 있어요.',
    honyeoTip:
      '호수 산책을 먼저 하고 카페에 들어가면 마음이 더 차분해져서 커피가 더 잘 들어와요. 창가 자리가 인기가 많으니 주문 전에 빈 자리를 확인하고 자리 표시를 해두는 게 편해요. 성수기에는 주차가 불편할 수 있어서 도보나 대중교통 동선을 같이 고려하면 좋아요.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '강원특별자치도 강릉시 난설헌로 145',
    lat: 37.7878494880407,
    lng: 128.907489093253,
    externalUrl: 'https://place.map.kakao.com/653849031',
    tagSlugs: ['cafe', 'walking', 'healing', 'emotional'],
  },

  {
    regionSlug: 'gangneung',
    slug: 'cafe-toenmaru',
    name: '카페 툇마루',
    summary: '진한 흑임자 라떼 한 잔, 혼자 기다려도 납득되는 강릉 핫플',
    description:
      '카페 툇마루는 흑임자 라떼로 유명해서 여행자들이 줄을 서서라도 맛보는 곳이라 평소 대기가 있는 편이에요. 메뉴판이 간단하고 테이크아웃이 가능해서 혼자 주문하고 픽업한 뒤 근처 공원이나 해변에서 마시기 좋아요. 실내 좌석은 많지 않지만 나무와 벽돌로 꾸민 공간이 따뜻한 분위기고, 테이블 사이도 답답하지 않아서 혼자 앉아도 부담이 덜해요. 초당 순두부 거리와 아르떼뮤지엄, 허균·허난설헌 공원과 가까워서 일정 사이사이에 끼우기 좋아요.',
    honyeoTip:
      '흑임자 라떼를 확실히 맛보고 싶다면 이른 오전이나 저녁 시간대를 노리면 대기 시간이 줄어들어요. 좌석이 적으니 음료를 받은 뒤 바로 나와 근처 공원 벤치에서 마시는 것도 좋은 선택이에요. 혼자라면 라떼 한 잔 들고 잠깐 휴대폰을 내려놓고 주변 풍경을 보는 시간이 의외로 길게 남아요.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '강원특별자치도 강릉시 난설헌로 232',
    lat: 37.7928528841489,
    lng: 128.914530597286,
    tagSlugs: ['cafe', 'emotional', 'stress-relief', 'oneday'],
  },

  // 4) DRINK

  {
    regionSlug: 'gangneung',
    slug: 'budnamu-brewery',
    name: '버드나무 브루어리',
    summary: '강릉 수제맥주 핫플, 바/브루어리 분위기라 혼자 한 잔도 가능한 편',
    description:
      '버드나무 브루어리는 도심에 있는 수제맥주 양조장이자 펍이라 캐주얼한 분위기 덕분에 혼자 한 잔을 즐기기에도 어색하지 않아요. 탭에서 바로 따라주는 다양한 스타일의 맥주와 간단한 안주가 준비되어 있고, 바 좌석과 테이블 좌석이 나뉘어 있어서 혼술과 모임이 자연스럽게 섞여요. 라이브 음악이나 이벤트가 없는 날은 비교적 조용해서 맥주 맛에 집중하기 좋지만 금요일과 토요일 밤에는 젊은 층이 몰려 붐빌 수 있어요. 저녁 일정을 마무리하면서 한두 잔만 가볍게 마시고 숙소로 돌아가기에 딱 적당해요.',
    honyeoTip:
      '또간집에서 방영된 집이라 주말 저녁에는 웨이팅이 생길 수 있으니 평일이나 오픈 직후에 방문하는 게 편해요. 혹은 혼술하기 부담스럽다면 포장도 추천해요.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '강원특별자치도 강릉시 경강로 1961',
    lat: 37.7482678178532,
    lng: 128.884439151373,
    externalUrl: 'https://place.map.kakao.com/27152913',
    tagSlugs: ['solo-drinking', 'emotional', 'nightview', 'stress-relief'],
  },

  {
    regionSlug: 'gangneung',
    slug: 'analog-society',
    name: '아날로그 소사이어티',
    summary: '조용히 한 잔 하기 좋은 감성 바, 혼자 앉아도 어색하지 않은 분위기',
    description:
      '아날로그 소사이어티는 은은한 조명과 소박한 인테리어가 어우러진 바 형태의 공간이라 술을 마시며 조용히 쉬고 싶은 사람에게 어울려요. 바 좌석과 구석 테이블이 있어서 혼자 앉아도 주변 시선이 덜하고, 음악도 크지 않아서 분위기를 즐기며 혼술하기 좋아요. 칵테일과 간단한 플래터를 제공하고 메뉴 설명도 친절해서 술에 익숙하지 않아도 부담이 덜해요. 인기 있는 날에는 만석이 될 수 있으니 이른 시간 방문이나 예약이 필요할 때도 있어요.',
    honyeoTip:
      '혼자라면 바텐더 앞 자리를 부탁하면 음료 만드는 모습을 보며 가볍게 대화할 수도 있어서 시간이 빨리 가요. 조용한 분위기를 원하면 금요일과 토요일을 피해서 평일에 가는 게 좋아요. 한두 잔 이상 마신다면 대중교통 시간이나 택시 동선을 미리 확인해두면 마음이 편해요.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '강원특별자치도 강릉시 하슬라로232번길 13 1층',
    lat: 37.7705806872067,
    lng: 128.877490376712,
    externalUrl: 'https://place.map.kakao.com/1343283412',
    tagSlugs: ['solo-drinking', 'emotional', 'thinking', 'nightview'],
  },

  {
    regionSlug: 'gangneung',
    slug: 'terroir-cafe-winebar',
    name: '떼루아(테루아르) 카페 와인바',
    summary: '낮엔 카페, 밤엔 와인 한 잔—혼자 가도 부담 적은 무드',
    description:
      '떼루아 카페 와인바는 낮에는 커피와 디저트를, 밤에는 와인과 간단한 안주를 즐길 수 있는 공간이라 시간대에 따라 분위기가 달라요. 바와 테이블이 적당히 배치되어 있어서 혼자 앉아도 어색하지 않고, 조용한 음악과 은은한 조명 덕분에 여행을 마무리하기 좋은 무드예요. 와인 리스트도 부담스럽지 않은 가격대의 병과 잔 와인이 준비되어 있어서 한 잔만 가볍게 즐기고 가기 좋아요. 주말 밤에는 손님이 몰려 붐빌 수 있지만 평일 저녁에는 잔잔한 분위기에서 쉬기 좋아요.',
    honyeoTip:
      '혼자라면 잔 와인을 한두 잔만 주문해서 가볍게 즐기는 게 적당해요. 좌석이 한정적일 수 있으니 주말에는 일찍 가거나 예약을 고려해보는 게 좋아요.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '강원특별자치도 강릉시 구정면 수목원길 76-35',
    lat: 37.7010077392418,
    lng: 128.865304851104,
    externalUrl: 'https://place.map.kakao.com/1998909293',
    tagSlugs: ['solo-drinking', 'emotional', 'thinking', 'stress-relief'],
  },

  {
    regionSlug: 'gangneung',
    slug: 'samsung-sikdang-otto',
    name: '삼성식당 오또(와인바)',
    summary: '주문진에서 조용히 한 잔, 혼자도 가능한 예약형 무드',
    description:
      '삼성식당 오또는 주문진 읍내에 있는 작은 와인바로, 예약제로 운영하는 경우가 많아서 손님 수가 적고 분위기가 조용해요. 내부는 아늑하게 꾸며져 있어서 혼자 앉아 한 잔을 즐겨도 어색하지 않고, 기본 안주와 함께 글라스 와인이나 병 와인을 선택할 수 있어요. 메뉴는 간단하지만 신선한 해산물과 어울리는 요리가 나오는 편이고, 와인 설명도 곁들여줘서 초보자도 부담이 덜해요. 영업시간과 자리 정책이 종종 바뀔 수 있으니 방문 전 확인이 필요해요.',
    honyeoTip:
      '혼자 방문할 때는 바 좌석이나 구석 자리를 미리 문의하면 편해요. 음식을 들고 갈 수 도 있어요. 예약제로 운영하는 날이 있으니 전화나 메시지로 영업 여부와 좌석 가능 여부를 확인해두면 마음이 놓여요. 해변 산책이나 주문진항 구경 후 마무리로 잘 어울려요.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '강원특별자치도 강릉시 주문진읍 주문북로 12-1',
    lat: 37.8960056615277,
    lng: 128.831382053233,
    externalUrl: 'https://place.map.kakao.com/1190779584',
    tagSlugs: ['solo-drinking', 'thinking', 'emotional', 'nightview'],
  },
];
