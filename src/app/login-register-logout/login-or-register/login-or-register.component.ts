import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-or-register',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h2>Login or Register</h2>
    <div>
      <a routerLink="/account/login"><input type="button" value="Login" /></a>
      <br />
      <a routerLink="/account/register"><input type="button" value="Register" /></a>
    </div>
  `,
  styleUrl: './login-or-register.component.scss',
})
export class LoginOrRegisterComponent {}
