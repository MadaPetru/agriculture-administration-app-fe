import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class DeleteConfirmationModalSharedService {
  identifierToDelete: Subject<any> = new Subject<any>();
  currentIdentifierToDelete = this.identifierToDelete.asObservable();

  updateIdentifierToDelete(value: any) {
    this.identifierToDelete.next(value);
  }
}
