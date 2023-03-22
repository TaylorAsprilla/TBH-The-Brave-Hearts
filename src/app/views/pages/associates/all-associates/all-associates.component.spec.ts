import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAssociatesComponent } from './all-associates.component';

describe('AllAssociatesComponent', () => {
  let component: AllAssociatesComponent;
  let fixture: ComponentFixture<AllAssociatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAssociatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllAssociatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
