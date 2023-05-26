import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPolicyComponent } from './all-policy.component';

describe('AllPolicyComponent', () => {
  let component: AllPolicyComponent;
  let fixture: ComponentFixture<AllPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPolicyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
