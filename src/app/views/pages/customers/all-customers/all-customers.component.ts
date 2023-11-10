import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';
import { TEXT } from 'src/app/core/enum/text.enum';
import { customerDataExport } from 'src/app/core/interfaces/customer.interface';
import { FilterOption } from 'src/app/core/interfaces/filter-option';
import { AgentModel } from 'src/app/core/models/agent.model';
import { CustomerModel } from 'src/app/core/models/customer.model';
import { AgentService } from 'src/app/services/agent/agent.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-customers',
  templateUrl: './all-customers.component.html',
  styleUrls: ['./all-customers.component.scss'],
})
export class AllCustomersComponent implements OnInit, OnDestroy {
  customerSubscription: Subscription;
  customers: CustomerModel[] = [];
  loading: boolean = false;
  filteredCustomers: CustomerModel[] = [];
  agent: AgentModel;

  filterOptions: FilterOption[];

  exportData: customerDataExport[] = [];
  exportFiltredData: customerDataExport[] = [];

  state: string[] = [];
  dataBirth: Date[] = [];
  created: Date[] = [];
  customerFullNames: string[] = [];

  orderField: string = 'firstName';
  orderType: 'asc' | 'desc' = 'asc';

  constructor(
    private customerService: CustomerService,
    private agentService: AgentService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.customerSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.agent = this.agentService.agent;
    this.loadCustomers();
  }

  loadCustomers() {
    this.loading = true;
    this.customerSubscription = this.customerService
      .getAllCustomersForAgents(this.agent.uid)
      .subscribe((resp) => {
        this.customers = resp.customers.filter((customer) => {
          return customer.active === true;
        });
        this.filteredCustomers = resp.customers;
        this.extractAllUniqueValues();
      });
  }

  trackByCustomerId(index: number, customer: CustomerModel): string {
    return customer.uid;
  }

