export enum ImageSource {
  UNSPLASH = 'UNSPLASH',
  KTO = 'KTO', // 한국관광공사
  OWNER = 'OWNER', // 업체/사장님 제공
  USER = 'USER', // 유저 업로드
  SNS = 'SNS', // 소셜 미디어(인스타 등)
  ETC = 'ETC',
}

export type GeoPoint = { lat: number; lng: number };
