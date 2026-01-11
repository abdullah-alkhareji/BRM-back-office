// src/app/core/auth/user.service.ts

import { Injectable, signal } from '@angular/core';
import { IUser } from '../../interfaces/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  user = signal<IUser | null>(null);

  setUser(user: IUser) {
    this.user.set(user);
  }

  clearUser() {
    this.user.set(null);
  }
}
