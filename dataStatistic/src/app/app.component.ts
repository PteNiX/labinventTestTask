import {Component} from '@angular/core';
import {provideRouter, RouterOutlet} from '@angular/router';
import {bootstrapApplication} from '@angular/platform-browser';
import {routes} from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
}

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
});


