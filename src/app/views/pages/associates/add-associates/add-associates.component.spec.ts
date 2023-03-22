import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssociatesComponent } from './add-associates.component';

describe('AddAssociatesComponent', () => {
  let component: AddAssociatesComponent;
  let fixture: ComponentFixture<AddAssociatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAssociatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAssociatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
