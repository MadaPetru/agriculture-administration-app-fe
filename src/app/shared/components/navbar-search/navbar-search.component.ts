import {Component, Input, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {NavbarSearchSharedService} from "./navbar-search-shared.service";
import {FormsModule} from "@angular/forms";
import {AuthenticationUtils} from "../../authentication-utils";
import {ThemeUtils} from "../../theme-utils";
import {ThemeSelector} from "../../theme-selector";

@Component({
  selector: 'app-navbar-search',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './navbar-search.component.html',
  styleUrl: './navbar-search.component.css'
})
export class NavbarSearchComponent implements OnInit{

  username?: string;
  valueFromSearchInput: string = '';
  iconBasedOnCurrentTheme = 'bx-sun';
  @Input({alias: "inputSearchIsVisible"}) searchIsVisible = false;

  constructor(private navbarSearchSharedService: NavbarSearchSharedService) {
    this.username = AuthenticationUtils.getUsername();
  }

  ngOnInit(): void {
        let currentTheme = ThemeUtils.currentTheme();
        if(currentTheme == ThemeSelector.DARK){
          this.iconBasedOnCurrentTheme = 'bx-moon';
        }
        if(currentTheme == ThemeSelector.LIGHT){
          this.iconBasedOnCurrentTheme = 'bx-sun';
        }
    }

  emitSearchValue() {
    this.navbarSearchSharedService.updateFormValue(this.valueFromSearchInput);
  }

  toggleTheme() {
    ThemeUtils.toggleTheme();
  }
}
