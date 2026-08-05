export class UserProfileResponseDto {
  id: number;
  email: string | null;
  nickName: string;
  provider: string;
  createdAt: Date;
}
