import type { AuthProvider } from '../enums/auth-provider.enum';
import type { UserRole } from 'src/modules/users/enums/user-role.enum';

export interface JwtUser {
  id: number;
  email?: string;
  role: UserRole;
  provider: AuthProvider;
}
