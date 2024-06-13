import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DeleteConfirmationModalSharedService} from "./delete-confirmation-modal-shared-service";

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

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
                identifier: string, valueToDisplayForModal: string
              }, public dialogRef: MatDialogRef<DeleteConfirmationModalComponent>,
              private confirmationModalSharedService: DeleteConfirmationModalSharedService) {
    this.identifier = data.identifier;
    this.valueToDisplayForModal = data.valueToDisplayForModal;
  }

  closeModal() {
    this.dialogRef.close();
  }

  onDelete() {
    this.confirmationModalSharedService.updateIdentifierToDelete(this.identifier);
    this.closeModal();
  }
}
