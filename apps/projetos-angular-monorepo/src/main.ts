import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// Importe animações explicitamente
import '@angular/animations';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error('Error initializing application:', err)
);
