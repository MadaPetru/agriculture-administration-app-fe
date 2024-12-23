import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class GallerySharedService {
  deletionDetails: Subject<any> = new Subject<any>();
  currentDeletionDetails = this.deletionDetails.asObservable();

  updateDeletionDetails(identifier: any) {
    this.deletionDetails.next(identifier);
  }
}
