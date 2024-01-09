import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import { StateModel } from 'src/app/core/models/state.model';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { FileUploadService } from 'src/app/services/fileUpload/file-upload.service';
import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';
import Swal from 'sweetalert2';
import { TEXT } from 'src/app/core/enum/text.enum';
import { CustomerModel } from 'src/app/core/models/customer.model';
import { PolicyService } from 'src/app/services/policy/policy.service';
import {
  IBeneficiary,
  IPolicy,
  IcontingentBeneficiary,
} from 'src/app/core/interfaces/policy.interface';
import { Observable, switchMap } from 'rxjs';
import { PolicyModel } from 'src/app/core/models/policy.model';
import { StatusPolicy } from 'src/app/core/enum/estatus-policy';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-policy',
  templateUrl: './add-policy.component.html',
  styleUrls: ['./add-policy.component.scss'],
})
export class AddPolicyComponent implements OnInit {
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
  selectCustomer: CustomerModel;
  selectPolicy: PolicyModel;

  customerId: string;
  policyId: string;

  idPhotoFile: File;
  document1File: File;
  document2File: File;

  isDisabled: boolean = false;

  formattedAmount: any;
  formattedMonthly: any;
  formattedFaceAmount: any;
  amount: any;

  photoIdUrl: string = environment.photoId;
  documentOneUrl: string = environment.documentOne;
  documentTwoUrl: string = environment.documentTwo;

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
      if (id) {
        this.customerId = id;
        this.getCustomerById(this.customerId);
      }
    });

    this.activatedRoute.queryParams.subscribe(({ idPolicy }) => {
      if (idPolicy) {
        this.policyId = idPolicy;
        this.isDisabled = true;
        this.getPolicyAndCustomer(this.policyId);
      }
    });

    this.createForm();
    if (!this.policyId) {
      this.addBeneficiary();
      this.addContigentBeneficiary();
      this.addReferrals();
    }
  }

  createForm() {
    this.lifePolicyForm = this.formBuilder.group({
      carrier: [
        { value: '', disabled: this.isDisabled },
        [Validators.required],
      ],
      policyType: [
        { value: '', disabled: this.isDisabled },
        [Validators.required],
      ],
      monthly: [
        { value: '', disabled: this.isDisabled },
        [Validators.required],
      ],
      faceAmount: [
        { value: '', disabled: this.isDisabled },
        [Validators.required],
      ],
    });

    this.beneficiaryForm = this.formBuilder.group({
      beneficiaries: this.formBuilder.array([]),
    });

    this.contigentBeneficiaryForm = this.formBuilder.group({
      contigentBeneficiaries: this.formBuilder.array([]),
    });

    this.medicalForm = this.formBuilder.group({
      doctorName: [
        { value: '', disabled: this.isDisabled },
        [Validators.required],
      ],
      doctorOfficeLocation: [{ value: '', disabled: this.isDisabled }, []],
      officePhoneNumber: [{ value: '', disabled: this.isDisabled }, []],
      lastVisit: [
        { value: '', disabled: this.isDisabled },
        [Validators.required],
      ],
      reasonForVisit: [{ value: '', disabled: this.isDisabled }, []],
      outcomeOfVisit: [{ value: '', disabled: this.isDisabled }, []],
      smoker: [{ value: '', disabled: this.isDisabled }, [Validators.required]],
      medicalCondition: [{ value: '', disabled: this.isDisabled }, []],
      whenItWasDiagnosed: [{ value: '', disabled: this.isDisabled }, []],
      dosage: [{ value: '', disabled: this.isDisabled }, []],
      additionalInformation: [{ value: '', disabled: this.isDisabled }, []],
      isFatherAlive: [
        { value: '', disabled: this.isDisabled },
        [Validators.required],
      ],
      fatherAge: [{ value: '', disabled: this.isDisabled }, []],
      deceasedFather: [{ value: '', disabled: this.isDisabled }, []],
      isMotherAlive: [
        { value: '', disabled: this.isDisabled },
        [Validators.required],
      ],
      motherAge: [{ value: '', disabled: this.isDisabled }, []],
      deceasedMother: [{ value: '', disabled: this.isDisabled }, []],
      note: [{ value: '', disabled: this.isDisabled }, []],
    });

    this.additionalQuestionForm = this.formBuilder.group({
      criminalRecord: [
        { value: '', disabled: this.isDisabled },
        [Validators.required],
      ],
      pleadedGuilty: [
        { value: '', disabled: this.isDisabled },
        [Validators.required],
      ],
      anotherLife: [
        { value: '', disabled: this.isDisabled },
        [Validators.required],
      ],
      appliedForLife: [
        { value: '', disabled: this.isDisabled },
        [Validators.required],
      ],
      participateSport: [
        { value: '', disabled: this.isDisabled },
        [Validators.required],
      ],
      involved: [
        { value: '', disabled: this.isDisabled },
        [Validators.required],
      ],
    });

    this.bankInformationForm = this.formBuilder.group({
      draftPaymentDate: [
        { value: '', disabled: this.isDisabled },
        [Validators.required],
      ],
      bank: [{ value: '', disabled: this.isDisabled }, [Validators.required]],
      accountNumber: [
        { value: '', disabled: this.isDisabled },
        [Validators.required],
      ],
      routingNumber: [
        { value: '', disabled: this.isDisabled },
        [Validators.required],
      ],
      notes: [{ value: '', disabled: this.isDisabled }, []],
    });

    this.referralsForm = this.formBuilder.group({
      referrals: this.formBuilder.array([]),
    });

    this.documentForm = this.formBuilder.group({
      idPhoto: [{ value: '', disabled: this.isDisabled }, []],
      document1: [{ value: '', disabled: this.isDisabled }, []],
      document2: [{ value: '', disabled: this.isDisabled }, []],
      primaryAgentName: [
        { value: '', disabled: this.isDisabled },
        [Validators.required],
      ],
      percentage1: [
        { value: '', disabled: this.isDisabled },
        [Validators.required],
      ],
      secondaryAgentName: [{ value: '', disabled: this.isDisabled }, []],
      percentage2: [{ value: '', disabled: this.isDisabled }, []],
      fieldTrainingAgent: [{ value: '', disabled: this.isDisabled }, []],
      mbBase: [{ value: '', disabled: this.isDisabled }, []],
    });

    this.isSubmitted();
  }

  isSubmitted() {
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

  onIdPhotoChange(event: any) {
    this.idPhotoFile = event.target.files[0];
  }

  onDocument1Change(event: any) {
    this.document1File = event.target.files[0];
  }

  onDocument2Change(event: any) {
    this.document2File = event.target.files[0];
  }

  nextPolicy() {
    this.policy.goToNextStep();
  }

  formLifePolicySubmit() {
    if (this.lifePolicyForm.valid || this.lifePolicyForm.disabled) {
      this.policy.goToNextStep();
    }
    this.isLifePolicyFormSubmitted = true;
  }

  beneficiaryFormSubmittedSubmit() {
    if (this.beneficiaryForm.valid || this.beneficiaryForm.disabled) {
      this.policy.goToNextStep();
    }
    this.isBeneficiaryFormSubmitted = true;
  }

  contigentBeneficiaryFormSubmittedSubmit() {
    if (
      this.contigentBeneficiaryForm.valid ||
      this.contigentBeneficiaryForm.disabled
    ) {
      this.policy.goToNextStep();
    }
    this.isContigentBeneficiaryFormSubmitted = true;
  }

  medicalFormSubmittedSubmit() {
    if (this.medicalForm.valid || this.medicalForm.disabled) {
      this.policy.goToNextStep();
    }
    this.isMedicalFormFormSubmitted = true;
  }

  additionalQuestionFormSubmittedSubmit() {
    if (
      this.additionalQuestionForm.valid ||
      this.additionalQuestionForm.disabled
    ) {
      this.policy.goToNextStep();
    }
    this.isAdditionalQuestionFormSubmitted = true;
  }

  referralsFormSubmittedSubmit() {
    if (this.referralsForm.valid || this.referralsForm.disabled) {
      this.policy.goToNextStep();
    }
    this.isReferralsFormSubmitted = true;
  }

  bankInformationFormSubmittedSubmit() {
    if (this.bankInformationForm.valid || this.bankInformationForm.disabled) {
      this.policy.goToNextStep();
    }
    this.isBankInformationFormSubmitted = true;
  }

  addBeneficiary() {
    this.formBeneficiaries.push(
      this.formBuilder.group({
        firstName: [
          { value: '', disabled: this.isDisabled },
          [Validators.required],
        ],
        middleName: [
          { value: '', disabled: this.isDisabled },
          [Validators.minLength(3)],
        ],
        lastName: [
          { value: '', disabled: this.isDisabled },
          [Validators.minLength(3), Validators.required],
        ],
        relationshipToInsured: [
          { value: '', disabled: this.isDisabled },
          [Validators.minLength(3), Validators.required],
        ],
        phone: [
          { value: '', disabled: this.isDisabled },
          [Validators.required],
        ],
        email: [
          { value: '', disabled: this.isDisabled },
          [Validators.required, Validators.email, Validators.minLength(3)],
        ],
        dateBirth: [{ value: '', disabled: this.isDisabled }],
        ss: [{ value: '', disabled: this.isDisabled }],
        share: [{ value: '', disabled: this.isDisabled }],
      })
    );
  }

  addContigentBeneficiary() {
    this.contigentBeneficiaries.push(
      this.formBuilder.group({
        firstName: [{ value: '', disabled: this.isDisabled }, []],
        middleName: [{ value: '', disabled: this.isDisabled }, []],
        lastName: [{ value: '', disabled: this.isDisabled }, []],
        relationshipToInsured: [{ value: '', disabled: this.isDisabled }, []],
        phone: [{ value: '', disabled: this.isDisabled }, []],
        email: [{ value: '', disabled: this.isDisabled }, [Validators.email]],
        dateBirth: [{ value: '', disabled: this.isDisabled }],
        ss: [{ value: '', disabled: this.isDisabled }],
        share: [{ value: '', disabled: this.isDisabled }],
      })
    );
  }

  addReferrals() {
    this.referrals.push(
      this.formBuilder.group({
        firstName: [{ value: '', disabled: this.isDisabled }, []],
        middleName: [{ value: '', disabled: this.isDisabled }, []],
        lastName: [{ value: '', disabled: this.isDisabled }, []],
        relationshipToInsured: [{ value: '', disabled: this.isDisabled }, []],
        phone: [{ value: '', disabled: this.isDisabled }, []],
        email: [{ value: '', disabled: this.isDisabled }, [Validators.email]],
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
            title: 'Failed to search for customer',
            icon: 'error',
            html: `${errorList.length ? errorList.join('') : error.error.msg}`,
          });

          this.router.navigateByUrl(
            `${ROUTE_APP.CUSTOMER}/${ROUTE_APP.ALL_CUSTOMERS}`
          );
        },
      });
    }
  }

  getPolicyAndCustomer(policyId: string) {
    const errorMessage = 'Failed to search for customer';

    this.policyService.getPolicy(policyId).subscribe({
      next: (policy) => {
        this.selectPolicy = policy;

        if (this.selectPolicy) {
          this.getCustomerById(this.selectPolicy.customer._id);
          this.populateLifePolicyForm(policy);
          this.populateBeneficiariesForm(policy);
          this.populateContingentBeneficiariesForm(policy);
          this.populateMedicalForm(policy);
          this.populateAdditionalQuestionForm(policy);
          this.populateBankInformationForm(policy);
          this.populateReferralsForm(policy);
          this.populateDocumentForm(policy);

          this.disabelFieldForm();
        }
      },

      error: (error: any) => {
        this.handleError(error, errorMessage);
      },
    });
  }

  populateLifePolicyForm(policy: PolicyModel) {
    const { carrier, policyType, monthly, faceAmount } = policy;
    this.lifePolicyForm.patchValue({
      carrier,
      policyType,
      monthly,
      faceAmount,
    });
  }

  populateBeneficiariesForm(policy: PolicyModel) {
    const beneficiaries = policy?.beneficiaries;

    if (beneficiaries) {
      beneficiaries.forEach((beneficiary) => {
        this.formBeneficiaries.push(this.createBeneficiaryGroup(beneficiary));
      });
    }
  }

  createBeneficiaryGroup(beneficiary: IBeneficiary) {
    return this.formBuilder.group({
      firstName: [beneficiary.firstName],
      middleName: [beneficiary.middleName],
      lastName: [beneficiary.lastName],
      relationshipToInsured: [beneficiary.relationshipToInsured],
      phone: [beneficiary.phone],
      email: [beneficiary.email],
      dateBirth: [beneficiary.dateBirth],
      ss: [beneficiary.ss],
      share: [beneficiary.share],
    });
  }

  populateContingentBeneficiariesForm(policy: PolicyModel) {
    const contingentBeneficiaries = policy?.contingentBeneficiary;

    if (contingentBeneficiaries) {
      contingentBeneficiaries.forEach((contingentBeneficiary) => {
        this.contigentBeneficiaries.push(
          this.createContingentBeneficiaryGroup(contingentBeneficiary)
        );
      });
    }
  }

  createContingentBeneficiaryGroup(
    contingentBeneficiary: IcontingentBeneficiary
  ) {
    return this.formBuilder.group({
      firstName: [contingentBeneficiary.firstName],
      middleName: [contingentBeneficiary.middleName],
      lastName: [contingentBeneficiary.lastName],
      relationshipToInsured: [contingentBeneficiary.relationshipToInsured],
      phone: [contingentBeneficiary.phone],
      email: [contingentBeneficiary.email],
      dateBirth: [contingentBeneficiary.dateBirth],
      ss: [contingentBeneficiary.ss],
      share: [contingentBeneficiary.share],
    });
  }

  populateMedicalForm(policy: PolicyModel) {
    const medicalData = policy?.medical;
    if (medicalData) {
      this.medicalForm.patchValue({
        doctorName: medicalData.doctorName,
        doctorOfficeLocation: medicalData.doctorOfficeLocation,
        officePhoneNumber: medicalData.officePhoneNumber,
        lastVisit: medicalData.lastVisit,
        reasonForVisit: medicalData.reasonForVisit,
        outcomeOfVisit: medicalData.outcomeOfVisit,
        smoker: medicalData.smoker,
        medicalCondition: medicalData.medicalCondition,
        whenItWasDiagnosed: medicalData.whenItWasDiagnosed,
        dosage: medicalData.dosage,
        additionalInformation: medicalData.additionalInformation,
        isFatherAlive: medicalData.isFatherAlive,
        fatherAge: medicalData.fatherAge,
        deceasedFather: medicalData.deceasedFather,
        isMotherAlive: medicalData.isMotherAlive,
        motherAge: medicalData.motherAge,
        deceasedMother: medicalData.deceasedMother,
        note: medicalData.note,
      });
    }
  }

  populateAdditionalQuestionForm(policy: PolicyModel) {
    const additionalQuestionsData = policy?.additionalQuestions;
    if (additionalQuestionsData) {
      this.additionalQuestionForm.patchValue({
        criminalRecord: additionalQuestionsData.criminalRecord,
        pleadedGuilty: additionalQuestionsData.pleadedGuilty,
        anotherLife: additionalQuestionsData.anotherLife,
        appliedForLife: additionalQuestionsData.appliedForLife,
        participateSport: additionalQuestionsData.participateSport,
        involved: additionalQuestionsData.involved,
      });
    }
  }

  populateBankInformationForm(policy: PolicyModel) {
    const bankInformationData = policy?.bankInformation;
    if (bankInformationData) {
      this.bankInformationForm.patchValue({
        draftPaymentDate: bankInformationData.draftPaymentDate,
        bank: bankInformationData.bank,
        accountNumber: bankInformationData.accountNumber,
        routingNumber: bankInformationData.routingNumber,
        notes: bankInformationData.notes,
      });
    }
  }

  populateReferralsForm(policy: PolicyModel) {
    const referralsData = policy?.referrals;
    if (referralsData) {
      referralsData.forEach((referral) => {
        this.referrals.push(
          this.formBuilder.group({
            firstName: [referral.firstName],
            middleName: [referral.middleName],
            lastName: [referral.lastName],
            relationshipToInsured: [referral.relationshipToInsured],
            phone: [referral.phone],
            email: [referral.email],
          })
        );
      });
    }
  }

  populateDocumentForm(policy: PolicyModel) {
    const documentData = policy?.document;
    if (documentData) {
      this.documentForm.patchValue({
        idPhoto: '',
        document1: '',
        document2: '',
        primaryAgentName: documentData.primaryAgentName,
        percentage1: documentData.percentage1,
        secondaryAgentName: documentData.secondaryAgentName,
        percentage2: documentData.percentage2,
        fieldTrainingAgent: documentData.fieldTrainingAgent,
        mbBase: documentData.mbBase,
      });
    }
  }

  submitForm() {
    const policyData = this.getPolicyData();
    const successMessage = 'Policy created';
    const successMessageUpdate = 'updated policy';
    const errorMessage = 'Error creating policy';
    const errorMessageUpdate = 'Error updating policy';

    if (this.selectPolicy) {
      // Updated Policy

      Swal.fire({
        title: 'Do you want to edit the policy?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          this.updatePolicy(policyData)
            .pipe(
              switchMap((resp: any) =>
                this.updateUploadPolicyDocument(resp.policy.uid)
              )
            )
            .subscribe({
              next: () => this.handleSuccess(successMessageUpdate),
              error: (error) => this.handleError(error, errorMessageUpdate),
            });
        }
      });
    } else {
      this.isDocumentFormSubmitted = true;

      if (this.isFormValid()) {
        this.createPolicy(policyData)
          .pipe(
            switchMap((resp: any) =>
              this.uploadPolicyDocuments(resp.policy.uid)
            )
          )
          .subscribe({
            next: () => this.handleSuccess(successMessage),
            error: (error) => this.handleError(error, errorMessage),
          });
      }
    }
  }

  private updateUploadPolicyDocument(policyUid: string) {
    return this.updateUploadDocument(
      policyUid,
      this.idPhotoFile,
      this.document1File,
      this.document2File
    );
  }

  private uploadPolicyDocuments(policyUid: string) {
    return this.uploadDocuments(
      policyUid,
      this.idPhotoFile,
      this.document1File,
      this.document2File
    );
  }

  isFormValid(): boolean {
    return (
      this.lifePolicyForm.valid &&
      this.beneficiaryForm.valid &&
      this.contigentBeneficiaryForm.valid &&
      this.medicalForm.valid &&
      this.additionalQuestionForm.valid &&
      this.bankInformationForm.valid &&
      this.referralsForm.valid &&
      this.documentForm.valid
    );
  }

  getPolicyData(): IPolicy {
    const data = {
      ...this.lifePolicyForm.value,
      ...this.beneficiaryForm.value,
      ...this.contigentBeneficiaryForm.value,
      ...this.medicalForm.value,
      ...this.additionalQuestionForm.value,
      ...this.bankInformationForm.value,
      ...this.referralsForm.value,
      ...this.documentForm.value,
    };

    const policyData: IPolicy = {
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
        note: data.note,
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
        mbBase: data.mbBase,
      },
      customer: this.selectCustomer.uid,
      status: StatusPolicy.MORE_INFORMATION_NEEDED,
    };

    return policyData;
  }

  createPolicy(policyData: IPolicy): Observable<any> {
    return this.policyService.createPolicy(policyData);
  }

  updatePolicy(policyData: IPolicy): Observable<any> {
    return this.policyService.updatePolicy(this.selectPolicy.uid, policyData);
  }

  uploadDocuments(
    policyId: string,
    idPhotoFile: File,
    document1File: File,
    document2File: File
  ): Observable<any> {
    return this.fileUploadService.uploadDocuments(
      policyId,
      idPhotoFile,
      document1File,
      document2File
    );
  }

  updateUploadDocument(
    policyId: string,
    idPhotoFile: File,
    document1File: File,
    document2File: File
  ): Observable<any> {
    return this.fileUploadService.updateUploadDocument(
      policyId,
      idPhotoFile,
      document1File,
      document2File
    );
  }

  private handleError(error: any, defaultMessage: string) {
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
      title: defaultMessage,
      icon: 'error',
      html: `${errorList.length ? errorList.join('') : error.error.msg}`,
    });
  }

  private handleSuccess(message: string) {
    Swal.fire({
      icon: 'success',
      title: message,
    });
    this.clearForm();
    this.router.navigateByUrl(`${ROUTE_APP.POLICY}/${ROUTE_APP.ALL_POLICY}`);
  }

  editCustomer(customer: CustomerModel) {
    this.router.navigateByUrl(
      `${ROUTE_APP.CUSTOMER}/${ROUTE_APP.EDIT_CUSTOMERS}/${customer.uid}`
    );
  }

  cancelPolicy() {
    this.router.navigateByUrl(`${ROUTE_APP.POLICY}/${ROUTE_APP.ALL_POLICY}`);
  }

  editPolicy() {
    Swal.fire({
      title: 'Do you want to edit the policy?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.enableFieldsForm();
      }
    });
  }

  disabelFieldForm() {
    this.lifePolicyForm.disable();
    this.beneficiaryForm.disable();
    this.contigentBeneficiaryForm.disable();
    this.medicalForm.disable();
    this.additionalQuestionForm.disable();
    this.bankInformationForm.disable();
    this.documentForm.disable();
    this.referrals.disable();
  }

  enableFieldsForm() {
    this.lifePolicyForm.enable();
    this.beneficiaryForm.enable();
    this.contigentBeneficiaryForm.enable();
    this.medicalForm.enable();
    this.additionalQuestionForm.enable();
    this.bankInformationForm.enable();
    this.documentForm.enable();
    this.referrals.enable();
    this.isDisabled = false;
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
