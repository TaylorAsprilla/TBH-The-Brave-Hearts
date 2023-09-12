import { ExporterService } from 'src/app/services/exporter/exporter.service';
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

  filteredProspects: ProspectModel[] = [];
  orderField: string = 'firstName';
  orderType: 'asc' | 'desc' = 'asc';

  constructor(
    private prospectService: ProspectService,
    private agentService: AgentService,
    private router: Router,
    private exporterService: ExporterService
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
        this.loading = false;
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
          title: 'Error creating agent',
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
                  <th>Partner LastName:</th>
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

  sortCustomersBy(field: string) {
    if (field === this.orderField) {
      this.orderType = this.orderType === 'asc' ? 'desc' : 'asc';
    } else {
      this.orderField = field;
      this.orderType = 'asc';
    }

    this.filteredProspects.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return this.orderType === 'asc' ? -1 : 1;
      } else if (a[field] > b[field]) {
        return this.orderType === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  exportAsXLSX(): void {
    this.exporterService.exportToExcel(this.prospects, 'Data_prospects');
  }

  exportAsXLSXFiltered(): void {
    this.exporterService.exportToExcel(
      this.filteredProspects,
      'Data_prospects_filtered'
    );
  }
}
