import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartFinishDatePickerComponent } from './start-finish-date-picker.component';

describe('StartFinishDatePickerComponent', () => {
  let component: StartFinishDatePickerComponent;
  let fixture: ComponentFixture<StartFinishDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartFinishDatePickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StartFinishDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
