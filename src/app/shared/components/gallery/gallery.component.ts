import {Component, Input} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ListFieldImageResponse} from "../../../domains/field/dto/response/list-field-image-response";
import {GallerySharedService} from "./gallery-shared.service";

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {

  @Input({alias: 'inputImages'}) images: ListFieldImageResponse[] = [];

  constructor(private gallerySharedService: GallerySharedService) {
  }

  isDragging = false;
  startX = 0;
  startY = 0;
  lastMouseX = 0;
  lastMouseY = 0;

  toggleZoom(image: any) {
    image.isZoomed = !image.isZoomed;
    if (image.isZoomed) {
      image.offsetX = 0;
      image.offsetY = 0;
    }
  }

  startDrag(event: MouseEvent, image: any) {
    this.toggleZoom(image);
    if (!image.isZoomed) return;

    this.isDragging = true;
    this.startX = event.clientX - (image.offsetX || 0);
    this.startY = event.clientY - (image.offsetY || 0);
  }

  dragImage(event: MouseEvent, image: any) {
    if (!image.isZoomed) return;

    event.preventDefault();
    let xSign = 1;
    let ySign = 1;
    let offsetX = 0;
    if (event.clientX < this.lastMouseX) {
      offsetX = event.clientX - this.startX;
    } else {
      offsetX = event.clientX - this.startX;
    }
    offsetX = this.max(offsetX, 1000);
    offsetX = this.min(offsetX, -250);
    this.lastMouseX = event.clientX;
    console.log(event.clientX);
    console.log(event.clientY);
    console.log('----');
    console.log(event.x);
    event.y;
    let offsetY = this.max(event.clientY + this.startY, 0);
    offsetY = this.min(offsetY, -0);
    image.offsetX = offsetX;
    image.offsetY = offsetY;
    console.log(image.offsetX);
    console.log(image.offsetY);
  }

  stopDrag(image: any) {
    this.isDragging = false;
    image.offsetY = 0;
    image.offsetX = 0;
  }


  emitDeleteEvent(imageModel: any) {
    this.gallerySharedService.updateDeletionDetails(imageModel);
  }

  max(a: number, b: number): number {
    if (b >= a) return b;
    return a;
  }

  min(a: number, b: number): number {
    if (b >= a) return a;
    return b;
  }

}
