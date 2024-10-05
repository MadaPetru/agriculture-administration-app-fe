import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartFinishYearDatePickerComponent } from './start-finish-year-date-picker.component';

describe('StartFinishDatePickerComponent', () => {
  let component: StartFinishYearDatePickerComponent;
  let fixture: ComponentFixture<StartFinishYearDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartFinishYearDatePickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartFinishYearDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
