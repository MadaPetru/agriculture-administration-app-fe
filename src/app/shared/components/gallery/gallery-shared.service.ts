import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class GallerySharedService {
  deletionDetails: Subject<any> = new Subject<any>();
  currentDeletionDetails = this.deletionDetails.asObservable();
  imagesSelected: Subject<any> = new Subject<any>();
  currentImagesSelected = this.imagesSelected.asObservable();

  updateDeletionDetails(identifier: any) {
    this.deletionDetails.next(identifier);
  }

  updateImagesSelected(images: any) {
    this.imagesSelected.next(images);
  }
}
