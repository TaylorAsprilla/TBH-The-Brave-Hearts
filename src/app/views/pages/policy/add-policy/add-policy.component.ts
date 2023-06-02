import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import {
  DropzoneConfigInterface,
  DropzoneDirective,
} from 'ngx-dropzone-wrapper';
import { StateModel } from 'src/app/core/models/state.model';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { FileUploadService } from 'src/app/services/fileUpload/file-upload.service';
import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';
import Swal from 'sweetalert2';
import { TEXT } from 'src/app/core/enum/text.enum';
import { CustomerModel } from 'src/app/core/models/customer.model';
import { PolicyService } from 'src/app/services/policy/policy.service';
import { IPolicy } from 'src/app/core/interfaces/policy.interface';

@Component({
  selector: 'app-add-policy',
  templateUrl: './add-policy.component.html',
  styleUrls: ['./add-policy.component.scss'],
})
export class AddPolicyComponent implements OnInit {
  beneficiaryForm: UntypedFormGroup;
  contigentBeneficiaryForm: UntypedFormGroup;
  medicalForm: UntypedFormGroup;
  additionalQuestionForm: UntypedFormGroup;
  bankInformationForm: UntypedFormGroup;
  referralsForm: UntypedFormGroup;
  documentForm: UntypedFormGroup;

