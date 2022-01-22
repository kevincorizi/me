import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  pages = [
    {
      url: '/',
      icon: 'home',
      text: 'Home',
    },
    {
      url: '/experience',
      icon: 'work',
      text: 'Experience',
    },
    {
      url: '/projects',
      icon: 'dashboard',
      text: 'Projects',
    },
  ];
}
