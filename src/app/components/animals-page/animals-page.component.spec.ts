import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalsPageComponent } from './animals-page.component';

describe('AnimalsPageComponent', () => {
  let component: AnimalsPageComponent;
  let fixture: ComponentFixture<AnimalsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimalsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
