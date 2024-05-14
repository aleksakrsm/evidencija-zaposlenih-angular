import { Component } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { RegistrationRequest } from '../../domain/registrationRequest.domain';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-provide-email-adress',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="publicView">
      <p>Provide Your email adress</p>
      <label for="email">Adress:</label>
      <input type="email" name="email" id="email" [formControl]="emailInput" />
      <br />
      <br />
      <button
        type="button"
        (click)="sendRegisterRequest()"
        [disabled]="!emailInput.valid"
      >
        Send link
      </button>
    </div>
  `,
  styles: [
    `
      label {
        display: block;
        margin-top: 1em;
      }

      input:invalid {
        background-color: white;
        border: none;
        outline: 2px solid red;
        border-radius: 5px;
        accent-color: gold;
      }
    `,
  ],
})
export class ProvideEmailAdressComponent {
  constructor(private usersService: UsersService) {}
  email: string = '';
  emailInput = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });

  sendRegisterRequest() {
    this.email = this.emailInput.getRawValue().trim();
    let regReq: RegistrationRequest = {
      email: this.email,
      link: this.getContextPath() + `/account/registrationCheck`, //ovo promeniti da ne bi uvek slalo localhost4200
      randomString: this.generateRandomString(this.generateRandomNumber(5, 10)),
    };
    this.usersService.sendEmailgetToken(regReq).subscribe((x) => {
      this.usersService.regMail = regReq.email;
    });
  }

  getContextPath(): string {
    return window.location.origin;
  }

  generateRandomString(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
