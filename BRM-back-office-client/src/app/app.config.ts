// src/app/app.config.ts

import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/auth/auth.interceptor';
import { routes } from './app.routes';
import { authInitializer } from './core/auth/auth.initializer';
import { AuthService } from './core/auth/auth.service';
import { UserService } from './core/auth/user.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: authInitializer,
      deps: [AuthService, UserService],
      multi: true,
    },
  ],
};
