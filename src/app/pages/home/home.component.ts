import { Component } from '@angular/core';
import { HeaderComponent } from '../../components.layout/header/header.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../components.layout/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  template: `
    <app-header></app-header>
    <div class="body">
      <router-outlet></router-outlet>
    </div>
    <app-footer></app-footer>
  `,
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
