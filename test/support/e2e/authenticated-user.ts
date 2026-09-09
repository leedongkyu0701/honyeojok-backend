import type { AuthService } from 'src/modules/auth/auth.service';
import type { DataSource } from 'typeorm';
import { createTestUser } from '../database/fixtures';

export async function createAuthenticatedUser(
  dataSource: DataSource,
  authService: AuthService,
) {
  const user = await createTestUser(dataSource, {
    email: 'e2e-user@example.com',
  });
  const tokens = await authService.socialLogin({
    provider: user.provider,
    providerId: user.providerId,
    email: user.email,
  });

  return { user, ...tokens };
}
