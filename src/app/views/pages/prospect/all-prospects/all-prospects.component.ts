import { AgentService } from 'src/app/services/agent/agent.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';
import { TEXT } from 'src/app/core/enum/text.enum';
import { ProspectModel } from 'src/app/core/models/prospect.model';
import { ProspectService } from 'src/app/services/prospect/prospect.service';
import Swal from 'sweetalert2';
import { AgentModel } from 'src/app/core/models/agent.model';
import {
  statusColors,
  statusOptions,
} from 'src/environments/configuration/data-utils';
import { FilterOption } from 'src/app/core/interfaces/filter-option';
import { prospectDataExport } from 'src/app/core/interfaces/prospect.interface';

@Component({
  selector: 'app-all-prospects',
  templateUrl: './all-prospects.component.html',
  styleUrls: ['./all-prospects.component.scss'],
})
export class AllProspectsComponent implements OnInit {
  prospectSubscription: Subscription;
  prospects: ProspectModel[] = [];
  agent: AgentModel;

  loading: boolean = false;

  statusOptions: any = statusOptions;
  statusColors = statusColors;

  filterOptions: FilterOption[];

  exportData: prospectDataExport[] = [];
  exportFiltredData: prospectDataExport[] = [];

  name: string[] = [];
  email: string[] = [];
  occupation: string[] = [];
  status: string[] = [];
  created: Date[] = [];
  prospectsFullNames: string[] = [];

  filteredProspects: ProspectModel[] = [];
  orderField: string = 'firstName';
  orderType: 'asc' | 'desc' = 'asc';

  page: number = 1;
  itemsPerPage: number = 15;

  constructor(
    private prospectService: ProspectService,
    private agentService: AgentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.agent = this.agentService.agent;
    this.loadProspects();
  }

  ngOnDestroy(): void {
    this.prospectSubscription?.unsubscribe();
  }

  loadProspects() {
    this.loading = true;
    this.prospectSubscription = this.prospectService
      .getAllProspectsForAgents(this.agent.uid)
      .subscribe((prospect) => {
        this.prospects = prospect.filter((prospet) => {
          return prospet.active === true;
        });

        this.filteredProspects = this.prospects;
        this.extractAllUniqueValues();
      });
  }

