import {Component, OnDestroy, OnInit} from '@angular/core';
import {CardComponent} from "../../shared/components/card/card.component";
import {MenuComponent} from "../../shared/components/menu/menu.component";
import {NavbarSearchComponent} from "../../shared/components/navbar-search/navbar-search.component";
import {NgForOf} from "@angular/common";
import {MenuDataFieldPageProvider} from "../../shared/provider/menu/menu-data-field-page-provider";
import {Card} from "../../shared/model/card/card";
import {RouterLink} from '@angular/router';
import {PageableRequest} from "../../shared/dto/request/pageable-request";
import {SearchFieldsRequest} from "../../domains/field/dto/request/search-fields-request";
import {PaginatorComponent} from "../../shared/components/paginator/paginator.component";
import {PageEvent} from "@angular/material/paginator";
import {FieldPaginatedResponse} from "../../domains/field/dto/response/field-paginated-response";
import {FormComponent} from "../../shared/components/form/form.component";
import {FormSharedService} from "../../shared/components/form/form-shared-service";
import {CreateFieldRequest} from "../../domains/field/dto/request/create-field-request";
import {CardSharedService} from "../../shared/components/card/card-shared-service";
import {MatDialog} from "@angular/material/dialog";
import {
  DeleteConfirmationModalComponent
} from "../../shared/components/delete-confirmation-modal/delete-confirmation-modal.component";
import {Subject, takeUntil} from "rxjs";
import {
  DeleteConfirmationModalSharedService
} from "../../shared/components/delete-confirmation-modal/delete-confirmation-modal-shared-service";
import {FieldService} from "../../domains/field/field-service";
import {FormAttributeProvider} from "../../shared/provider/form/form-attribute-provider";
import {UpdateFieldRequest} from "../../domains/field/dto/request/update-field-request";
import {EntitySelector} from "../../shared/entity-selector";
import {NavbarSearchSharedService} from "../../shared/components/navbar-search/navbar-search-shared.service";
import {MenuValue} from "../../shared/model/menu/menu-value";
import {FormModel} from "../../shared/model/form/form-model";

@Component({
  selector: 'app-fields-page',
  standalone: true,
  imports: [
    CardComponent,
    MenuComponent,
    NavbarSearchComponent,
    NgForOf,
    RouterLink,
    PaginatorComponent,
    FormComponent
  ],
  templateUrl: './fields-page.component.html',
  styleUrls: ['./fields-page.component.css', '../../shared/shared.css']
})
export class FieldsPageComponent implements OnInit, OnDestroy {
  menuValues: MenuValue[] = this.menuDataFieldPageProvider.getMenuValuesForFieldsPage();
  cards = new Array<Card>();
  totalNumberOfCards = 0;
  unsubscribe = new Subject<void>();
  pageable: PageableRequest = {size: 10, page: 0};
  searchFieldsRequest: SearchFieldsRequest = {pageable: this.pageable};

