import { Injectable } from '@angular/core';
// import * as jwt_decode from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JWTTokenService {

  private getExpiryTime(decodedToken: any) {
    return decodedToken ? decodedToken?.['exp'] : null;
  }

  isTokenValid(token: string): boolean {
    try {
      let decodedToken: any = jwtDecode(token);
      let expirationDate = new Date(0);

      let expDateSecondsString: string | null =
        this.getExpiryTime(decodedToken);

      let expDateSeconds: number = -1;
      if (expDateSecondsString)
        expDateSeconds = Number.parseInt(expDateSecondsString);
      expirationDate.setUTCSeconds(decodedToken.exp);

      let currentDate = new Date();
      return expirationDate > currentDate;
    } catch (error) {
      console.log('problems');
      // If an error occurs during decoding, the token is not valid
      return false;
    }
  }
}
