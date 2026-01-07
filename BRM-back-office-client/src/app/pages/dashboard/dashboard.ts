import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  user: { userId: string; email: string } | null = null;
  error: string | null = null;

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.http.get<any>('https://localhost:7081/api/auth/me').subscribe({
      next: (res) => {
        this.user = res;
      },
      error: (err) => {
        if (err.status === 401) {
          this.auth.logout();
          this.router.navigate(['/login']);
        } else {
          this.error = 'Failed to load user data';
        }
      },
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