  changeStatus(prospect: ProspectModel) {
    this.prospectService.updateProspect(prospect).subscribe({
      next: (resp: any) => {
        Swal.fire({
          position: 'bottom-end',
          html: 'Prospect status updated.',
          showConfirmButton: false,
          timer: 1000,
        });
        this.loadProspects();
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

  deleteProspect(prospect: ProspectModel) {
    Swal.fire({
      title: 'Are you sure?',
      html: `You want to eliminate prospect <b>${prospect.firstName} ${prospect.lastName}</b>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.prospectService.deleteProspect(prospect).subscribe({
          next: (res) => {
            this.loadProspects();
            Swal.fire('Deleted!', 'Prospect has been removed.', 'success');
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
              title: 'Error deleting prospect',
              icon: 'error',
              html: `${
                errorList.length ? errorList.join('') : error.error.msg
              }`,
            });
          },
        });
      }
    });
  }

  trackByProspectId(index: number, prospect: ProspectModel): string {
    return prospect.uid;
  }

  editProspect(prospect: ProspectModel) {
    this.router.navigateByUrl(
      `${ROUTE_APP.PROSPECT}/${ROUTE_APP.ADD_PROSPECTS}/${prospect.uid}`
    );
  }

  newProspect() {
    this.router.navigateByUrl(
      `${ROUTE_APP.PROSPECT}/${ROUTE_APP.ADD_PROSPECTS}/${TEXT.NEW}`
    );
  }

  newCustomer(prospect: ProspectModel) {
    this.router.navigateByUrl(
      `${ROUTE_APP.CUSTOMER}/${ROUTE_APP.ADD_CUSTOMERS}/${ROUTE_APP.PROSPECT}/${prospect.uid}`
    );
  }

  moreInfo(prospect: ProspectModel) {
    Swal.fire({
      title: 'Info Prospect',
      showCloseButton: true,
      html: `<div class="row">
            <div class="col-md-12 text-start">
              <table class="table table-hover">
                <tbody>
                <tr>
                    <th>Name:</th>
                    <td>${prospect.firstName} ${prospect.lastName}</td>
                  </tr>
                    <tr>
                  <th>Email:</th>
                  <td>${prospect.email}</td>
                </tr>
                <tr>
                    <th>Phone:</th>
                    <td>${prospect.phone}</td>
                </tr>
                <tr>
                  <th>Occupation:</th>
                  <td>${prospect.occupation}</td>
                </tr>
                <tr>
                  <th>Partner’s Name:</th>
                  <td>${prospect.partnerName}</td>
                </tr>
                <tr>
                  <th>Partner’s Last Name:</th>
                  <td>${prospect.partnerLastName}</td>
                </tr>
                <tr>
                  <th>Partner’s Occupation:</th>
                  <td>${prospect.partnerOccupation}</td>
                </tr>
                <tr>
                  <th>Children:</th>
                  <td>${prospect.children}</td>
                </tr>
                <tr>
                  <th>Retirement Plans:</th>
                  <td>${prospect.retirementPlans}</td>
                </tr>
                <tr>
                  <th>Life Insurance:</th>
                  <td>${prospect.lifeInsurance}</td>
                </tr>
                <tr>
                  <th>Properties:</th>
                  <td>${prospect.properties}</td>
                </tr>
                <tr>
                  <th>Income:</th>
                  <td>${prospect.income}</td>
                </tr>
                <tr>
                  <th>Partner’s income:</th>
                  <td>${prospect.partnerIncome}</td>
                </tr>
                <tr>
                  <th>Addirional Income:</th>
                  <td>${prospect.additionalIncome}</td>
                </tr>
                <tr>
                  <th>Surplus Income:</th>
                  <td>${prospect.surplusIncome}</td>
                </tr>
                <tr>
                  <th>Observations:</th>
                  <td>${prospect.observations}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>`,
      icon: 'info',
    });
  }

  filterProspects(value: string) {
    if (value) {
      this.filteredProspects = this.prospects.filter(
        (prospect: ProspectModel) => {
          return (
            prospect.firstName.toLowerCase().includes(value.toLowerCase()) ||
            prospect.lastName?.toLowerCase().includes(value.toLowerCase()) ||
            prospect.email?.toLowerCase().includes(value.toLowerCase()) ||
            prospect.phone.toLowerCase().includes(value.toLowerCase()) ||
            prospect.status.toLowerCase().includes(value.toLowerCase())
          );
        }
      );
    } else {
      this.filteredProspects = this.prospects;
    }
  }

  sortProspectsBy(field: string) {
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

    this.filteredProspects.sort((a: any, b: any) => {
      if (field === 'createdAt' || field === 'dateBirth') {
        // Convertir los valores a objetos Date para comparar
        const aValue = new Date(a[field]).toISOString();
        const bValue = new Date(b[field]).toISOString();

        return (
          aValue.localeCompare(bValue) * (this.orderType === 'asc' ? 1 : -1)
        );
      } else {
        // Ordenar normalmente si no es createdAt ni dateBirth
        const aValue = a[field];
        const bValue = b[field];

        // Comparar los valores directamente
        return (
          aValue.localeCompare(bValue) * (this.orderType === 'asc' ? 1 : -1)
        );
      }
    });
  }

  extractAllUniqueValues() {
    this.email = this.extractUniqueValues('email');
    this.occupation = this.extractUniqueValues('occupation');
    this.created = this.extractUniqueValues('createdAt');
    this.status = this.extractUniqueValues('status');
    this.createFiltres();
  }

  extractUniqueValues(fieldName: keyof ProspectModel): any[] {
    return Array.from(
      new Set(
        this.filteredProspects.map(
          (prospect: ProspectModel) => prospect[fieldName]
        )
      )
    );
  }

  createFiltres() {
    this.filteredProspects = this.prospects;
    this.exportData = this.prospects.map(this.extractProspectFields);

    const formattedDates = this.created.map((dateString) =>
      this.formatDateToYYYYMMDD(dateString)
    );

    this.prospectsFullNames = this.prospects.map(
      (prospect) => `${prospect.firstName} ${prospect.lastName}`
    );

    this.filterOptions = [
      {
        field: 'name',
        label: 'Name',
        options: this.prospectsFullNames,
        value: '',
      },
      {
        field: 'occupation',
        label: 'Occupation',
        options: this.occupation,
        value: '',
      },
      {
        field: 'createdAt',
        label: 'Created At',
        options: formattedDates,
        value: '',
      },
      {
        field: 'status',
        label: 'Status',
        options: this.status,
        value: '',
      },
    ];
    this.loading = false;
  }

  extractProspectFields(prospect: ProspectModel) {
    return {
      firstName: prospect.firstName,
      lastName: prospect.lastName,
      phone: prospect.phone,
      email: prospect.email,
      occupation: prospect.occupation,
      partnerName: prospect.partnerName,
      partnerLastName: prospect.lastName,
      partnerOccupation: prospect.partnerOccupation,
      children: prospect.children,
      retirementPlans: prospect.retirementPlans,
      lifeInsurance: prospect.lifeInsurance,
      properties: prospect.properties,
      partnerIncome: prospect.partnerIncome,
      additionalIncome: prospect.additionalIncome,
      surplusIncome: prospect.surplusIncome,
      observations: prospect.observations,
      status: prospect.status,
      nameAgent: `${prospect.agent?.firstName} ${prospect.agent?.lastName}`,
      createdAt: prospect.createdAt,
    };
  }

  filterProspect(data: any[] = []) {
    this.filteredProspects = this.prospects.filter(
      (prospect: ProspectModel) => {
        const prospectName = `${prospect.firstName} ${prospect.lastName}`;

        const createdAt = this.formatDateToYYYYMMDD(prospect?.createdAt);

        const filters = [
          // Prospect
          (prospect: ProspectModel) =>
            !data[0].value || prospectName === data[0].value,
          // Occupation
          (prospect: ProspectModel) =>
            !data[1].value || prospect.occupation === data[1].value,
          // createdAt
          (prospect: ProspectModel) =>
            !data[2].value || createdAt === data[2].value,
          // Status
          (prospect: ProspectModel) =>
            !data[3].value || prospect.status === data[3].value,
        ];

        const passedFilters = filters.every((filter) => filter(prospect));

        return passedFilters;
      }
    );

    this.exportFiltredData = this.filteredProspects.map(
      this.extractProspectFields
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
