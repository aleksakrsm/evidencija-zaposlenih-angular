import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: '<p>SILAB AK 2024</p>',
  styles: [
    `
      p {
        position: fixed;
        bottom: 0;
        color: gray;
        border-top: 1px solid gray;
        padding: 1rem;
        margin: 0 2rem;
        text-align: center;
      }
    `,
  ]
})
export class FooterComponent {

}
