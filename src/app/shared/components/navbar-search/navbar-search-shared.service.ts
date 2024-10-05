import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class NavbarSearchSharedService {
  searchValue: Subject<any> = new Subject<any>();
  currentFormValue = this.searchValue.asObservable();

  updateFormValue(value: any) {
    this.searchValue.next(value);
  }
}
