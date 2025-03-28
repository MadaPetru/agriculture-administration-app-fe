import {Component, Inject} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-compare-images-modal',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatButton,
    NgClass
  ],
  templateUrl: './compare-images-modal.component.html',
  styleUrl: './compare-images-modal.component.css'
})
export class CompareImagesModalComponent {
  images = new Array<any>();
  leftIndex = 0;
  rightIndex = 1;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    images: Set<any>
  }, public dialogRef: MatDialogRef<CompareImagesModalComponent>) {
    data.images.forEach((imageReceived) => {
      this.images.push(imageReceived);
    })
  }

  toggleZoom(image: any) {
    image.isZoomed = !image.isZoomed;
  }

  prevImage(side: 'left' | 'right') {
    if (side === 'left') {
      this.leftIndex = (this.leftIndex - 1 + this.images.length) % this.images.length;
    } else {
      this.rightIndex = (this.rightIndex - 1 + this.images.length) % this.images.length;
    }
  }

  nextImage(side: 'left' | 'right') {
    if (side === 'left') {
      this.leftIndex = (this.leftIndex + 1) % this.images.length;
    } else {
      this.rightIndex = (this.rightIndex + 1) % this.images.length;
    }
  }

  closeModal() {
    this.dialogRef.close();
  }
}
