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

  imagesSelected = new Set<any>();

  constructor(private gallerySharedService: GallerySharedService) {
  }

  toggleZoom(image: any) {
    this.sendEventImagesSelected(image);
    image.isZoomed = !image.isZoomed;
  }


  sendEventImagesSelected(image: any) {
    if (this.imagesSelected.has(image)) {
      this.imagesSelected.delete(image);
    } else {
      this.imagesSelected.add(image);
    }
    this.gallerySharedService.updateImagesSelected(this.imagesSelected);
  }

  emitDeleteEvent(imageModel: any) {
    this.gallerySharedService.updateDeletionDetails(imageModel);
  }

}
