import {Component} from '@angular/core';
import {MenuComponent} from "../../shared/components/menu/menu.component";
import {CommonModule} from "@angular/common";
import {NavbarSearchComponent} from "../../shared/components/navbar-search/navbar-search.component";
import {CardComponent} from "../../shared/components/card/card.component";
import {MenuGroup} from "../../shared/model/menu/menu-group";
import {MenuDataHomePageProvider} from "../../shared/provider/menu/menu-data-home-page-provider";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MenuComponent, CommonModule, NavbarSearchComponent, CardComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent{
  menuGroups:MenuGroup[] = MenuDataHomePageProvider.getMenuGroups();

}
