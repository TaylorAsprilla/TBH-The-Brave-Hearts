import { Component, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
// import { WizardComponent } from 'angular-archwizard';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';

@Component({
  selector: 'app-add-customers',
  templateUrl: './add-customers.component.html',
  styleUrls: ['./add-customers.component.scss'],
})
export class AddCustomersComponent implements OnInit {
  validationForm1: UntypedFormGroup;
  validationForm2: UntypedFormGroup;

  isForm1Submitted: Boolean;
  isForm2Submitted: Boolean;

  @ViewChild('formLifePolicy') formLifePolicy: BaseWizardComponent;

  constructor(public formBuilder: UntypedFormBuilder) {}

  ngOnInit(): void {
    /**
     * form1 value validation
     */
    this.validationForm1 = this.formBuilder.group({
      carrier: ['', Validators.required],
      policityType: ['', Validators.required],
      monthly: ['', Validators.required],
      faceAmount: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      addressLine2: [''],
      city: [''],
      state: [''],
      zipCode: [''],
      phone: ['', Validators.required],
      phoneType: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    /**
     * formw value validation
     */
    this.validationForm2 = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.isForm1Submitted = false;
    this.isForm2Submitted = false;
  }

  /**
   * Wizard finish function
   */
  finishFunction() {
    alert('Successfully Completed');
  }

  /**
   * Returns form
   */
  get form1() {
    return this.validationForm1.controls;
  }

  /**
   * Returns form
   */
  get form2() {
    return this.validationForm2.controls;
  }

  /**
   * Go to next step while form value is valid
   */
  form1Submit() {
    if (this.validationForm1.valid) {
      this.formLifePolicy.goToNextStep();
    }
    this.isForm1Submitted = true;
  }

  /**
   * Go to next step while form value is valid
   */
  form2Submit() {
    if (this.validationForm2.valid) {
      this.formLifePolicy.goToNextStep();
    }
    this.isForm2Submitted = true;
  }
}
