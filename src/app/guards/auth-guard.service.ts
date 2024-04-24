import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { PermissionsService } from "../service/permissions.service";
import { LocalStorageService } from "../service/localStorage.service";

// @Injectable({
//     providedIn: 'root',
//   })
//   export class AuthGuardService {
//   }
  export const canActivateTokenGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) => {
    let canActivate = false;
    canActivate = inject(PermissionsService).canActivate(inject(LocalStorageService).get("userToken"));
    if(!canActivate){
        inject(Router).navigate(['/account']);
    }
    return canActivate;
  };