import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationUtils} from "../authentication-utils";

export const authGuard: CanActivateFn = () => {
  const route = inject(Router);
  if(AuthenticationUtils.isAdmin()){
    if (!AuthenticationUtils.isAuthenticated()) {
      route.navigate(['/login']);
      return false;
    }
    route.navigate(['/admin'])
    return true;
  }
  if (!AuthenticationUtils.isAuthenticated()) {
    route.navigate(['/login']);
    return false;
  }
  return true;
};
