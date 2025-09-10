import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { importProvidersFrom } from '@angular/core';

registerLocaleData(en)

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  // Add routes for application
    provideHttpClient(), // Su dung thay cho HttpClientModule da bi xoa bo tu version 15 tro di
    provideAnimations(),
    importProvidersFrom(BrowserAnimationsModule),
    {provide: NZ_I18N, useValue: en_US}
  ]
}).catch(err => console.error(err));
