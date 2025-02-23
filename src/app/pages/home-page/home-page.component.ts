import {Component, OnInit} from '@angular/core';
import {MenuComponent} from "../../shared/components/menu/menu.component";
import {CommonModule} from "@angular/common";
import {NavbarSearchComponent} from "../../shared/components/navbar-search/navbar-search.component";
import {CardComponent} from "../../shared/components/card/card.component";
import {MenuDataHomePageProvider} from "../../shared/provider/menu/menu-data-home-page-provider";
import {PaginatorComponent} from "../../shared/components/paginator/paginator.component";
import {FarmingLandStatisticsService} from "../../domains/farming-lang-statistics/farming-land-statistics.service";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {
  StartFinishYearDatePickerComponent
} from "../../shared/components/start-finish-year-date-picker/start-finish-year-date-picker.component";
import {MenuValue} from "../../shared/model/menu/menu-value";
import {DashboardFinanceComponent} from "../../shared/components/dashboard-finance/dashboard-finance.component";


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MenuComponent, CommonModule, NavbarSearchComponent, CardComponent, PaginatorComponent, MatFormField, MatInput, StartFinishYearDatePickerComponent, DashboardFinanceComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css', '../../shared/shared.css']
})
export class HomePageComponent implements OnInit {

  numberOfHaFieldsAdministrated?: number;
  menuValues: MenuValue[] = MenuDataHomePageProvider.getMenuGroups();

  ngOnInit(): void {
    this.initNumberOfHaFieldsAdministrated();
  }

  initNumberOfHaFieldsAdministrated() {
    this.farmingLandStatisticsService.haAdministrated().subscribe((number) => {
      this.numberOfHaFieldsAdministrated = number;
    })
  }

  constructor(private farmingLandStatisticsService: FarmingLandStatisticsService) {
  }
}
