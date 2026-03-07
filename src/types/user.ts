export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export enum AuthProvider {
  APPLE = 'apple',
  KAKAO = 'kakao',
  GOOGLE = 'google',
  NAVER = 'naver',
}

export interface JwtUser {
  id: number;
  email?: string;
  role: UserRole;
  provider: AuthProvider;
}

export interface KakaoTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
}

export interface KakaoUserResponse {
  id: number;
  connected_at: string;
  properties: {
    nickname: string;
    profile_image?: string;
    thumbnail_image?: string;
  };
  kakao_account: {
    email?: string;
    profile: {
      nickname: string;
      thumbnail_image_url?: string;
      profile_image_url?: string;
    };
  };
}

export interface GoogleTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
  token_type: string;
  id_token: string;
}

export interface GoogleUserResponse {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  locale?: string;
}

export interface NaverTokenResponse {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  expires_in: string;
}

export interface NaverUserResponse {
  resultcode: string;
  message: string;
  response: {
    id: string;
    email?: string;
    nickname?: string;
    profile_image?: string;
    age?: string;
    gender?: string;
    name?: string;
    birthday?: string;
  };
}
