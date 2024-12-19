import {Component, OnInit} from '@angular/core';
import {MenuComponent} from "../../shared/components/menu/menu.component";
import {CommonModule} from "@angular/common";
import {NavbarSearchComponent} from "../../shared/components/navbar-search/navbar-search.component";
import {CardComponent} from "../../shared/components/card/card.component";
import {MenuDataHomePageProvider} from "../../shared/provider/menu/menu-data-home-page-provider";
import {PaginatorComponent} from "../../shared/components/paginator/paginator.component";
import {Chart} from "chart.js";
import {FarmingLandStatisticsService} from "../../domains/farming-lang-statistics/farming-land-statistics.service";
import {
  FarmingLandStatisticsProfitabilityPerYearResponse
} from "../../domains/farming-lang-statistics/dto/response/farming-land-statistics-profitability-per-year-response";
import {
  FarmingLandStatisticsProfitabilityPerOperationAndYearResponse
} from "../../domains/farming-lang-statistics/dto/response/farming-land-statistics-profitability-per-operation-and-year-response";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {
  StartFinishYearDatePickerComponent
} from "../../shared/components/start-finish-year-date-picker/start-finish-year-date-picker.component";
import {MenuValue} from "../../shared/model/menu/menu-value";


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MenuComponent, CommonModule, NavbarSearchComponent, CardComponent, PaginatorComponent, MatFormField, MatInput, StartFinishYearDatePickerComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css', '../../shared/shared.css']
})
export class HomePageComponent implements OnInit {

  lineChart?: Chart;
  barChartForCostPerOperationForCertainYears?: Chart;
  barChartForRevenuePerOperationForCertainYears?: Chart;
  menuValues: MenuValue[] = MenuDataHomePageProvider.getMenuGroups();

  ngOnInit(): void {
    this.buildChartForProfitabilityForCeratinIntervalOfYears('adi', 2024, 2024);
    this.buildChartForCostPerOperationForCertainIntervalOfYears('adi', 2024, 2024);
    this.buildChartForRevenuePerOperationForCertainIntervalOfYears('adi', 2024, 2024);
  }

  onYearsIntervalChangedForRevenues(yearsIntervalEvent: { startYear: number, endYear: number }) {
    if (this.barChartForRevenuePerOperationForCertainYears != null) {
      this.barChartForRevenuePerOperationForCertainYears.destroy();
    }
    this.buildChartForRevenuePerOperationForCertainIntervalOfYears('adi', yearsIntervalEvent.startYear, yearsIntervalEvent.endYear)
  }

  onYearsIntervalChangedForProfitability(yearsIntervalEvent: { startYear: number, endYear: number }) {
    if (this.lineChart != null) {
      this.lineChart.destroy();
    }
    this.buildChartForProfitabilityForCeratinIntervalOfYears('adi', yearsIntervalEvent.startYear, yearsIntervalEvent.endYear)
  }

  onYearsIntervalChangedForCosts(yearsIntervalEvent: { startYear: number, endYear: number }) {
    if (this.barChartForCostPerOperationForCertainYears != null) {
      this.barChartForCostPerOperationForCertainYears.destroy();
    }
    this.buildChartForCostPerOperationForCertainIntervalOfYears('adi', yearsIntervalEvent.startYear, yearsIntervalEvent.endYear)
  }

  private buildChartForCostPerOperationForCertainIntervalOfYears(createdBy: string, startYear: number, endYear: number) {
    let yDataSet: number[] = [];
    let xValues: string[] = [];
    this.farmingLandStatisticsService.profitabilityPerYearAndOperation(createdBy, startYear, endYear)
      .subscribe((response: FarmingLandStatisticsProfitabilityPerOperationAndYearResponse[]) => {
        response.forEach(data => {
          xValues.push(data.operation);
          yDataSet.push(data.cost);
        });
        this.barChartForCostPerOperationForCertainYears = this.buildBarChartForCost(xValues, yDataSet);
      });
  }

  private buildChartForRevenuePerOperationForCertainIntervalOfYears(createdBy: string, startYear: number, endYear: number) {
    let yDataSet: number[] = [];
    let xValues: string[] = [];
    this.farmingLandStatisticsService.profitabilityPerYearAndOperation(createdBy, startYear, endYear)
      .subscribe((response: FarmingLandStatisticsProfitabilityPerOperationAndYearResponse[]) => {
        response.forEach(data => {
          xValues.push(data.operation);
          yDataSet.push(data.revenue);
        });
        this.barChartForRevenuePerOperationForCertainYears = this.buildBarChartForRevenue(xValues, yDataSet);
      });
  }

  private buildChartForProfitabilityForCeratinIntervalOfYears(createdBy: string, startYear: number, endYear: number) {
    let xDataSet: number[] = [];
    let yDataSet: number[] = [];
    let xValues: number[] = [];
    this.farmingLandStatisticsService.profitabilityPerYear(createdBy, startYear, endYear)
      .subscribe((response: FarmingLandStatisticsProfitabilityPerYearResponse[]) => {
        response.forEach(data => {
          xValues.push(data.year);
          xDataSet.push(data.revenue);
          yDataSet.push(data.cost);
        });
        this.lineChart = this.buildLineChart(xValues, xDataSet, yDataSet);
      });
  }

  constructor(private farmingLandStatisticsService: FarmingLandStatisticsService) {
  }

  buildLineChart(xValues: number[], xDataSet: number[], yDataSet: number[]) {
    return new Chart("all-costs-vs-all-revenue", {
      type: "line",
      data: {
        labels: xValues,
        datasets: [{
          data: xDataSet,
          borderColor: "green",
          fill: false,
          label: 'Roughly profit'
        }, {
          data: yDataSet,
          borderColor: "blue",
          fill: false,
          label: 'Roughly costs'
        }]
      }
    });
  }

  buildBarChartForRevenue(xValues: string[], yDataSet: number[]) {
    return new Chart('operation-type-revenues', {
      type: "bar",
      data: {
        labels: xValues,
        datasets: [{
          data: yDataSet,
          borderColor: "green",
          label: 'Revenue'
        }]
      }
    });
  }

  buildBarChartForCost(xValues: string[], yDataSet: number[]) {
    return new Chart('operation-type-costs', {
      type: "bar",
      data: {
        labels: xValues,
        datasets: [{
          data: yDataSet,
          borderColor: "green",
          label: 'Cost'
        }]
      }
    });
  }
}
