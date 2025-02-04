import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {provideHttpClient} from '@angular/common/http';
import {provideAppStore} from './app/store';
import {provideRouter} from '@angular/router';
import {routes} from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideAppStore(),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));
