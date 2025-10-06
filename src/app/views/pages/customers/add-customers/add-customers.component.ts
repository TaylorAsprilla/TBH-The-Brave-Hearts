import { ProspectService } from './../../../../services/prospect/prospect.service';
import { CustomerService } from './../../../../services/customer/customer.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';

import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';
import {
  ICreateClient,
  ICreateCustomer,
} from 'src/app/core/interfaces/customer.interface';
import { StateModel } from 'src/app/core/models/state.model';
import { FileUploadService } from 'src/app/services/fileUpload/file-upload.service';
import Swal from 'sweetalert2';
import { Subscription, of, switchMap } from 'rxjs';
import { TEXT } from 'src/app/core/enum/text.enum';
import { CustomerModel } from 'src/app/core/models/customer.model';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { StatusPolicy } from 'src/app/core/enum/estatus-policy';
import { PolicyModel } from 'src/app/core/models/policy.model';
import { PolicyService } from 'src/app/services/policy/policy.service';

@Component({
  selector: 'app-add-customers',
  templateUrl: './add-customers.component.html',
  styleUrls: ['./add-customers.component.scss'],
})
export class AddCustomersComponent implements OnInit, OnDestroy {
  lifePolicyForm: UntypedFormGroup;
  beneficiaryForm: UntypedFormGroup;
  contigentBeneficiaryForm: UntypedFormGroup;
  medicalForm: UntypedFormGroup;
  additionalQuestionForm: UntypedFormGroup;
  bankInformationForm: UntypedFormGroup;
  referralsForm: UntypedFormGroup;
  documentForm: UntypedFormGroup;

  isLifePolicyFormSubmitted: Boolean;
  isBeneficiaryFormSubmitted: Boolean;
  isContigentBeneficiaryFormSubmitted: Boolean;
  isMedicalFormFormSubmitted: Boolean;
  isAdditionalQuestionFormSubmitted: Boolean;
  isBankInformationFormSubmitted: Boolean;
  isReferralsFormSubmitted: Boolean;
  isDocumentFormSubmitted: Boolean;

  states: StateModel[] = [];

  previousUrl: string;

  idPhotoFile: File;
  document1File: File;
  document2File: File;

  messagesEmail: string = '';
  messagesDocumentNumbert: string = '';

  routerSubscription: Subscription;
  validationEmailSubscription: Subscription;
  validationDocumentNumberSubscription: Subscription;
  policy: PolicyModel;
  customer: CustomerModel;

  @ViewChild('lifePolicy') lifePolicy: BaseWizardComponent;

  constructor(
    public formBuilder: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private prospectService: ProspectService,
    private fileUploadService: FileUploadService,
    private validationService: ValidationService,
    private policyService: PolicyService
  ) {}

  ngOnInit(): void {
    this.states = this.activatedRoute.snapshot.data['states'];

    this.activatedRoute.params.subscribe(({ ruta, id }) => {
      if (ruta === ROUTE_APP.PROSPECT) {
        this.getProspectById(id);
      }
    });

    this.createForm();
    this.addBeneficiary();
    this.addContigentBeneficiary();
    this.addReferrals();
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
    this.validationEmailSubscription?.unsubscribe();
    this.validationDocumentNumberSubscription?.unsubscribe();
  }

