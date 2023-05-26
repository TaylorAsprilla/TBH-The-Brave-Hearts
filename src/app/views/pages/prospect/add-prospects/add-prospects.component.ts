import { Component, OnInit } from '@angular/core';
import {
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
      middleName: ['', [Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      documentType: ['', [Validators.required, Validators.minLength(2)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(3)],
      ],
      dateBirth: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.minLength(7), Validators.required]],
      state: ['', Validators.required],
      partner: [''],
      occupation: [''],
      householdIncome: [''],
      children: ['No'],
      childrenAge: [''],
      childrenOccupation: [''],
      retirementPlans: [''],
      lifeInsurance: [''],
      discretionaryIncome: [''],
      properties: [''],
      otherIncome: [''],
      observations: [''],
    });

    this.isprospectFormSubmitted = false;
  }

  get formProspect() {
    return this.prospectForm.controls;
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
              title: 'Error creating proespect',
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
      firstName: this.formProspect.firstName.value,
      lastName: this.formProspect.lastName.value,
      documentType: this.formProspect.documentType.value,
      email: this.formProspect.email.value,
      dateBirth: this.formProspect.dateBirth.value,
      phone: this.formProspect.phone.value,
      middleName: this.formProspect.middleName.value,
      state: this.formProspect.state.value,
      partner: this.formProspect.partner.value,
      occupation: this.formProspect.occupation.value,
      householdIncome: this.formProspect.householdIncome.value,
      children: this.formProspect.children.value,
      childrenAge: this.formProspect.childrenAge.value,
      childrenOccupation: this.formProspect.childrenOccupation.value,
      retirementPlans: this.formProspect.retirementPlans.value,
      lifeInsurance: this.formProspect.lifeInsurance.value,
      discretionaryIncome: this.formProspect.discretionaryIncome.value,
      properties: this.formProspect.properties.value,
      otherIncome: this.formProspect.otherIncome.value,
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
            firstName,
            lastName,
            documentType,
            email,
            dateBirth,
            phone,
            status,
            middleName,
            state,
            partner,
            occupation,
            householdIncome,
            children,
            childrenAge,
            childrenOccupation,
            retirementPlans,
            lifeInsurance,
            discretionaryIncome,
            properties,
            otherIncome,
            observations,
          } = prospect;
          this.selectedProspect = prospect;

          const formattedDateBirth = new Date(dateBirth)
            .toISOString()
            .split('T')[0];

          this.prospectForm.setValue({
            firstName,
            lastName,
            documentType,
            email,
            dateBirth: formattedDateBirth,
            phone,
            middleName,
            state,
            partner,
            occupation,
            householdIncome,
            children,
            childrenAge,
            childrenOccupation,
            retirementPlans,
            lifeInsurance,
            discretionaryIncome,
            properties,
            otherIncome,
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
    this.router.navigateByUrl(`${ROUTE_APP.AGENT}/${ROUTE_APP.ALL_AGENTS}`);
  }

  resetForm() {
    this.prospectForm.reset();
  }
}
