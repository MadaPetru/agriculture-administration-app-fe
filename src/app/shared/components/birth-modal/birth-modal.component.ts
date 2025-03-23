import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-birth-modal',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    MatButton
  ],
  templateUrl: './birth-modal.component.html',
  styleUrl: './birth-modal.component.css'
})
export class BirthModalComponent {
  constructor(
    public dialogRef: MatDialogRef<BirthModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
