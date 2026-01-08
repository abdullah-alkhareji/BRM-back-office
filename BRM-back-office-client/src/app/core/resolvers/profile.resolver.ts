// src/app/core/resolvers/profile.resolver.ts
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ApiService } from '../api.service';
import { UserService } from '../auth/user.service';
import { tap } from 'rxjs';

export const profileResolver: ResolveFn<any> = () => {
  const api = inject(ApiService);
  const userStore = inject(UserService);

  return api.getMe().pipe(tap((user: any) => userStore.setUser(user)));
};
