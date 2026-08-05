import type { AuthProvider } from '../enums/auth-provider.enum';

export interface SocialLoginInput {
  provider: AuthProvider;
  providerId: string;
  email?: string | null;
}
