import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {ConfirmationModel} from "../../model/confirmation-modal/confirmation-model";

@Injectable()
export class ConfirmationModalSharedService {
  objectToDelete: Subject<ConfirmationModel> = new Subject<ConfirmationModel>();
  currentObjectToDelete = this.objectToDelete.asObservable();
  resetPassword: Subject<ConfirmationModel> = new Subject<ConfirmationModel>();
  currentResetPassword = this.resetPassword.asObservable();

  updateIdentifierToDelete(value: ConfirmationModel) {
    this.objectToDelete.next(value);
  }

  updateIdentifierToResetPassword(value: ConfirmationModel) {
    this.resetPassword.next(value);
  }
}
