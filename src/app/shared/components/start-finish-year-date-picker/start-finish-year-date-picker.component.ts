import {Component, EventEmitter, Output} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'start-finish-year-date-picker',
  standalone: true,
  imports: [
    MatButton,
    FormsModule
  ],
  templateUrl: './start-finish-year-date-picker.component.html',
  styleUrls: ['./start-finish-year-date-picker.component.css', '../../shared.css']
})
export class StartFinishYearDatePickerComponent {
  @Output('outputYearsInterval') yearsInterval = new EventEmitter<{ startYear: number, endYear: number }>();

  startYear = new Date().getFullYear();
  endYear = new Date().getFullYear();

  emitYearsInterval() {
    console.log(this.startYear);
    this.yearsInterval.emit({startYear: this.startYear, endYear: this.endYear});
  }
}
