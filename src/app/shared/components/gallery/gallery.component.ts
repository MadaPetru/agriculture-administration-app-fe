import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ListFieldImageResponse} from "../../../domains/field/dto/response/list-field-image-response";
import {GallerySharedService} from "./gallery-shared.service";

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {

  @Input({alias: 'inputImages'}) images: ListFieldImageResponse[] = [];

  constructor(private gallerySharedService: GallerySharedService) {
  }


  emitDeleteEvent(imageModel: any) {
    this.gallerySharedService.updateDeletionDetails(imageModel);
  }

}
