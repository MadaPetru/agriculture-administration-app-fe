import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {FormModel} from "../../model/form/form-model";

@Injectable()
export class FormSharedService {
  formValue: Subject<FormModel> = new Subject<FormModel>();
  formValueForEdit: Subject<FormModel> = new Subject<FormModel>();
  currentFormValue = this.formValue.asObservable();
  currentFormValueForEdit = this.formValueForEdit.asObservable();

  updateFormValue(value: FormModel) {
    this.formValue.next(value);
  }

  updateFormValueForEdit(value: FormModel) {
    this.formValueForEdit.next(value);
  }
}
