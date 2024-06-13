import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MenuGroup} from "../../model/menu/menu-group";

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
  @Input({alias: 'inputMenuGroups'}) menuGroups: MenuGroup[] = new Array<MenuGroup>;

  onClickCallFunction(menuValueMethodToBeCalled: Function | undefined): void {
    if (menuValueMethodToBeCalled) {
      menuValueMethodToBeCalled();
    }
  }
}
