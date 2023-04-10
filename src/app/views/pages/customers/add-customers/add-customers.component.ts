import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';

@Component({
  selector: 'app-add-customers',
  templateUrl: './add-customers.component.html',
  styleUrls: ['./add-customers.component.scss'],
})
export class AddCustomersComponent implements OnInit {
  lifePolicyForm: UntypedFormGroup;
  beneficiaryForm: UntypedFormGroup;
  contigentBeneficiaryForm: UntypedFormGroup;
  medicalForm: UntypedFormGroup;

  islifePolicyFormSubmitted: Boolean;
  isBeneficiaryFormSubmitted: Boolean;
  isContigentBeneficiaryFormSubmitted: Boolean;
  isMedicalFormFormSubmitted: Boolean;

  @ViewChild('lifePolicy') lifePolicy: BaseWizardComponent;

  constructor(public formBuilder: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.lifePolicyForm = this.formBuilder.group({
      carrier: ['', [Validators.required]],
      policityType: ['', [Validators.required]],
      monthly: ['', [Validators.required]],
      faceAmount: ['', [Validators.required]],
      firstName: ['', [Validators.minLength(2), Validators.required]],
      middleName: ['', [Validators.minLength(3)]],
      lastName: ['', [Validators.minLength(3), Validators.required]],
      address: ['', [Validators.minLength(3), Validators.required]],
      addressLine2: [''],
      city: ['', [Validators.minLength(3)]],
      state: ['', [Validators.minLength(3)]],
      zipCode: [''],
      phone: ['', [Validators.required]],
      phoneType: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(3)],
      ],
      maritalStatus: ['', [Validators.required]],
      dateBirth: ['', [Validators.required]],
      ss: ['', [Validators.required]],
      countryBirth: ['', [Validators.minLength(3), Validators.required]],
      cityBirth: ['', [Validators.minLength(3), Validators.required]],
      greenCard: ['', [Validators.minLength(3)]],
      driversLicense: ['', [Validators.minLength(3)]],
      expiration: [''],
      stateGreenCard: ['', [Validators.minLength(3)]],
      gender: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      height: ['', [Validators.required]],
      employerName: ['', [Validators.minLength(3), Validators.required]],
      occupation: ['', [Validators.minLength(3)]],
      timeEmployed: [''],
      annualIncome: ['', [Validators.required]],
      householdIncome: [''],
      householdNetWorth: [''],
    });

    this.beneficiaryForm = this.formBuilder.group({
      beneficiaries: this.formBuilder.array([]),
    });

    this.contigentBeneficiaryForm = this.formBuilder.group({
      contigentBeneficiaries: this.formBuilder.array([]),
    });

    this.medicalForm = this.formBuilder.group({
      doctorName: ['', [Validators.minLength(2), Validators.required]],
      doctorOfficeLocation: ['', [Validators.minLength(2)]],
      officePhoneNumber: ['', []],
      lastVisit: ['', [Validators.required]],
      reasonForVisit: ['', [Validators.minLength(2)]],
      outcomeOfVisit: ['', [Validators.minLength(3)]],
      smoker: ['', [Validators.required]],
      medicalCondition: ['', [Validators.minLength(3)]],
      whenItWasDiagnosed: ['', [Validators.minLength(3)]],
      medications: ['', [Validators.minLength(3)]],
      dosage: ['', [Validators.minLength(3)]],
      additionalInformation: ['', [Validators.minLength(3)]],
      isFatherAlive: ['', []],
      fatherAge: ['', []],
      deceasedFather: ['', []],
      isMotherAlive: ['', []],
      motherAge: ['', []],
      deceasedMother: ['', []],
    });

    this.islifePolicyFormSubmitted = false;
    this.isBeneficiaryFormSubmitted = false;
    this.isContigentBeneficiaryFormSubmitted = false;
    this.isMedicalFormFormSubmitted = false;
  }

  /**
   * Wizard finish function
   */
  finishFunction() {
    console.log('this.validationForm1.value,', this.lifePolicyForm.value);
  }

  /**
   * Returns form
   */
  get formLifePolicy() {
    return this.lifePolicyForm.controls;
  }

  /**
   * Returns form
   */
  get formBeneficiary() {
    return this.beneficiaryForm.controls;
  }

  get formMedical() {
    return this.medicalForm.controls;
  }

  get beneficiaries() {
    return this.beneficiaryForm.get('beneficiaries') as FormArray;
  }

  get contigentBeneficiaries() {
    return this.contigentBeneficiaryForm.get(
      'contigentBeneficiaries'
    ) as FormArray;
  }

  formLifePolicySubmit() {
    // TODO Validación del formulario Life Policy
    console.log('entró');
    // if (this.validationForm1.valid) {
    this.addBeneficiary();
    this.lifePolicy.goToNextStep();
    // }
    this.islifePolicyFormSubmitted = true;
  }

  beneficiaryFormSubmittedSubmit() {
    console.log('entró 2');
    // if (this.beneficiaryForm.valid) {
    this.addContigentBeneficiary();
    this.lifePolicy.goToNextStep();
    // }
    this.isBeneficiaryFormSubmitted = true;
  }

  contigentBeneficiaryFormSubmittedSubmit() {
    // if (this.contigentBeneficiaryForm.valid) {
    this.lifePolicy.goToNextStep();
    // }
    this.isContigentBeneficiaryFormSubmitted = true;
  }

  medicalFormSubmittedSubmit() {
    console.log('entró');

    if (this.medicalForm.valid) {
      this.lifePolicy.goToNextStep();
    }
    this.isMedicalFormFormSubmitted = true;
  }

  addBeneficiary() {
    this.beneficiaries.push(
      this.formBuilder.group({
        firstName: ['', []],
        middleName: ['', [Validators.minLength(3)]],
        lastName: ['', [Validators.minLength(3), Validators.required]],

        relationshipToInsured: [
          '',
          [Validators.minLength(3), Validators.required],
        ],
        phone: ['', [Validators.required]],
        email: [
          '',
          [Validators.required, Validators.email, Validators.minLength(3)],
        ],
        dateBirth: [''],
        ss: [''],
        share: [''],
      })
    );
  }

  addContigentBeneficiary() {
    this.contigentBeneficiaries.push(
      this.formBuilder.group({
        firstName: ['', []],
        middleName: ['', [Validators.minLength(3)]],
        lastName: ['', [Validators.minLength(3), Validators.required]],

        relationshipToInsured: [
          '',
          [Validators.minLength(3), Validators.required],
        ],
        phone: ['', [Validators.required]],
        email: [
          '',
          [Validators.required, Validators.email, Validators.minLength(3)],
        ],
        dateBirth: [''],
        ss: [''],
        share: [''],
      })
    );
  }
}