  editCustomer(customer: CustomerModel) {
    Swal.fire({
      title: 'Do you want to update customer data?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl(
          `${ROUTE_APP.CUSTOMER}/${ROUTE_APP.EDIT_CUSTOMERS}/${customer.uid}`
        );
      }
    });
  }
  deleteCustomer(customer: CustomerModel) {}

  newCustomer() {
    this.router.navigateByUrl(
      `${ROUTE_APP.CUSTOMER}/${ROUTE_APP.ADD_CUSTOMERS}/${TEXT.NEW}`
    );
  }

  addPolicy(customer: CustomerModel) {
    Swal.fire({
      title: 'Policy!',
      html: `Do you want to add a policy to the client <b>${customer.firstName} ${customer.lastName}</b>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add a policy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl(
          `${ROUTE_APP.POLICY}/${ROUTE_APP.ADD_POLICY}/${customer.uid}`
        );
      }
    });
  }

  moreInfo(customer: CustomerModel) {
    const dateOfBirth = customer.dateBirth;
    const formattedDateOfBirth = new Date(dateOfBirth).toLocaleDateString(
      'en-US'
    );

    Swal.fire({
      title: 'Info Customer',
      showCloseButton: true,
      html: `<div class="row">
            <div class="col-md-12 text-start">
              <table class="table table-hover">
                <tbody>
                <tr>
                    <th>Name:</th>
                    <td>${customer.firstName} ${customer.middleName} ${
        customer.lastName
      }</td>
                  </tr>
                  <tr>
                  <tr>
                    <th>Address:</th>
                    <td>${customer.address}</td>
                  </tr>
                  <tr>
                    <th>Address Line 2:</th>
                    <td>${customer.addressLine2}</td>
                  </tr>
                  <tr>
                    <th>City:</th>
                    <td>${customer.city}</td>
                  </tr>
                  <tr>
                    <th>State:</th>
                    <td>${customer.state}</td>
                  </tr>
                  <tr>
                    <th>Zip Code:</th>
                    <td>${customer.zipCode}</td>
                  </tr>
                  <tr>
                    <th>Phone:</th>
                    <td>${customer.phone}</td>
                  </tr>
                 <tr>
                    <th>Status In US:</th>
                    <td>${customer.statusInUS ? customer.statusInUS : ''}</td>
                  </tr>
                  <tr>
                  <th>Document Number:</th>
                  <td>${customer.documentNumber}</td>
                </tr>
                <tr>
                  <th>Document Type:</th>
                  <td>${customer.documentType}</td>
                </tr>
                <tr>
                  <th>Marital Status:</th>
                  <td>${customer.maritalStatus}</td>
                </tr>
                <tr>
                  <th>Date of Birth:</th>
                  <td>${formattedDateOfBirth}</td>
                </tr>
                <tr>
                  <th>Country of Birth:</th>
                  <td>${customer.countryBirth}</td>
                </tr>
                <tr>
                  <th>City of Birth:</th>
                  <td>${customer.cityBirth}</td>
                </tr>
                <tr>
                  <th>Gender:</th>
                  <td>${customer.gender}</td>
                </tr>
                <tr>
                  <th>Weight:</th>
                  <td>${customer.weight}</td>
                </tr>
                <tr>
                  <th>Height:</th>
                  <td>${customer.height}</td>
                </tr>
                <tr>
                  <th>Employer Name:</th>
                  <td>${customer.employerName}</td>
                </tr>
                <tr>
                  <th>Occupation:</th>
                  <td>${customer.occupation}</td>
                </tr>
                <tr>
                  <th>Time Employed:</th>
                  <td>${customer.timeEmployed}</td>
                </tr>
                <tr>
                  <th>Annual Income:</th>
                  <td>${customer.annualIncome}</td>
                </tr>
                <tr>
                  <th>Household Income:</th>
                  <td>${customer.householdIncome}</td>
                </tr>
                <tr>
                  <th>Household Net Worth:</th>
                  <td>${customer.householdNetWorth}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>`,
      icon: 'info',
    });
  }

  filterCustomers(value: string) {
    if (value) {
      this.filteredCustomers = this.customers.filter(
        (customer: CustomerModel) => {
          return (
            customer.firstName.toLowerCase().includes(value.toLowerCase()) ||
            customer.lastName.toLowerCase().includes(value.toLowerCase()) ||
            customer.documentNumber
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            customer.state.toLowerCase().includes(value.toLowerCase()) ||
            customer.email.toLowerCase().includes(value.toLowerCase()) ||
            customer.phone.toLowerCase().includes(value.toLowerCase())
          );
        }
      );
    } else {
      this.filteredCustomers = this.customers;
    }
  }

  sortCustomersBy(field: string) {
    // Verificar si el campo de ordenamiento es el mismo que el anterior
    if (field === this.orderField) {
      // Cambiar el tipo de orden
      this.orderType = this.orderType === 'asc' ? 'desc' : 'asc';
    } else {
      // Si es un campo diferente, establecer el campo de ordenamiento y el tipo de orden a sus valores predeterminados
      this.orderField = field;
      this.orderType = 'asc';
    }

    // Ordenar los clientes según el campo y el tipo de orden
    this.filteredCustomers.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return this.orderType === 'asc' ? -1 : 1;
      } else if (a[field] > b[field]) {
        return this.orderType === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  extractAllUniqueValues() {
    this.state = this.extractUniqueValues('state');
    this.dataBirth = this.extractUniqueValues('dateBirth');
    this.created = this.extractUniqueValues('createdAt');
    this.createFiltres();
  }

  createFiltres() {
    this.filteredCustomers = this.customers;
    this.exportData = this.customers.map(this.extractCustomerFields);

    const createdAtFormatted = this.created.map((dateString) =>
      this.formatDateToYYYYMMDD(dateString)
    );

    const dateBirthFormatted = this.dataBirth.map((dateString) =>
      this.formatDateToYYYYMMDD(dateString)
    );

    this.customerFullNames = this.customers.map(
      (customer) => `${customer.firstName} ${customer.lastName}`
    );

    this.filterOptions = [
      {
        field: 'name',
        label: 'Name',
        options: this.customerFullNames,
        value: '',
      },
      {
        field: 'dataBirth',
        label: 'Data Birth',
        options: dateBirthFormatted,
        value: '',
      },
      {
        field: 'createdAt',
        label: 'Created At',
        options: createdAtFormatted,
        value: '',
      },
      {
        field: 'state',
        label: 'State',
        options: this.state,
        value: '',
      },
    ];
    this.loading = false;
  }

  extractCustomerFields(customer: CustomerModel) {
    return {
      firstName: customer.firstName,
      middleName: customer.middleName,
      lastName: customer.lastName,
      address: customer.address,
      addressLine2: customer.addressLine2,
      city: customer.city,
      state: customer.state,
      zipCode: customer.zipCode,
      phone: customer.phone,
      email: customer.email,
      maritalStatus: customer.maritalStatus,
      documentNumber: customer.documentNumber,
      documentType: customer.documentType,
      dateBirth: customer.dateBirth,
      countryBirth: customer.countryBirth,
      cityBirth: customer.cityBirth,
      gender: customer.gender,
      weight: customer.weight,
      height: customer.height,
      employerName: customer.employerName,
      timeEmployed: customer.timeEmployed,
      annualIncome: customer.annualIncome,
      householdIncome: customer.householdIncome,
      householdNetWorth: customer.householdNetWorth,
      nameAgent: `${customer.agent?.firstName} ${customer.agent?.lastName}`,
      occupation: customer.occupation,
      createdAt: customer.createdAt,
    };
  }

  filterProspect(data: any[] = []) {
    this.filteredCustomers = this.customers.filter(
      (customer: CustomerModel) => {
        const customerName = `${customer.firstName} ${customer.lastName}`;

        const createdAt = this.formatDateToYYYYMMDD(customer?.createdAt);
        const dateBirth = this.formatDateToYYYYMMDD(customer?.dateBirth);

        const filters = [
          // Name Customer
          (customer: CustomerModel) =>
            !data[0].value || customerName === data[0].value,
          // dateBirth
          (customer: CustomerModel) =>
            !data[1].value || dateBirth === data[1].value,
          // createdAt
          (customer: CustomerModel) =>
            !data[2].value || createdAt === data[2].value,
          // State
          (customer: CustomerModel) =>
            !data[3].value || customer.state === data[3].value,
        ];

        const passedFilters = filters.every((filter) => filter(customer));

        return passedFilters;
      }
    );

    this.exportFiltredData = this.filteredCustomers.map(
      this.extractCustomerFields
    );
  }

  extractUniqueValues(fieldName: keyof CustomerModel): any[] {
    return Array.from(
      new Set(
        this.filteredCustomers.map(
          (customer: CustomerModel) => customer[fieldName]
        )
      )
    );
  }

  formatDateToYYYYMMDD(dateString: Date | undefined) {
    if (dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return;
  }

  resetSelect() {
    this.createFiltres();
  }
}
