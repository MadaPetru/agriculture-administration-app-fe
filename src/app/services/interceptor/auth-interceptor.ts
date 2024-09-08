import {HttpHandler, HttpHeaders, HttpInterceptor, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {KeycloakService} from "../keycloack/keycloak.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: KeycloakService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.auth.keycloak?.token;
    if(token) {
      const authReq = req.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`
        })
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
