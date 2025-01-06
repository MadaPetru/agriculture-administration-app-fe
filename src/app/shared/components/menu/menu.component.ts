import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MenuValue} from "../../model/menu/menu-value";
import {KeycloakService} from "../../service/keycloak.service";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  @Input({alias: 'inputMenuGroups'}) menuValues: MenuValue[] = new Array<MenuValue>;
  isSidebarExpanded = true;

  constructor(private keycloakService: KeycloakService) {
  }

  onClickCallFunction(menuValueMethodToBeCalled: Function | undefined): void {
    if (menuValueMethodToBeCalled) {
      menuValueMethodToBeCalled();
    }
  }

  logout() {
    this.keycloakService.keycloak.logout();
  }

  toggleSideBar() {
    // this.isSidebarExpanded = !this.isSidebarExpanded;
  }
}
