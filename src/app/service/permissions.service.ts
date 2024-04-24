import { Injectable } from '@angular/core';
import { JWTTokenService } from './jwtToken.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(private jwtService: JWTTokenService) {}

  canActivate(token: string | null): boolean {
    let canActivate: boolean = false;
    if (token) canActivate = this.jwtService.isTokenValid(token);
    return canActivate;
  }
}
