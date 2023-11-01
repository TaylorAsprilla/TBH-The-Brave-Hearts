import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';
import { IPolicy } from 'src/app/core/interfaces/policy.interface';
import { AgentModel } from 'src/app/core/models/agent.model';
import { PolicyModel } from 'src/app/core/models/policy.model';
import { AgentService } from 'src/app/services/agent/agent.service';
import { ExporterService } from 'src/app/services/exporter/exporter.service';
import { PolicyService } from 'src/app/services/policy/policy.service';
import {
  statusPolicy,
  statusPolicyColors,
} from 'src/environments/configuration/data-utils';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-policy',
  templateUrl: './all-policy.component.html',
  styleUrls: ['./all-policy.component.scss'],
})
export class AllPolicyComponent implements OnInit, OnDestroy {
  policySubscription: Subscription;
  policies: PolicyModel[] = [];
  agent: AgentModel;

  filteredPolicies: PolicyModel[] = [];

  loading: boolean = false;

  photoIdUrl: string = environment.photoId;
  documentOneUrl: string = environment.documentOne;
  documentTwoUrl: string = environment.documentTwo;

  statusPolicy: any = statusPolicy;
  statusPolicyColors = statusPolicyColors;

  orderField: string = 'carrier';
  orderType: 'asc' | 'desc' = 'asc';

  constructor(
    private policyService: PolicyService,
    private agentService: AgentService,
    private exporterService: ExporterService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.policySubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.agent = this.agentService.agent;
    this.loadPolicy();
  }

  loadPolicy() {
    this.loading = true;
    this.policySubscription = this.policyService
      .getAllPolicyForAgents(this.agent.uid)
      .subscribe((resp) => {
        this.policies = resp.policy.filter((policy) => {
          return policy.active === true;
        });

        this.filteredPolicies = this.policies;
        this.loading = false;
      });
  }

  trackByPolicyId(index: number, policy: PolicyModel): string {
    return policy.uid;
  }

  editPolicy(policy: PolicyModel) {
    this.router.navigateByUrl(
      `${ROUTE_APP.POLICY}/${ROUTE_APP.ADD_POLICY}/${policy.uid}`
    );
  }

  filterPolicity(value: string) {
    if (value) {
      this.filteredPolicies = this.policies.filter((policy: PolicyModel) => {
        return (
          policy.carrier.toLowerCase().includes(value.toLowerCase()) ||
          policy.policyType.toLowerCase().includes(value.toLowerCase()) ||
          policy.monthly.toLowerCase().includes(value.toLowerCase()) ||
          policy.faceAmount.toLowerCase().includes(value.toLowerCase()) ||
          policy.customer.firstName
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          policy.customer.lastName.toLowerCase().includes(value.toLowerCase())
        );
      });
    } else {
      this.filteredPolicies = this.policies;
    }
  }

  sortPolicyBy(field: string) {
    if (field === this.orderField) {
      this.orderType = this.orderType === 'asc' ? 'desc' : 'asc';
    } else {
      this.orderField = field;
      this.orderType = 'asc';
    }

    this.filteredPolicies.sort((a: any, b: any) => {
      const aValue = a.customer ? a.customer.firstName : '';
      const bValue = b.customer ? b.customer.firstName : '';

      if (aValue < bValue) {
        return this.orderType === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return this.orderType === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  changeStatus(uid: string, policy: PolicyModel) {
    this.policyService.updatePolicy(uid, policy).subscribe({
      next: (resp: any) => {
        Swal.fire({
          position: 'bottom-end',
          html: 'Policy status updated.',
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

  navigateWithQueryParams(idPolicy: string) {
    const queryParams = {
      idPolicy,
    };

    const url = `${ROUTE_APP.POLICY}/${ROUTE_APP.ADD_POLICY}`;

    this.router.navigate([url], { queryParams });
  }

  exportAsXLSX(): void {
    this.exporterService.exportToExcel(this.policies, 'Data_policies');
  }

  exportAsXLSXFiltered(): void {
    this.exporterService.exportToExcel(
      this.filteredPolicies,
      'Data_policies_filtered'
    );
  }
}
