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

  toggleZoom(image: any) {
    image.isZoomed = !image.isZoomed;
  }


  emitDeleteEvent(imageModel: any) {
    this.gallerySharedService.updateDeletionDetails(imageModel);
  }

}
