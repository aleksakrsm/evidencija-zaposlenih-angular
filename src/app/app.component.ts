import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  template: `
  <router-outlet>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Evidencija zaposlenih';
}