  createForm() {
    this.lifePolicyForm = this.formBuilder.group({
      carrier: ['', [Validators.required]],
      policyType: ['', [Validators.required]],
      monthly: ['', [Validators.required]],
      faceAmount: ['', [Validators.required]],
      firstName: ['', [Validators.minLength(2), Validators.required]],
      middleName: ['', [Validators.minLength(3)]],
      lastName: ['', [Validators.minLength(3), Validators.required]],
      address: ['', [Validators.minLength(3), Validators.required]],
      addressLine2: [''],
      city: ['', [Validators.minLength(3)]],
      state: ['', [Validators.minLength(3), Validators.required]],
      zipCode: [''],
      phone: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(3)],
      ],
      statusInUS: ['', []],
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
      idNumber: [''],
      expirationDate: [''],
      idState: [''],
    });

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
      reasonForVisit: ['', [Validators.required]],
      outcomeOfVisit: ['', [Validators.required]],
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
      notesMedical: ['', []],
    });

    this.additionalQuestionForm = this.formBuilder.group({
      criminalRecord: ['', [Validators.required]],
      pleadedGuilty: ['', [Validators.required]],
      anotherLife: ['', [Validators.required]],
      appliedForLife: ['', [Validators.required]],
      participateSport: ['', [Validators.required]],
      involved: ['', [Validators.required]],
      notesAdditionalQuestion: ['', []],
    });

    this.bankInformationForm = this.formBuilder.group({
      draftPaymentDate: ['', [Validators.required]],
      bank: ['', [Validators.required]],
      accountNumber: ['', [Validators.required]],
      routingNumber: ['', [Validators.required]],
      notesBankInformation: ['', []],
    });

    this.referralsForm = this.formBuilder.group({
      referrals: this.formBuilder.array([]),
    });

    this.documentForm = this.formBuilder.group({
      idPhoto: ['', []],
      document1: ['', []],
      document2: ['', []],
      primaryAgentName: ['', [Validators.required]],
      carrierCode: ['', []],
      percentage1: ['', [Validators.required]],
      secondaryAgentName: ['', []],
      percentage2: ['', []],
      fieldTrainingAgent: ['', []],
      mbBase: ['', []],
      notesDocument: ['', []],
    });

    this.isLifePolicyFormSubmitted = false;
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

  get isLifePolicyFormValid(): boolean {
    return (
      this.lifePolicyForm.valid &&
      !this.messagesEmail &&
      !this.messagesDocumentNumbert
    );
  }

  formLifePolicySubmit() {
    if (this.lifePolicyForm.valid) {
      this.createClient(this.lifePolicyForm.value);
      this.lifePolicy.goToNextStep();
    }
    this.isLifePolicyFormSubmitted = true;
  }

  beneficiaryFormSubmittedSubmit() {
    if (this.beneficiaryForm.valid) {
      this.updatePolicy(this.beneficiaryForm.value);
      this.lifePolicy.goToNextStep();
    }
    this.isBeneficiaryFormSubmitted = true;
  }

  contigentBeneficiaryFormSubmittedSubmit() {
    if (this.contigentBeneficiaryForm.valid) {
      this.updatePolicy(this.contigentBeneficiaryForm.value);
      this.lifePolicy.goToNextStep();
    }
    this.isContigentBeneficiaryFormSubmitted = true;
  }

  medicalFormSubmittedSubmit() {
    if (this.medicalForm.valid) {
      this.updatePolicy(this.medicalForm.value);
      this.lifePolicy.goToNextStep();
    }
    this.isMedicalFormFormSubmitted = true;
  }

  additionalQuestionFormSubmittedSubmit() {
    if (this.additionalQuestionForm.valid) {
      this.updatePolicy(this.additionalQuestionForm.value);
      this.lifePolicy.goToNextStep();
    }
    this.isAdditionalQuestionFormSubmitted = true;
  }

  referralsFormSubmittedSubmit() {
    if (this.referralsForm.valid) {
      this.updatePolicy(this.referralsForm.value);
      this.lifePolicy.goToNextStep();
    }
    this.isReferralsFormSubmitted = true;
  }

  bankInformationFormSubmittedSubmit() {
    if (this.bankInformationForm.valid) {
      this.updatePolicy(this.bankInformationForm.value);
      this.lifePolicy.goToNextStep();
    }
    this.isBankInformationFormSubmitted = true;
  }

  onIdPhotoChange(event: any) {
    this.idPhotoFile = event.target.files[0];
  }

  onDocument1Change(event: any) {
    this.document1File = event.target.files[0];
  }

  onDocument2Change(event: any) {
    this.document2File = event.target.files[0];
  }

  validateEmail(email: string) {
    this.messagesEmail = '';
    this.validationEmailSubscription = this.validationService
      .validationCustomerEmail(email)
      .subscribe((respuesta: any) => {
        if (!respuesta.ok) {
          this.messagesEmail = respuesta.msg;
        }
      });
  }

  validateDocumentNumber(documentNumber: string) {
    this.messagesDocumentNumbert = '';
    this.validationDocumentNumberSubscription = this.validationService
      .validationCustomerDocument(documentNumber)
      .subscribe((respuesta: any) => {
        if (!respuesta.ok) {
          this.messagesDocumentNumbert = respuesta.msg;
        }
      });
  }

  submitForm() {
    let customerCreate: CustomerModel;
    this.isDocumentFormSubmitted = true;

    if (
      (this.lifePolicyForm.valid,
      this.beneficiaryForm.valid,
      this.contigentBeneficiaryForm.valid,
      this.medicalForm.valid,
      this.additionalQuestionForm.valid,
      this.bankInformationForm.valid,
      this.referralsForm.valid,
      this.documentForm.valid)
    ) {
      let data = Object.assign(
        this.lifePolicyForm.value,
        this.beneficiaryForm.value,
        this.contigentBeneficiaryForm.value,
        this.medicalForm.value,
        this.additionalQuestionForm.value,
        this.bankInformationForm.value,
        this.referralsForm.value,
        this.documentForm.value
      );

      const information: ICreateCustomer = {
        customer: this.lifePolicyForm.value,
        policy: {
          carrier: data.carrier,
          policyType: data.policyType,
          monthly: data.monthly,
          faceAmount: data.faceAmount,
          beneficiaries: data.beneficiaries,
          contingentBeneficiary: data.contigentBeneficiaries,
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
            notes: data.notesMedical,
          },
          additionalQuestions: {
            criminalRecord: data.criminalRecord,
            pleadedGuilty: data.pleadedGuilty,
            anotherLife: data.anotherLife,
            appliedForLife: data.appliedForLife,
            participateSport: data.participateSport,
            involved: data.involved,
            notes: data.notesAdditionalQuestion,
          },
          bankInformation: {
            draftPaymentDate: data.draftPaymentDate,
            bank: data.bank,
            accountNumber: data.accountNumber,
            routingNumber: data.routingNumber,
            notes: data.notesBankInformation,
          },
          referrals: data.referrals,
          document: {
            primaryAgentName: data.primaryAgentName,
            percentage1: data.percentage1,
            secondaryAgentName: data.secondaryAgentName,
            percentage2: data.percentage2,
            fieldTrainingAgent: data.fieldTrainingAgent,
            mbBase: data.mbBase,
            notes: data.notesDocument,
          },
          status: StatusPolicy.MORE_INFORMATION_NEEDED,
        },
      };

      if (information) {
        this.policyService
          .updatePolicy(this.policy.uid, information.policy)
          .pipe(
            switchMap((resp: any) => {
              if (
                this.idPhotoFile ||
                this.document1File ||
                this.document2File
              ) {
                return this.fileUploadService.uploadDocuments(
                  resp.policy.uid,
                  this.idPhotoFile,
                  this.document1File,
                  this.document2File
                );
              } else {
                return of(null);
              }
            })
          )
          .subscribe({
            next: (resp: any) => {
              Swal.fire({
                icon: 'success',
                title: 'Customer created',
                html: `<b> Customer Name: </b> ${this.customer.firstName} ${this.customer.lastName}`,
              });
              this.clearForm();
              this.router.navigateByUrl(
                `${ROUTE_APP.CUSTOMER}/${ROUTE_APP.ALL_CUSTOMERS}`
              );
            },
            error: (error: any) => {
              const errors = error?.error?.errors;
              const errorList: string[] = [];

              if (errors) {
                Object.entries(errors).forEach(
                  ([key, value]: [string, any]) => {
                    if (value && value['msg']) {
                      errorList.push('° ' + value['msg'] + '<br>');
                    }
                  }
                );
              }

              Swal.fire({
                title: 'Error creating customer',
                icon: 'error',
                html: `${
                  errorList.length ? errorList.join('') : error.error.msg
                }`,
              });
            },
          });
      } else {
        Swal.fire({
          title: 'Check if you uploaded all documents',
          icon: 'error',
          html: ``,
        });
      }
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
        email: ['', [Validators.email, Validators.minLength(3)]],
        dateBirth: ['', [Validators.required]],
        ss: [''],
        share: ['', [Validators.required]],
      })
    );
  }

  removeBeneficiary(index: number) {
    this.formBeneficiaries.removeAt(index);
  }

  addContigentBeneficiary() {
    this.contigentBeneficiaries.push(
      this.formBuilder.group({
        firstName: ['', []],
        middleName: ['', []],
        lastName: ['', []],

        relationshipToInsured: ['', []],
        phone: ['', []],
        email: ['', [Validators.email]],
        dateBirth: [''],
        ss: [''],
        share: [''],
      })
    );
  }

  removeContigentBeneficiary(index: number) {
    this.contigentBeneficiaries.removeAt(index);
  }

  addReferrals() {
    this.referrals.push(
      this.formBuilder.group({
        firstName: ['', []],
        middleName: ['', []],
        lastName: ['', []],
        relationshipToInsured: ['', []],
        phone: ['', []],
        email: ['', [Validators.email]],
      })
    );
  }

  removeReferrals(index: number) {
    this.referrals.removeAt(index);
  }

  getProspectById(id: string) {
    if (id !== TEXT.NEW) {
      this.prospectService.getProspect(id).subscribe({
        next: (prospect) => {
          const {
            phone,
            email,
            firstName,
            lastName,
            occupation,
            partnerName,
            partnerLastName,
            partnerOccupation,
            children,
            retirementPlans,
            lifeInsurance,
            properties,
            income,
            partnerIncome,
            additionalIncome,
            surplusIncome,
            observations,
          } = prospect;

          this.lifePolicyForm.setValue({
            carrier: '',
            policyType: '',
            monthly: '',
            faceAmount: '',
            firstName: firstName,
            middleName: '',
            lastName: lastName,
            address: '',
            addressLine2: '',
            city: '',
            state: '',
            zipCode: '',
            phone: phone,
            email: email,
            statusInUS: '',
            documentType: '',
            documentNumber: '',
            maritalStatus: '',
            dateBirth: '',
            countryBirth: '',
            cityBirth: '',
            gender: '',
            weight: '',
            height: '',
            employerName: '',
            occupation: occupation,
            timeEmployed: '',
            annualIncome: '',
            householdIncome: '',
            householdNetWorth: '',
            idNumber: '',
            expirationDate: '',
            idState: '',
          });
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

  createClient(data: ICreateClient) {
    const formData: ICreateClient = {
      customer: this.lifePolicyForm.value,
      policy: this.lifePolicyForm.value,
    };

    this.customerService.createCustomer(formData).subscribe({
      next: (resp: any) => {
        this.customer = resp.customer;
        this.policy = resp.policy;

        Swal.fire({
          icon: 'success',
          position: 'bottom-right',
          text: resp.msg,
          showConfirmButton: false,
          timer: 1500,
        });
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
          title: 'Error',
          icon: 'error',
          html: `${errorList.length ? errorList.join('') : error.error.msg}`,
        });
      },
    });
  }

  updatePolicy(data: PolicyModel) {
    this.policyService.updatePolicy(this.policy.uid, data).subscribe({
      next: (resp: any) => {
        Swal.fire({
          icon: 'info',
          position: 'bottom-right',
          text: resp.msg,
          showConfirmButton: false,
          timer: 1500,
        });
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
          title: 'Error',
          icon: 'error',
          html: `${errorList.length ? errorList.join('') : error.error.msg}`,
        });
      },
    });
  }

  cancelEdit() {
    this.router.navigateByUrl(
      `${ROUTE_APP.CUSTOMER}/${ROUTE_APP.ALL_CUSTOMERS}`
    );
  }

  clearForm() {
    this.lifePolicyForm.reset();
    this.beneficiaryForm.reset();
    this.contigentBeneficiaryForm.reset();
    this.medicalForm.reset();
    this.additionalQuestionForm.reset();
    this.bankInformationForm.reset();
    this.documentForm.reset();
    this.referrals.reset();
  }
}
