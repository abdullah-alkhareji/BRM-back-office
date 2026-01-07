import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API = 'https://localhost:7081/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<any>(`${this.API}/login`, { email, password }).pipe(
      tap((res) => {
        localStorage.setItem('access_token', res.accessToken);
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  get token(): string | null {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }
}
