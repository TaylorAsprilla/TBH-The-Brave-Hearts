import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import {
  DropzoneConfigInterface,
  DropzoneDirective,
} from 'ngx-dropzone-wrapper';
import Swal from 'sweetalert2';

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
  additionalQuestionForm: UntypedFormGroup;
  bankInformationForm: UntypedFormGroup;
  documentForm: UntypedFormGroup;

  islifePolicyFormSubmitted: Boolean;
  isBeneficiaryFormSubmitted: Boolean;
  isContigentBeneficiaryFormSubmitted: Boolean;
  isMedicalFormFormSubmitted: Boolean;
  isAdditionalQuestionFormSubmitted: Boolean;
  isBankInformationFormSubmitted: Boolean;
  isDocumentFormSubmitted: Boolean;

  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
  };

  @ViewChild(DropzoneDirective, { static: false })
  directiveRef?: DropzoneDirective;

  @ViewChild('lifePolicy') lifePolicy: BaseWizardComponent;

  constructor(public formBuilder: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.createForm();
    this.addBeneficiary();
    this.addContigentBeneficiary();
  }

  createForm() {
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
      phoneType: ['', []],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(3)],
      ],
      documentType: ['', [Validators.required, Validators.minLength(2)]],
      documentNumber: ['', [Validators.required, Validators.minLength(3)]],
      maritalStatus: ['', [Validators.required]],
      dateBirth: ['', [Validators.required]],

      countryBirth: ['', [Validators.minLength(3), Validators.required]],
      cityBirth: ['', [Validators.minLength(3), Validators.required]],

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

    this.additionalQuestionForm = this.formBuilder.group({
      criminalRecord: ['', [Validators.required]],
      pleadedGuilty: ['', [Validators.required]],
      anotherLife: ['', [Validators.required]],
      appliedForLife: ['', [Validators.required]],
      participateSport: ['', [Validators.required]],
      involved: ['', [Validators.required]],
    });

    this.bankInformationForm = this.formBuilder.group({
      draftPaymentDate: ['', [Validators.required]],
      bank: ['', [Validators.required]],
      accountNumber: ['', [Validators.required]],
      routingNumber: ['', [Validators.required]],
      notes: ['', []],
    });

    this.documentForm = this.formBuilder.group({
      idPhoto: ['', []],
      document1: ['', []],
      document2: ['', []],
      primaryAgentName: ['', [Validators.required]],
      percentage1: ['', [Validators.required]],
      secondaryAgentName: ['', []],
      percentage2: ['', []],
      fieldTrainingAgent: ['', []],
      mbBase: ['', []],
    });

    this.islifePolicyFormSubmitted = false;
    this.isBeneficiaryFormSubmitted = false;
    this.isContigentBeneficiaryFormSubmitted = false;
    this.isMedicalFormFormSubmitted = false;
    this.isAdditionalQuestionFormSubmitted = false;
    this.isBankInformationFormSubmitted = false;
    this.isDocumentFormSubmitted = false;
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

  get formBeneficiary() {
    return this.beneficiaryForm.controls;
  }

  get formMedical() {
    return this.medicalForm.controls;
  }

  get formBankInformation() {
    return this.bankInformationForm.controls;
  }

  get formDocument() {
    return this.documentForm.controls;
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

    this.lifePolicy.goToNextStep();
    // }
    this.islifePolicyFormSubmitted = true;
  }

  beneficiaryFormSubmittedSubmit() {
    // if (this.beneficiaryForm.valid) {

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

    // if (this.medicalForm.valid) {
    this.lifePolicy.goToNextStep();
    // }
    this.isMedicalFormFormSubmitted = true;
  }

  additionalQuestionFormSubmittedSubmit() {
    console.log('entró');

    // if (this.additionalQuestionForm.valid) {
    this.lifePolicy.goToNextStep();
    // }
    this.isAdditionalQuestionFormSubmitted = true;
  }

  bankInformationFormSubmittedSubmit() {
    console.log('entró');

    // if (this.bankInformationForm.valid) {
    this.lifePolicy.goToNextStep();
    // }
    this.isBankInformationFormSubmitted = true;
  }

  submitForm() {
    this.lifePolicyForm.value;
    this.beneficiaryForm.value;
    this.contigentBeneficiaryForm.value;
    this.medicalForm.value;
    this.additionalQuestionForm.value;
    this.bankInformationForm.value;
    this.documentForm.value;

    console.log(
      this.lifePolicyForm.value,
      this.beneficiaryForm.value,
      this.contigentBeneficiaryForm.value,
      this.medicalForm.value,
      this.additionalQuestionForm.value,
      this.bankInformationForm.value,
      this.documentForm.value
    );

    this.clearForm();

    Swal.fire({
      icon: 'success',
      title: 'Form sent successfully',
      timer: 3500,
    });
  }

  addBeneficiary() {
    this.beneficiaries.push(
      this.formBuilder.group({
        firstName: ['', [Validators.required]],
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

  clearForm() {
    this.lifePolicyForm.reset(),
      this.beneficiaryForm.reset(),
      this.contigentBeneficiaryForm.reset(),
      this.medicalForm.reset(),
      this.additionalQuestionForm.reset(),
      this.bankInformationForm.reset(),
      this.documentForm.reset();
  }
}
