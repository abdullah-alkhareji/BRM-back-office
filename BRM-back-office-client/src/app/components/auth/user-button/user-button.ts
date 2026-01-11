// src/app/components/auth/user-button/user-button.ts

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { UserService } from '../../../core/auth/user.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-button',
  imports: [MatIconModule, CommonModule],
  templateUrl: './user-button.html',
})
export class UserButton {
  private auth = inject(AuthService);
  private router = inject(Router);
  private userService = inject(UserService);

  user = this.userService.user;

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
