import {Component, OnDestroy, OnInit} from '@angular/core';
import {FieldResponse} from "../../domains/field/dto/response/field-response";
import {MenuGroup} from "../../shared/model/menu/menu-group";
import {ActivatedRoute, Router} from "@angular/router";
import {MenuDataFieldPageProvider} from "../../shared/provider/menu/menu-data-field-page-provider";
import {PaginatorComponent} from "../../shared/components/paginator/paginator.component";
import {TableComponent} from "../../shared/components/table/table.component";
import {NgForOf} from "@angular/common";
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
import {FormAttributeProvider} from "../../shared/provider/form/form-attribute-provider";
import {FieldOperationHistoryService} from "../../domains/field-operation-history/field-operation-history-service";
import {Subject, takeUntil} from "rxjs";
import {
  CreateFieldOperationHistory
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
    MatButton
  ],
  templateUrl: './field-page.component.html',
  styleUrls: ['./field-page.component.css', '../../shared/shared.css']
})
export class FieldPageComponent implements OnInit, OnDestroy {
  field?: FieldResponse;
  totalNumberOfOperations: number = 0;
  menuGroups: MenuGroup[] = this.menuDataFieldPageProvider.getMenuGroupsForFieldPage();
  unsubscribe = new Subject<void>();
  pageable: PageableRequest = {size: 10, page: 0};
  farmingLandOperationHistorySearchBy: SearchByFieldOperationHistoryRequest = {farmingLandId: this.field != null ? this.field.id : -1};
  searchFieldOperationRequest: SearchFieldOperationHistoriesRequest = {
    pageable: this.pageable,
    searchBy: this.farmingLandOperationHistorySearchBy
  };
  operationHistories: TableOperationHistory[] = [];

  constructor(
    private route: ActivatedRoute, private fieldService: FieldService, private router: Router, private fieldOperationHistoryService: FieldOperationHistoryService,
    private menuDataFieldPageProvider: MenuDataFieldPageProvider, private dialog: MatDialog, private formSharedService: FormSharedService,
    private confirmationModalSharedService: DeleteConfirmationModalSharedService
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
          this.deleteFieldOperationHistory(identifier).subscribe(() => {
            this.searchFieldOperationHistories(this.searchFieldOperationRequest);
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
        next: (request: CreateFieldOperationHistory) => {
          request.farmingLandId = <number>this.field?.id;
          this.saveFieldOperationHistory(request).subscribe(() => {
            this.searchFieldOperationHistories(this.searchFieldOperationRequest);
          });
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
            version:operationHistory.version,
            farmingLandId:operationHistory.farmingLandId
          });
        })
      });
  }

  deleteFieldOperationHistory(id: any) {
    return this.fieldOperationHistoryService.deleteFieldOperationHistory(id);
  }

  onSaveNewOperationHistory() {
    this.dialog.open(FormComponent, {
      data: {
        title: 'Add new operation history',
        attributes: FormAttributeProvider.getAttributesForOperationForm(),
        type: 'operation'
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
        },
        error: () => {
          this.router.navigate(['/error'])
        }
      }
    );
  }

  TableOperationsHistoryProvider = TableOperationsHistoryProvider;
}
