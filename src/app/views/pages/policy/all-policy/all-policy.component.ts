import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';
import { FilterOption } from 'src/app/core/interfaces/filter-option';
import {
  IPolicy,
  policyDataExport,
} from 'src/app/core/interfaces/policy.interface';
import { AgentModel } from 'src/app/core/models/agent.model';
import { CustomerModel } from 'src/app/core/models/customer.model';
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

  filterOptions: FilterOption[];

  filteredPolicies: PolicyModel[] = [];

  customers: CustomerModel[] = [];

  carriers: string[] = [];
  policyTypes: string[] = [];
  status: string[] = [];

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

  constructor(
    private policyService: PolicyService,
    private agentService: AgentService,

    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.customers = data.customers;
    });

    this.agent = this.agentService.agent;
    this.loadPolicy();
  }

  ngOnDestroy(): void {
    this.policySubscription?.unsubscribe();
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
        this.extractAllUniqueValues();
      });
  }

  // Función para extraer los campos deseados de una política
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
    this.customersFullNames = this.extractUniqueValues('customer');
    this.createFiltres();
  }

  createFiltres() {
    this.filteredPolicies = this.policies;
    this.exportData = this.policies.map(this.extractPolicyFields);

    this.customersFullNames = this.customers
      .filter((customer) => customer.agent.agentCode === this.agent.agentCode)
      .map((customer) => `${customer.firstName} ${customer.lastName}`);

    this.filterOptions = [
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
    ];
    this.loading = false;
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

  filterPolicies(data: any[] = []) {
    this.filteredPolicies = this.policies.filter((policy: PolicyModel) => {
      const customerName = `${policy.customer?.firstName} ${policy.customer?.lastName}`;

      const filters = [
        // Customer
        (policy: PolicyModel) =>
          !data[0].value || customerName === data[0].value,
        // Carrier
        (policy: PolicyModel) =>
          !data[1].value || policy.carrier === data[1].value,
        // Policy Type
        (policy: PolicyModel) =>
          !data[2].value || policy.policyType === data[2].value,
        // Status
        (policy: PolicyModel) =>
          !data[3].value || policy.status === data[3].value,
      ];

      const passedFilters = filters.every((filter) => filter(policy));

      return passedFilters;
    });

    this.exportFiltredData = this.filteredPolicies.map(
      this.extractPolicyFields
    );
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

  resetSelect() {
    this.extractAllUniqueValues();
  }

  navigateWithQueryParams(idPolicy: string) {
    const queryParams = {
      idPolicy,
    };

    const url = `${ROUTE_APP.POLICY}/${ROUTE_APP.ADD_POLICY}`;

    this.router.navigate([url], { queryParams });
  }
}