  ngOnInit(): void {
    this.searchFields(this.searchFieldsRequest);
    this.subscribeNavbarSearchInput();
    this.subscribeFieldAddForm();
    this.subscribeFieldEditForm();
    this.subscribeFieldCardEditPopUpModal();
    this.subscribeFieldCardDeletePopUpModal();
    this.subscribeConfirmationModalDeleteAction();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  constructor(private fieldsPageService: FieldService, private menuDataFieldPageProvider: MenuDataFieldPageProvider,
              private formSharedService: FormSharedService, private cardSharedService: CardSharedService, private dialog: MatDialog,
              private confirmationModalSharedService: DeleteConfirmationModalSharedService, private navbarSearchSharedService: NavbarSearchSharedService) {
  }

  onPaginationChanged(pageEvent: PageEvent) {
    let size = pageEvent.pageSize;
    let page = pageEvent.pageIndex;
    this.searchFieldsRequest.pageable = {size: size, page: page};
    this.searchFields(this.searchFieldsRequest);
  }

  private subscribeConfirmationModalDeleteAction() {
    this.confirmationModalSharedService.currentObjectToDelete.pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (model: any) => {
          if (!model.identifier) return;
          if (model.entity === EntitySelector.FIELD.valueOf()) {
            this.deleteField('adi', model.identifier).subscribe(() => {
              this.searchFields(this.searchFieldsRequest);
            });
          }
        },
        error: (response: any) => {
          console.log(response);
        }
      });
  }

  private subscribeFieldCardDeletePopUpModal() {
    this.cardSharedService.currentDeletionDetails.pipe(takeUntil(this.unsubscribe))
      .subscribe(deletionDetails => {
        if (deletionDetails === '') return;
        this.dialog.open(DeleteConfirmationModalComponent, {
          data: {
            identifier: deletionDetails.identifier,
            valueToDisplayForModal: deletionDetails.title,
            entity: EntitySelector.FIELD
          }
        });
      });
  }

  private subscribeFieldCardEditPopUpModal() {
    this.cardSharedService.currentEditDetails.pipe(takeUntil(this.unsubscribe))
      .subscribe(editDetails => {
        if (editDetails === null) return;
        this.dialog.open(FormComponent, {
          data: {
            edit: true,
            value: editDetails,
            type: EntitySelector.FIELD,
            title: 'Update Field',
            attributes: FormAttributeProvider.getAttributes(EntitySelector.FIELD)
          }
        });
      });
  }

  subscribeFieldEditForm() {
    this.formSharedService.currentFormValueForEdit.pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (model: FormModel) => {
          if (model.entity === EntitySelector.FIELD.valueOf()) {
            this.updateField(model.object).subscribe(() => {
              this.searchFields(this.searchFieldsRequest);
            });
          }
        },
        error: (response: any) => {
          console.log(response);
        }
      });
  }

  private subscribeFieldAddForm() {
    this.formSharedService.currentFormValue.pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (model: FormModel) => {
          if (model.entity === EntitySelector.FIELD.valueOf()) {
            this.saveField(model.object).subscribe(() => {
              this.searchFields(this.searchFieldsRequest);
            });
          }
        },
        error: (response: any) => {
          console.log(response);
        }
      });
  }

  private subscribeNavbarSearchInput() {
    this.navbarSearchSharedService.currentFormValue.pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (value: string) => {
          if (!value || value.trim() === '') {
            this.searchFieldsRequest = {pageable: this.pageable};
            this.searchFields(this.searchFieldsRequest);
            return;
          }
          this.searchFieldsRequest.searchBy = {titleLikeSearch: value};
          this.searchFields(this.searchFieldsRequest);
        }
      })
  }

  private saveField(request: CreateFieldRequest) {
    return this.fieldsPageService.saveField(request);
  }

  private updateField(request: UpdateFieldRequest) {
    return this.fieldsPageService.updateField(request);
  }

  private deleteField(issuer: any, identifier: any) {
    return this.fieldsPageService.deleteField(issuer, identifier);
  }

  private searchFields(request: SearchFieldsRequest) {
    this.fieldsPageService.searchFields(request).subscribe(
      (response: FieldPaginatedResponse) => {
        this.cards = [];
        this.totalNumberOfCards = response.page.totalElements;
        let fieldResponses = response.content;
        fieldResponses.forEach(fieldResponse => {
          let stats = ['Area: ' + fieldResponse.area + ' ' + fieldResponse.areaUnitType,
            'Distance from farm: ' + fieldResponse.roughlyDistanceFromFarm + ' ' + fieldResponse.roughlyDistanceFromFarmUnitType,
            'Created: ' + fieldResponse.createdAt,
            'Updated: ' + fieldResponse.updatedAt
          ];
          this.cards.push({
            title: fieldResponse.title,
            stats: stats,
            data: fieldResponse,
            identifier: fieldResponse.id
          })
        })
      });
  }
}
