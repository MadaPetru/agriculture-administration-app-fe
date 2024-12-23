import {Component, Input} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css', '../../shared.css']
})
export class GalleryComponent {

  @Input({alias: 'inputImages'}) images:string[] = [];

}
