import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ConfirmationModalSharedService} from "./confirmation-modal-shared.service";
import {EntitySelector} from "../../entity-selector";
import {NgIf} from "@angular/common";
import {ConfirmationModalSelector} from "../../confirmation-modal-selector";

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent {
  identifier: string = '';
  valueToDisplayForModal: string = '';
  entity: EntitySelector;
  modalType: ConfirmationModalSelector;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
                identifier: string, valueToDisplayForModal: string, entity: EntitySelector, modalType: ConfirmationModalSelector
              }, public dialogRef: MatDialogRef<ConfirmationModalComponent>,
              private confirmationModalSharedService: ConfirmationModalSharedService) {
    this.identifier = data.identifier;
    this.valueToDisplayForModal = data.valueToDisplayForModal;
    this.entity = data.entity;
    this.modalType = data.modalType;
  }

  closeModal() {
    this.dialogRef.close();
  }

  onDelete() {
    let model = {identifier: this.identifier, entity: this.entity};
    this.confirmationModalSharedService.updateIdentifierToDelete(model);
    this.closeModal();
  }

  onReset(){
    let model = {identifier: this.identifier, entity: this.entity};
    this.confirmationModalSharedService.updateIdentifierToResetPassword(model);
    this.closeModal();
  }

  protected readonly ConfirmationModalSelector = ConfirmationModalSelector;
}
