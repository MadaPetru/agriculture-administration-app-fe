import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureBirthsPageComponent } from './future-births-page.component';

describe('FutureBirthsPageComponent', () => {
  let component: FutureBirthsPageComponent;
  let fixture: ComponentFixture<FutureBirthsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FutureBirthsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FutureBirthsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
