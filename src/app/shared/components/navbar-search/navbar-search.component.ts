import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {NavbarSearchSharedService} from "./navbar-search-shared.service";
import {FormsModule} from "@angular/forms";

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

  valueFromSearchInput: string = '';
  @Input({alias: "inputSearchIsVisible"}) searchIsVisible = false;

  constructor(private navbarSearchSharedService: NavbarSearchSharedService) {
  }

  emitSearchValue() {
    this.navbarSearchSharedService.updateFormValue(this.valueFromSearchInput);
  }
}
