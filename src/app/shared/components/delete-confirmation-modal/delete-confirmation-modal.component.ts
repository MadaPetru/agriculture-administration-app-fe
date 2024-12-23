import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DeleteConfirmationModalSharedService} from "./delete-confirmation-modal-shared-service";
import {EntitySelector} from "../../entity-selector";

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrl: './delete-confirmation-modal.component.css'
})
export class DeleteConfirmationModalComponent {
  identifier: string = '';
  valueToDisplayForModal: string = '';
  entity: EntitySelector;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
                identifier: string, valueToDisplayForModal: string, entity: EntitySelector
              }, public dialogRef: MatDialogRef<DeleteConfirmationModalComponent>,
              private confirmationModalSharedService: DeleteConfirmationModalSharedService) {
    this.identifier = data.identifier;
    this.valueToDisplayForModal = data.valueToDisplayForModal;
    this.entity = data.entity;
  }

  closeModal() {
    this.dialogRef.close();
  }

  onDelete() {
    let model = {identifier: this.identifier, entity: this.entity};
    this.confirmationModalSharedService.updateIdentifierToDelete(model);
    this.closeModal();
  }
}
