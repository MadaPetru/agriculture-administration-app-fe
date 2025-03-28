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
  ConfirmationModalSharedService
} from "../../shared/components/confirmation-modal/confirmation-modal-shared.service";
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
import {MenuValue} from "../../shared/model/menu/menu-value";
import {GalleryComponent} from "../../shared/components/gallery/gallery.component";
import {
  MatDatepickerModule,
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker
} from '@angular/material/datepicker';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from "@angular/forms";
import {MatNativeDateModule} from "@angular/material/core";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {
  StartFinishDatePickerComponent
} from "../../shared/components/start-finish-date-picker/start-finish-date-picker.component";
import {UploadFieldImageRequest} from "../../domains/field/dto/request/upload-field-image-request";
import {ListFieldImageRequest} from "../../domains/field/dto/request/list-field-image-request";
import {ListFieldImageResponse} from "../../domains/field/dto/response/list-field-image-response";
import {GallerySharedService} from "../../shared/components/gallery/gallery-shared.service";
import {ConfirmationModalComponent} from "../../shared/components/confirmation-modal/confirmation-modal.component";
import {FormModel} from "../../shared/model/form/form-model";
import {ListFieldImagePaginatedResponse} from "../../domains/field/dto/response/list-field-image-paginated-response";
import {ConfirmationModalSelector} from "../../shared/confirmation-modal-selector";
import {MatTooltip} from "@angular/material/tooltip";
import {CompareImagesModalComponent} from "../../shared/components/compare-images-modal/compare-images-modal.component";
import {DashboardFinanceComponent} from "../../shared/components/dashboard-finance/dashboard-finance.component";


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
    NgIf,
    GalleryComponent,
    ReactiveFormsModule,
    MatFormField,
    MatDateRangeInput,
    MatDatepickerToggle,
    MatDateRangePicker,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    StartFinishDatePickerComponent,
    MatTooltip,
    DashboardFinanceComponent,
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
  fieldImages: ListFieldImageResponse[] = [];
  showImages: boolean = false;
  requestListFieldImages: ListFieldImageRequest = {
    startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString(),
    endDate: new Date().toISOString(),
    pageable: {
      page: 0,
      size: 3
    }
  };
  currentPageFieldImages: number = 0;
  itemsPerPageForFieldImages: number = 3;
  totalFieldImages: number = 0;
  totalPagesFieldImages: number = 0;

  constructor(
    private route: ActivatedRoute, private fieldService: FieldService, private router: Router, private fieldOperationHistoryService: FieldOperationHistoryService,
    private menuDataFieldPageProvider: MenuDataFieldPageProvider, private dialog: MatDialog, private formSharedService: FormSharedService,
    private confirmationModalSharedService: ConfirmationModalSharedService,
    private gallerySharedService: GallerySharedService
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
    this.subscribeAddForm();
    this.subscribeEditForm();
    this.subscribeImageGalleryDeletePopUpModal();
    this.subscribeConfirmationModalDeleteAction();
  }

// Function to handle previous page navigation
  previousPage() {
    if (this.currentPageFieldImages > 0) {
      this.currentPageFieldImages--;
      this.requestListFieldImages.pageable.page = this.currentPageFieldImages;
      this.propagateImagesField();
    }
  }

