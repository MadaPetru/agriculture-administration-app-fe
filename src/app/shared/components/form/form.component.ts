import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {FormSharedService} from "./form-shared-service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormAttribute} from "../../model/form/form-attribute";
import {FormValidatorProvider} from "../../provider/form/form-validator-provider";
import {FormAttributeProvider} from "../../provider/form/form-attribute-provider";
import {EntitySelector} from "../../entity-selector";
import {File} from "../../model/file/file";

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
  imageSelected?: File;

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
      if (this.userForm.controls.image != null) {
        this.userForm.value.image = this.imageSelected;
      }
      let value = this.userForm.value;
      let formValueField = FormValidatorProvider.getFormValue(value, this.type);
      let formModel = {object: formValueField, entity: this.type};
      if (this.useForEdit) {
        this.fieldsSharedService.updateFormValueForEdit(formModel);
      } else {
        this.fieldsSharedService.updateFormValue(formModel);
      }
      this.matDialogRef.close();
    }
  }

  onFileSelected(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0]; // First selected file
      const reader = new FileReader();

      // Read file content
      reader.onload = () => {
        let fileContent = reader.result;
        const fileName = file.name;

        this.imageSelected = {
          fileName: fileName,
          content: fileContent
        };

        // Update the form control with custom data (e.g., a file object or base64 string)
        this.userForm.get(controlName)?.setValue(this.imageSelected);
      };

      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };

      // Read the file content as base64
      reader.readAsDataURL(file); // Or use `readAsText(file)` for plain text files
    }
  }
}
