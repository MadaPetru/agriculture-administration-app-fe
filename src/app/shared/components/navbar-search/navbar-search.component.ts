import { Component } from '@angular/core';
import {KeycloakService} from "../../../services/keycloack/keycloak.service";

@Component({
  selector: 'app-navbar-search',
  standalone: true,
  imports: [],
  templateUrl: './navbar-search.component.html',
  styleUrl: './navbar-search.component.css'
})
export class NavbarSearchComponent {

  constructor(private keycloakService:KeycloakService) {

  }

  getUserName(){
    let userProfile = this.keycloakService.userProfile;
    return '' + userProfile?.firstName + ' ' + userProfile?.lastName;
  }

  logout(){
    this.keycloakService.logout();
  }
}
