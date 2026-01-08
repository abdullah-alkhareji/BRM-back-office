import { Component } from '@angular/core';
import { UserButton } from '../../auth/user-button/user-button';

@Component({
  selector: 'app-navbar',
  imports: [UserButton],
  templateUrl: './navbar.html',
})
export class Navbar {}
