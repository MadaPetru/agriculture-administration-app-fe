import {Component, OnDestroy, OnInit} from '@angular/core';
import {FieldResponse} from "../../domains/field/dto/response/field-response";
import {ActivatedRoute, Router} from "@angular/router";
import {MenuDataFieldPageProvider} from "../../shared/provider/menu/menu-data-field-page-provider";
import {PaginatorComponent} from "../../shared/components/paginator/paginator.component";
import {TableComponent} from "../../shared/components/table/table.component";
import {NgForOf, NgIf} from "@angular/common";
import {NavbarSearchComponent} from "../../shared/components/navbar-search/navbar-search.component";
import {MenuComponent} from "../../shared/components/menu/menu.component";
import {CardComponent} from "../../shared/components/card/card.component";
import {TableOperationsHistoryProvider} from '../../shared/provider/table/field-operations-history-provider';
import {FieldService} from "../../domains/field/field-service";
import {MatButton} from "@angular/material/button";
import {PageEvent} from "@angular/material/paginator";
import {PageableRequest} from "../../shared/dto/request/pageable-request";
import {MatDialog} from "@angular/material/dialog";
import {FormComponent} from "../../shared/components/form/form.component";
import {FieldOperationHistoryService} from "../../domains/field-operation-history/field-operation-history-service";
import {map, Observable, Subject, takeUntil} from "rxjs";
import {
  CreateFieldOperationHistory, isCreateFieldOperationHistory
} from "../../domains/field-operation-history/dto/request/create-field-operation-history";
import {FormSharedService} from "../../shared/components/form/form-shared-service";
import {
  SearchFieldOperationHistoriesRequest
} from "../../domains/field-operation-history/dto/request/search-field-operation-histories-request";
import {
  FieldOperationHistoryPaginatedResponse
} from "../../domains/field-operation-history/dto/response/field-operation-history-paginated-response";
import {TableOperationHistory} from "../../shared/model/table/operations-history/table-operation-history";
import {
  DeleteConfirmationModalSharedService
} from "../../shared/components/delete-confirmation-modal/delete-confirmation-modal-shared-service";
import {
  SearchByFieldOperationHistoryRequest
} from "../../domains/field-operation-history/dto/request/search-by-field-operation-history-request";
import {
  UpdateFieldOperationHistory
} from "../../domains/field-operation-history/dto/request/update-field-operation-history";
import {EntitySelector} from "../../shared/entity-selector";
import {
  StartFinishYearDatePickerComponent
} from "../../shared/components/start-finish-year-date-picker/start-finish-year-date-picker.component";
import {Chart} from "chart.js";
import {
  FarmingLandStatisticsProfitabilityPerOperationAndYearResponse
} from "../../domains/farming-lang-statistics/dto/response/farming-land-statistics-profitability-per-operation-and-year-response";
import {
  FarmingLandStatisticsProfitabilityPerYearResponse
} from "../../domains/farming-lang-statistics/dto/response/farming-land-statistics-profitability-per-year-response";
import {FarmingLandStatisticsService} from "../../domains/farming-lang-statistics/farming-land-statistics.service";
import {MenuValue} from "../../shared/model/menu/menu-value";


@Component({
  selector: 'app-field-page',
  standalone: true,
  imports: [
    CardComponent,
    MenuComponent,
    NavbarSearchComponent,
    NgForOf,
    TableComponent,
    PaginatorComponent,
    MatButton,
    StartFinishYearDatePickerComponent,
    NgIf
  ],
  templateUrl: './field-page.component.html',
  styleUrls: ['./field-page.component.css', '../../shared/shared.css']
})
export class FieldPageComponent implements OnInit, OnDestroy {
  field?: FieldResponse;
  totalNumberOfOperations: number = 0;
  menuValues: MenuValue[] = this.menuDataFieldPageProvider.getMenuValuesForFieldPage();
  unsubscribe = new Subject<void>();
  pageable: PageableRequest = {size: 10, page: 0};
  farmingLandOperationHistorySearchBy: SearchByFieldOperationHistoryRequest = {farmingLandId: this.field != null ? this.field.id : -1};
  searchFieldOperationRequest: SearchFieldOperationHistoriesRequest = {
    pageable: this.pageable,
    searchBy: this.farmingLandOperationHistorySearchBy
  };
  operationHistories: TableOperationHistory[] = [];
  lineChart?: Chart;
  barChartForCostPerOperationForCertainYears?: Chart;
  barChartForRevenuePerOperationForCertainYears?: Chart;

