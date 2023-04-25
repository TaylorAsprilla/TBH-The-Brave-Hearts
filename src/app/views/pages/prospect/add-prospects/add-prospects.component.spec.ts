import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProspectsComponent } from './add-prospects.component';

describe('AddProspectsComponent', () => {
  let component: AddProspectsComponent;
  let fixture: ComponentFixture<AddProspectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProspectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProspectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
