import { Routes } from '@angular/router';
import { profileResolver } from './core/resolvers/profile.resolver';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: '',
    loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
    resolve: { profile: profileResolver },
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
