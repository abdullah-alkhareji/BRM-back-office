import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IUser } from '../../interfaces/user';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  user: IUser | null = null;
  error: string | null = null;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const profile = this.route.snapshot.data['profile'] as IUser | null;
    if (profile) {
      this.user = profile;
    } else {
      this.error = 'Failed to load user data';
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