// Function to handle next page navigation
  nextPage() {
    if (this.currentPageFieldImages < this.totalPagesFieldImages) {
      this.currentPageFieldImages++;
      this.requestListFieldImages.pageable.page = this.currentPageFieldImages;
      this.propagateImagesField();
    }
  }

  loadImages() {
    this.showImages = true;
  }

  onPaginationChanged(pageEvent: PageEvent) {
    let size = pageEvent.pageSize;
    let page = pageEvent.pageIndex;
    let pageable: PageableRequest = {size: size, page: page};
    this.searchFieldOperationRequest = {pageable: pageable, searchBy: this.farmingLandOperationHistorySearchBy};
    this.searchFieldOperationHistories(this.searchFieldOperationRequest);
  }

  onYearsChangeForListingImages(dateEvent: { startDate: Date | null, endDate: any }) {
    let startDate = dateEvent.startDate?.toISOString();
    let endDate = dateEvent.endDate.toISOString();
    this.requestListFieldImages = {
      startDate: startDate, endDate: endDate, pageable: {
        page: this.currentPageFieldImages,
        size: this.itemsPerPageForFieldImages
      }
    }
    this.propagateImagesField();
  }

  private subscribeImageGalleryDeletePopUpModal() {
    this.gallerySharedService.currentDeletionDetails.pipe(takeUntil(this.unsubscribe))
      .subscribe(deletionDetails => {
        if (deletionDetails === '') return;
        this.dialog.open(ConfirmationModalComponent, {
          data: {
            identifier: deletionDetails.id,
            valueToDisplayForModal: deletionDetails.fileName,
            entity: EntitySelector.IMAGE_FIELD_OPERATION,
            modalType: ConfirmationModalSelector.DELETION
          }
        });
      });
  }


  subscribeConfirmationModalDeleteAction() {
    this.confirmationModalSharedService.currentObjectToDelete.pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (model: any) => {
          if (!model) return;
          if (model.entity === EntitySelector.FIELD_OPERATION.valueOf()) {
            this.deleteFieldOperationHistory(model.identifier).subscribe(() => {
              this.searchFieldOperationHistories(this.searchFieldOperationRequest);
            });
          }
          if (model.entity === EntitySelector.IMAGE_FIELD_OPERATION.valueOf()) {
            this.fieldService.deleteImagesField(model.identifier).subscribe(() => {
              this.propagateImagesField();
            })
            ;
          }
        },
        error: (response: any) => {
          console.log(response);
        }
      });
  }


  subscribeAddForm() {
    this.formSharedService.currentFormValue.pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (model: any) => {
          if (model.entity === EntitySelector.FIELD_OPERATION.valueOf()) {
            model.object.farmingLandId = <number>this.field?.id;
            this.saveFieldOperationHistory(model.object).subscribe(() => {
              this.searchFieldOperationHistories(this.searchFieldOperationRequest);
            });
            return;
          }
          if (model.entity === EntitySelector.IMAGE_FIELD_OPERATION.valueOf()) {
            let id = <number>this.field?.id;
            let requestForUpload: UploadFieldImageRequest = {
              at: model.object.at,
              images: model.object.images
            };
            this.fieldService.uploadImageField(requestForUpload, id).subscribe(() => {
              this.propagateImagesField();
            });
          }
        },
        error: (response: any) => {
          console.log(response);
        }
      });
  }

  propagateImagesField() {
    this.fieldImages = [];
    this.fieldService.listImagesField(this.requestListFieldImages, <number>this.field?.id).subscribe(
      (response: ListFieldImagePaginatedResponse) => {
        this.fieldImages = response.content;
        this.totalFieldImages = response.page.totalElements;
        this.totalPagesFieldImages = response.page.totalPages;
      }
    );
  }

  subscribeEditForm() {
    this.formSharedService.currentFormValueForEdit.pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (model: FormModel) => {
          if (model.entity === EntitySelector.FIELD_OPERATION.valueOf()) {
            this.updateFieldOperationHistory(model.object).subscribe(() => {
              this.searchFieldOperationHistories(this.searchFieldOperationRequest);
            });
          }
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

  deleteFieldOperationHistory(id: any) {
    return this.fieldOperationHistoryService.deleteFieldOperationHistory(id);
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
        },
        error: () => {
          this.router.navigate(['/error'])
        }
      }
    );
  }

  openImageCompareModal() {
    this.dialog.open(CompareImagesModalComponent, {
      data: {
        images: this.fieldImages
      }
    });
  }

  TableOperationsHistoryProvider = TableOperationsHistoryProvider;
  protected readonly EntitySelector = EntitySelector;
}
