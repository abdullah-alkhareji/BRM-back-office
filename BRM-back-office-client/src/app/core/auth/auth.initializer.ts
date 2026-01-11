// src/app/core/auth/auth.initializer.ts

import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { firstValueFrom } from 'rxjs';

export function authInitializer(auth: AuthService, userService: UserService) {
  return async () => {
    if (!auth.token) return;

    try {
      const user = await firstValueFrom(auth.getMe());
      userService.setUser(user as any);
    } catch {
      auth.logout();
    }
  };
}
