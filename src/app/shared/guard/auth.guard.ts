import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {KeycloakService} from "../service/keycloak.service";

export const authGuard: CanActivateFn = () => {
  const route = inject(Router);
  const keycloakService = inject(KeycloakService);
  if (keycloakService.keycloak?.isTokenExpired()) {
    route.navigate(['login']);
    return false;
  }
  return true;
};
