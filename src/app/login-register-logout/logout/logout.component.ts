import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../service/localStorage.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Logout page</h2>
    <p>Are you sure?</p>
    <input type="button" value="Yes" (click)="logout()" />
    <br />
    <input type="button" value="No" (click)="back()" />
  `,
  styleUrl: './logout.component.scss',
})
export class LogoutComponent {
  constructor(
    private location: Location,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}
  back() {
    this.location.back();
  }
  logout() {
    this.localStorageService.remove("userToken");
    this.router.navigate(['']);
  }
}
