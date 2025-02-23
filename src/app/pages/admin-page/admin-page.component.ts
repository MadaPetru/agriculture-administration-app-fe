import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {GalleryComponent} from "../../shared/components/gallery/gallery.component";
import {MatButton} from "@angular/material/button";
import {MenuComponent} from "../../shared/components/menu/menu.component";
import {NavbarSearchComponent} from "../../shared/components/navbar-search/navbar-search.component";
import {NgForOf, NgIf} from "@angular/common";
import {PaginatorComponent} from "../../shared/components/paginator/paginator.component";
import {
  StartFinishDatePickerComponent
} from "../../shared/components/start-finish-date-picker/start-finish-date-picker.component";
import {
  StartFinishYearDatePickerComponent
} from "../../shared/components/start-finish-year-date-picker/start-finish-year-date-picker.component";
import {TableComponent} from "../../shared/components/table/table.component";
import {CardComponent} from "../../shared/components/card/card.component";
import {MenuValue} from "../../shared/model/menu/menu-value";
import {MenuDataFieldPageProvider} from "../../shared/provider/menu/menu-data-field-page-provider";
import {PageEvent} from "@angular/material/paginator";
import {Card} from "../../shared/model/card/card";
import {PageableRequest} from "../../shared/dto/request/pageable-request";
import {SearchUsersRequest} from "../../domains/user/dto/request/search-users-request";
import {UserService} from "../../domains/user/user-service";
import {UserPaginatedResponse} from "../../domains/user/dto/response/user-paginated-response";
import {CardSharedService} from "../../shared/components/card/card-shared-service";
import {Subject, takeUntil} from "rxjs";
import {EntitySelector} from "../../shared/entity-selector";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationModalComponent} from "../../shared/components/confirmation-modal/confirmation-modal.component";
import {
  ConfirmationModalSharedService
} from "../../shared/components/confirmation-modal/confirmation-modal-shared.service";
import {NavbarSearchSharedService} from "../../shared/components/navbar-search/navbar-search-shared.service";
import {ConfirmationModalSelector} from "../../shared/confirmation-modal-selector";
import {FormComponent} from "../../shared/components/form/form.component";
import {FormAttributeProvider} from "../../shared/provider/form/form-attribute-provider";
import {FormModel} from "../../shared/model/form/form-model";
import {FormSharedService} from "../../shared/components/form/form-shared-service";
import {BannerComponent} from "../../shared/components/banner/banner.component";
import {AuthenticationUtils} from "../../shared/authentication-utils";
import {BannerType} from "../../shared/model/banner/banner-type";

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    FormsModule,
    GalleryComponent,
    MatButton,
    MenuComponent,
    NavbarSearchComponent,
    NgIf,
    PaginatorComponent,
    StartFinishDatePickerComponent,
    StartFinishYearDatePickerComponent,
    TableComponent,
    CardComponent,
    NgForOf,
    BannerComponent
  ],
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css', '../../shared/shared.css']
})
export class AdminPageComponent implements OnInit, OnDestroy {
  menuValues: MenuValue[] = this.menuDataFieldPageProvider.getMenuValuesForAdminPage();
  cards = new Array<Card>();
  unsubscribe = new Subject<void>();
  totalNumberOfCards = 1;
  pageable: PageableRequest = {size: 10, page: 0};
  searchUsersRequest: SearchUsersRequest = {pageable: this.pageable};
  resetPasswordSuccessful: boolean = false;

  constructor(private menuDataFieldPageProvider: MenuDataFieldPageProvider, private userService: UserService,
              private cardSharedService: CardSharedService, private dialog: MatDialog,
              private confirmationModalSharedService: ConfirmationModalSharedService,
              private navbarSearchSharedService: NavbarSearchSharedService, private formSharedService: FormSharedService) {
  }

  ngOnInit(): void {
    this.searchUsers(this.searchUsersRequest);
    this.subscribeUserResetPasswordPopUpModal();
    this.subscribeConfirmationModalResetPasswordAction();
    this.subscribeNavbarSearchInput();
    this.subscribeFieldCardEditPopUpModal();
    this.subscribeUserEditForm();
    this.subscribeFieldCardDeletePopUpModal();
    this.subscribeConfirmationModalDeleteAction();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }


