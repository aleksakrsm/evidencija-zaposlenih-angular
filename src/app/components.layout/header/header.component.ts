import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  template: `
  <ul>
    <li><a routerLink="/home" routerLinkActive="active" >Home</a></li>
    <li><a routerLink="/home/employees" routerLinkActive="active" >Employees</a></li>
    <li><a routerLink="/home/subjects" routerLinkActive="active" >Subjects</a></li>
    <li><a routerLink="/home/departments" routerLinkActive="active" >Departments</a></li>
    <!-- <li><a routerLink="*" routerLinkActive="active" >Titles</a></li> -->
    <li><a routerLink="/home/reports" routerLinkActive="active" >Reports</a></li>
    <li><a routerLink="/logout" routerLinkActive="active" >Logout</a></li>
  </ul>
`,
  styles: [
    `
      ul {
        margin: 0;
        padding: 1rem;
        background-color: blue;
        list-style-type: none;
        display: flex;
        flex-direction: row;
        gap: 1rem;
      }

      a {
        color: white;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    `,
  ]
})
export class HeaderComponent {

}
