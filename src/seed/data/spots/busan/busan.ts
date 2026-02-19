import { ImageSource } from 'src/types/util';
import { SpotCategory } from 'src/types/spot';
import imageMap from '../../../image-map.json';
import type { SpotSeedData } from '../index';

export const busanSpots: SpotSeedData[] = [
  // 1) NATURE / ACTIVITY / ETC
  {
    regionSlug: 'busan',
    slug: 'gamcheon-culture-village',
    name: '감천문화마을',
    summary: '알록달록한 골목 산책, 혼자 걷기 좋은 예술 마을',
    description:
      '산비탈에 자리 잡은 감천문화마을은 원래 피난민이 살던 동네를 예술 프로젝트로 재생한 곳이에요. 안내소에서 지도를 받아 좁은 골목과 계단을 따라 올라가면 집 벽 곳곳에 그려진 벽화와 설치 미술이 눈에 들어와요. 집집마다 실제 주민들이 살고 있기 때문에 사진을 찍을 때는 소리를 낮추고 조용히 걷는 것이 좋아요. 골목 위로 올라갈수록 ‘어린 왕자’ 동상이나 책 계단처럼 포토존이 나오고, 바람이 부는 전망대에서는 부산항과 마을이 한눈에 내려다보여요. 계단과 경사가 많아 운동화나 편한 신발이 필수이고, 사람 없는 시간에 가고 싶다면 오전 10시 이전이나 해질 무렵을 추천해요.',
    honyeoTip:
      '초입 안내소에서 2,000원 기부하면 지도를 받고 스탬프를 모을 수 있어요. 골목마다 주민들이 살고 있으니 이어폰을 끼고 조용히 걷고, 중간중간 카페나 전망대에서 쉬어가면 체력이 덜 소모돼요. 가파른 길이 많아 늦은 오후보다는 오전이나 해질 무렵에 방문하면 한적합니다.',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['busan']['gamcheon-culture-village'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이상민',
    tagSlugs: ['culture', 'walking', 'emotional', 'hidden'],
    address: '부산광역시 사하구 감내2로 177-11',
    lat: 35.0986108121913,
    lng: 129.01035940127,
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=af60ff09-bc26-42f4-91f3-3523fb0bba4a',
  },

  {
    regionSlug: 'busan',
    slug: 'haeundae-beach',
    name: '해운대해수욕장',
    summary: '아침 산책부터 야경까지, 혼자 놀기 쉬운 대표 해변',
    description:
      '부산을 대표하는 해운대해수욕장은 폭이 넓고 모래가 고운 백사장과 도심 스카이라인이 어우러진 해변이에요. 해변 산책로가 잘 정비돼 있어 아침에는 한적하게 걷기 좋고, 오후에는 가족과 관광객으로 붐비지만 혼자 이어폰 끼고 걷기에도 크게 부담되지 않아요. 해변을 따라 카페와 식당, 편의시설이 모여 있어 바다를 바라보며 커피를 마시거나 간단한 식사를 하기 쉬워요. 해가 지면 마린시티 빌딩과 불빛이 백사장과 대비를 이루며 야경이 아름답고, 해수욕장 끝에서 동백섬이나 미포까지 이어지는 산책 코스도 있어요. 성수기에는 파라솔과 튜브 대여를 위해 줄을 서는 경우가 많으니 계절과 시간대를 선택하면 편안하게 즐길 수 있어요.',
    honyeoTip:
      '아침 해변은 조용해서 파도 소리 들으며 혼자 걷기 좋아요. 저녁에는 마린시티 쪽 야경이 예쁘니 일몰 후 잠시 머물러보고, 해변 뒤편 카페나 포장마차에서 간단히 끼니를 해결하면 동선이 자연스러워요. 여름 피크 시즌에는 사람이 많으니 새벽이나 비수기 평일을 이용하면 더 한적합니다.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['busan']['haeundae-beach'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-부산관광공사',
    tagSlugs: ['sea', 'activity', 'nightview', 'healing'],
    address: '부산광역시 해운대구 해운대해변로 264',
    lat: 35.1591069824231,
    lng: 129.160283786856,
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=65cb9bcc-a7f9-4dac-ab2a-7ead31f54a0c',
  },

  {
    regionSlug: 'busan',
    slug: 'jagalchi-market',
    name: '자갈치시장',
    summary: '부산 대표 어시장, 혼밥/해산물 미식 루트 핵심',
    description:
      '자갈치시장은 부산항과 인접한 어시장으로 2층 건물 안팎에 활어 상점과 식당이 줄지어 있어요. 지하철 남포역에서 도보 10분 정도면 도착하고, 일단 시장을 한 바퀴 둘러보며 먹고 싶은 해산물을 고른 뒤 위층 식당이나 근처 횟집으로 가져가 조리해 달라고 할 수 있어요. 1인 회 세트나 장어구이 같은 메뉴가 있어 혼자 와도 부담 없이 식사할 수 있고, 시장이 깨끗하게 정비돼 있어 어수선한 느낌이 적어요. 아침부터 활기가 넘치지만 오후 피크 타임에는 통로가 좁아 이동하기 번잡할 수 있으니 시간 선택이 중요해요. 매달 첫째·셋째 화요일에는 휴무이며 영업시간은 이른 새벽 5시부터 저녁 9시까지라 아침 방문이 한적하고 손질하는 과정을 보는 재미도 있어요.',
    honyeoTip:
      '먼저 시장을 한 바퀴 돌며 가격과 신선도를 비교하고 마음에 드는 해산물을 정하세요. 아침에 가면 상인들과 여유롭게 대화하며 손질을 구경할 수 있고, 식사 계획이 있다면 점심 피크 시간은 피하는 게 좋아요. 현금이 편하고 1인 세트가 있어 혼밥도 편합니다.',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['busan']['jagalchi-market'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-부산관광공사',
    tagSlugs: ['solo-eating', 'culture', 'shopping'],
    address: '부산광역시 중구 자갈치해안로 52',
    lat: 35.0966137768508,
    lng: 129.030583690953,
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=9cf15b7e-f78e-4d5f-9382-9aace7f934c3',
  },

  {
    regionSlug: 'busan',
    slug: 'gwangalli-beach',
    name: '광안리해변',
    summary: '광안대교 야경 + 카페/혼술 동선이 좋은 밤바다',
    description:
      '광안리해변은 해운대보다 작지만 도심 속에 있어 접근성이 뛰어나고 해변 바로 앞에 카페와 식당이 길게 늘어서 있어요. 낮에는 카페 테라스에서 커피를 마시며 바다를 바라보거나 모래사장을 걸을 수 있고, 밤이 되면 광안대교 조명이 켜져 다리와 바다가 만들어내는 야경이 멋져요. 해변 주변에는 버스킹과 작은 이벤트가 자주 열려 분위기가 활기차고, 바로 뒤쪽 골목에는 감각적인 술집과 식당도 많아요. 커플이나 친구 단위 방문객이 많아 다소 북적이지만 혼자여도 해변을 따라 걷다가 마음에 드는 카페에 들어가 쉬면 편안해요. 해변과 도로 사이가 가까워 늦은 밤까지 붐비니 조용한 분위기를 원한다면 이른 아침이나 늦은 밤을 선택하는 것이 좋아요.',
    honyeoTip:
      '일몰 무렵에 도착해 카페 창가 자리에서 광안대교에 불이 켜질 때까지 머무르면 야경을 한눈에 볼 수 있어요. 인기 구간은 주말에 매우 붐비므로 평일 저녁이나 이른 오전을 고르면 자리 잡기가 쉬워요. 걷다가 맘에 드는 카페에 바로 들어가는 동선이 편합니다.',
    category: SpotCategory.NATURE,
    isRecommended: true,
    imageUrl: imageMap.spots['busan']['gwangalli-beach'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-디자인글꼴',
    tagSlugs: ['sea', 'nightview', 'cafe', 'activity', 'emotional'],
    address: '부산광역시 수영구 광안해변로 219',
    lat: 35.1537727634193,
    lng: 129.118519972498,
    externalUrl:
      'https://www.visitbusan.net/kr/index.do?menuCd=DOM_000000201001001000&uc_seq=377&lang_cd=ko',
  },

  {
    regionSlug: 'busan',
    slug: 'gukje-market',
    name: '국제시장',
    summary: '골목 탐방+쇼핑+길거리 음식, 혼자 돌아다니기 좋은 시장',
    description:
      '국제시장은 부산 원도심에 위치한 대형 재래시장으로 여러 갈래 골목이 미로처럼 이어져 있어요. 전통 의류와 생활용품 상점뿐만 아니라 유명한 길거리 음식점들이 많아 걷다가 눈에 띄는 음식을 한두 점씩 맛보기 좋습니다. 시장 규모가 커서 자칫 길을 잃기 쉬우니 출입구에 있는 지도를 확인하거나 휴대폰 지도를 켜두는 것이 편하고, 카드 결제가 안 되는 노점도 많아 일정 금액의 현금을 준비하는 게 좋아요. 오후 1~2시 이후에는 사람들이 몰리기 시작하므로 이른 오전이나 점심 직후에 방문하면 비교적 한적해요. 주변 남포동, 자갈치, 부평깡통시장과 가까워 반나절 코스로 엮기 좋습니다.',
    honyeoTip:
      '구석구석 둘러보려면 편한 신발이 필수예요. 시장이 매우 넓으니 구역을 나눠 차근차근 돌아보고, 점심 이전에 가면 줄을 서지 않고 길거리 음식을 즐길 수 있어요. 현금을 조금 챙기고, 혼자서도 여러 가지를 맛보기 위해 각 분식은 소량씩 사서 먹는 게 좋아요.',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['busan']['gukje-market'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이병현',
    tagSlugs: ['shopping', 'solo-eating', 'culture', 'emotional'],
    address: '부산광역시 중구 중구로 42',
    lat: 35.1015391210444,
    lng: 129.028072168024,
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=706f4750-9b43-4b5f-98b4-990b046e341e',
  },

  {
    regionSlug: 'busan',
    slug: 'busan-tower',
    name: '부산타워 (용두산공원)',
    summary: '원도심 전망+야경, 혼자 사진 찍기 좋은 대표 전망 포인트',
    description:
      '용두산공원 안에 자리한 부산타워는 엘리베이터를 타고 전망대로 오르면 부산항과 원도심을 360도 파노라마로 내려다볼 수 있는 곳이에요. 공원 입구에서 전망대까지는 계단과 오르막길이 약 10분 남짓이라 가벼운 산책처럼 느껴지고, 매표소와 기념품점, 카페가 입구 근처에 있어 잠시 머물기 좋습니다. 전망대는 동그란 통로를 따라 한 바퀴 돌면서 야경을 감상할 수 있어요. 해 질 무렵에는 항구와 도시가 붉게 물들어가는 모습을 볼 수 있어 처음 부산을 찾은 여행자에게 특히 인상적입니다.',
    honyeoTip:
      '일몰 30분쯤 전에 도착해 해가 지는 모습과 야경을 함께 보는 것을 추천해요. 공원 자체가 크지 않아 혼자 천천히 산책하고 전망대에 올라 시간을 보내기에 적당하고, 남포동·국제시장과 가깝기 때문에 이동 동선이 편합니다. 주차는 공원 유료 주차장을 이용해야 하니 대중교통을 활용하면 편해요.',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['busan']['busan-tower'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-이병현',
    tagSlugs: ['nightview', 'activity', 'culture'],
    address: '부산광역시 중구 용두산길 37-55',
    lat: 35.100929432638,
    lng: 129.032442805252,
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=856837d8-4d1c-4e0b-8d9e-c9da47474fa7',
  },

  {
    regionSlug: 'busan',
    slug: 'haedong-yonggungsa-temple',
    name: '해동용궁사',
    summary: '바다 절벽 사찰, 혼자 “생각정리” 하기 좋은 풍경',
    description:
      '해동용궁사는 기장 해안 절벽 위에 자리한 사찰로, 바다 소리와 함께 불교 건축을 감상할 수 있는 독특한 장소예요. 버스 정류장에서 절까지는 기념품점과 작은 시장을 지나 약간의 오르막을 올라가야 하고, 사찰 내부에도 계단이 많아 천천히 둘러보게 됩니다. 무료로 개방되어 있어 누구나 쉽게 방문할 수 있고, 계단을 오르면 해수관음대불과 여러 신자들의 소원을 담은 돌탑, 그리고 탁 트인 바다 전망이 펼쳐집니다. 사찰 규모는 크지 않아 짧은 시간 안에 둘러볼 수 있지만 곳곳에 포토존이 많아 생각보다 머무르게 되는 곳이에요. 주말과 성수기에는 단체 관광객이 많아 조용히 관람하고 싶다면 이른 아침에 방문하는 것이 좋아요.',
    honyeoTip:
      '입구까지 이어지는 시장 길에서 음료를 사거나 쉬어갈 수 있으니 더운 날엔 참고하세요. 계단이 많아 편한 신발을 신고 가야 하며, 아침 일찍 가면 바다와 사찰을 한적하게 즐길 수 있어요. 해수관음대불까지 올라가면 전망이 훨씬 넓어집니다.',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['busan']['haedong-yonggungsa-temple'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-부산관광공사',
    tagSlugs: ['culture', 'sea', 'healing', 'walking'],
    address: '부산광역시 기장군 기장읍 용궁길 86',
    lat: 35.1882392674714,
    lng: 129.223245860198,
    externalUrl:
      'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=2116b628-ded9-42c2-b17e-99d17b5b65e4',
  },

  {
    regionSlug: 'busan',
    slug: 'oryukdo-skywalk',
    name: '오륙도 스카이워크',
    summary: '유리 바닥 위 바다 전망, 짧고 강한 액티비티 코스',
    description:
      '오륙도 스카이워크는 해안 절벽 위에 설치된 U자형 유리 바닥 전망대예요. 주차장은 소규모이고 유료라 대중교통을 이용하거나 해맞이공원 주차장을 이용한 뒤 5분 정도 오르막길을 걸어 올라가야 합니다. 입구에서 신발 위에 덧신을 신고 투명한 유리 위를 걸으면 발 아래로 파도가 부서지는 모습을 볼 수 있어 짧지만 짜릿한 경험을 할 수 있어요. 전망대 길이는 짧아 몇 분이면 다 둘러볼 수 있지만 주변 해안 산책로와 연계하면 더 풍성한 산책이 되고, 근처 카페에서도 멋진 바다 전망을 즐길 수 있습니다. 바람이 강하면 안전을 위해 입장이 제한될 수 있으니 방문 전 운영 상황을 확인하는 것이 좋아요.',
    honyeoTip:
      '바람이 부는 날에는 체감온도가 떨어지고 입장 제한이 있을 수 있으니 날씨를 미리 확인하세요. 발밑이 그대로 보이는 유리 길이라 짧은 시간 머물더라도 색다른 경험을 할 수 있고, 주변 해안 산책과 묶으면 짧은 방문이 더욱 알차요. 주차 공간이 적으니 대중교통이나 택시를 이용하는 게 편리합니다.',
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['busan']['oryukdo-skywalk'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-부산관광공사',
    tagSlugs: ['activity', 'sea', 'walking'],
    address: '부산광역시 남구 오륙도로 137',
    lat: 35.1014378911125,
    lng: 129.123105610641,
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=deb20f06-d4e3-468f-837a-fbb6b316085d',
  },

  {
    regionSlug: 'busan',
    slug: 'songdo-marine-cable-car',
    name: '송도해상케이블카',
    summary: '바다 위를 가로지르는 케이블카, 혼자 타도 부담 없는 코스',
    description:
      '송도해수욕장과 암남공원을 잇는 송도해상케이블카는 바다 위를 가로지르는 약 1.62km 길이의 코스로, 왕복 약 15분 동안 86m 높이에서 360도 파노라마를 즐길 수 있어요. 일반 캐빈과 바닥이 투명한 크리스탈 캐빈 두 종류가 있으며, 탑승권은 온라인 예매를 권장할 만큼 인기가 많아요. 송도 스카이파크에 도착하면 전망대와 공원, 공룡체험 등 소소한 볼거리가 있고, 암남공원 산책로를 따라 걷거나 다시 케이블카를 타고 돌아오면 짧은 시간에 힐링과 스릴을 모두 즐길 수 있습니다. 날씨가 맑은 날에는 바다와 광안대교, 남항의 풍경이 시원하게 펼쳐져 혼자 타도 특별한 경험이 됩니다.',
    honyeoTip:
      '티켓이 금방 매진되니 일정이 확정되면 미리 예매하세요. 맑은 오후나 일몰 직전에 타면 빛과 바다가 어우러져 사진이 잘 나오고, 귀찮다면 왕복으로 타서 동선을 단순화해도 좋아요. 탑승 후 암남공원 산책로까지 이어가면 짧은 액티비티와 산책을 한 번에 즐길 수 있어요.',
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['busan']['songdo-marine-cable-car'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-부산관광공사',
    tagSlugs: ['activity', 'sea', 'healing', 'nightview'],
    address: '부산광역시 서구 송도해변로 171',
    lat: 35.0766433441406,
    lng: 129.023398584644,
    externalUrl: 'https://busanaircruise.co.kr',
  },

  {
    regionSlug: 'busan',
    slug: 'bupyeong-kkangtong-market',
    name: '부평깡통시장',
    summary: '야시장 분위기 + 가성비 먹거리, 혼자 먹방 코스에 최적',
    description:
      '부평깡통시장은 저녁 7시 30분부터 11시 30분까지 열리는 야시장으로 세계 각국의 길거리 음식을 저렴하게 맛볼 수 있는 곳이에요. 한국 분식뿐만 아니라 중국·베트남·일본 등 다양한 나라의 음식이 줄지어 있고, 밤이면 통로가 좁아질 만큼 사람들이 몰려 신호에 맞춰 오른쪽으로 이동하도록 안내판이 세워져 있어요. 주말에는 발 디딜 틈이 없을 정도로 붐벼 음식을 사서 먹는 데 시간이 오래 걸릴 수 있으니 여유로운 이동을 원한다면 평일이나 이른 시간대가 좋아요. 주변에 주차 공간이 거의 없고 근처 유료주차장은 10분당 700원 정도이니 도보나 대중교통을 이용하는 편이 편리합니다.',
    honyeoTip:
      '야시장이 열리기 직전인 저녁 7시쯤에 방문하면 비교적 줄이 짧아 다양한 음식을 맛볼 수 있어요. 현금이나 간편결제를 준비하고, 인파를 헤쳐 나올 수 있는 가벼운 가방을 메고 가세요. 주말에는 매우 붐비니 혼자 방문할 경우 평일 또는 비수기 방문을 추천합니다.',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['busan']['bupyeong-kkangtong-market'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-부산관광공사',
    tagSlugs: ['solo-eating', 'nightview', 'culture', 'shopping'],
    address: '부산광역시 중구 부평1길 48',
    lat: 35.1015591974157,
    lng: 129.02602057301,
    externalUrl:
      'https://access.visitkorea.or.kr/ms/detail.do?cotId=a855c95c-ef06-418a-9148-64268ea4d24f',
  },

  {
    regionSlug: 'busan',
    slug: 'haeundae-sky-capsule',
    name: '해운대 스카이캡슐(블루라인파크)',
    summary: '하늘 위 레일 따라 바다를 스치듯, 인생샷 자동 생성 코스',
    description:
      '해운대 스카이캡슐은 미포에서 청사포까지 해안선을 따라 약 7~10m 높이의 레일 위를 천천히 달리는 4인용 캡슐이에요. 속도가 시속 4km 정도라 30~40분 동안 바다와 절벽 풍경을 여유롭게 감상할 수 있고, 캡슐 안에서는 다른 일행 없이 혼자만의 공간을 즐길 수 있어 부담이 없어요. 티켓은 온라인으로 미리 예매해야 하고, 특히 일몰 시간대나 주말은 예약 경쟁이 치열해요. 청사포에 내리면 다릿돌 전망대나 카페들이 가까워 산책과 카페 투어를 이어가기 좋으며, 왕복 대신 편도로 타면 이동 동선을 단순하게 짤 수 있어요.',
    honyeoTip:
      '황금 시간대인 오후 4~6시에 탑승하면 해가 바다에 비치는 모습을 캡슐 안에서 여유 있게 볼 수 있어요. 혼자 탑승할 때는 평일 오전이나 늦은 오후를 선택하면 다른 사람과 함께 타지 않아도 되고 여유로운 시간을 보낼 수 있어요. 미포에서 출발해 청사포에서 내려 바다 산책로와 카페를 묶어 하루를 완성하는 루트가 깔끔합니다.',
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['busan']['haeundae-sky-capsule'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-디앤에이스튜디오',
    tagSlugs: ['activity', 'sea', 'emotional', 'oneday'],
    address: '부산광역시 해운대구 청사포로 116',
    lat: 35.1612480539439,
    lng: 129.191400314285,
    externalUrl: 'https://www.bluelinepark.com/skyCapsuleCourse.do',
  },

  {
    regionSlug: 'busan',
    slug: 'cheongsapo-daritdol-observatory',
    name: '청사포 다릿돌전망대',
    summary: '투명 바닥 끝에서 바다 위를 걷는 느낌, 짧고 강한 스카이워크',
    description:
      '청사포 다릿돌전망대는 바다 쪽으로 72.5m 길게 뻗은 목재·철제 구조물 끝에 투명한 유리 바닥 구간이 있어 ‘바다 위를 걷는 듯한’ 체험을 할 수 있는 곳이에요. 높이는 20m로 그리 높지 않지만 끝부분에서 아래를 내려다보면 바다와 바위가 그대로 보여 짜릿한 느낌을 줍니다. 입장은 무료이며 오전 9시부터 오후 6시까지 운영하지만 날씨와 안전을 위해 운영 시간이 달라질 수 있어요. 블루라인 파크의 해변열차나 스카이캡슐을 이용하면 접근하기 쉬우며, 전망대를 다녀온 뒤 청사포 항구 근처의 카페나 해녀촌에서 휴식을 취할 수 있어요. 일부 방문객은 유리 구간이 짧다고 느끼지만 바다 풍경을 감상하기에는 충분하며, 신발 위에 신는 덧신을 제공해 안전하게 걸을 수 있어요.',
    honyeoTip:
      '해 질 무렵이나 해 뜰 무렵에 방문하면 붉은 하늘과 바다가 어우러져 사진이 잘 나와요. 강풍이 불면 입장이 제한될 수 있으니 날씨를 확인하고, 유리 바닥을 걷는 느낌이 무서우면 난간 쪽을 잡고 천천히 이동하면 돼요. 스카이캡슐 하차 후 바로 이어갈 수 있어 동선을 계획하기 쉽습니다.',
    category: SpotCategory.ACTIVITY,
    isRecommended: true,
    imageUrl: imageMap.spots['busan']['cheongsapo-daritdol-observatory'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-나금주',
    tagSlugs: ['sea', 'activity', 'walking', 'nightview'],
    address: '부산광역시 해운대구 청사포로 167',
    lat: 35.1633065639801,
    lng: 129.195313050136,
    externalUrl:
      'https://visitbusan.net/archive/dataSearch/view.nm?dataSid=METADATA006349',
  },

  {
    regionSlug: 'busan',
    slug: 'huinnyeoul-culture-village',
    name: '흰여울문화마을',
    summary: '절벽 골목+바다 라인, 혼자 걷기 딱 좋은 “감성 산책”',
    description:
      '흰여울문화마을은 영도 절벽 위에 형성된 주거지로, 좁은 골목길과 계단을 따라 걷다 보면 파란 바다가 함께 보이는 감성적인 마을이에요. 14개의 골목에 카페, 공방, 독립서점 등이 자리해 있어 작품을 구경하거나 커피 한 잔을 마시며 여유롭게 머물 수 있고, 주민들이 실제로 거주하는 곳이라 소음을 줄이고 예의를 지키는 게 중요합니다. 마을 곳곳에는 영화 ‘변호인’ 벽화나 푸른 물결이 보이는 포토존이 있어 혼자 산책하며 사진 찍기 좋지만 내리막과 계단이 많아 편한 신발이 필수예요. 해 질 무렵이나 오전 일찍 방문하면 햇살이 부드럽고 관광객이 적어 한적하게 걷기 좋으며, 골목 끝에서 절영해안산책로로 이어져 동선을 연장할 수 있어요.',
    honyeoTip:
      '버스에서 내려 마을로 가는 길에는 경사와 계단이 많으니 체력을 고려해 천천히 걷고, 사진을 찍을 때는 주민 생활 공간을 방해하지 않도록 조심하세요. 평일 오전이나 노을이 질 때가 조용하며, 산책 후에는 골목 안 오션뷰 카페에서 쉬었다가 절영해안산책로로 이어가면 하루 일정이 자연스럽게 이어져요.',
    category: SpotCategory.ETC,
    isRecommended: true,
    imageUrl: imageMap.spots['busan']['huinnyeoul-culture-village'],
    imageSource: ImageSource.KTO,
    imageCredit: 'ⓒ한국관광공사 포토코리아-부산울신지사 디자인글꼴',
    tagSlugs: ['walking', 'emotional', 'sea', 'hidden'],
    address: '부산광역시 영도구 영선동4가 1043',
    lat: 35.0782488099118,
    lng: 129.045302314829,
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
      '밀양순대돼지국밥 해운대점은 24시간 문을 열어 언제든 따끈한 돼지국밥 한 그릇을 먹을 수 있는 곳이에요. 건물 규모가 크고 깔끔해서 혼자 들어가도 눈치 보이지 않고, 셀프 바에서 부추, 새우젓, 깍두기를 원하는 만큼 가져다 먹을 수 있어요. 국밥은 진하고 구수한 육수에 밥과 삶은 돼지수육이 푸짐하게 들어 있고 순대와 내장, 숙주, 국수를 추가할 수 있는 여러 메뉴가 있어 취향에 따라 선택하면 돼요. 해운대역과 가까워 바다 산책 후 들르기 좋고, 주문하면 빠르게 국밥이 나와 다음 일정으로 넘어가기 수월합니다. 주차 지원을 일정 금액 이상 하면 받을 수 있지만 식사 시간에는 대기가 있을 수 있으니 점심시간을 살짝 피해 방문하면 여유로워요.',
    honyeoTip:
      '점심 12~13시만 피하면 혼자서도 편하게 자리를 잡을 수 있어요. 새우젓과 다대기를 조금씩 넣어 간을 맞추고, 수육을 추가하려면 ‘국밥 단품+수육 소’보다 국밥 단품으로 깔끔하게 먹는 편이 양이 딱 맞아요. 회전이 빨라 혼자 식사 후 바로 이동하기 좋습니다.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '부산광역시 해운대구 구남로 28',
    lat: 35.1614934358865,
    lng: 129.16032650332,
    externalUrl: 'https://place.map.kakao.com/960933553',
    tagSlugs: ['solo-eating', 'culture', 'stress-relief'],
  },

  {
    regionSlug: 'busan',
    slug: 'tonshow-gwangalli',
    name: '톤쇼우 광안점',
    summary: '바삭 촉촉 돈카츠, 혼자 웨이팅해도 납득되는 “인생 한 끼”',
    description:
      '톤쇼우 광안점은 두툼한 로스·히레 돈카츠를 빠르게 튀겨 겉은 바삭하고 속은 촉촉한 식감이 좋은 곳이에요. 기본으로 제공되는 미소국과 샐러드, 김치 등이 깔끔하고 부족하면 리필할 수 있어요. 메뉴는 등심·안심·카레카츠·가츠동 등으로 다양하며 가격은 1만 원대 초반이고, 주문 후 10분 안에 요리가 나와 혼자 방문해도 오래 기다리지 않습니다. 내부는 일본식 카페처럼 미니멀하고 조용하며 바 좌석과 작은 테이블이 있어 혼자 식사하는 손님도 많습니다. 광안리 해변에서 가까워 산책 전후에 들르기 좋지만 인기 시간대에는 웨이팅이 생길 수 있어요.',
    honyeoTip:
      '오픈 직후나 브레이크 타임 직후에 방문하면 대기 없이 바로 앉을 수 있어요. 웨이팅이 길면 광안리 해변을 걸으며 시간을 보내다가 돌아오는 것도 좋은 방법이고, 고기 익힘 정도를 조절하고 싶다면 주문할 때 미리 말씀하면 돼요. 혼자라도 테이블 간 간격이 넓어 편안합니다.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '부산광역시 수영구 광안해변로279번길 13',
    lat: 35.1564423185533,
    lng: 129.124785928587,
    externalUrl: 'https://place.map.kakao.com/590377149',
    tagSlugs: ['solo-eating', 'emotional', 'stress-relief'],
  },

  {
    regionSlug: 'busan',
    slug: 'choryang-milmyeon-bonjeom',
    name: '초량밀면 본점',
    summary: '부산역 근처 “여행 시작 한 그릇”, 혼자 먹기 딱 좋은 밀면',
    description:
      '초량밀면 본점은 부산역과 도보 5분 거리라 여행 시작과 끝에 가볍게 들르기 좋은 식당이에요. 메뉴는 물밀면, 비빔밀면, 만두 등으로 단출하지만 주문하자마자 뜨거운 육수 한 잔이 먼저 나오고, 본식이 몇 분 안에 나와 회전율이 빠릅니다. 작은 사이즈의 물밀면도 양이 넉넉하고 얼음 동동 띄운 육수는 계피향이 은은하게 퍼져 독특한 맛을 내며, 테이블에 놓인 식초와 겨자로 간을 조절하면 더 개운해요. 가격이 6천 원대라 부담이 없고 혼자 식사하는 손님도 많아 편하게 먹고 나오기 좋아요. 내부는 넓지 않아 점심시간에는 줄이 생기지만 11시 전이나 오후 2시 이후엔 비교적 빨리 앉을 수 있어요.',
    honyeoTip:
      '전용 주차장이 없으니 버스나 지하철을 이용하는 것이 편해요. 혼자 방문할 경우 애매한 시간대(11시 전후나 14시 전후)에 가면 대기 없이 먹을 수 있고, 육수를 먼저 마신 뒤 겨자와 식초로 취향에 맞게 간을 조절해보세요. 만두를 함께 주문해도 부담 없는 가격이라 한 끼 든든하게 먹기 좋아요.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '부산광역시 동구 중앙대로 225',
    lat: 35.1173216815489,
    lng: 129.040598629185,
    externalUrl: 'https://place.map.kakao.com/27365831',
    tagSlugs: ['solo-eating', 'culture', 'stress-relief', 'oneday'],
  },

  {
    regionSlug: 'busan',
    slug: 'daeyeon-milmyeon',
    name: '대연밀면',
    summary: '부산 여름 미식의 정석, 시원하게 혼자 완면하기 좋은 집',
    description:
      '대연밀면은 2011년부터 운영해온 밀면 전문점으로 비빔밀면과 들깨칼국수가 대표 메뉴입니다. 점심시간에는 지역 주민과 관광객으로 줄이 길게 늘어설 정도로 인기여서 기다림을 감수해야 하지만, 내부는 깔끔하고 따뜻한 분위기라 자리에 앉으면 편안하게 식사할 수 있어요. 비빔밀면은 매콤달콤한 양념에 쫄깃한 면이 어울리며 기본으로 나오는 무절임을 함께 먹으면 맛이 한층 깔끔해진다는 후기가 많고, 원하면 시원한 육수를 추가로 받을 수 있어요. 영업시간은 오전 11시부터 오후 5시까지(라스트오더 4시 50분)이고 화요일은 휴무라 시간 계획이 필요합니다. 조합 메뉴로 족발도 판매해 혼자서도 다양한 맛을 조금씩 즐길 수 있어요.',
    honyeoTip:
      '대기가 길어도 먹을 가치가 있으니 오픈 직후나 오후 2시 이후에 방문하면 비교적 빨리 들어갈 수 있어요. 비빔밀면을 주문했다면 무절임과 함께 먹어보고, 국물이 필요하면 시원한 육수를 요청해보세요. 휴무일(화요일)을 피하고 영업시간을 확인하는 것이 중요합니다.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '부산광역시 남구 천제등로 55 1층',
    lat: 35.1313193279288,
    lng: 129.089805753887,
    externalUrl: 'https://place.map.kakao.com/16697877',
    tagSlugs: ['solo-eating', 'hidden', 'stress-relief'],
  },

  {
    regionSlug: 'busan',
    slug: 'burgershop-haeundae',
    name: '버거샵 해운대점',
    summary: '해리단길 감성 수제버거, 혼자 먹어도 어색하지 않은 힙한 한 끼',
    description:
      '버거샵 해운대점은 해리단길 작은 골목 안에 자리한 수제버거 전문점으로 해운대역에서 걸어갈 수 있는 거리에 있어요. 내부는 텍사스식 펍을 연상시키는 따뜻한 인테리어와 작은 야외 좌석이 있어 날씨가 좋으면 밖에서 먹을 수 있고, 손 씻는 공간도 별도로 마련되어 있어 편리해요. 메뉴는 클래식 치즈버거, 베이컨 버거 등 몇 가지로 단순하지만 패티는 한우를 사용해 육즙이 풍부하고 빵은 부드러워서 한 끼 식사로 충분해요. 주문하면 5~10분 안에 나오며 감자튀김은 뜨겁게 바로 튀겨줘서 포장해 바다에서 먹어도 맛있고, 매장 안에서 사진을 찍기 좋은 감성적인 분위기라 혼자 방문해도 어색하지 않아요. 가격은 1만 원 안팎으로 적당하며, 점심 전후에는 웨이팅이 길 수 있어 시간대를 잘 맞추는 게 좋아요.',
    honyeoTip:
      '평일 오픈 직후나 늦은 점심 시간에 가면 자리 경쟁 없이 여유롭게 식사할 수 있어요. 바람이 강한 날에는 실내 자리를 택하고, 포장해서 해운대 해변에서 먹으면 바다와 함께 햄버거를 즐길 수 있어요. 메뉴가 간단하니 혼자라도 주문이 어렵지 않습니다.',
    category: SpotCategory.FOOD,
    isRecommended: true,
    address: '부산광역시 해운대구 우동1로20번길 19 1층',
    lat: 35.1642205198222,
    lng: 129.157639982549,
    tagSlugs: ['solo-eating', 'emotional', 'activity'],
  },

  // 3) CAFE
  {
    regionSlug: 'busan',
    slug: 'waveon-coffee',
    name: '웨이브온 커피',
    summary: '바다 앞 건축미+오션뷰, 혼자 있어도 “그림” 되는 카페',
    description:
      '기장 오시리아에 있는 웨이브온 커피는 탁 트인 오션뷰와 독특한 건축미로 유명한 대형 카페예요. 실내외 곳곳에 쿠션과 담요가 준비된 좌석이 많아 누워서 책을 읽거나 바다를 바라보며 멍때리기 좋지만, 자리가 편안한 만큼 손님들이 오래 머물러 주말과 오후에는 대기 시간이 길어요. 카페는 오전 10시부터 자정까지 운영하며, 주말에는 대기표 시스템이 없어서 음료를 주문한 뒤 좌석이 날 때까지 기다려야 하는데 오후 3시쯤에는 30~40분 정도 기다려야 했다는 후기가 있어요. 가격대는 다소 높지만 핸드드립 커피와 디저트의 맛이 좋은 편이고, 시원한 바다 전망이 어디에서든 보여 사진 찍기가 좋아요. 바다가 바로 앞이라 날씨가 좋을 때 방문하면 파란 수평선과 포토존들이 어우러져 혼자 방문해도 시간이 금방 지나갑니다.',
    honyeoTip:
      '주말보다는 평일 오전이나 해가 지는 시간대에 방문하면 기다림을 줄일 수 있어요. 대기 중에는 주변 산책로를 둘러보고, 자리를 잡으면 쿠션과 담요를 챙겨 바다를 오래 바라볼 준비를 하는 것이 좋아요. 음료 가격이 높은 편이지만 바다 전망과 편안한 좌석을 생각하면 만족도가 높습니다.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '부산광역시 기장군 장안읍 해맞이로 286',
    lat: 35.3222715919296,
    lng: 129.269778502763,
    externalUrl: 'https://place.map.kakao.com/528293263',
    tagSlugs: ['cafe', 'sea', 'healing', 'emotional'],
  },

  {
    regionSlug: 'busan',
    slug: 'goslow-yeongdo',
    name: '고슬로(영도 오션뷰 카페)',
    summary: '흰여울 산책 후 쉬기 좋은 오션뷰, 혼자 멍때리기 딱',
    description:
      '고슬로는 영도 흰여울문화마을 언덕 위에 자리한 오션뷰 카페로, 버스를 타고 좁은 골목을 올라가야 만날 수 있어요. 내부는 따뜻한 색감과 목재 인테리어로 꾸며져 있고, 바다 쪽으로 큰 창이 있어 실내에서도 파란 수평선을 감상할 수 있으며 잔디 마당에는 야외 테이블이 있어 날씨 좋은 날에는 야외에서 차를 마실 수 있습니다. 시그니처인 당근 케이크를 포함한 디저트와 커피가 맛있고 운영시간은 11:00~19:00라 일찍 닫는 편이에요. 입구 쪽 포토존에서는 빛이 잘 들어와 사진을 찍는 사람들이 많고, 흑백 사진을 즉석에서 인쇄해주는 기계도 있어 추억을 남기기 좋아요. 주말에는 관광객이 많지만 영도 특유의 조용한 분위기가 유지돼 혼자 멍하니 바다를 보며 쉬기 좋은 공간입니다.',
    honyeoTip:
      '흰여울마을 산책 후 체력을 회복할 곳을 찾는다면 고슬로에 들러 당근 케이크와 커피를 주문해보세요. 바람이 강하면 실내 창가 자리를 이용하고, 일몰 시간에는 바다 색이 변하는 모습을 볼 수 있어요. 주차 공간이 없으니 대중교통이나 도보를 이용하는 것이 편합니다.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '부산광역시 영도구 절영로 234',
    lat: 35.0772567895242,
    lng: 129.046493480617,
    externalUrl: 'https://place.map.kakao.com/901097055',
    tagSlugs: ['cafe', 'sea', 'healing', 'walking'],
  },

  {
    regionSlug: 'busan',
    slug: 'awluku-cafe-jeonpo',
    name: '카페 얼룩(AWLUK)',
    summary: '전포 감성 소품+빛 좋은 공간, 혼자 앉아도 어색하지 않은 카페',
    description:
      '카페 얼룩은 전포동 카페거리의 오래된 건물 2층에 숨어 있는 조용한 공간이에요. 작은 간판을 찾지 않으면 지나치기 쉬워 계단을 올라가야 하는데, 내부는 가죽 공방과 카페가 함께 있어 커피를 마시면서 수제 가죽 제품을 구경할 수 있습니다. 화려한 포토존 대신 자연광과 식물, 빈티지 소품들로 꾸며져 있어 차분한 분위기에서 책을 읽거나 생각을 정리하기 좋고, 벽면에는 손님들이 남긴 메모와 엽서가 붙어 있어 따뜻함을 더해요. 메뉴는 커피와 디저트 위주로 단순하며 손님이 적어 조용히 앉아 있기 좋은 곳이라 SNS 인증보다 휴식을 원하는 여행자에게 알맞아요.',
    honyeoTip:
      '전포 카페거리 산책 중 번잡한 카페를 피해 조용히 쉬고 싶을 때 얼룩을 찾아보세요. 작은 간판을 지나치지 않게 골목을 잘 살피고, 카페가 워낙 조용하니 사진을 찍을 땐 다른 손님을 배려해야 해요. 가죽 키링이나 북마크 등 소품을 구경하는 것도 재미있습니다.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '부산광역시 부산진구 전포대로210번길 48 2층',
    lat: 35.1553423640147,
    lng: 129.068127245643,
    externalUrl: 'https://place.map.kakao.com/1680390963',
    tagSlugs: ['cafe', 'healing', 'emotional', 'walking'],
  },

  {
    regionSlug: 'busan',
    slug: 'arden-boulangerie-namcheon',
    name: '아덴블랑제리 남천점',
    summary: '빵천동 감성 베이커리, 혼자 가도 “디저트 투어” 성립',
    description:
      '아덴블랑제리 남천점은 ‘빵천동’이라 불리는 남천·광안 일대에서 유명한 베이커리 카페예요. 오전 8시부터 밤 9시까지 영업하며, 시간대별로 다양한 빵이 갓 구워 나오기 때문에 이른 아침부터 줄이 생기는 경우가 많아요. 매장에는 소금빵, 크로플, 페이스트리, 바게트 등 종류가 다양해 선택하는 재미가 있고 커피와 함께 먹거나 포장해 광안리 해변이나 집으로 가져가기에도 좋아요. 실내는 넓고 세련된 인테리어에 좌석이 마련돼 있어 혼자 방문해 빵을 고르고 앉아 쉬기 편하며, 주말에는 빵이 금방 소진되니 원하는 제품이 있다면 시간표를 확인하고 방문하는 것이 좋아요.',
    honyeoTip:
      '빵 종류마다 나오는 시간이 다르니 좋아하는 빵이 있다면 오전 일찍 가서 구입하는 것이 확실해요. 혼자라면 빵 1~2개와 커피를 간단히 주문해 조용한 자리에서 휴식하고, 남는 빵은 포장해 다음 일정에 간식으로 챙겨도 좋습니다. 주차는 주변 공용주차장을 이용하거나 지하철 남천역에서 도보로 이동하는 것이 편리해요.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '부산광역시 수영구 남천동로 36 케이엠타워 1층',
    lat: 35.141195699551,
    lng: 129.111669104187,
    externalUrl: 'https://place.map.kakao.com/m/1512614926',
    tagSlugs: ['cafe', 'emotional', 'healing', 'walking'],
  },

  {
    regionSlug: 'busan',
    slug: 'naive-brewers-jeonpo',
    name: '나이브 브류어스',
    summary: '전포 힙 감성 핸드드립, 혼자 “집중하기 좋은” 커피 스팟',
    description:
      '나이브 브류어스는 전포역 근처 좁은 골목 안에 위치한 작은 로스터리 카페로, 철제 창과 벽돌이 어우러진 투박한 인더스트리얼 인테리어가 인상적이에요. 내부 좌석이 많지 않아 손님이 많으면 공간이 금방 차지만 한적할 때는 햇빛이 들어오는 창가에서 고양이가 자는 모습을 보며 느긋하게 커피를 마실 수 있어요. 주인이 직접 원두를 로스팅하고 핸드드립을 내려줘 메뉴에 대해 질문하면 친절하게 설명해주며, 벽면에는 다양한 커피 도구들이 진열돼 있어 커피 애호가라면 흥미를 느낄 만합니다. 고양이를 키우는 카페라 고양이가 빈 좌석을 차지하고 있을 때가 있어 동물과 함께 있는 분위기를 즐길 수 있습니다.',
    honyeoTip:
      '좌석이 적어 주말보다는 평일 오후처럼 한산한 시간대를 추천해요. 커피에 대해 궁금한 점이 있으면 사장님께 편하게 물어보고 자신에게 맞는 원두를 추천받아보세요. 고양이가 자리에서 자고 있을 때는 깨우지 말고 조용히 지켜보는 예의를 지켜주세요.',
    category: SpotCategory.CAFE,
    isRecommended: true,
    address: '부산광역시 부산진구 전포대로186번길 37',
    lat: 35.1531446396967,
    lng: 129.067582019846,
    externalUrl: 'https://place.map.kakao.com/1027187749',
    tagSlugs: ['cafe', 'emotional', 'walking', 'hidden'],
  },

  // 4) DRINK
  {
    regionSlug: 'busan',
    slug: 'den-gwangalli',
    name: '덴 광안리점',
    summary: '광안리 골목 이자카야, 혼자 바 자리에서 하이볼+안주로 정리되는 밤',
    description:
      '덴 광안리점은 광안리 쪽 골목에 있는 이자카야라서, 들어가면 조명은 낮고 분위기는 차분한 편이에요. 하이볼 한 잔 시켜두고 안주를 천천히 먹기 좋은 구성이며, 고등어 봉초밥 같은 대표 메뉴를 하나 잡으면 혼자 한 끼처럼 깔끔하게 마무리돼요. 인기 시간대에는 웨이팅이 자주 생겨서, 조용히 마시고 싶다면 평일 이른 저녁이 더 편해요.',
    honyeoTip:
      '혼자면 바 자리 위주로 앉는 게 자연스럽고, 첫 메뉴는 “딱 하나”만 골라 천천히 먹는 편이 좋아요. 웨이팅이 걸리면 근처 골목을 한 바퀴 돌고 돌아오는 식으로 시간을 쓰면 마음이 급하지 않아요.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '부산광역시 수영구 광안로 51-4',
    lat: 35.1553127590102,
    lng: 129.118003712955,
    externalUrl: 'https://place.map.kakao.com/1559354932',
    tagSlugs: ['solo-drinking', 'emotional', 'hidden', 'nightview'],
  },

  {
    regionSlug: 'busan',
    slug: 'sakaba-gwangalli',
    name: '사카바 광안리',
    summary: '작은 야키토리 바, 혼자 1~2잔 하면서 꼬치로 딱 맞게 채우는 곳',
    description:
      '사카바 광안리는 좌석이 많지 않은 작은 야키토리 이자카야라서, 혼자 들어가도 오히려 편한 타입이에요. 바 형태로 앉아서 꼬치 굽는 걸 보며 한 잔 하기 좋고, 사케·하이볼처럼 가볍게 시작하기도 좋아요. 공간이 아담해 피크에는 금방 만석이 되니, 사람 적을 때 들어가면 흐름이 더 안정적이에요.',
    honyeoTip:
      '혼자면 바 자리에서 “꼬치 몇 개 + 한 잔”으로 시작하는 게 부담이 없어요. 웨이팅이 보이면 미리 다른 가게로 튀기보다, 짧게 기다렸다가 들어가서 한 번에 마무리하는 편이 만족도가 높아요.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '부산광역시 수영구 민락본동로11번길 81',
    lat: 35.1565061256613,
    lng: 129.124482547408,
    externalUrl: 'https://place.map.kakao.com/150575084',
    tagSlugs: ['solo-drinking', 'emotional', 'hidden', 'nightview'],
  },

  {
    regionSlug: 'busan',
    slug: 'blending-bar-seomyeon',
    name: '블렌딩바 서면',
    summary: '서면 한복판 칵테일바, 혼자 가도 자연스럽게 한 잔 시작되는 분위기',
    description:
      '블렌딩바 서면은 서면 쪽 골목에 있는 칵테일 바로, 들어가면 조도 낮고 바 중심이라 혼자 앉기 편한 구조예요. 클래식 칵테일부터 시그니처까지 선택지가 넓고, 취향을 말하면 그쪽으로 안내해주는 흐름이 자연스러워요. 늦은 시간까지 운영하는 날이 많아서 2차로 가볍게 들르거나, 처음부터 여기서 천천히 시작하기도 좋아요.',
    honyeoTip:
      '혼자면 입장하자마자 바 자리로 앉고 “오늘은 상큼/달달/드라이 중에 뭐가 좋을까요”처럼 기준만 말하면 주문이 쉬워요. 피크 시간대엔 시끄러울 수 있으니, 조용히 마시려면 이른 저녁이나 평일을 추천해요.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '부산광역시 부산진구 동천로85번길 10 1층',
    lat: 35.1564083269972,
    lng: 129.061712087714,
    externalUrl: 'https://www.instagram.com/blending_bar_seomyeon/',
    tagSlugs: ['solo-drinking', 'emotional', 'nightview', 'hidden'],
  },

  {
    regionSlug: 'busan',
    slug: 'goof-record-bar-jeonpo',
    name: '구프 레코드 (LP/바)',
    summary: '전포 감성 LP바, 혼자 “음악+한 잔” 하기 좋은 조용한 밤',
    description:
      '구프 레코드는 낮에는 커피를, 밤에는 하이볼과 와인을 파는 전포동의 LP 바 겸 카페예요. 입구를 들어서면 벽 한쪽에 LP와 식물이 장식되어 있고 바 카운터 앞에 높은 스툴, 중앙에는 긴 테이블이 있어 손님들이 함께 앉는 구조라 혼자 와도 큰 부담이 없어요. 시그니처 음료로는 꿀 아포가토와 바질 밀크셰이크가 있으며, 저녁에는 재즈나 힙합 LP가 흘러나와 감성적인 분위기를 더해요. 공간이 크지 않고 음악이 다소 크게 나와 조용한 대화보다는 음료와 분위기를 즐기기 좋고, 커피 원두와 굿즈도 판매하고 있어 구경하는 재미가 있습니다. 다이닝코드에서는 ‘혼술’과 ‘바자리’ 태그가 붙어 있어 혼자 술을 즐기기에 적합한 곳으로 평가되고 있어요.',
    honyeoTip:
      '혼자 방문할 경우 바 카운터나 긴 테이블 한쪽에 앉아 음악과 함께 한두 잔을 즐겨보세요. 이른 저녁이나 평일 낮에는 한적하니 LP를 구경하거나 굿즈를 살펴보기 좋고, 사람들과 공간을 공유하는 구조라 자리 배치에 유의하면 편해요. 너무 시끄럽다면 음료만 테이크아웃해 전포 골목을 산책하는 것도 방법입니다.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '부산광역시 부산진구 동성로25번길 29 1층',
    lat: 35.1526197115082,
    lng: 129.066700385929,
    externalUrl: 'https://place.map.kakao.com/1877549710',
    tagSlugs: ['solo-drinking', 'emotional', 'hidden', 'nightview'],
  },

  {
    regionSlug: 'busan',
    slug: 'hey-jude-cocktail-bar-jeonpo',
    name: '헤이주드 (Hey, Jude)',
    summary: '전포 감성 칵테일바, 혼자 앉아도 편한 아늑한 분위기',
    description:
      '헤이주드는 전포역 6번 출구에서 도보 3분 거리에 있는 작은 칵테일 바로, 건물 2층으로 계단을 올라가야 들어갈 수 있어요. 내부는 바텐더 앞에 놓인 바형 테이블을 포함해 네댓 개의 좌석만 있는 아담한 공간으로, 어두운 조명과 감성적인 음악이 어우러져 아늑한 분위기를 만듭니다. 시그니처 칵테일인 ‘헤이주드’와 ‘딥브레스’ 외에도 당일의 날씨를 반영한 데일리 칵테일을 제공하며, 가격대는 합리적인 수준이고 기본 안주로 프레첼과 오트밀 미니바이트를 내줘요. 술에 약한 사람도 카시스 프라페나 깔루아 밀크 같은 달콤한 칵테일을 선택할 수 있고, 사장님들이 친절해 추운 날에는 핫팩을 챙겨줄 정도라는 후기가 있어 혼자 방문해도 부담 없어요. 주차 공간이 따로 없고 영업시간은 매일 18:00부터 새벽 2:00까지라 밤에 들르기 좋은 장소입니다.',
    honyeoTip:
      '좌석이 많지 않아 오픈 시간에 맞춰 가면 조용히 바 자리에서 칵테일을 즐길 수 있어요. 바에 앉아 바텐더에게 오늘의 추천 칵테일을 물어보거나 시그니처 음료를 주문해보세요. 주차 공간이 없으니 대중교통을 이용하고, 혼자 마실 경우 1~2잔 정도 가볍게 즐기는 것이 좋습니다.',
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '부산광역시 부산진구 서전로68번길 110',
    lat: 35.1528195712619,
    lng: 129.067192504048,
    externalUrl: 'https://place.map.kakao.com/757820658',
    tagSlugs: ['solo-drinking', 'emotional', 'nightview', 'hidden'],
  },
];
