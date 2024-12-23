import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  MatDatepickerInputEvent,
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker,
  MatEndDate,
  MatStartDate
} from "@angular/material/datepicker";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'start-finish-date-picker',
  standalone: true,
  imports: [
    MatDateRangeInput,
    MatDateRangePicker,
    MatDatepickerToggle,
    MatEndDate,
    MatFormField,
    MatHint,
    MatLabel,
    MatStartDate,
    MatSuffix,
    FormsModule
  ],
  templateUrl: './start-finish-date-picker.component.html',
  styleUrl: './start-finish-date-picker.component.css'
})
export class StartFinishDatePickerComponent implements OnInit {

  @Output('outputDateInterval') dateInterval = new EventEmitter<{ startDate: Date | null, endDate: any }>();
  startDate: Date | null = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
  endDate: Date | null = new Date();

  ngOnInit(): void {
    this.emitValues();
  }

  onStartDateChange(event: MatDatepickerInputEvent<Date>) {
    this.startDate = event.value;
  }

  onEndDateChange(event: MatDatepickerInputEvent<Date>) {
    this.endDate = event.value;
  }


  onPickerClosed() {
    if (this.startDate && this.endDate) {
      this.emitValues();
    }
  }

  private emitValues() {
    this.dateInterval.emit({startDate: this.startDate, endDate: this.endDate});
  }
}
