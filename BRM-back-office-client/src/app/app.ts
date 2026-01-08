import { Component, signal } from '@angular/core';
import { AppLayout } from './components/layouts/app-layout/app-layout';

@Component({
  selector: 'app-root',
  imports: [AppLayout],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('brmobc');
}
