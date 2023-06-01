import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ILoadAllPolicy,
  IPolicy,
} from 'src/app/core/interfaces/policy.interface';
import { PolicyModel } from 'src/app/core/models/policy.model';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  public policy: PolicyModel;

  constructor(private httpClient: HttpClient, private router: Router) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.policy.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  getAllPolicy() {
    return this.httpClient.get<ILoadAllPolicy>(
      `${base_url}/policy`,
      this.headers
    );
  }

  createPolicy(policy: IPolicy) {
    return this.httpClient.post(`${base_url}/policy`, policy, this.headers);
  }

  updateCustomer(policy: PolicyModel) {
    return this.httpClient.put(
      `${base_url}/policy/${this.uid}`,
      policy,
      this.headers
    );
  }
}
