// src/app/core/auth/auth.service.ts

import { UserService } from './user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseService } from '../base.service';
import { AuthRequest, AuthResponse } from '../../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  private readonly API = `${environment.apiBaseUrl}/auth`;

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {
    super(http);
  }

  login(email: string, password: string) {
    return this.post<AuthResponse, AuthRequest>(`${this.API}/login`, { email, password }).pipe(
      tap((res) => {
        localStorage.setItem('access_token', res.accessToken);
      }),
      tap(() => {
        this.getMe().subscribe((user) => {
          this.userService.setUser(user as any);
        });
      })
    );
  }

  register(email: string, password: string) {
    return this.post<AuthResponse, AuthRequest>(`${this.API}/register`, { email, password });
  }

  logout() {
    localStorage.removeItem('access_token');
    this.userService.clearUser();
  }

  getMe() {
    return this.http.get(`${this.API}/me`);
  }

  get token(): string | null {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }
}
