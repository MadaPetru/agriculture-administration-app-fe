import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MenuGroup} from "../../model/menu/menu-group";
import {MenuValue} from "../../model/menu/menu-value";

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

  onClickCallFunction(menuValueMethodToBeCalled: Function | undefined): void {
    if (menuValueMethodToBeCalled) {
      menuValueMethodToBeCalled();
    }
  }

  toggleSideBar() {
    // this.isSidebarExpanded = !this.isSidebarExpanded;
  }
}
