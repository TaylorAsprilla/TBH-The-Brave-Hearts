import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProspectsComponent } from './all-prospects.component';

describe('AllProspectsComponent', () => {
  let component: AllProspectsComponent;
  let fixture: ComponentFixture<AllProspectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllProspectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllProspectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
