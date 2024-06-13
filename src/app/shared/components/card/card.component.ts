import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {CardSharedService} from "./card-shared-service";

@Component({
  selector: 'app-field-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input({alias: 'inputTitle'}) title: string = '';
  @Input({alias: 'inputIdentifier'}) identifier: string = '';
  @Input({alias: 'inputStats'}) stats: string[] = new Array<string>();
  @Input({alias: 'inputData'}) data: any;
  @Input({alias: 'inputAllowedCardToRotateOnHover'}) allowedCardToRotateOnHover: boolean = false;
  @Input({alias: 'inputDeleteButtonVisible'}) deleteButtonVisible: boolean = false;
  @Input({alias: 'inputRouteLinkOnClickFrontCard'}) routeLinkOnClickFrontCard: Array<string> = new Array<string>();

  constructor(private router: Router, private cardService: CardSharedService) {
  }

  deleteField() {
    this.cardService.updateDeletionDetails({
      identifier: this.identifier,
      title: this.title
    });
  }

  editField() {
    this.cardService.updateEditDetails(this.data);
  }

  onClickFrontCard() {
    this.router.navigate(this.routeLinkOnClickFrontCard);
  }
}
