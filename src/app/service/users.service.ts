import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  UserToken,
  AuthenticatingUser,
  RegistratingUser,
} from '../domain/user.domain';
import { RegistrationRequest } from '../domain/registrationRequest.domain';
import { Jwt } from '../domain/Jwt';

const USERS_API_URL = 'http://localhost:8080/webapp/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  regMail: string = '';

  public sendEmailgetToken(regReq: RegistrationRequest): Observable<Jwt> {
    const url = USERS_API_URL + '/sendRegistrationLink';
    const headers = { 'Content-Type': 'application/json' };
    const body = `{"email":"${regReq.email}","randomString":"${regReq.randomString}","link":"${regReq.link}"}`;
    return this.http.post<Jwt>(url, body, { headers });
  }

  public isLinkValid(token: string,email:string): Observable<boolean> {
    const url = USERS_API_URL + '/checkLink?token=' + token+'&email='+email;
    return this.http.get<boolean>(url);
  }

  public authenticate(user: AuthenticatingUser): Observable<UserToken> {
    const url = USERS_API_URL + '/authenticate';
    const headers = { 'Content-Type': 'application/json' };
    const body = `{"username":"${user.username}","password":"${user.password}"}`;
    return this.http.post<UserToken>(url, body, { headers });
  }

  public register(user: RegistratingUser): Observable<UserToken> {
    const url = USERS_API_URL + '/register';
    const headers = { 'Content-Type': 'application/json' };
    const body = `{"firstname":"${user.firstname}","lastname":"${user.lastname}","username":"${user.username}","email":"${user.email}","password":"${user.password}"}`;
    return this.http.post<UserToken>(url, body, { headers });
  }

  public logout() {

  }
}
