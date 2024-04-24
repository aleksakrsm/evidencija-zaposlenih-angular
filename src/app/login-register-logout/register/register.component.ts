import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmedPassword } from '../../myValidators/myCustomValidatorFunctions';
import { UsersService } from '../../service/users.service';
import { Router } from '@angular/router';
import { RegistratingUser } from '../../domain/user.domain';
import { catchError } from 'rxjs';
import { LocalStorageService } from '../../service/localStorage.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  template: `
  <h2>Register form</h2>
  <form [formGroup]="registrationGroup">
    <div>
      <label for="firstname">Firstname: </label>
      <input
        type="text"
        name="firstname"
        id="firstname"
        formControlName="firstname"
      />
    </div>
    <div *ngIf="registrationGroup.get('firstname')?.errors?.['required']">
      firstname is required.
    </div>
    <br>
    <div>
      <label for="lastname">Lastname: </label>
      <input
        type="text"
        name="lastname"
        id="lastname"
        formControlName="lastname"
      />
    </div>
    <div *ngIf="registrationGroup.get('lastname')?.errors?.['required']">
    lastname is required.
    </div>
    <br>
    <div>
      <label for="username">Username: </label>
      <input
        type="text"
        name="username"
        id="username"
        formControlName="username"
      />
    </div>
    <div *ngIf="registrationGroup.get('username')?.errors?.['required']">
      username is required.
    </div>
    <br>
    <div>
      <label for="password">Password: </label>
      <input
        type="password"
        name="password"
        id="password"
        formControlName="password"
      />
    </div>
    <div *ngIf="registrationGroup.get('password')?.errors?.['required']">
      password is required.
    </div>
    <br />
    <div>
      <label for="confirmPassword">Confirm password: </label>
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        formControlName="confirmPassword"
      />
    </div>
    <div *ngIf="registrationGroup.get('confirmPassword')?.errors?.['required']">
    confirmPassword is required.
    </div>
    <div *ngIf="registrationGroup?.errors?.['password not confirmed']">
    confirmPassword and password must match
    </div>
    <br />
    <input type="button" value="Register" (click)="register()" [disabled]="registrationGroup.valid == false" />
  </form>
`,
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private usersService: UsersService = inject(UsersService);
  private router: Router = inject(Router);
  constructor(private formBuilder: FormBuilder,private localStorageService: LocalStorageService){}
  registrationGroup = this.formBuilder.group({
    firstname:this.formBuilder.control("",{ nonNullable: true, validators: [Validators.required] }),
    lastname:this.formBuilder.control("",{ nonNullable: true, validators: [Validators.required] }),
    username:this.formBuilder.control("",{ nonNullable: true, validators: [Validators.required] }),
    password:this.formBuilder.control("",{ nonNullable: true, validators: [Validators.required] }),
    confirmPassword:this.formBuilder.control("",{ nonNullable: true, validators: [Validators.required] }),
  },{validators:[confirmedPassword()]});
  
  register() {
    let firstname = this.registrationGroup.get("firstname")?.getRawValue();
    let lastname = this.registrationGroup.get("lastname")?.getRawValue();
    let username = this.registrationGroup.get("username")?.getRawValue();
    let email = this.usersService.regMail;
    let password = this.registrationGroup.get("password")?.getRawValue();
    let user : RegistratingUser = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      password:password
    }
    this.usersService
    .register(user)
    .pipe(
      catchError((err) => {
        throw 'error in source. Details: ' + JSON.stringify(err);
      })
    )
    .subscribe({
      next: (x) => {
        this.localStorageService.set("userToken",x.token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(JSON.stringify(err))
      }
    });

  }
}
