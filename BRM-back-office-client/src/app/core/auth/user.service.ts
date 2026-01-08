import { computed, Injectable, signal } from '@angular/core';
import { IUser } from '../../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSignal = signal<IUser | null>(null);

  user = this.userSignal.asReadonly();
  isLoggedIn = computed(() => this.userSignal() !== null);

  setUser(user: IUser | null) {
    this.userSignal.set(user);
  }

  clearUser() {
    this.userSignal.set(null);
  }
}
