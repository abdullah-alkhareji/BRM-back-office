import { Component, inject, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { UserService } from '../../../core/auth/user.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-button',
  imports: [MatIconModule],
  templateUrl: './user-button.html',
})
export class UserButton {
  userService = inject(UserService);
  user = this.userService.user;
  error: string | null = null;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
