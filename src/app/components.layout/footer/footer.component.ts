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
        left: 50%;
        // transform: translateX(-50%);
        // width: 80%; /* Adjust width as needed */
        // margin: 0 2rem;
        text-align: center;
        // left: 0;
        // width: 100%;
        background-color: #f9f9f9; /* Adjust background color as needed */
        margin: 0;
      }
      p {
        // position: fixed;
        // bottom: 0;
        left: 0;
        width: 100%;
        background-color: #f9f9f9; /* Adjust background color as needed */
        margin: 0;
        // color: gray;
        // border-top: 1px solid gray;
        // padding: 1rem;
        // text-align: center;
      }
    `,
  ],
})
export class FooterComponent {}
