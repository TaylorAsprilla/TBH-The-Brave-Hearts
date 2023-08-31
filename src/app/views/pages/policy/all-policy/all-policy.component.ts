import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';
import { AgentModel } from 'src/app/core/models/agent.model';
import { PolicyModel } from 'src/app/core/models/policy.model';
import { AgentService } from 'src/app/services/agent/agent.service';
import { ExporterService } from 'src/app/services/exporter/exporter.service';
import { PolicyService } from 'src/app/services/policy/policy.service';
import { environment } from 'src/environments/environment';

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
