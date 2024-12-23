import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {DeleteConfirmationModel} from "../../model/delete-confirmation-modal/delete-confirmation-model";

@Injectable()
export class DeleteConfirmationModalSharedService {
  objectToDelete: Subject<DeleteConfirmationModel> = new Subject<DeleteConfirmationModel>();
  currentObjectToDelete = this.objectToDelete.asObservable();

  updateIdentifierToDelete(value: DeleteConfirmationModel) {
    this.objectToDelete.next(value);
  }
}
