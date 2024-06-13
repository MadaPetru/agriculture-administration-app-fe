import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {FormsModule} from "@angular/forms";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {JsonPipe, NgClass} from "@angular/common";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [
    MatPaginator,
    FormsModule,
    MatSlideToggle,
    MatLabel,
    MatFormField,
    JsonPipe,
    MatInput,
    NgClass
  ],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {
  @Input({alias: 'inputLength'}) length = 50;
  @Input({alias: 'inputPageSize'}) pageSize = 10;
  @Input({alias: 'inputPageIndex'}) pageIndex = 0;
  @Input({alias: 'inputPageSizeOptions'}) pageSizeOptions = [5, 10, 25];

  @Input({alias: 'inputHidePageSize'}) hidePageSize = false;
  @Input({alias: 'inputShowPageSizeOptions'}) showPageSizeOptions = true;
  @Input({alias: 'inputShowFirstLastButtons'}) showFirstLastButtons = true;
  @Input({alias: 'inputDisabled'}) disabled = false;

  @Output('outputPageEvent') pageEventEmitter = new EventEmitter<PageEvent>()
  pageEvent: PageEvent | undefined;

  handlePageEvent(e: PageEvent) {
    this.pageEventEmitter.emit(e);
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }
}
