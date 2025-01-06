import {Injectable} from '@angular/core';
import Keycloak from "keycloak-js";
import {UserProfile} from "../model/user/user-profile";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private _keycloak: Keycloak | undefined;
  private _profile: UserProfile | undefined;

  get keycloak() {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: environment.keycloakUrl,
        realm: 'agro-admin',
        clientId: 'agro-admin'
      });
    }
    return this._keycloak;
  }

  get profile(): UserProfile | undefined {
    return this._profile;
  }

  constructor() {
  }

  async init() {
    console.log('adi');
    const authenticated = await this.keycloak?.init({
      onLoad: 'login-required'
    });
    if (authenticated) {
      this._profile = (await this.keycloak?.loadUserProfile()) as UserProfile;
      this._profile.token = this.keycloak?.token;
    }
  }

  login() {
    return this.keycloak?.login({redirectUri: environment.redirectUrl});
  }
}
