import {Component, Input, numberAttribute, OnInit} from '@angular/core';
import {
  StartFinishYearDatePickerComponent
} from "../start-finish-year-date-picker/start-finish-year-date-picker.component";
import {
  FarmingLandStatisticsProfitabilityPerOperationAndYearResponse
} from "../../../domains/farming-lang-statistics/dto/response/farming-land-statistics-profitability-per-operation-and-year-response";
import {
  FarmingLandStatisticsProfitabilityPerYearResponse
} from "../../../domains/farming-lang-statistics/dto/response/farming-land-statistics-profitability-per-year-response";
import {Chart} from "chart.js";
import {FarmingLandStatisticsService} from "../../../domains/farming-lang-statistics/farming-land-statistics.service";

@Component({
  selector: 'app-dashboard-finance',
  standalone: true,
  imports: [
    StartFinishYearDatePickerComponent
  ],
  templateUrl: './dashboard-finance.component.html',
  styleUrls: ['./dashboard-finance.component.css', '../../shared.css']
})
export class DashboardFinanceComponent implements OnInit {

  @Input({transform: numberAttribute, alias: 'inputFarmingLandId'}) farmingLandId: number = -1;
  lineChart?: Chart;
  barChartForCostPerOperationForCertainYears?: Chart;
  barChartForRevenuePerOperationForCertainYears?: Chart;

  constructor(private farmingLandStatisticsService: FarmingLandStatisticsService) {
  }

  ngOnInit(): void {
    let actualYear = new Date().getFullYear();
    this.buildChartForProfitabilityForCertainIntervalOfYears(actualYear, actualYear);
    this.buildChartForCostPerOperationForCertainIntervalOfYears(actualYear, actualYear);
    this.buildChartForRevenuePerOperationForCertainIntervalOfYears(actualYear, actualYear);
  }

  onYearsIntervalChangedForRevenues(yearsIntervalEvent: { startYear: number, endYear: number }) {
    this.buildChartForRevenuePerOperationForCertainIntervalOfYears(yearsIntervalEvent.startYear, yearsIntervalEvent.endYear)
  }

  onYearsIntervalChangedForProfitability(yearsIntervalEvent: { startYear: number, endYear: number }) {
    this.buildChartForProfitabilityForCertainIntervalOfYears(yearsIntervalEvent.startYear, yearsIntervalEvent.endYear)
  }

  onYearsIntervalChangedForCosts(yearsIntervalEvent: { startYear: number, endYear: number }) {
    this.buildChartForCostPerOperationForCertainIntervalOfYears(yearsIntervalEvent.startYear, yearsIntervalEvent.endYear)
  }

  private buildChartForCostPerOperationForCertainIntervalOfYears(startYear: number, endYear: number) {
    let yDataSet: number[] = [];
    let xValues: string[] = [];
    if (this.farmingLandId == -1) {
      this.farmingLandStatisticsService.profitabilityPerYearAndOperation(startYear, endYear)
        .subscribe((response: FarmingLandStatisticsProfitabilityPerOperationAndYearResponse[]) => {
          response.forEach(data => {
            xValues.push(data.operation);
            yDataSet.push(data.cost);
          });
          if (this.barChartForCostPerOperationForCertainYears != null) {
            this.barChartForCostPerOperationForCertainYears.destroy();
          }
          this.barChartForCostPerOperationForCertainYears = this.buildBarChartForCost(xValues, yDataSet);
        });
      return;
    }
    this.farmingLandStatisticsService.profitabilityPerYearAndOperationForFarmingLand(startYear, endYear, this.farmingLandId)
      .subscribe((response: FarmingLandStatisticsProfitabilityPerOperationAndYearResponse[]) => {
        response.forEach(data => {
          xValues.push(data.operation);
          yDataSet.push(data.cost);
        });
        if (this.barChartForCostPerOperationForCertainYears != null) {
          this.barChartForCostPerOperationForCertainYears.destroy();
        }
        this.barChartForCostPerOperationForCertainYears = this.buildBarChartForCost(xValues, yDataSet);
      });
  }

  private buildChartForRevenuePerOperationForCertainIntervalOfYears(startYear: number, endYear: number) {
    let yDataSet: number[] = [];
    let xValues: string[] = [];
    if (this.farmingLandId == -1) {
      this.farmingLandStatisticsService.profitabilityPerYearAndOperation(startYear, endYear)
        .subscribe((response: FarmingLandStatisticsProfitabilityPerOperationAndYearResponse[]) => {
          response.forEach(data => {
            xValues.push(data.operation);
            yDataSet.push(data.revenue);
          });
          if (this.barChartForRevenuePerOperationForCertainYears != null) {
            this.barChartForRevenuePerOperationForCertainYears.destroy();
          }
          this.barChartForRevenuePerOperationForCertainYears = this.buildBarChartForRevenue(xValues, yDataSet);
        });
      return;
    }
    this.farmingLandStatisticsService.profitabilityPerYearAndOperationForFarmingLand(startYear, endYear, this.farmingLandId)
      .subscribe((response: FarmingLandStatisticsProfitabilityPerOperationAndYearResponse[]) => {
        response.forEach(data => {
          xValues.push(data.operation);
          yDataSet.push(data.revenue);
        });
        if (this.barChartForRevenuePerOperationForCertainYears != null) {
          this.barChartForRevenuePerOperationForCertainYears.destroy();
        }
        this.barChartForRevenuePerOperationForCertainYears = this.buildBarChartForRevenue(xValues, yDataSet);
      });
  }

  private buildChartForProfitabilityForCertainIntervalOfYears(startYear: number, endYear: number) {
    let xDataSet: number[] = [];
    let yDataSet: number[] = [];
    let xValues: number[] = [];
    if(this.farmingLandId == -1){
      this.farmingLandStatisticsService.profitabilityPerYear(startYear, endYear)
        .subscribe((response: FarmingLandStatisticsProfitabilityPerYearResponse[]) => {
          response.forEach(data => {
            xValues.push(data.year);
            xDataSet.push(data.revenue);
            yDataSet.push(data.cost);
          });
          if (this.lineChart != null) {
            this.lineChart.destroy();
          }
          this.lineChart = this.buildLineChart(xValues, xDataSet, yDataSet);
        });
    }
    this.farmingLandStatisticsService.profitabilityPerYearForFarmingLand(startYear, endYear, this.farmingLandId)
      .subscribe((response: FarmingLandStatisticsProfitabilityPerYearResponse[]) => {
        response.forEach(data => {
          xValues.push(data.year);
          xDataSet.push(data.revenue);
          yDataSet.push(data.cost);
        });
        if (this.lineChart != null) {
          this.lineChart.destroy();
        }
        this.lineChart = this.buildLineChart(xValues, xDataSet, yDataSet);
      });
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
