import { FilterOption } from './../../../../core/interfaces/filter-option';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';
import { policyDataExport } from 'src/app/core/interfaces/policy.interface';
import { AgentModel } from 'src/app/core/models/agent.model';
import { CustomerModel } from 'src/app/core/models/customer.model';
import { PolicyModel } from 'src/app/core/models/policy.model';
import { PolicyService } from 'src/app/services/policy/policy.service';
import {
  statusPolicy,
  statusPolicyColors,
} from 'src/environments/configuration/data-utils';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss'],
})
export class PolicyComponent implements OnInit {
  policySubscription: Subscription;
  policies: PolicyModel[] = [];
  agents: AgentModel[] = [];
  customers: CustomerModel[] = [];

  filterOptions: FilterOption[];

  carriers: string[] = [];
  policyTypes: string[] = [];
  status: string[] = [];

  created: Date[] = [];

  filteredPolicies: PolicyModel[] = [];

  agentFullNames: string[] = [];
  customersFullNames: string[] = [];

  exportData: policyDataExport[] = [];
  exportFiltredData: policyDataExport[] = [];

  loading: boolean = false;

  photoIdUrl: string = environment.photoId;
  documentOneUrl: string = environment.documentOne;
  documentTwoUrl: string = environment.documentTwo;

  statusPolicy: any = statusPolicy;
  statusPolicyColors = statusPolicyColors;

  orderField: string = 'carrier';
  orderType: 'asc' | 'desc' = 'asc';

  hideFilters: boolean = false;

  @ViewChild('htmlData') htmlData: ElementRef;

  constructor(
    private policyService: PolicyService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.policySubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.agents = data.agents.agents;
      this.customers = data.customers;
    });

    this.loadPolicy();
  }

  loadPolicy() {
    this.loading = true;
    this.policySubscription = this.policyService
      .getAllPolicy()
      .subscribe((resp) => {
        this.policies = resp.policy.filter((policy) => {
          return policy.active === true;
        });

        this.filteredPolicies = this.policies;
        this.extractAllUniqueValues();
      });
  }

  extractPolicyFields(policy: PolicyModel) {
    return {
      carrier: policy.carrier,
      policyType: policy.policyType,
      monthly: policy.monthly,
      faceAmount: policy.faceAmount,
      active: policy.active,
      createdAt: policy.createdAt,
      uid: policy.uid,
      status: policy.status,
      nameAgent: `${policy.agent?.firstName} ${policy.agent?.lastName}`,
      nameCustomer: `${policy.customer?.firstName} ${policy.customer?.lastName}`,
    };
  }

  extractUniqueValues(fieldName: keyof PolicyModel): any[] {
    return Array.from(
      new Set(
        this.filteredPolicies.map((policy: PolicyModel) => policy[fieldName])
      )
    );
  }

  extractAllUniqueValues() {
    this.carriers = this.extractUniqueValues('carrier');
    this.policyTypes = this.extractUniqueValues('policyType');
    this.status = this.extractUniqueValues('status');
    this.created = this.extractUniqueValues('createdAt');
    this.createFiltres();
  }

  trackByPolicyId(index: number, policy: PolicyModel): string {
    return policy.uid;
  }

  editPolicy(policy: PolicyModel) {
    this.router.navigateByUrl(
      `${ROUTE_APP.POLICY}/${ROUTE_APP.ADD_POLICY}/${policy.uid}`
    );
  }

  createFiltres() {
    this.filteredPolicies = this.policies;
    this.exportData = this.policies.map(this.extractPolicyFields);
    this.agentFullNames = this.agents.map(
      (agent) => `${agent.firstName} ${agent.lastName}`
    );

    this.customersFullNames = this.customers.map(
      (customer) => `${customer.firstName} ${customer.lastName}`
    );

    const createdAtFormatted = this.created.map((dateString) =>
      this.formatDateToYYYYMMDD(dateString)
    );

    this.filterOptions = [
      {
        field: 'agents',
        label: 'Agents',
        options: this.agentFullNames,
        value: '',
      },
      {
        field: 'customers',
        label: 'Customers',
        options: this.customersFullNames,
        value: '',
      },

      {
        field: 'carrier',
        label: 'Carrier',
        options: this.carriers,
        value: '',
      },
      {
        field: 'policyType',
        label: 'Policy Type',
        options: this.policyTypes,
        value: '',
      },
      {
        field: 'status',
        label: 'Status',
        options: this.status,
        value: '',
      },
      {
        field: 'createdAt',
        label: 'Created At',
        options: createdAtFormatted,
        value: '',
      },
    ];
    this.loading = false;
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

  filterPolicies(data: any[] = []) {
    this.filteredPolicies = this.policies.filter((policy: PolicyModel) => {
      const agentName = `${policy.agent?.firstName} ${policy.agent?.lastName}`;
      const customerName = `${policy.customer?.firstName} ${policy.customer?.lastName}`;
      const createdAt = this.formatDateToYYYYMMDD(policy?.createdAt);

      const filters = [
        // Agent
        (policy: PolicyModel) => !data[0].value || agentName === data[0].value,
        // Customer
        (policy: PolicyModel) =>
          !data[1].value || customerName === data[1].value,
        // Carrier
        (policy: PolicyModel) =>
          !data[2].value || policy.carrier === data[2].value,
        // Policy Type
        (policy: PolicyModel) =>
          !data[3].value || policy.policyType === data[3].value,
        // Status
        (policy: PolicyModel) =>
          !data[4].value || policy.status === data[4].value,
        // CreatedAt
        (policy: PolicyModel) => !data[5].value || createdAt === data[5].value,
      ];

      const passedFilters = filters.every((filter) => filter(policy));

      return passedFilters;
    });

    this.exportFiltredData = this.filteredPolicies.map(
      this.extractPolicyFields
    );
  }

  changeStatus(uid: string, policy: PolicyModel) {
    this.policyService.updateStatusPolicy(uid, policy.status).subscribe({
      next: (resp: any) => {
        Swal.fire({
          position: 'bottom-end',
          html: 'Policy status updated.',
          showConfirmButton: false,
          timer: 1000,
        });

        this.loadPolicy();
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

  showFilters() {
    this.hideFilters = true;
  }

  navigateWithQueryParams(idPolicy: string) {
    const queryParams = {
      idPolicy,
    };

    const url = `${ROUTE_APP.POLICY}/${ROUTE_APP.ADD_POLICY}`;

    this.router.navigate([url], { queryParams });
  }
}
