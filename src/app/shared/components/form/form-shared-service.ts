import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class FormSharedService {
  formValue: Subject<any> = new Subject<any>();
  formValueForEdit: Subject<any> = new Subject<any>();
  currentFormValue = this.formValue.asObservable();
  currentFormValueForEdit = this.formValueForEdit.asObservable();

  updateFormValue(value: any) {
    this.formValue.next(value);
  }

  updateFormValueForEdit(value: any) {
    this.formValueForEdit.next(value);
  }
}
