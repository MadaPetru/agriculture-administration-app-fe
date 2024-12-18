import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {FormSharedService} from "./form-shared-service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormAttribute} from "../../model/form/form-attribute";
import {FormValidatorProvider} from "../../provider/form/form-validator-provider";
import {FormAttributeProvider} from "../../provider/form/form-attribute-provider";
import {EntitySelector} from "../../entity-selector";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  userForm: any;
  value: any;
  title: string = 'Add field';
  type: EntitySelector;
  attributes: FormAttribute[] = [];
  useForEdit: boolean = false;

  constructor(private formBuilder: FormBuilder, private fieldsSharedService: FormSharedService,
              private matDialogRef: MatDialogRef<FormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {
                title: string, type: EntitySelector, value: any, edit: boolean
              }) {
    this.useForEdit = data.edit;
    this.title = data.title;
    this.type = data.type;
    this.value = data.value;
  }

  ngOnInit(): void {
    this.attributes = FormAttributeProvider.getAttributes(this.type);
    let controls;
    if (this.value != null) {
      controls = FormValidatorProvider.getUserEditFormValidatorFields(this.type, this.value);
    } else {
      controls = FormValidatorProvider.getUserFormValidatorFields(this.type);
    }
    this.userForm = this.formBuilder.group(controls);
  }

  submitForm(): void {
    if (this.userForm?.valid) {
      let value = this.userForm.value;
      let formValueField = FormValidatorProvider.getFormValue(value, this.type);
      if (this.useForEdit) {
        this.fieldsSharedService.updateFormValueForEdit(formValueField);
      } else {
        this.fieldsSharedService.updateFormValue(formValueField);
      }
      this.matDialogRef.close();
    }
  }
}
