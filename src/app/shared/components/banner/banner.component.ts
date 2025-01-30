import {Component, Input} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  @Input({alias: 'inputType'}) type: 'error' | 'info' = 'info'; // Define banner type (info or error)
  @Input({alias: 'inputMessage'}) message: string = ''; // Message to display
}
