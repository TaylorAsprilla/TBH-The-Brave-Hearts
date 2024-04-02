import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';
import { TEXT } from 'src/app/core/enum/text.enum';
import { IClient } from 'src/app/core/interfaces/customer.interface';
import { CustomerModel } from 'src/app/core/models/customer.model';
import { StateModel } from 'src/app/core/models/state.model';
import { CustomerService } from 'src/app/services/customer/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-customers',
  templateUrl: './edit-customers.component.html',
  styleUrls: ['./edit-customers.component.scss'],
})
export class EditCustomersComponent implements OnInit {
  customerForm: UntypedFormGroup;

  isCustomerFormSubmitted: Boolean;

  states: StateModel[] = [];
  selectedCustomer: CustomerModel;

  constructor(
    public formBuilder: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.states = this.activatedRoute.snapshot.data['states'];

    this.activatedRoute.params.subscribe(({ id }) => {
      this.getCustomerById(id);
    });

    this.createForm();
  }

  createForm() {
    this.customerForm = this.formBuilder.group({
      firstName: ['', [Validators.minLength(3), Validators.required]],
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

    this.isCustomerFormSubmitted = false;
  }

  get formCustomer() {
    return this.customerForm.controls;
  }

  getCustomerById(id: string) {
    let formattedexpirationDate: string;
    if (id !== TEXT.NEW) {
      this.customerService.getCustomer(id).subscribe({
        next: (customer) => {
          const {
            firstName,
            lastName,
            address,
            state,
            phone,
            email,
            statusInUS,
            maritalStatus,
            dateBirth,
            documentNumber,
            documentType,
            countryBirth,
            cityBirth,
            gender,
            weight,
            height,
            employerName,
            annualIncome,
            middleName,
            addressLine2,
            city,
            zipCode,
            occupation,
            timeEmployed,
            householdIncome,
            householdNetWorth,
            idNumber,
            expirationDate,
            idState,
          } = customer;
          this.selectedCustomer = customer;

          const formattedDateBirth = new Date(dateBirth)
            .toISOString()
            .split('T')[0];

          if (expirationDate) {
            formattedexpirationDate = new Date(expirationDate)
              .toISOString()
              .split('T')[0];
          }

          this.customerForm.setValue({
            firstName,
            middleName,
            lastName,
            address,
            addressLine2,
            city,
            state,
            zipCode,
            phone,
            email,
            statusInUS: statusInUS ? statusInUS : '',
            documentType: documentType ? documentType : '',
            documentNumber,
            maritalStatus,
            dateBirth: formattedDateBirth,
            countryBirth,
            cityBirth,
            gender,
            weight,
            height,
            employerName,
            occupation,
            timeEmployed,
            annualIncome,
            householdIncome,
            householdNetWorth,
            idNumber: idNumber ? idNumber : '',
            expirationDate: formattedexpirationDate
              ? formattedexpirationDate
              : '',
            idState: idState ? idState : '',
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
            title: 'Error updating customer',
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

  editCustomer() {
    const data: IClient = {
      uid: this.selectedCustomer.uid,
      firstName: this.formCustomer.firstName.value,
      middleName: this.formCustomer.middleName.value,
      lastName: this.formCustomer.lastName.value,
      address: this.formCustomer.address.value,
      addressLine2: this.formCustomer.addressLine2.value,
      city: this.formCustomer.city.value,
      zipCode: this.formCustomer.zipCode.value,
      occupation: this.formCustomer.occupation.value,
      state: this.formCustomer.state.value,
      phone: this.formCustomer.phone.value,
      email: this.formCustomer.email.value,
      statusInUS: this.formCustomer.statusInUS.value,
      maritalStatus: this.formCustomer.maritalStatus.value,
      dateBirth: this.formCustomer.dateBirth.value,
      documentNumber: this.formCustomer.documentNumber.value,
      documentType: this.formCustomer.documentType.value,
      countryBirth: this.formCustomer.countryBirth.value,
      cityBirth: this.formCustomer.cityBirth.value,
      gender: this.formCustomer.gender.value,
      weight: this.formCustomer.weight.value,
      height: this.formCustomer.height.value,
      employerName: this.formCustomer.employerName.value,
      annualIncome: this.formCustomer.annualIncome.value,
      timeEmployed: this.formCustomer.timeEmployed.value,
      householdIncome: this.formCustomer.householdIncome.value,
      householdNetWorth: this.formCustomer.householdNetWorth.value,
      idNumber: this.formCustomer.idNumber.value,
      expirationDate: this.formCustomer.expirationDate.value,
      idState: this.formCustomer.idState.value,
    };

    this.customerService.updateCustomer(data).subscribe({
      next: (resp: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Updated customer',
          html: `${resp.customer.firstName} ${resp.customer.lastName}`,
        });
        this.resetForm();
        this.router.navigateByUrl(
          `${ROUTE_APP.CUSTOMER}/${ROUTE_APP.ALL_CUSTOMERS}`
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
          title: 'Error updating customer',
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

  resetForm() {
    this.customerForm.reset();
  }
}
