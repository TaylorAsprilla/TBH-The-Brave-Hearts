import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';
import { TEXT } from 'src/app/core/enum/text.enum';
import { StateModel } from 'src/app/core/models/state.model';
import { ProspectService } from 'src/app/services/prospect/prospect.service';
import Swal from 'sweetalert2';
import { ProspectModel } from 'src/app/core/models/prospect.model';

@Component({
  selector: 'app-add-prospects',
  templateUrl: './add-prospects.component.html',
  styleUrls: ['./add-prospects.component.scss'],
})
export class AddProspectsComponent implements OnInit {
  prospectForm: UntypedFormGroup;

  states: StateModel[] = [];
  selectedProspect: ProspectModel;

  isprospectFormSubmitted: Boolean = false;

  constructor(
    public formBuilder: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private prospectService: ProspectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.states = this.activatedRoute.snapshot.data['states'];

    this.activatedRoute.params.subscribe(({ id }) => {
      this.getProspectById(id);
    });

    this.createForm();
  }

  createForm() {
    this.prospectForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.minLength(3)]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.minLength(3)]],
      occupation: [''],
      partnerName: [''],
      partnerLastName: [''],
      partnerOccupation: [''],
      children: [],
      retirementPlans: [''],
      lifeInsurance: [''],
      properties: [''],
      income: [''],
      panertIncome: [''],
      additionalIncome: [''],
      surplusIncome: [''],
      observations: [''],
    });

    this.isprospectFormSubmitted = false;
  }

  get formProspect() {
    return this.prospectForm.controls;
  }

  // Validated of the phone
  isValidPhoneNumberFormat(phoneNumber: string): boolean {
    const regex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return regex.test(phoneNumber);
  }

  formatPhoneNumber(phoneNumber: string): string {
    const regex = /(\d{3})(\d{3})(\d{4})/;
    return phoneNumber.replace(regex, '($1) $2-$3');
  }

  formatPhoneNumberField(control: any): void {
    const phoneNumber = control.value;
    if (phoneNumber && this.isValidPhoneNumberFormat(phoneNumber)) {
      const formattedPhoneNumber = this.formatPhoneNumber(phoneNumber);
      control.setValue(formattedPhoneNumber);
    } else {
      control.setErrors({ invalidFormat: true });
    }
  }

  isValid(): boolean | undefined {
    return (
      (this.isprospectFormSubmitted &&
        this.prospectForm.get('phone')?.hasError('invalidPhoneNumber')) ||
      this.prospectForm.get('phone')?.hasError('invalidFormat')
    );
  }

  createProspect() {
    if (this.selectedProspect) {
      this.updateAgent();
    } else {
      this.isprospectFormSubmitted = true;

      const data = this.prospectForm.value;

      if (this.prospectForm.valid) {
        this.prospectService.createprospect(data).subscribe({
          next: (resp: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Prospect created',
              html: `<b> Prospect Name: </b> ${resp.prospect.firstName} ${resp.prospect.lastName}`,
            });
            this.router.navigateByUrl(
              `${ROUTE_APP.PROSPECT}/${ROUTE_APP.ALL_PROSPECTS}`
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
              title: 'Error creating prospect',
              icon: 'error',
              html: `${
                errorList.length ? errorList.join('') : error.error.msg
              }`,
            });
          },
        });
      }
    }
  }

  updateAgent() {
    const data: ProspectModel = {
      uid: this.selectedProspect.uid,
      phone: this.formProspect.phone.value,
      email: this.formProspect.email.value,
      firstName: this.formProspect.firstName.value,
      lastName: this.formProspect.lastName.value,
      occupation: this.formProspect.occupation.value,
      partnerName: this.formProspect.partnerName.value,
      partnerLastName: this.formProspect.partnerLastName.value,
      partnerOccupation: this.formProspect.partnerOccupation.value,
      children: this.formProspect.children.value,
      retirementPlans: this.formProspect.retirementPlans.value,
      lifeInsurance: this.formProspect.lifeInsurance.value,
      properties: this.formProspect.properties.value,
      income: this.formProspect.income.value,
      panertIncome: this.formProspect.panertIncome.value,
      additionalIncome: this.formProspect.additionalIncome.value,
      surplusIncome: this.formProspect.surplusIncome.value,
      observations: this.formProspect.observations.value,
      agent: this.selectedProspect.agent,
      status: this.selectedProspect.status,
    };

    this.prospectService.updateProspect(data).subscribe({
      next: (resp: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Updated prospect',
          html: `<b> Name: </b> ${resp.prospect.firstName} ${resp.prospect.lastName}`,
        });
        this.resetForm();
        this.router.navigateByUrl(
          `${ROUTE_APP.PROSPECT}/${ROUTE_APP.ALL_PROSPECTS}`
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
          title: 'Error updating prospect',
          icon: 'error',
          html: `${errorList.length ? errorList.join('') : error.error.msg}`,
        });
      },
    });
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
            panertIncome,
            additionalIncome,
            surplusIncome,
            observations,
          } = prospect;
          this.selectedProspect = prospect;

          this.prospectForm.setValue({
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
            panertIncome,
            additionalIncome,
            surplusIncome,
            observations,
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

  cancelEdit() {
    this.router.navigateByUrl(
      `${ROUTE_APP.PROSPECT}/${ROUTE_APP.ALL_PROSPECTS}`
    );
  }

  resetForm() {
    this.prospectForm.reset();
  }
}
