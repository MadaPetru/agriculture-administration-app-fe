import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class CardSharedService {
  deletionDetails: Subject<any> = new Subject<any>();
  editDetails: Subject<any> = new Subject<any>();
  resetDetails: Subject<any> = new Subject<any>();
  currentResetDetails = this.resetDetails.asObservable();
  currentDeletionDetails = this.deletionDetails.asObservable();
  currentEditDetails = this.editDetails.asObservable();

  updateDeletionDetails(identifier: any) {
    this.deletionDetails.next(identifier);
  }

  updateEditDetails(data: any) {
    this.editDetails.next(data);
  }

  updateResetDetails(data: any) {
    this.resetDetails.next(data);
  }
}
