import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';
import { IPolicy } from 'src/app/core/interfaces/policy.interface';
import { PolicyModel } from 'src/app/core/models/policy.model';
import { PolicyService } from 'src/app/services/policy/policy.service';

@Component({
  selector: 'app-all-policy',
  templateUrl: './all-policy.component.html',
  styleUrls: ['./all-policy.component.scss'],
})
export class AllPolicyComponent implements OnInit, OnDestroy {
  policySubscription: Subscription;
  policies: PolicyModel[] = [];
  dataTablePolicy: any;
  loading: boolean = false;

  constructor(private policyService: PolicyService, private router: Router) {}

  ngOnDestroy(): void {
    this.policySubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.loadPolicy();
  }

  loadPolicy() {
    this.loading = true;
    this.policySubscription = this.policyService
      .getAllPolicy()
      .subscribe((resp) => {
        this.policies = resp.policy;
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
}