  onPaginationChanged(pageEvent: PageEvent) {
    let size = pageEvent.pageSize;
    let page = pageEvent.pageIndex;
    this.searchUsersRequest.pageable = {size: size, page: page};
    this.searchUsers(this.searchUsersRequest);
  }

  private searchUsers(request: SearchUsersRequest) {
    this.userService.searchUsers(request).subscribe(
      (response: UserPaginatedResponse) => {
        this.cards = [];
        this.totalNumberOfCards = response.page.totalElements;
        let userResponses = response.content;
        userResponses.forEach(user => {
          let stats = ['Email: ' + user.email, 'Roles: ' + user.roles, 'Created: ' + user.createdAt, 'Updated: ' + user.updatedAt];
          this.cards.push({
            title: user.email,
            stats: stats,
            data: user,
            identifier: user.id
          })
        })
      });
  }

  private subscribeUserResetPasswordPopUpModal() {
    this.cardSharedService.currentResetDetails.pipe(takeUntil(this.unsubscribe))
      .subscribe(resetDetails => {
        if (resetDetails === null) return;
        this.dialog.open(ConfirmationModalComponent, {
          data: {
            identifier: resetDetails.id,
            value: resetDetails,
            valueToDisplayForModal: resetDetails.email,
            entity: EntitySelector.USER,
            modalType: ConfirmationModalSelector.RESET_PASSWORD
          }
        });
      });
  }

  private subscribeConfirmationModalResetPasswordAction() {
    this.confirmationModalSharedService.currentResetPassword.pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (model: any) => {
          if (!model.identifier) return;
          if (model.entity === EntitySelector.USER.valueOf()) {
            this.userService.resetPassword(model.identifier).subscribe(() => {
              this.resetPasswordSuccessful = true;
              setTimeout(() => {
                this.resetPasswordSuccessful = false;
              }, this.get5SecondsInMs());
            })
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
        this.dialog.open(ConfirmationModalComponent, {
          data: {
            identifier: deletionDetails.identifier,
            valueToDisplayForModal: deletionDetails.title,
            entity: EntitySelector.USER,
            modalType: ConfirmationModalSelector.DELETION
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
            type: EntitySelector.USER,
            title: 'Update User',
            attributes: FormAttributeProvider.getAttributes(EntitySelector.USER)
          }
        });
      });
  }

  private subscribeNavbarSearchInput() {
    this.navbarSearchSharedService.currentFormValue.pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (value: string) => {
          if (!value || value.trim() === '') {
            this.searchUsersRequest = {pageable: this.pageable};
            this.searchUsers(this.searchUsersRequest);
            return;
          }
          this.searchUsersRequest.searchBy = {usernameLikeSearch: value};
          this.searchUsers(this.searchUsersRequest);
        }
      })
  }

  subscribeUserEditForm() {
    this.formSharedService.currentFormValueForEdit.pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (model: FormModel) => {
          if (model.entity === EntitySelector.USER.valueOf()) {
            let updateRequest = {
              id: model.object.id,
              version: model.object.version,
              email: model.object.email,
              roles: model.object.roles
            }
            this.userService.updateUser(updateRequest).subscribe(() => {
              this.searchUsers(this.searchUsersRequest);
            })
          }
        },
        error: (response: any) => {
          console.log(response);
        }
      });
  }

  private subscribeConfirmationModalDeleteAction() {
    this.confirmationModalSharedService.currentObjectToDelete.pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (model: any) => {
          if (!model.identifier) return;
          if (model.entity === EntitySelector.USER.valueOf()) {
            this.userService.deleteUser(model.identifier).subscribe(() => {
              this.searchUsers(this.searchUsersRequest);
            })
          }
        },
        error: (response: any) => {
          console.log(response);
        }
      });
  }

  private get5SecondsInMs() {
    return 5000;
  }

  protected readonly AuthenticationUtils = AuthenticationUtils;
  protected readonly BannerType = BannerType;
}