  isBeneficiaryFormSubmitted: Boolean;
  isContigentBeneficiaryFormSubmitted: Boolean;
  isMedicalFormFormSubmitted: Boolean;
  isAdditionalQuestionFormSubmitted: Boolean;
  isBankInformationFormSubmitted: Boolean;
  isReferralsFormSubmitted: Boolean;
  isDocumentFormSubmitted: Boolean;

  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
  };

  fileTmp: any;

  states: StateModel[] = [];
  selectCustomer: CustomerModel;

  @ViewChild(DropzoneDirective, { static: false })
  directiveRef?: DropzoneDirective;

  @ViewChild('policy') policy: BaseWizardComponent;

  constructor(
    public formBuilder: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private fileUploadService: FileUploadService,
    private router: Router,
    private customerService: CustomerService,
    private policyService: PolicyService
  ) {}

  ngOnInit(): void {
    this.states = this.activatedRoute.snapshot.data['states'];

    this.activatedRoute.params.subscribe(({ id }) => {
      this.getCustomerById(id);
    });

    this.createForm();
    this.addBeneficiary();
    this.addContigentBeneficiary();
    this.addReferrals();
  }

  createForm() {
    this.beneficiaryForm = this.formBuilder.group({
      beneficiaries: this.formBuilder.array([]),
    });

    this.contigentBeneficiaryForm = this.formBuilder.group({
      contigentBeneficiaries: this.formBuilder.array([]),
    });

    this.medicalForm = this.formBuilder.group({
      doctorName: ['', [Validators.required]],
      doctorOfficeLocation: ['', []],
      officePhoneNumber: ['', []],
      lastVisit: ['', [Validators.required]],
      reasonForVisit: ['', []],
      outcomeOfVisit: ['', []],
      smoker: ['', [Validators.required]],
      medicalCondition: ['', []],
      whenItWasDiagnosed: ['', []],
      medications: ['', []],
      dosage: ['', []],
      additionalInformation: ['', []],
      isFatherAlive: ['', [Validators.required]],
      fatherAge: ['', []],
      deceasedFather: ['', []],
      isMotherAlive: ['', [Validators.required]],
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

    this.referralsForm = this.formBuilder.group({
      referrals: this.formBuilder.array([]),
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

    this.isBeneficiaryFormSubmitted = false;
    this.isContigentBeneficiaryFormSubmitted = false;
    this.isMedicalFormFormSubmitted = false;
    this.isAdditionalQuestionFormSubmitted = false;
    this.isBankInformationFormSubmitted = false;
    this.isDocumentFormSubmitted = false;
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

  get formBankInformation() {
    return this.bankInformationForm.controls;
  }

  get formAdditionalQuestion() {
    return this.additionalQuestionForm.controls;
  }

  get formDocument() {
    return this.documentForm.controls;
  }

  get formBeneficiaries() {
    return this.beneficiaryForm.get('beneficiaries') as FormArray;
  }

  get contigentBeneficiaries() {
    return this.contigentBeneficiaryForm.get(
      'contigentBeneficiaries'
    ) as FormArray;
  }

  get referrals() {
    return this.referralsForm.get('referrals') as FormArray;
  }

  nextPolicy() {
    this.policy.goToNextStep();
  }

  beneficiaryFormSubmittedSubmit() {
    if (this.beneficiaryForm.valid) {
      this.policy.goToNextStep();
    }
    this.isBeneficiaryFormSubmitted = true;
  }

  contigentBeneficiaryFormSubmittedSubmit() {
    if (this.contigentBeneficiaryForm.valid) {
      this.policy.goToNextStep();
    }
    this.isContigentBeneficiaryFormSubmitted = true;
  }

  medicalFormSubmittedSubmit() {
    if (this.medicalForm.valid) {
      this.policy.goToNextStep();
    }
    this.isMedicalFormFormSubmitted = true;
  }

  additionalQuestionFormSubmittedSubmit() {
    if (this.additionalQuestionForm.valid) {
      this.policy.goToNextStep();
    }
    this.isAdditionalQuestionFormSubmitted = true;
  }

  referralsFormSubmittedSubmit() {
    if (this.referralsForm.valid) {
      this.policy.goToNextStep();
    }
    this.isReferralsFormSubmitted = true;
  }

  bankInformationFormSubmittedSubmit() {
    if (this.bankInformationForm.valid) {
      this.policy.goToNextStep();
    }
    this.isBankInformationFormSubmitted = true;
  }

  submitForm() {
    this.isDocumentFormSubmitted = true;

    if (
      (this.beneficiaryForm.valid,
      this.contigentBeneficiaryForm.valid,
      this.medicalForm.valid,
      this.additionalQuestionForm.valid,
      this.bankInformationForm.valid,
      this.referralsForm.valid,
      this.documentForm.valid)
    ) {
      let data = Object.assign(
        this.beneficiaryForm.value,
        this.contigentBeneficiaryForm.value,
        this.medicalForm.value,
        this.additionalQuestionForm.value,
        this.bankInformationForm.value,
        this.referralsForm.value,
        this.documentForm.value
      );

      // TODO Mapear bien la información de medical, beneficiaries, contingentBeneficiary
      const information: IPolicy = {
        carrier: data.carrier,
        policyType: data.policyType,
        monthly: data.monthly,
        faceAmount: data.faceAmount,
        beneficiaries: data.beneficiaries,
        contingentBeneficiary: data.contingentBeneficiary,
        medical: {
          doctorName: data.doctorName,
          doctorOfficeLocation: data.doctorOfficeLocation,
          officePhoneNumber: data.officePhoneNumber,
          lastVisit: data.lastVisit,
          reasonForVisit: data.reasonForVisit,
          outcomeOfVisit: data.outcomeOfVisit,
          smoker: data.smoker,
          medicalCondition: data.medicalCondition,
          whenItWasDiagnosed: data.whenItWasDiagnosed,
          dosage: data.dosage,
          additionalInformation: data.additionalInformation,
          isFatherAlive: data.isFatherAlive,
          fatherAge: data.fatherAge,
          deceasedFather: data.deceasedFather,
          isMotherAlive: data.isMotherAlive,
          motherAge: data.motherAge,
          deceasedMother: data.deceasedMother,
        },
        additionalQuestions: {
          criminalRecord: data.criminalRecord,
          pleadedGuilty: data.pleadedGuilty,
          anotherLife: data.anotherLife,
          appliedForLife: data.appliedForLife,
          participateSport: data.participateSport,
          involved: data.involved,
        },
        bankInformation: {
          draftPaymentDate: data.draftPaymentDate,
          bank: data.bank,
          accountNumber: data.accountNumber,
          routingNumber: data.routingNumber,
          notes: data.notes,
        },
        referrals: data.referrals,
        document: {
          idPhoto: data.idPhoto,
          document1: data.document1,
          document2: data.document2,
          primaryAgentName: data.primaryAgentName,
          percentage1: data.percentage1,
          secondaryAgentName: data.secondaryAgentName,
          percentage2: data.percentage2,
          fieldTrainingAgent: data.fieldTrainingAgent,
          mdBase: data.mdBase,
        },
        customer: this.selectCustomer.uid,
      };

      this.policyService.createPolicy(information).subscribe({
        next: (resp: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Policy created',
          });
          console.log('Respuesta', resp);
          this.clearForm();
          this.router.navigateByUrl(
            `${ROUTE_APP.POLICY}/${ROUTE_APP.ALL_POLICY}`
          );
        },
        error: (error: any) => {
          const errors = error?.error?.errors;
          const errorList: string[] = [];

          if (errors) {
            Object.entries(errors).forEach(([key, value]: [string, any]) => {
              if (value && value['msg']) {
                errorList.push('° ' + value['msg'] + '<br>');
              }
            });
          }

          Swal.fire({
            title: 'Error creating policy',
            icon: 'error',
            html: `${errorList.length ? errorList.join('') : error.error.msg}`,
          });
        },
      });
    }
  }

  addBeneficiary() {
    this.formBeneficiaries.push(
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
        firstName: ['', [Validators.required]],
        middleName: ['', []],
        lastName: ['', [, Validators.required]],

        relationshipToInsured: ['', [, Validators.required]],
        phone: ['', [Validators.required]],
        email: ['', [Validators.email]],
        dateBirth: [''],
        ss: [''],
        share: [''],
      })
    );
  }

  addReferrals() {
    this.referrals.push(
      this.formBuilder.group({
        firstName: ['', [Validators.required]],
        middleName: ['', []],
        lastName: ['', []],
        relationshipToInsured: ['', [Validators.required]],
        phone: ['', []],
        email: ['', [Validators.email]],
      })
    );
  }

  getCustomerById(id: string) {
    if (id !== TEXT.NEW) {
      this.customerService.getCustomer(id).subscribe({
        next: (customer) => {
          this.selectCustomer = customer;
        },
        error: (error: any) => {
          const errors = error?.error?.errors;
          const errorList: string[] = [];

          if (errors) {
            Object.entries(errors).forEach(([key, value]: [string, any]) => {
              if (value && value['msg']) {
                errorList.push('° ' + value['msg'] + '<br>');
              }
            });
          }

          Swal.fire({
            title: 'Error updating agent',
            icon: 'error',
            html: `${errorList.length ? errorList.join('') : error.error.msg}`,
          });

          this.router.navigateByUrl(
            `${ROUTE_APP.AGENT}/${ROUTE_APP.ALL_AGENTS}`
          );
        },
      });
    }
  }

  editCustomer(customer: CustomerModel) {
    this.router.navigateByUrl(
      `${ROUTE_APP.CUSTOMER}/${ROUTE_APP.EDIT_CUSTOMERS}/${customer.uid}`
    );
  }

  cancelEdit() {
    this.router.navigateByUrl(`${ROUTE_APP.POLICY}/${ROUTE_APP.ALL_POLICY}`);
  }

  clearForm() {
    this.beneficiaryForm.reset();
    this.contigentBeneficiaryForm.reset();
    this.medicalForm.reset();
    this.additionalQuestionForm.reset();
    this.bankInformationForm.reset();
    this.documentForm.reset();
    this.referrals.reset();
  }
}
