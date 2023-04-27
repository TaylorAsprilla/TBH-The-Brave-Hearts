import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-prospects',
  templateUrl: './add-prospects.component.html',
  styleUrls: ['./add-prospects.component.scss'],
})
export class AddProspectsComponent implements OnInit {
  prospectForm: UntypedFormGroup;

  isprospectFormSubmitted = false;

  constructor(public formBuilder: UntypedFormBuilder) {}

  ngOnInit(): void {
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
    console.log('Entró');
    this.isprospectFormSubmitted = true;
    if (this.prospectForm.valid) {
      this.prospectForm.value;

      Swal.fire({
        icon: 'success',
        title: 'Form sent successfully',
        timer: 3500,
      });
      this.clearForm();
      console.log(this.prospectForm);
    }
  }

  clearForm() {
    this.prospectForm.reset();
  }
}
