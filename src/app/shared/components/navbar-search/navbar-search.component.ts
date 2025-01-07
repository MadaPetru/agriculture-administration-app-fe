import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {NavbarSearchSharedService} from "./navbar-search-shared.service";
import {FormsModule} from "@angular/forms";
import {AuthenticationUtils} from "../../authentication-utils";

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
export class NavbarSearchComponent {

  username?: string;
  valueFromSearchInput: string = '';
  @Input({alias: "inputSearchIsVisible"}) searchIsVisible = false;

  constructor(private navbarSearchSharedService: NavbarSearchSharedService) {
    this.username = AuthenticationUtils.getUsername();
  }

  emitSearchValue() {
    this.navbarSearchSharedService.updateFormValue(this.valueFromSearchInput);
  }
}
