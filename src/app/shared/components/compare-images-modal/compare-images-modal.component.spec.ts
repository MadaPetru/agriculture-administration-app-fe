import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareImagesModalComponent } from './compare-images-modal.component';

describe('CompareImagesModalComponent', () => {
  let component: CompareImagesModalComponent;
  let fixture: ComponentFixture<CompareImagesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompareImagesModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompareImagesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
