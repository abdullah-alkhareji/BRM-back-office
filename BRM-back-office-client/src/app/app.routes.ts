// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then((m) => m.Register),
  },
  {
    path: '',
    loadComponent: () => import('./pages/customers/customers').then((m) => m.Customers),
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
  {
    path: 'add-customer',
    loadComponent: () => import('./pages/add-customer/add-customer').then((m) => m.AddCustomer),
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-customer/:customerNumber',
    loadComponent: () => import('./pages/edit-customer/edit-customer').then((m) => m.EditCustomer),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