  constructor(
    private route: ActivatedRoute, private fieldService: FieldService, private router: Router, private fieldOperationHistoryService: FieldOperationHistoryService,
    private menuDataFieldPageProvider: MenuDataFieldPageProvider, private dialog: MatDialog, private formSharedService: FormSharedService,
    private confirmationModalSharedService: DeleteConfirmationModalSharedService, private farmingLandStatisticsService: FarmingLandStatisticsService
  ) {
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngOnInit(): void {
    let title = this.route.snapshot.paramMap.get('title');
    title = title ? title : '';
    this.findFieldByTitle(title);
    this.subscribeFieldAddForm();
    this.subscribeFieldEditForm();
    this.subscribeConfirmationModalDeleteAction();
  }

  onPaginationChanged(pageEvent: PageEvent) {
    let size = pageEvent.pageSize;
    let page = pageEvent.pageIndex;
    let pageable: PageableRequest = {size: size, page: page};
    this.searchFieldOperationRequest = {pageable: pageable, searchBy: this.farmingLandOperationHistorySearchBy};
    this.searchFieldOperationHistories(this.searchFieldOperationRequest);
  }


  subscribeConfirmationModalDeleteAction() {
    this.confirmationModalSharedService.currentIdentifierToDelete.pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (identifier: any) => {
          if (!identifier) return;
          this.deleteFieldOperationHistory('adi', identifier).subscribe(() => {
            this.searchFieldOperationHistories(this.searchFieldOperationRequest);
            this.initCharts();
          });
        },
        error: (response: any) => {
          console.log(response);
        }
      });
  }


  subscribeFieldAddForm() {
    this.formSharedService.currentFormValue.pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (request: any) => {
          if(isCreateFieldOperationHistory(request)) {
            request.farmingLandId = <number>this.field?.id;
            this.saveFieldOperationHistory(request).subscribe(() => {
              this.searchFieldOperationHistories(this.searchFieldOperationRequest);
              this.initCharts();
            });
          }
          console.log(request);
        },
        error: (response: any) => {
          console.log(response);
        }
      });
  }

  subscribeFieldEditForm() {
    this.formSharedService.currentFormValueForEdit.pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (request: UpdateFieldOperationHistory) => {
          this.updateFieldOperationHistory(request).subscribe(() => {
            this.searchFieldOperationHistories(this.searchFieldOperationRequest);
            this.initCharts();
          });
        },
        error: (response: any) => {
          console.log(response);
        }
      });
  }


  saveFieldOperationHistory(request: CreateFieldOperationHistory) {
    return this.fieldOperationHistoryService.saveFieldOperationHistory(request);
  }

  updateFieldOperationHistory(request: UpdateFieldOperationHistory) {
    return this.fieldOperationHistoryService.updateFieldOperationHistory(request);
  }


  searchFieldOperationHistories(request: SearchFieldOperationHistoriesRequest) {
    this.fieldOperationHistoryService.searchFieldOperationHistories(request).subscribe(
      (response: FieldOperationHistoryPaginatedResponse) => {
        let operationHistories = response.content;
        this.totalNumberOfOperations = response.page.totalElements;
        this.operationHistories = [];
        operationHistories.forEach(operationHistory => {
          this.operationHistories.push({
            date: operationHistory.appliedAt,
            estimatedCost: operationHistory.estimatedCost,
            estimatedHarvest: operationHistory.estimatedHarvest,
            estimatedHarvestMeasureType: operationHistory.estimatedHarvestMeasureType,
            estimatedCostCurrencyType: operationHistory.estimatedCostCurrencyType,
            operationDescription: operationHistory.operation,
            id: operationHistory.id,
            estimatedRevenue: operationHistory.estimatedRevenue,
            estimatedRevenueCurrencyType: operationHistory.estimatedRevenueCurrencyType,
            typeOfPlant: operationHistory.plantType,
            version: operationHistory.version,
            farmingLandId: operationHistory.farmingLandId
          });
        })
      });
  }

  deleteFieldOperationHistory(issuer: any, id: any) {
    return this.fieldOperationHistoryService.deleteFieldOperationHistory(issuer, id);
  }

  onSaveNewOperationHistory() {
    this.dialog.open(FormComponent, {
      data: {
        title: 'Add new operation history',
        type: EntitySelector.FIELD_OPERATION
      }
    });
  }

  onUploadImage() {
    this.dialog.open(FormComponent, {
      data: {
        title: 'Upload image',
        type: EntitySelector.IMAGE_FIELD_OPERATION
      }
    });
  }


  findFieldByTitle(title: string) {
    this.fieldService.findFieldByTitle(title).subscribe({
        next: (response: FieldResponse) => {
          this.field = response;
          this.farmingLandOperationHistorySearchBy = {farmingLandId: this.field != null ? this.field.id : -1};
          this.searchFieldOperationRequest = {
            pageable: this.pageable,
            searchBy: this.farmingLandOperationHistorySearchBy
          };
          this.searchFieldOperationHistories(this.searchFieldOperationRequest);
          this.initCharts();
        },
        error: () => {
          this.router.navigate(['/error'])
        }
      }
    );
  }

  initCharts() {
    this.buildChartForProfitabilityForCertainIntervalOfYears('adi', 2024, 2024);
    this.buildChartForCostPerOperationForCertainIntervalOfYears('adi', 2024, 2024);
    this.buildChartForRevenuePerOperationForCertainIntervalOfYears('adi', 2024, 2024);
  }

  onYearsIntervalChangedForRevenues(yearsIntervalEvent: { startYear: number, endYear: number }) {
    this.buildChartForRevenuePerOperationForCertainIntervalOfYears('adi', yearsIntervalEvent.startYear, yearsIntervalEvent.endYear)
  }

  onYearsIntervalChangedForProfitability(yearsIntervalEvent: { startYear: number, endYear: number }) {
    this.buildChartForProfitabilityForCertainIntervalOfYears('adi', yearsIntervalEvent.startYear, yearsIntervalEvent.endYear)
  }

  onYearsIntervalChangedForCosts(yearsIntervalEvent: { startYear: number, endYear: number }) {
    this.buildChartForCostPerOperationForCertainIntervalOfYears('adi', yearsIntervalEvent.startYear, yearsIntervalEvent.endYear)
  }

  private getValuesForCostPerOperationForCertainIntervalOfYears(createdBy: string, startYear: number, endYear: number) {
    let yDataSet: number[] = [];
    let xValues: string[] = [];
    return this.farmingLandStatisticsService.profitabilityPerYearAndOperationForFarmingLand(createdBy, startYear, endYear, <number>this.field?.id)
      .pipe(
        map((response: FarmingLandStatisticsProfitabilityPerOperationAndYearResponse[]) => {
          response.forEach(data => {
            xValues.push(data.operation);
            yDataSet.push(data.cost);
          });
          return {xValues, yDataSet};
        }));
  }

  private buildChartForCostPerOperationForCertainIntervalOfYears(createdBy: string, startYear: number, endYear: number) {
    let yDataSet: number[] = [];
    let xValues: string[] = [];
    this.farmingLandStatisticsService.profitabilityPerYearAndOperationForFarmingLand(createdBy, startYear, endYear, <number>this.field?.id)
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

  private getValuesForRevenuePerOperationForCertainIntervalOfYears(createdBy: string, startYear: number, endYear: number) {
    let yDataSet: number[] = [];
    let xValues: string[] = [];
    return this.farmingLandStatisticsService.profitabilityPerYearAndOperationForFarmingLand(createdBy, startYear, endYear, <number>this.field?.id)
      .pipe(
        map((response: FarmingLandStatisticsProfitabilityPerOperationAndYearResponse[]) => {
          response.forEach(data => {
            xValues.push(data.operation);
            yDataSet.push(data.revenue);
          });
          return {xValues, yDataSet}
        })
      );
  }

  private buildChartForRevenuePerOperationForCertainIntervalOfYears(createdBy: string, startYear: number, endYear: number) {
    let yDataSet: number[] = [];
    let xValues: string[] = [];
    this.farmingLandStatisticsService.profitabilityPerYearAndOperationForFarmingLand(createdBy, startYear, endYear, <number>this.field?.id)
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

  private buildChartForProfitabilityForCertainIntervalOfYears(createdBy: string, startYear: number, endYear: number) {
    let xDataSet: number[] = [];
    let yDataSet: number[] = [];
    let xValues: number[] = [];
    this.farmingLandStatisticsService.profitabilityPerYearForFarmingLand(createdBy, startYear, endYear, <number>this.field?.id)
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

  private getValuesForChartForProfitabilityForCertainIntervalOfYears(createdBy: string, startYear: number, endYear: number): Observable<{
    xValues: number[],
    xDataSet: number[],
    yDataSet: number[]
  }> {
    return this.farmingLandStatisticsService.profitabilityPerYearForFarmingLand(createdBy, startYear, endYear, <number>this.field?.id)
      .pipe(
        map((response: FarmingLandStatisticsProfitabilityPerYearResponse[]) => {
          const xValues: number[] = [];
          const xDataSet: number[] = [];
          const yDataSet: number[] = [];

          response.forEach(data => {
            xValues.push(data.year);
            xDataSet.push(data.revenue);
            yDataSet.push(data.cost);
          });

          return {xValues, xDataSet, yDataSet};
        })
      );
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

  TableOperationsHistoryProvider = TableOperationsHistoryProvider;
  protected readonly EntitySelector = EntitySelector;
}
