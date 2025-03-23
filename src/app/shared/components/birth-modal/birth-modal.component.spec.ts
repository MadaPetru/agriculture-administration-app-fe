import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthModalComponent } from './birth-modal.component';

describe('BirthModalComponent', () => {
  let component: BirthModalComponent;
  let fixture: ComponentFixture<BirthModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BirthModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BirthModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
