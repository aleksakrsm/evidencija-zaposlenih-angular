import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../service/users.service';
import { CommonModule } from '@angular/common';
import { AuthenticatingUser } from '../../domain/user.domain';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { LocalStorageService } from '../../service/localStorage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
  <div class="publicView">

    <h2>Login form</h2>
    <form [formGroup]="loginGroup">
      <div>
        <label for="username">Username: </label>
        <input
        type="text"
        name="username"
        id="username"
        formControlName="username"
        />
      </div>
      <div *ngIf="loginGroup.get('username')?.errors?.['required']">
        username is required.
      </div>
      <br />
      <div>
        <label for="password">Password: </label>
        <input
        type="password"
        name="password"
        id="password"
        formControlName="password"
        />
      </div>
      <div *ngIf="loginGroup.get('password')?.errors?.['required']">
        password is required.
      </div>
      <br />
      <input type="button" value="Login" (click)="login()" />
    </form>
    </div>
    `,
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private usersService: UsersService = inject(UsersService);
  private router: Router = inject(Router);
  constructor(private formBuilder: FormBuilder,private localStorageService:LocalStorageService) {}
  loginGroup = this.formBuilder.group({
    username: ['', { nonNullable: true, validators: [Validators.required] }],
    password: ['', { nonNullable: true, validators: [Validators.required] }],
  });
  protected myError: any;
  login(): void {
    let username = this.loginGroup.get('username')?.getRawValue();
    let password = this.loginGroup.get('password')?.getRawValue();
    let user: AuthenticatingUser = { username: username, password: password };
    this.localStorageService.remove("userToken");
    this.usersService
      .authenticate(user)
      .pipe(
        catchError((err) => {
          throw 'error in source. Details: ' + err;
        })
      )
      .subscribe({
        next: (x) => {
          this.localStorageService.set("userToken",x.token);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.log(err);
          window.location.reload();
        }
      });
  }
}
