import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  // Add routes for application
    provideHttpClient(),  // Su dung thay cho HttpClientModule da bi xoa bo tu version 15 tro di
  ]
}).catch(err => console.error(err));
