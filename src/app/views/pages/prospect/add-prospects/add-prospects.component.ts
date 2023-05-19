import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StateModel } from 'src/app/core/models/state.model';
import { ProspectService } from 'src/app/services/prospect/prospect.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-prospects',
  templateUrl: './add-prospects.component.html',
  styleUrls: ['./add-prospects.component.scss'],
})
export class AddProspectsComponent implements OnInit {
  prospectForm: UntypedFormGroup;

  states: StateModel[] = [];

  isprospectFormSubmitted = false;

  constructor(
    public formBuilder: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private prospectService: ProspectService
  ) {}

  ngOnInit(): void {
    this.states = this.activatedRoute.snapshot.data['states'];
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
      coupleName: [''],
      couplesOccupation: [''],
      coupleIncome: [''],
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
  }

  get formProspect() {
    return this.prospectForm.controls;
  }

  prospectFormSubmit() {
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
          this.resetForm();
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
            html: `${errorList.length ? errorList.join('') : error.error.msg}`,
          });
        },
      });
    }
  }

  resetForm() {
    this.prospectForm.reset();
  }
}
