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
    description: `산비탈에 자리 잡은 감천문화마을은 원래 피난민이 살던 동네를 예술 프로젝트로 재생한 곳이에요. 안내소에서 지도를 받아 좁은 골목과 계단을 따라 올라가면 집 벽 곳곳에 그려진 벽화와 설치 미술이 눈에 들어옵니다.

집집마다 실제 주민들이 살고 있기 때문에 사진을 찍을 때는 소리를 낮추고 조용히 걷는 것이 좋아요. 골목 위로 올라갈수록 ‘어린 왕자’ 동상이나 책 계단처럼 포토존이 나오고, 바람이 부는 전망대에서는 부산항과 마을이 한눈에 내려다보여요.

계단과 경사가 많아 운동화나 편한 신발이 필수이고, 사람 없는 시간에 가고 싶다면 오전 10시 이전이나 해질 무렵을 추천해요.`,
    honyeoTip: `• 초입 안내소에서 2,000원 기부하면 지도를 받고 스탬프를 모을 수 있어요.
• 골목마다 주민들이 살고 있으니 조용히 걷고, 중간중간 카페나 전망대에서 쉬어가면 좋아요.
• 늦은 오후보다는 오전이나 해질 무렵에 방문하면 한적합니다.`,
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
    summary: '아침 산책부터 야경까지, 부산 대표 해변',
    description: `부산을 대표하는 해운대해수욕장은 폭이 넓고 모래가 고운 백사장과 도심 스카이라인이 어우러진 해변이에요. 해변 산책로가 잘 정비돼 있어 아침에는 한적하게 걷기 좋고, 오후에는 가족과 관광객으로 붐비지만 혼자 이어폰 끼고 걷기에도 크게 부담되지 않아요.

해변을 따라 카페와 식당, 편의시설이 모여 있어 바다를 바라보며 커피를 마시거나 간단한 식사를 하기 쉬워요. 해가 지면 마린시티 빌딩과 불빛이 백사장과 대비를 이루며 야경이 아름답고, 해수욕장 끝에서 동백섬이나 미포까지 이어지는 산책 코스도 있습니다.`,
    honyeoTip: `• 아침 해변은 조용해서 파도 소리 들으며 혼자 걷기 좋아요.
• 저녁에는 마린시티 쪽 야경이 예쁘니 일몰 후 잠시 머물러보세요.
• 해변 뒤편 카페나 포장마차에서 간단히 끼니를 해결하면 동선이 자연스럽습니다.
• 여름 피크 시즌에는 새벽이나 비수기 평일을 이용하면 더 한적합니다.`,
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
    description: `자갈치시장은 부산항과 인접한 어시장으로 활어 상점과 식당이 줄지어 있어요. 지하철 남포역에서 도보 10분 정도면 도착하며, 시장을 한 바퀴 둘러보며 먹고 싶은 해산물을 고른 뒤 위층 식당이나 근처 횟집으로 가져가 조리해 달라고 할 수 있습니다.

1인 회 세트나 장어구이 같은 메뉴가 있어 혼자 와도 부담 없이 식사할 수 있고, 시장이 깨끗하게 정비돼 있어 어수선한 느낌이 적어요. 아침부터 활기가 넘치지만 오후 피크 타임에는 통로가 좁아 이동하기 번잡할 수 있으니 시간 선택이 중요합니다.

매달 첫째·셋째 화요일에는 휴무이며 영업시간은 이른 새벽 5시부터 저녁 9시까지라 아침 방문이 한적하고 손질 과정을 보는 재미도 있어요.`,
    honyeoTip: `• 먼저 시장을 한 바퀴 돌며 가격과 신선도를 비교하고 마음에 드는 곳을 정하세요.
• 아침에 가면 상인들과 여유롭게 대화하며 손질을 구경할 수 있어요.
• 식사 계획이 있다면 점심 피크 시간은 피하는 게 좋습니다.
• 1인 세트가 마련된 곳이 많아 혼밥도 아주 편합니다.`,
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
    description: `광안리해변은 해운대보다 아늑하면서 도심 속에 있어 접근성이 뛰어나고 해변 바로 앞에 카페와 식당이 길게 늘어서 있어요. 낮에는 카페 테라스에서 커피를 마시며 바다를 바라보거나 모래사장을 걸을 수 있고, 밤이 되면 광안대교 조명이 켜져 환상적인 야경을 선사합니다.

해변 주변에는 버스킹과 작은 이벤트가 자주 열려 분위기가 활기차고, 바로 뒤쪽 골목에는 감각적인 술집과 식당도 많아요. 커플이나 친구 단위 방문객이 많아 북적이지만 혼자여도 해변을 따라 걷다가 마음에 드는 카페에 들어가 쉬면 좋아요.

해변과 도로 사이가 가까워 늦은 밤까지 붐비니 조용한 분위기를 원한다면 이른 아침을 선택하는 것이 좋아요.`,
    honyeoTip: `• 일몰 무렵에 도착해 카페 창가 자리에서 광안대교 불이 켜질 때까지 머물러보세요.
• 인기 구간은 주말에 매우 붐비므로 평일 저녁이나 이른 오전을 고르면 자리 잡기가 쉬워요.
• 걷다가 맘에 드는 카페나 소품샵에 바로 들어가는 자유로운 동선을 추천합니다.`,
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
    description: `국제시장은 부산 원도심에 위치한 대형 재래시장으로 여러 갈래 골목이 미로처럼 이어져 있어요. 전통 의류와 생활용품 상점뿐만 아니라 유명한 길거리 음식점들이 많아 걷다가 눈에 띄는 음식을 한두 점씩 맛보기 좋습니다.

시장 규모가 커서 자칫 길을 잃기 쉬우니 출입구에 있는 지도를 확인하거나 휴대폰 지도를 활용하는 것이 편합니다. 카드 결제가 안 되는 노점도 많아 일정 금액의 현금을 준비하는 게 좋아요.

오후 1~2시 이후에는 사람들이 몰리므로 이른 오전이나 점심 직후에 방문하면 비교적 한적해요. 주변 남포동, 자갈치, 부평깡통시장과 가까워 반나절 코스로 엮기 좋습니다.`,
    honyeoTip: `• 시장이 매우 넓으니 구역을 나눠 차근차근 돌아보세요.
• 점심 이전에 가면 줄을 서지 않고 길거리 음식을 즐길 수 있어요.
• 현금을 조금 챙기고, 여러 가지를 맛보고 싶다면 조금씩 다양하게 구매해보세요.`,

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
    description: `용두산공원 안에 자리한 부산타워는 전망대로 오르면 부산항과 원도심을 360도 파노라마로 내려다볼 수 있는 곳이에요. 공원 입구에서 전망대까지는 약 10분 남짓의 가벼운 산책 코스로 이어지며, 카페가 입구 근처에 있어 잠시 머물기 좋습니다.

전망대는 동그란 통로를 따라 한 바퀴 돌면서 야경을 감상할 수 있는 구조예요. 해 질 무렵에는 항구와 도시가 붉게 물들어가는 모습을 볼 수 있어 처음 부산을 찾은 여행자에게 특히 인상적입니다.`,
    honyeoTip: `• 일몰 30분쯤 전에 도착해 노을과 야경을 모두 감상하는 것을 추천해요.
• 공원이 크지 않아 혼자 천천히 산책하기에 아주 적당합니다.
• 남포동·국제시장과 도보 거리이므로 저녁 동선으로 묶기 매우 좋습니다.`,
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
    description: `해동용궁사는 기장 해안 절벽 위에 자리한 사찰로, 바다 소리와 함께 불교 건축을 감상할 수 있는 독특한 장소예요. 사찰 내부에는 계단이 많아 천천히 호흡을 가다듬으며 둘러보게 됩니다.

무료로 개방되어 있어 누구나 쉽게 방문할 수 있고, 계단을 오르면 해수관음대불과 여러 돌탑, 그리고 탁 트인 바다 전망이 펼쳐집니다.

곳곳에 포토존이 많아 생각보다 오래 머무르게 되는 곳이에요. 주말과 성수기에는 단체 관광객이 많으므로 조용히 관람하고 싶다면 이른 아침에 방문하는 것이 가장 좋습니다.`,
    honyeoTip: `• 입구까지 이어지는 시장 길에서 가벼운 간식을 즐길 수 있어요.
• 계단이 많으므로 무조건 편한 신발을 신고 가세요.
• 아침 일찍 가면 바다와 사찰의 고요함을 온전히 즐길 수 있습니다.
• 해수관음대불까지 꼭 올라가서 가장 넓은 바다 전망을 확인하세요.`,
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
    description: `해안 절벽 위에 설치된 U자형 유리 바닥 전망대예요. 투명한 유리 위를 걸으면 발 아래로 파도가 부서지는 모습을 볼 수 있어 짧지만 짜릿한 경험을 할 수 있습니다.

입구에서 신발 위에 덧신을 신고 입장하며, 전망대 길이는 짧아 몇 분이면 다 둘러볼 수 있어요. 그리고 주변 해안 산책로와 연계하면 훨씬 풍성한 산책이 가능합니다.

바람이 매우 강하면 안전을 위해 입장이 제한될 수 있으니 방문 전 날씨를 확인하는 것이 좋습니다.`,
    honyeoTip: `• 바람이 많이 부는 날에는 체감온도가 낮으니 가벼운 겉옷을 챙기세요.
• 발밑이 보이는 유리가 무서울 땐 난간 쪽을 잡고 천천히 이동하면 됩니다.
• 주변 해맞이공원 산책과 묶으면 짧은 방문을 더 알차게 채울 수 있어요.
• 주차 공간이 협소하므로 가급적 대중교통 이용을 추천합니다.`,
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
    description: `송도해수욕장과 암남공원을 잇는 케이블카로, 바다 위를 가로지르는 약 1.62km 구간을 이동하며 86m 높이에서 360도 파노라마 뷰를 즐길 수 있어요.

바닥이 투명한 크리스탈 캐빈을 선택하면 발밑으로 일렁이는 바다를 보며 스릴을 느낄 수 있습니다. 송도 스카이파크에 도착하면 전망대와 공원 등 소소한 볼거리가 많아요.

날씨가 맑은 날에는 바다와 광안대교, 남항의 풍경이 시원하게 펼쳐져 혼자 타도 특별한 여행의 기분을 낼 수 있습니다.`,
    honyeoTip: `• 일정이 확정되면 온라인으로 미리 예매해 대기 시간을 줄이세요.
• 오후 늦게 탑승하면 바다 위 노을을 감상하기에 아주 좋습니다.
• 스카이파크 하차 후 암남공원 산책로까지 이어가면 자연 힐링 코스가 완성됩니다.
• 왕복 티켓을 구매해 동선을 단순하게 짜는 것이 혼여에는 더 편할 수 있어요.`,
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
    description: `저녁 7시 30분부터 본격적으로 열리는 야시장은 세계 각국의 길거리 음식을 가성비 있게 맛볼 수 있는 곳이에요. 밤이면 좁은 통로에 사람들이 가득 차 활기찬 분위기를 자아냅니다.

신호에 맞춰 한 방향으로 이동해야 할 만큼 붐비지만, 혼자서 한두 가지 음식을 사서 가볍게 맛보기에 이보다 좋은 곳은 없어요.

주변에 주차 공간이 거의 없으므로 도보나 대중교통을 이용하는 편이 훨씬 편리하며, 다양한 나라의 이색 메뉴를 시도해보는 재미가 있습니다.`,
    honyeoTip: `• 야시장이 열리는 저녁 7시 30분 직전에 도착하면 비교적 덜 기다리고 음식을 살 수 있어요.
• 현금이나 간편결제를 미리 준비해두면 주문이 빨라요.
• 주말보다는 평일 저녁에 방문해야 혼자서도 여유롭게 음식을 즐길 수 있어요.`,
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
    description: `미포에서 청사포까지 해안선을 따라 약 7~10m 높이의 레일 위를 달리는 4인용 캡슐이에요. 속도가 시속 4km 정도로 천천히 움직여 바다와 절벽 풍경을 여유롭게 감상할 수 있습니다.

캡슐 안에서는 사진을 찍거나 풍경에 집중하기 좋습니다.

일몰 시간대나 주말은 예약 경쟁이 매우 치열하므로 온라인 예매가 필수입니다. 청사포에 내리면 예쁜 카페들이 많아 산책 코스를 이어가기에 좋습니다.`,
    honyeoTip: `• 오후 4~6시 사이가 가장 아름다운 노을을 볼 수 있는 황금 시간대예요.
• 혼자 탑승할 때도 캡슐 하나를 통째로 쓰기 때문에 나만의 '바다 멍' 시간을 갖기 좋아요.
• 단 혼자 탑승하려면 2인 요금을 내야할 수 도 있으니 잘 알아보기를 추천해요.
• 미포에서 출발해 청사포에서 하차한 뒤, 청사포 해변 산책로를 걷는 코스를 추천합니다.`,
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
    description: `바다 쪽으로 길게 뻗은 구조물 끝에 투명한 유리 바닥 구간이 있어 바다 위를 걷는 듯한 짜릿한 체험을 할 수 있는 곳이에요.

아래를 내려다보면 파도가 바위에 부서지는 모습이 그대로 보여 짧지만 강렬한 인상을 줍니다. 입장은 무료이며 블루라인파크의 해변열차나 스카이캡슐을 이용하면 쉽게 접근할 수 있어요.

전망대를 둘러본 뒤 청사포 항구 근처의 해녀촌이나 카페에서 휴식을 취하며 전형적인 부산 어촌의 정취를 느낄 수 있습니다.`,
    honyeoTip: `• 해 질 무렵에 방문하면 붉게 물든 바다와 하늘을 배경으로 멋진 사진을 남길 수 있어요.
• 신발 위에 신는 덧신을 제공하므로 편하게 걷기만 하면 됩니다.
• 스카이캡슐에서 내린 후 바로 이어지는 위치라 동선을 짜기 매우 효율적이에요.`,
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
    description: `영도 절벽 위에 형성된 주거지로, 좁은 골목길을 따라 걷다 보면 시야 가득 파란 바다가 들어오는 감성적인 마을이에요.

마을 곳곳에 영화 ‘변호인’의 배경이 된 스팟이나 아기자기한 소품샵, 독립서점이 숨어 있어 혼자 산책하며 보물을 찾듯 구경하는 재미가 큽니다.

내리막과 계단이 많으므로 무조건 편한 신발을 추천하며, 골목 끝에서 절영해안산책로로 이어지는 길은 바다를 가장 가까이서 느낄 수 있는 환상적인 산책 코스입니다.`,
    honyeoTip: `• 실제 주민들이 거주하는 조용한 동네이므로 에티켓을 지키며 산책하세요.
• 평일 오전이나 노을이 지기 시작하는 늦은 오후가 사진 찍기 가장 예쁜 시간이에요.
• 산책 후 마을 곳곳에 있는 오션뷰 카페 중 한 곳을 골라 잠시 '바다 멍' 시간을 가져보세요.`,
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
    description: `24시간 운영되어 언제든 따뜻한 국밥 한 그릇을 즐길 수 있는 곳이에요. 매장이 넓고 깔끔해서 혼자 방문해도 눈치 보지 않고 편안하게 식사할 수 있습니다.

진하고 구수한 육수에 수육이 푸짐하게 들어 있으며, 셀프 바에서 부추와 새우젓 등을 자유롭게 가져다 취향껏 간을 맞출 수 있습니다.

해운대역과 해변 사이에 위치해 접근성이 매우 좋고, 음식이 빠르게 나와 다음 일정을 위해 든든하게 배를 채우기에 더할 나위 없는 곳입니다.`,
    honyeoTip: `• 점심 피크인 12~13시만 피하면 훨씬 여유롭게 혼밥이 가능해요.
• 국밥 단품으로도 양이 충분하니 소식가라면 수육 추가는 신중하게 하세요.
• 새우젓과 부추를 넉넉히 넣어 부산 스타일의 감칠맛을 제대로 즐겨보세요.`,
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
    description: `두툼한 고기를 완벽하게 튀겨내어 겉은 바삭하고 속은 촉촉한 육즙이 가득한 돈카츠 전문점입니다.

내부는 일본 현지의 식당처럼 미니멀하고 세련된 분위기를 자아내며, 바(Bar) 좌석이 잘 갖춰져 있어 혼자 방문한 손님들도 편안하게 식사에만 집중할 수 있습니다.

광안리 해변 인근이라 식사 전후로 바다를 산책하기 좋으며, 돈카츠 한 점에 소금이나 소스를 곁들여 나만의 미식 시간을 갖기에 최적의 장소입니다.`,
    honyeoTip: `• 워낙 인기가 많으니 오픈런을 하거나 테이블링 앱을 적극 활용해 미리 줄을 서세요.
• 웨이팅이 길다면 바로 앞 광안리 해변을 걷다 오면 시간이 금방 갑니다.
• 혼자라면 바 자리에 앉아 조리 과정을 지켜보며 식사하는 재미를 느껴보세요.`,
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
    description: `부산역 바로 근처에 있어 부산에 도착하자마자 혹은 떠나기 전 마지막 식사로 가장 많이 찾는 곳 중 하나예요.

단출한 메뉴지만 주문과 동시에 나오는 뜨끈한 육수부터 살얼음 동동 띄운 밀면까지, 회전율이 빨라 대기 시간이 길지 않은 것이 장점입니다.

은은한 계피향이 감도는 시원한 육수에 취향껏 식초와 겨자를 더하면 여독이 풀리는 기분을 느낄 수 있습니다. 가성비까지 훌륭해 혼자서도 만두 한 접시를 곁들여 든든하게 먹기 좋습니다.`,
    honyeoTip: `• 11시 이전이나 14시 이후에 방문하면 대기 없이 바로 앉을 수 있어요.
• 물밀면과 함께 나오는 육수를 먼저 한 모금 마셔보세요.
• 만두를 함께 주문해도 만 원 내외라 부담 없이 푸짐한 한 끼가 가능합니다.`,
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
    description: `지역 주민들 사이에서 꾸준히 사랑받는 밀면 전문점으로 매콤달콤한 비빔밀면과 들깨칼국수가 일품인 곳이에요.

깔끔하고 소박한 내부 분위기 덕분에 혼자 방문해도 마치 동네 단골집에 온 듯 편안하게 식사할 수 있습니다. 쫄깃한 면발과 감칠맛 나는 양념의 조화가 훌륭해 한 그릇을 비우는 게 어렵지 않아요.

영업시간이 비교적 짧고 재료 소진 시 조기 마감될 수 있으니 시간을 잘 맞춰 방문해야 하는 '찐' 로컬 맛집입니다.`,
    honyeoTip: `• 화요일은 휴무이니 일정을 짤 때 꼭 체크하세요.
• 오후 5시면 영업이 종료되므로 점심 혹은 이른 저녁으로 계획하는 것이 안전합니다.
• 비빔밀면을 먹다가 중간에 시원한 육수를 요청해 부어 먹으면 또 다른 맛을 즐길 수 있어요.`,
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
    description: `해리단길 골목에 위치한 수제버거 집으로 텍사스식 빈티지 펍 느낌의 인테리어가 돋보이는 공간이에요.

한우 패티의 풍부한 육즙과 부드러운 번이 조화를 이루어 제대로 된 수제버거의 맛을 느낄 수 있습니다. 매장 한쪽에 손을 씻는 공간이 마련된 세심함도 돋보입니다.

자유로운 분위기 덕분에 혼자서 맥주 한 잔을 곁들여 버거를 즐기는 손님들이 많으며, 해운대역에서 가까워 기차를 타기 전후에 들르기 좋습니다.`,
    honyeoTip: `• 날씨가 좋다면 야외 좌석에 앉아 해리단길의 정취를 느끼며 드셔보세요.
• 포장해서 해운대 백사장 근처 벤치에서 바다를 보며 먹는 것도 혼자 여행만의 낭만입니다.
• 평일 오픈 시간대에 가면 기다림 없이 가장 힙한 자리를 선점할 수 있어요.`,
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
    description: `기장 바다 바로 앞에 위치한 대형 카페로 건축상까지 받았을 만큼 아름다운 외관과 탁 트인 전망을 자랑합니다.

야외 테라스에는 빈백과 담요가 준비되어 있어 누워서 바다 소리를 들으며 온전한 휴식을 취하기에 최적입니다. 실내 어디서든 수평선이 보여 사진 찍기에도 매우 좋아요.

가격대는 조금 있지만 이곳에서만 맛볼 수 있는 핸드드립 커피와 훌륭한 전망이 그 가치를 충분히 증명하는 공간입니다.`,
    honyeoTip: `• 주말 오후에는 대기가 길 수 있으니 가급적 평일 오전 방문을 추천해요.
• 빈백 자리를 잡았다면 편안하게 기대어 30분 정도 '바다 멍' 시간을 가져보세요.
• 핸드드립 커피와 함께 비주얼이 예쁜 디저트를 하나 곁들이면 여행 기분이 확 살아납니다.`,
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
    description: `흰여울문화마을 산책로 중턱에 자리한 따뜻한 분위기의 오션뷰 카페예요.

잔디 마당과 야외 테이블이 있어 날씨가 좋은 날에는 바닷바람을 맞으며 차를 마실 수 있습니다. 시그니처인 당근 케이크와 정성스럽게 내린 커피가 지친 산책객들의 발길을 붙잡습니다.

흑백 사진을 즉석에서 인쇄해주는 기계가 있어 혼자 여행의 소소한 추억을 남기기에 아주 좋습니다.`,
    honyeoTip: `• 흰여울마을 산책 도중 가장 뷰가 좋은 지점에 위치해 있으니 쉬어가는 타이밍으로 잡으세요.
• 주차 공간이 전혀 없으므로 대중교통 이용이나 도보 이동을 계획하세요.
• 일몰 시간에 방문하면 바다 너머로 떨어지는 해를 조용히 감상할 수 있습니다.`,
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
    description: `전포동 카페거리의 조용한 건물 2층에 숨겨진 보석 같은 공간이에요. 가죽 공방과 카페가 함께 운영되어 은은한 가죽 향과 커피 향이 섞인 독특한 분위기를 선사합니다.

자연광이 잘 들어오는 창가와 빈티지한 소품들이 가득해 차분하게 책을 읽거나 메모를 남기기에 더할 나위 없이 좋습니다.

화려한 포토존보다 아늑한 '나만의 아지트' 같은 느낌을 원하는 여행자에게 강력 추천하는 곳입니다.`,
    honyeoTip: `• 입구 간판이 작아 지나치기 쉬우니 지도를 잘 보고 찾아가세요.
• 공간이 워낙 조용하니 책 한 권 가져가서 여유를 즐기기 좋습니다.
• 공방에서 만든 예쁜 가죽 소품들을 구경하며 지인들의 선물을 골라보는 것도 재미있어요.`,
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
    description: `부산의 빵 성지라 불리는 '빵천동'에서도 세련된 인테리어와 다양한 라인업으로 사랑받는 베이커리 카페입니다.

매일 아침 갓 구운 빵들이 고소한 향을 풍기며 진열되어 있으며, 소금빵과 크로플 등 트렌디한 메뉴부터 클래식한 빵까지 선택의 폭이 매우 넓습니다.

매장이 넓고 좌석이 편안해 혼자 방문해서 느긋하게 빵과 커피를 즐기며 다음 여행 동선을 정리하기 좋은 쉼터 같은 공간입니다.`,
    honyeoTip: `• 빵이 나오는 시간대가 다르니 인기 빵을 원한다면 가급적 오전에 방문하세요.
• 남천역에서 도보로 매우 가까워 접근성이 뛰어납니다.
• 여기서 빵을 포장해서 가까운 광안리 해변 벤치에 앉아 드시는 것도 추천해요.`,
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
    description: `전포역 근처 골목길에 위치한 이곳은 직접 로스팅한 원두로 정성스럽게 핸드드립을 내려주는 로스터리 카페예요.

투박한 인더스트리얼 인테리어와 평화롭게 잠을 자는 고양이가 어우러져 묘하게 마음이 편안해지는 매력이 있습니다. 사장님이 커피에 진심이라 원두에 대한 친절한 설명을 들을 수 있습니다.

작은 공간이지만 커피 향에 집중하며 혼자만의 시간을 보내기에 더없이 힙하고 아늑한 공간입니다.`,
    honyeoTip: `• 커피 취향을 사장님께 말씀드리면 입맛에 딱 맞는 원두를 추천해 주십니다.
• 주말보다는 평일 오후 한산한 시간대에 방문해야 이곳의 진가를 느낄 수 있어요.
• 카페 내 고양이를 조용히 지켜보며 휴식하는 매너가 필요합니다.`,
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
    description: `광안리 해변 뒤편 골목에 자리 잡은 아늑한 이자카야로, 낮은 조도와 차분한 분위기가 매력적인 곳이에요.

바(Bar) 자리가 잘 마련되어 있어 혼자 하이볼 한 잔과 신선한 안주를 즐기기에 전혀 어색함이 없습니다. 특히 고등어 봉초밥은 식사 대용으로도 훌륭한 대표 메뉴입니다.

바쁜 여행 일정 끝에 나만의 속도로 하루를 갈무리하고 싶을 때 들르면 좋은 숨겨진 맛집입니다.`,
    honyeoTip: `• 평일 이른 저녁에 방문하면 대기 없이 바 자리에 앉아 조용히 즐길 수 있어요.
• 하이볼 한 잔과 안주 하나를 정성스럽게 음미하며 하루를 정리해 보세요.
• 인기 메뉴는 조기 소진될 수 있으니 조금 서두르는 것이 좋습니다.`,
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
    description: `규모가 작아 오히려 혼자 방문했을 때 더 따뜻한 환영을 받는 느낌이 드는 야키토리 전문 바예요.

바 자리에 앉아 눈앞에서 꼬치가 구워지는 모습을 보며 사케나 하이볼을 곁들이면 오감이 즐거워집니다. 공간이 아담해 조용하게 한 잔 즐기고 싶은 혼행족들에게 안성맞춤인 곳입니다.

번잡한 해변가에서 살짝 벗어나 있어 나만의 비밀 장소 같은 정취를 느낄 수 있습니다.`,
    honyeoTip: `• 꼬치 몇 가지와 생맥주 한 잔으로 가볍게 시작해 보세요.
• 만석인 경우가 많으니 미리 전화로 자리를 확인하거나 조금 이른 시간에 방문하는 것을 추천해요.
• 바텐더와의 적당한 거리감 덕분에 방해받지 않고 혼자만의 술자리를 즐기기 좋습니다.`,
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
    description: `부산의 가장 번화한 서면 골목에 위치한 칵테일 바지만, 문을 열고 들어가면 반전 있는 차분한 공간이 펼쳐집니다.

어두운 조명과 바 중심의 구조 덕분에 혼자서 칵테일의 맛에만 집중하기 좋은 환경입니다. 취향에 따라 추천받을 수 있는 칵테일 종류가 다양해 미식가들에게도 인기가 많습니다.

늦은 시간까지 운영하므로 하루의 마지막을 칵테일 한 잔의 낭만으로 채우고 싶은 분들에게 추천하는 곳입니다.`,
    honyeoTip: `• 메뉴판을 보며 고민하기보다 좋아하는 맛의 특징(상큼함, 달콤함 등)을 말하고 추천받아보세요.
• 서면역에서 가까워 숙소로 돌아가기 전 마지막 코스로 잡기에 매우 좋습니다.
• 주말보다는 평일 저녁에 방문해야 이곳의 정적인 매력을 온전히 느낄 수 있습니다.`,
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
    description: `전포동의 힙한 감성을 고스란히 담고 있는 LP 바 겸 카페로, 벽면을 가득 채운 LP와 빈티지한 가구가 멋스러운 공간이에요.

낮에는 향기로운 커피를, 밤에는 하이볼과 와인을 즐길 수 있습니다. 중앙의 긴 테이블은 혼자 온 손님들도 자연스럽게 공간을 공유하며 분위기에 녹아들게 합니다.

재즈나 힙합 등 사장님의 선곡이 훌륭해 음악을 사랑하는 여행자라면 반드시 들러봐야 할 부산의 필수 코스입니다.`,
    honyeoTip: `• 혼자라면 중앙 긴 테이블 한쪽에 앉아 음악 감상에 푹 빠져보세요.
• 카페 원두나 감각적인 굿즈들도 판매하고 있으니 기념품으로 추천합니다.
• 음악 소리가 다소 클 수 있으니 독서보다는 음악과 분위기를 즐기러 갈 때 더 좋습니다.`,
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
    description: `전포역 바로 근처 건물 2층에 숨겨진 아담하고 비밀스러운 칵테일 바입니다. 

좌석이 네댓 개뿐인 아주 작은 공간이지만, 그만큼 사장님의 세심한 서비스와 따뜻한 배려가 돋보여 혼자 방문해도 전혀 외롭지 않습니다.

그날의 날씨나 기분에 맞춘 데일리 칵테일을 주문할 수 있어 매 방문마다 새로운 즐거움을 줍니다. 소중한 사람들에게만 알려주고 싶은 소중한 혼술 아지트 같은 공간입니다.`,
    honyeoTip: `• 사장님께 오늘의 날씨나 기분에 어울리는 칵테일을 추천받아 보세요.
• 공간이 좁아 금방 만석이 될 수 있으니 오픈 시간에 맞춰 가는 것이 좋습니다.
• 기본 안주로 나오는 프레첼과 함께 칵테일을 즐기며 아늑한 밤을 만끽해 보세요.`,
    category: SpotCategory.DRINK,
    isRecommended: true,
    address: '부산광역시 부산진구 서전로68번길 110',
    lat: 35.1528195712619,
    lng: 129.067192504048,
    externalUrl: 'https://place.map.kakao.com/757820658',
    tagSlugs: ['solo-drinking', 'emotional', 'nightview', 'hidden'],
  },
];
